var prescription = require('../Models/PrescriptionSchema');
var mongo = require('mongodb');
var mongoose = require('mongoose');




module.exports = function(router){
	//add appointment entery to the database http://localhost:port/api/appointments/addAppointment

router.post("/addprescription",function(req, res, next) 
{
	// check if variable exists or not
     var myData = new Appointment(req.body);
     
    if(req.body.DiagnosisandAdvice.Problem_Diagnosis == null ||req.body.DiagnosisandAdvice.Problem_Diagnosis == '' )
          {
        res.json({success: 'true',message: 'Ensure all details were provided'});
         }

else {
   
            myData.save(function(err){
                if (err || !myData) {
                    res.json({success: 'false', message: 'not able to provide prescription '});
                } else {
                    res.json({success: 'true', message: 'prescription provided!'});
                }
            });
  
        }
   });

    //delete prescription with the help of _id
    router.get('/delete/:id', function(req,res, next){
		prescription.findOneAndRemove({_id: mongojs.ObjectId(req.params.id)}), (function(err){
        if(err)	res.json(err);
        else { res.json({success: 'true' ,message: 'prescription is removed'}); }
        });
       
     
    }); 

    router.get('/findByID/:id', function(req,res, next){
        
		prescription.findOne({_id:mongojs.ObjectId(req.params.id)}), function(err, prescriptions) {
            if(!err){ 
                res.json(prescriptions);
                
            } else {
                res.json({success: 'false' ,message: 'could not retrieve data'});
            }
         });
        });
       router.get('/findByDoctorID/:doctor_id', function(req,res){
            
                    prescription.findOne({doctor_id:req.id}, function(err, prescriptions) {
                        if(!err){ 
                            res.json(prescriptions);
                            
                        } else {
                            res.json({success: 'false' ,message: 'could not fetch'});
                        }
                        return res.send( prescriptions)
                     });
                    });       
    
    

   return router;   
}
