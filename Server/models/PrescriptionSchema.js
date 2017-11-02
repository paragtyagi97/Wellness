var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var historySchema = new Schema({
	Personal_History : {type : String, required : true },
	Family_History : {type : String, required : true }, 
				});
var vitalsSchema = new Schema({
	Systolic : {type : String, required : true },
	Diastolic : {type : String, required : true },
	Pulse : {type : String, required : true },
	Weight : {type : String, required : true },
	RespiratoryRate : {type : String, required : true },
	Temperature : {type : String, required : true },
	spO2 : {type : String, required : true },
	Blood_Glucose : {type : String, required : true },
				});
var ImmunizationSchema = new Schema({
	Name : {type : String, required : true },
	SNOMEDid : {type : String, required : true },
			});
var LabTestSchema = new Schema({
	Name : {type : String, required : true },
	Type : {type : String, required : true },
			});
var ProcedureSchema = new Schema({
	Name : {type : String, required : true },
	SNOMEDid : {type : String, required : true },
			});




var DandASchema = new Schema({
	Examination :{type : String },
	Problem_Diagnosis : {type : String, required : true },
	OtherAdvice : {type : String},
	Add_Immunization : {type : String },
	Add_LabTest : {type : String },
	Add_Procedure : {type : String },

});
var AllergySchema = new Schema ({
	Problem_Name : {type : String, required : true },
	Diagnosis_Date : {type : String, required : true },
	Diagnosis_By : {type : String, required : true },
	Notes : {type : String, required : true },
});


var MedicationSchema = new Schema({
	Date : {type : String, required : true },
	Medicine_Name : {type : String, required : true },
	Dosage : {type : String, required : true },
	Frequency_taken : {type : String, required : true },
	Strength : {type : String, required : true },
	Type : {type : String, required : true },


	});





 
    var PrescriptionSchema = new Schema({
        History : historySchema,
        Vitals : vitalsSchema,
        DiagnosisandAdvice : DandASchema,
        Allergies : AllergySchema,
        Medication : MedicationSchema,
        });
    

module.exports = mongoose.model('Prescription',PrescriptionSchema);
	
 

	
