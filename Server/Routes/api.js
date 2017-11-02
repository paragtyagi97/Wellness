var prescription = require('../Models/prescriptionSchema');
var mongojs = require('mongojs');
var mongo = require('mongodb');
var mongoose = require('mongoose');




module.exports = function(router){
    
//add prescription entery to the database http://localhost:port/api/prescription/addprescription
router.post("/addprescription", (req, res) => 
{
    var myData = new prescription(req.body);

     // check if variable exists or not
    if (req.body.historySchema == null || req.body.historySchema =='')
    { 
        (req.body.Personal_History == null || req.body.Personal_History ==''||
     req.body.Family_History == null || req.body.Family_History =="")

     res.json({success: 'false',message: 'Ensure all details  were provided'});

     }

        
    if(req.body.vitalsSchema == null || req.body.vitalsSchema =='')
    {
        (req.body.Systolic == null || req.body.Systolic ==''|| req.body.Diastolic == null || req.body.Diastolic ==''||
         req.body.Pulse == null || req.body.Pulse ==''|| req.body.Weight == null || req.body.Weight  ==''||
         req.body.RespiratoryRate== null || req.body.RespiratoryRate ==''||req.body.Temprature == null || req.body.Temprature =='' ||
         req.body.spO2 == null || req.body.spO2 ==''||req.body.Blood== null || req.body.Blood =='')

         res.json({success: 'false',message: 'Ensure all details  were provided'});

    }

   if(req.body.ImmunizationSchema == null || req.body.ImmunizationSchema =='')
   {
   (req.body.Name == null || req.body.Name ==''|| 
    req.body.Type == null || req.body.Type =='')

    res.json({success: 'false',message: 'Ensure all details  were provided'});
   }
   

    if(req.body.LabTestSchema == null || req.body.LabTestSchema =='')
    {
        (req.body.Name == null || req.body.Name ==''|| 
        req.body.Type == null || req.body.Type =='')
    }
    
    if(req.body.ProcedureSchema == null || req.body.ProcedureSchema  =='')
    {
        (req.body.Name == null || req.body.Name ==''|| 
        req.body.Type == null || req.body.Type =='')

        res.json({success: 'false',message: 'Ensure all details  were provided'});
    }
    
    if(req.body.DandASchema== null || req.body.DandASchema =='')
    {
    (req.body.Examination == null || req.body.Examination ==''|| req.body.Problem_Dianosis == null || req.body.Medicine ==''||
        req.body.OtherAdvice == null || req.body.OtherAdvice ==''|| req.body.Add_Immunization == null || req.body.Add_Immunization ==''||
        req.body.Add_LabTest == null || req.body.Add_LabTest==''|| req.body.Add_Procedure == null || req.body.Add_Procedure =='')

        res.json({success: 'false',message: 'Ensure all details  were provided'});
    }

    if(req.body.AllergySchema== null || req.body.AllergySchema =='')
    {
        (req.body.Problem_Name == null || req.body.Problem_Name ==''|| req.body.Diagnosis_Date == null || req.body.Diagnosis_Date ==''||
        req.body.Diagnosis_By == null || req.body.Diagnosis_By ==''|| req.body.Notes == null || req.body.Notes =='')
        res.json({success: 'false',message: 'Ensure all details  were provided'});
    }

    if(req.body.MedicationSchema == null || req.body.MedicationSchema  =='')
    {
    (req.body.Date == null || req.body.Date ==''|| req.body.Medicine == null || req.body.Medicine ==''||
    req.body.Dosage == null || req.body.Dosage ==''|| req.body.Frequency_taken == null || req.body.Frequency_taken ==''||
    req.body.Strength == null || req.body.Strength ==''|| req.body.Type == null || req.body.Type =='')

        res.json({success: 'false',message: 'Ensure all details were provided'});
   
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
        
		prescription.find({doctor_id:req.params.id}, function(err, prescriptions) {
            if(!err){ 
                res.json(prescriptions);
                
            } else {
                res.json({success: 'false' ,message: 'could not retrieve data'});
            }
         });
        });
       
    
    

   return router;   
}
