var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var PatientSchema = new Schema({
    username: {type: String},
    name: {
        firstName: {type: String,},
        middleName: {type: String},
        lastName: {type: String}
        },

    password: {type: String},   
    gender: {type: String},
    dob: {type: String},
    contactNumber: {type: Number},
    email: {type: String},

    address: {
            line1: String,
            line2: String,
            city: String,
            district: String,
            state: String,
            pinCode: String, 
            country: String
            
            },

    occupation: String,

    patient_Details: {
                patient_height: String,
                patient_weight: String,
                patient_maritaiStatus: String,
                patient_Smoking_status: String,
                patient_Drinking_status: String,
                patient_allergy: String,
                patient_history: String
              },
              
    responsible_person: {
                           rname: String,
                           number: String,
                           relation: String,
                           raddress: String
                        },
    create_date: { type: Date, default: Date.now } 
                       
    
});

//bcrypt password
PatientSchema.pre('save', function(next){
    var user= this;
    bcrypt.hash(user.password,null,null,function(err, hash){
        if (err) return next(err);
        user.password = hash;
        next();
    });
    });

    PatientSchema.methods.comparePassword = function(password){
        return bcrypt.compareSync(password, this.password);
    };    

module.exports = mongoose.model('Patient', PatientSchema);