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


return patientRouter; 
};


