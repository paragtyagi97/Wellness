var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var DoctorSchema = new Schema({
    username: {type: String, lowercase: true, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, lowercase: true, unique: true},
    doctor_id: {type: String, required: true},
    contact_number: {type: String, unique: true},
    doctor_qualification: {type: String},
    experience: [{
                 from: {type: String},
                 to: {type: String},
                 hospital: {type: String},
                 post: {type: String},
                 description: {type: String},
                 active  : {type: Boolean, default: false}
                }]
});

DoctorSchema.pre('save', function(next){
var user= this;
bcrypt.hash(user.password,null,null,function(err, hash){
    if (err) return next(err);
    user.password = hash;
    next();
});
});

DoctorSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};






module.exports = mongoose.model('Doctor', DoctorSchema);
