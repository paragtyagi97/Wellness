var User     = require('../models/doctor');
var jwt = require('jsonwebtoken');
var secret = 'meanstack';
var base64Data;
var id = require('uniqueid');
var fs = require("fs");

module.exports = function(router){

router.post('/users', function(req, res){
    
    if(req.body.Username == null || req.body.Username == '' || req.body.Password == null || req.body.Password == '' || req.body.Email == null || req.body.Email == '') {
        res.json({success: true, message: 'Ensure username, email, and password were provided'});
    } else {
        
        if(!req.body.File) {
            res.json({success: false, message: "Photo Proof is mendatory"});
            return;
        }
 
        var file;
        
        req.body.PhotoProofOFLicencse = 'Uploads/' + id.generate() + '.'+ path.extname(req.body.File.FileName);
        
        file = req.body.File;
        delete req.body.File;

        var user = new User(req.body);
        
        user.save(function(err){
            if (err) console.log(err);
            else {
                var imageBuffer = new Buffer(file.base64, 'base64');
                fs.writeFile(req.body.PhotoProofOFLicencse, imageBuffer, 'base64', function(err){
                    if (err) console.log(err);
                        res.json({success: true, message: "User has been created successfuly"});
                });
            }
        });
    }

    if (err) {
            res.send('Username or Email already exists!');
        } else {
            res.send('user created!');
        }


});


router.use(function(req, res, next) {
    var token = req.body.token || req.body.query || req.headers['x-access-token'];
    if (token) {

        jwt.vertify(token, secret, function(err, decoded) {
            if (err) {
                
                    res.json({ success: false, message: 'token invalid'});

                } else {
                    req.decoded = decoded;
                    next();
                }
            
            });


         } else {
                res.json({ success: false, message: 'No token provided'});

            }
        });



router.post('/me', function(req, res) {
    res.json({success: true, message: req.decoded});
});
    router.post('/authenticate', function(req, res){
        User.findOne({username: req.body.username}).select('email username password').exec(function(err, user){
            if (err) throw err;
            if(!user) {
                res.json({success: false,mesage: 'Could not authenticate user'});
            } else if(user) {
                if(req.body.password) {
              var validPassword =  user.comparePassword(req.body.password); }
               else {
                res.json({success: false,mesage: 'No password provided'});
               }
              if(!validPassword) {
                  res.json({success: false, message: 'Could not authenticate password'});
              } else {
                res.json({success: true, message: 'user authenticated'});
              }
            
            }
        });
    });

 return router;
 }
