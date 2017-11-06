var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');
var router = express.Router();
var router0 = express.Router();
var router1 = express.Router();
var router2 = express.Router();
var appRoutes1 = require('./Server/Routes/doctorRoute')(router0);
var spareRoutes1 = require('./Server/Routes/appointment')(route1);
var patientRoutes = require('./Server/Routes/patient')(router2);
var appRoutes = require('./Server/Routes/prescription')(router);
var spareRoutes = require('./Server/Routes/doctor')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/Public'));
app.use('/patients',patientRoutes);
app.use('/api/doctor',appRoutes1);
app.use('/api/appointments',spareRoutes1);
app.use('/routes/prescription', appRoutes);
app.use('/routes/doctor',spareRoutes);

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

