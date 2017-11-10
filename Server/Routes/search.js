

var express = require('express');
var mongojs = require('mongojs');
var collection = require('../models/doctor');
var mongo = require('mongodb');
var mongoose = require('mongoose');


module.exports = function(router){

router.post('/doctordata',function(req,res){
      if (req.body.City&&req.body.Gender&&req.body.Speciality) {var search = {
          City: req.body.City,
          Gender: req.body.Gender,
          Speciality: req.body.Speciality, 
          _id: req.body._id
       };}
       if(req.body.City){
           var search ={ City: req.body.City, _id: req.body._id};
       }
       if(req.body.Speciality) {
        var search = {
            Speciality: req.body.Speciality, 
            _id: req.body._id
         };

        }
         if(req.body.Gender) {
            var search = {
                Gender: req.body.Gender, 
                _id: req.body._id
             };

       }
     // console.log(req.params.id);
      collection.findOne({_id: req.body._id},search,function(err, doc)
      {
         if (doc){
             console.log(doc);
            // res.json({sucess: true});
         } else {
             console.log('not found');
             res.json({sucess: false, message: "not found"});
         }
     


  });
  });

return router;
}
