var Patient = require('../Models/patient');
var mongojs = require('mongojs');


module.exports = function(patientRouter){
     
      
 
patientRouter.put('/updatePatient/:id', function(req, res){
 
     if(req.body.contactNumber || req.body.email) {
       res.json({sucess:false, message: "User can not change contact number and email"});
     } else {
     
    var opts = { strict: false };
    
    Patient.update({_id: req.params.id}, req.body, opts, function(error) {
      if(error) {res.json({error:error});}
      else {
      res.json({success:true,message: "Sucessfully updated"}); }
      
    });
  }

});
     patientRouter.post('/updatePatient/password', function(req, res){
  
   //  var username = req.body.username;
     var password = req.body.password;
  
     Patient.findOne({username: req.body.username}).select('email username password').exec(function(err, user){
      if (err) throw err;
      if(!user) {
          res.json({success: false,mesage: 'Could not find user'});
      } else if(user) {
          if(req.body.password) {
        var validPassword =  user.comparePassword(req.body.password); }
         else {
          res.json({success: false,mesage: 'No password provided '});
         }
        if(!validPassword) {
            res.json({success: false, message: 'Could not match password'});
        } else {

          var opts = { strict: false };

          Patient.update({username: req.body.username}, {password: req.body.newPassword} , opts, function(error) {
            if(error) {res.json({error:error});}
            else {
            res.json({success:true,message: "Sucessfully updated"});
            console.log("updated"); }
            
          }); 



        
        }
      
      }
  });


return patientRouter; 
};


