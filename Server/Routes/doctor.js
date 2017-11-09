var Doctor     = require('../models/doctor');
var mongojs = require('mongojs');

module.exports = function(doctorRouter){

//delete doctor login credentials  http://localhost:port/api/doctor/del/:id
doctorRouter.get('/deleteDoctor/:id', function(req,res, next){
    Doctor.findOne({_id: mongojs.ObjectId(req.params.id)}).remove(function(err){
    if(err)	res.json(err);
    else { res.json({success: 'true'}); }
    });
   
 
}); 
//add
doctorRouter.put('/addExperience/:id', function(req, res){
    var doctor = {
       
        experience: [
            {from: req.body.experience.from},
            {to: req.body.experience.to},
            {hospital: req.body.experience.hospital},
            {post: req.body.experience.post},
            {description: req.body.experience.description}
            ]               
    };
   var opts = { strict: false };
   Doctor.update({_id: mongojs.ObjectId(req.params.id)}, experience, opts, function(error) {
     if(error){res.json({error: error});}
    else res.json({sucess:true});
   });

});

//delete data in array

doctorRouter.put('/removeExperience/:id/:experienceid', function(req,res){

var my_id = req.params.id,//assume get 54fcb3890cba9c4234f5c925
experience_id = req.params.experienceid;// assume get 54fcb3890cba9c4234f5c925

Doctor.findByIdAndUpdate(
my_id,
{ $pull: { 'experience': {  _id: experience_id } } },function(err,model){
  if(err){
       console.log(err);
       return res.json({error:err});
    }
    return res.json({message:"field is deleted"});
    
});

});

 return doctorRouter;
 };
