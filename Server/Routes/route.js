var User     = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'meanstack';

module.exports = function(router){

router.post('/users', function(req, res){
    
    var user = new User();
    user.Name = req.body.Username;
    user.Phone = req.body.Phone;
    user.Email = req.body.Email;
    user.Username = req.body.Username;
    user.Password = req.body.Password;
    user.ClinicName = req.body.ClinicName;
    user.Speciality = req.body.Speciality;
    user.ClinicAddress = req.body.ClinicAddress;
    user.LicenseID = req.body.LicenseID;
    if(req.body.Username == null || req.body.Username == '' || req.body.Password == null || req.body.Password == '' || req.body.Email == null || req.body.Email == '') {
        res.send('Ensure username, email, and password were provided');

    } else {
    user.save(function(err){
        if (err) {
            res.send('Username or Email already exists!')
        } else {
            res.send('user created!');
        }

    

});
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
res.send(req.decoded);
});

 return router;
 }

