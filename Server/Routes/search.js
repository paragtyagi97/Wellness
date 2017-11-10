

var express = require('express');
var mongojs = require('mongojs');
var Doctor = require('../models/doctor');
var mongo = require('mongodb');
var mongoose = require('mongoose');


module.exports = function(router){

router.post('/doctordata',function(req,res){

    if (req.body.City&&req.body.Gender&&req.body.Speciality)
     {  
        var query = {
                   City: req.body.City,
                   Gender: req.body.Gender,
                   Speciality: req.body.Speciality
                     };
        
        }
    
     if(req.body.City){
         var query ={ City: req.body.City};
     }
     if(req.body.Speciality) {
      var query = {
          Speciality: req.body.Speciality
          
       };

      }
       if(req.body.Gender) {
          var query = {
              Gender: req.body.Gender
             
           };
        }


    Doctor.findOne(query,function(err, result) {
      if (err) throw err;
      res.json({sucess:true, result: result});
      
    });


     
  });

return router;
}
