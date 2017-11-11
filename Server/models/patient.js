var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');


var PatientSchema = new Schema({
    username: {type: String, unique: true},
    pname: {
        firstName: {type: String,},
        middleName: {type: String},
        lastName: {type: String}
        },

    password: {type: String},   
    gender: {type: String},
    dob: {type: String},
    contactNumber: {type: Number},
    email: {type: String},

    paddress: {
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
                           name: String,
                           number: String,
                           relation: String,
                           address: String
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
    
    PatientSchema.methods.generateJwt = function() {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
      
        return jwt.sign({
          _id: this._id,
          email: this.email,
          username: this.username,
          exp: parseInt(expiry.getTime() / 1000),
        }, "MY_SECRET"); 
      };

module.exports = mongoose.model('Patient', PatientSchema);


module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
};
