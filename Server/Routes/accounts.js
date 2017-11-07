var User     = require('../models/doctor');
var jwt = require('jsonwebtoken');
var secret = 'meanstack';
var base64Data;
var id = require('uniqueid');
var fs = require("fs");

module.exports = function(router){

    router.post('/registerDoctor', function(req, res){
    
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



    router.post('/authenticateDoctor', function(req, res){
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
    
    //patient basic registeration http://localhost:port/patients/register
    router.post('/registerPatient', function(req, res){
        var patient = new Patient(req.body);


        if (req.body.username == null || req.body.username == '' || req.body.dob == null || req.body.dob == '' || req.body.email == null || req.body.email == ''
        || req.body.email == null || req.body.email == '' || req.body.contactNumber == null || req.body.contactNumber == ''){
            res.json({success: 'false',message: 'Ensure username, email, contact number and date of bierth were provided'});
        } else {
        patient.save(function(err){
            if (err) {
                res.json({success: 'false',message: 'email already exists!'});//because email attribute set to unique
            } else {
                res.json({success: 'true',message: 'Patient registered'});
            }
        });
      
       }

    }); 
  
    //patient basic registeration http://localhost:port/patients/authenticate
   router.post('/authenticatePatient', function(req, res){
        Patient.findOne({username: req.body.username}).select('email username password').exec(function(err, user){
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
                res.json({success: true, message: 'user authenticated'  });
              }
            
            }
        });
        
    });

 return router;
    
 };

