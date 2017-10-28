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
    router.post('/upload_images',(req, res, next)=>{
    let formidable = require('formidable');
    var form = new formidable.IncomingForm();
    form.uploadDir = "./server/uploads";
    form.maxFieldsSize = 10*1024*1024;
    form.multiples = true;
    form.parse(request, (err, fields, files) => {
        if(err) {
            response.json({
                result: "failed",
                data: {},
                message: 'Cannot upload images.error is : ${err)'
            });
        }
        var arrayOFFiles = files[""];
        if(arrayOFFiles.length > 0) {
            var fileNames = [];
            arrayOFFiles.foreach((eachFile) =>{
                fileNames.push(eachFile.path)
            });
            response.json({
                result: "ok",
                data: fileNames,
                numberOfImages: fileNames.length,
                message: "Upload images successfully"

            });

        }else{
            response.json({
                result: "failed",
                data: {},
                numberOfImages: 0,
                message:"No image to upload !"

            });
            
        }
            
    });

});

 return router;
 }

