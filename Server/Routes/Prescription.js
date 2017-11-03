var prescription = require('../Models/PrescriptionSchema');
var mongo = require('mongodb');
var mongoose = require('mongoose');




module.exports = function(router){
    
//add prescription entery to the database http://localhost:port/api/prescription/addprescription
router.post("/addprescription", (req, res) => 
{
    var myData = new prescription(req.body);

     // check if variable exists or not
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

    router.get('/retrieve/:id', function(req,res, next){
        
		prescription.findOne({doctor_id:req.params.id}, function(err, prescriptions) {
            if(!err){ 
                res.json(prescriptions);
                
            } else {
                res.json({success: 'false' ,message: 'could not retrieve data'});
            }
         });
        });
       router.get('/fetchData/:id', function(req,res){
            
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
