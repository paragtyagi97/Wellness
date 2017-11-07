var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');
var router = express.Router();
var doctorRouter = express.Router();
var appointmentRouter = express.Router();
var patientRouter = express.Router();
var prescriptionRouter = express.Router();
var doctorRoutes = require('./Server/Routes/doctor')(doctorRouter);
var appointmentRoutes = require('./Server/Routes/appointment')(appointmentRouter);
var patientRoutes = require('./Server/Routes/patient')(patientRouter);
var prescriptionRoutes = require('./Server/Routes/prescription')(prescriptionRouter);

var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/Public'));
app.use('/api/patients',patientRoutes);
app.use('/api/doctors',doctorRoutes);
app.use('/api/appointments',appointmentRoutes);
app.use('/api/prescription', prescriptionRoutes);


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/page', function(err){
    if (err) {
        console.log('Not connected to the DB: ' + err);
    } else {
        console.log('Succesfully connected to MongoDB');
    }
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/Public/app/view/index.html'));
});


app.listen(port, function(){
    console.log('running the server on port' + port);

});

