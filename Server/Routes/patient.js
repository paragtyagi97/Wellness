var Patient = require('../Models/patient');
var mongojs = require('mongojs');


module.exports = function(router2){
     //patient basic registeration http://localhost:port/patients/register
    router2.post('/register', function(req, res){
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
   router2.post('/authenticate', function(req, res){
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
      
 
router2.put('/:id', function(req, res){
     var patient = {
        username: req.body.username,
          name: {
            firstName: req.body.name.firstName,
            middleName: req.body.name.middleName,
            lastName: req.body.name.lastName
            },
    
        password: req.body.password,   
        gender: req.body.gender,
        dob: req.body.dob,
       address: {
                line1: req.body.address.line1,
                line2: req.body.address.line2,
                city: req.body.address.city,
                district: req.body.address.district,
                state: req.body.address.state,
                pinCode: req.body.address.pincode, 
                country: req.body.address.country
                
                }, 
    
        occupation: req.body.occupation,
    
        patient_Details: {
                    patient_height: req.body.patient_Details.patient_height,
                    patient_weight: req.body.patient_Details.patient_weight,
                    patient_maritaiStatus: req.body.patient_Details.patient_maritaiStatus,
                    patient_Smoking_status: req.body.patient_Details.patient_Smoking_status,
                    patient_Drinking_status: req.body.patient_Details.patient_Drinking_status,
                    patient_allergy: req.body.patient_Details.patient_allergy,
                    patient_history: req.body.patient_Details.patient_history
                  },
                  
        responsible_person: {
                               rname: req.body.responsible_person.rname,
                               number: req.body.responsible_person.number,
                               relation: req.body.responsible_person.relation,
                               raddress: req.body.responsible_person.raddress
                            } 
                            
     };
    var opts = { strict: false };
    Patient.update({_id: mongojs.ObjectId(req.params.id)}, patient, opts, function(error) {
      
      res.json({error: error});
    });

});


return router2; 
};


