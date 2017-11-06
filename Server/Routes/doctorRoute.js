var Doctor = require('../Models/doctorRoute');
var Appointment = require('../Models/appointment');
var jwt = require('jsonwebtoken');
var secret = 'meanstack';
var mongojs = require('mongojs');





module.exports = function(router0){
     //doctor basic registeration http://localhost:port/api/doctor/register
    router0.post('/register', function(req, res){
        var user = new Doctor(req.body);
     

        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''
        || req.body.doctor_id == null || req.body.doctor_id == '' || req.body.contact_number == null || req.body.contact_number == ''){
            res.json({success: 'false',message: 'Ensure username, email and password were provided'});
        } else {
        user.save(function(err){
            if (err) {
                res.json({success: 'false',message: 'Username or email already exists!'});
            } else {
                res.json({success: 'true',message: 'Doctor registered'});
            }
        });
    }
        
    }); 


      //doctors login http://localhost:port/api/doctor/authenticate
    router0.post('/authenticate', function(req, res){
        Doctor.findOne({username: req.body.username}).select('email username password').exec(function(err, user){
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
                var token = jwt.sign({username: user.username, email: user.email}, secret, {expiresIn: '96h'} );
                res.json({success: true, message: 'user authenticated', token: token });
              }
            
            }
        });
        
    });


    //delete doctor login credentials  http://localhost:port/api/doctor/del/:id
    router0.get('/del/:id', function(req,res, next){
		Doctor.findOne({_id: mongojs.ObjectId(req.params.id)}).remove(function(err){
        if(err)	res.json(err);
        else { res.json({success: 'true'}); }
        });
       
     
    }); 
    //add
    router0.put('/add/:id', function(req, res){
        var doctor = {
           
            experience: [{
                from: req.body.experience.from,
                to: req.body.experience.to,
                hospital: req.body.experience.hospital,
                post: req.body.experience.post,
                description: req.body.experience.description
               } ]               
        };
       var opts = { strict: false };
       Doctor.update({_id: mongojs.ObjectId(req.params.id)}, doctor, opts, function(error) {
         
         res.json({error: error});
       });
   
   });

//delete data in array

   router0.put('/remove/:id/:experienceid', function(req,res){

    var my_id = req.params.id,//assume get 54fcb3890cba9c4234f5c925
    experience_id = req.params.experienceid;// assume get 54fcb3890cba9c4234f5c925
  
  Doctor.findByIdAndUpdate(
    my_id,
   { $pull: { 'experience': {  _id: experience_id } } },function(err,model){
      if(err){
       	console.log(err);
       	return res.send(err);
        }
        return res.json(model);
    });

   });

    return router0;   
};

jwt.sign({
    data: 'foobar'
}, 'secret' , {expiresIn: '96h'});



 