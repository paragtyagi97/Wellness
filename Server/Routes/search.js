

var express = require('express');
var mongojs = require('mongojs');
var collection = require('../models/doctor');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var Router = express.Router();

module.exports = function(router){

router.post('/doctordata',function(req,res){
       var search = {
          City: req.body.City,
          Gender: req.body.Gender,
          Speciality: req.body.Speciality, 
          _id: req.body._id
       };
     // console.log(req.params.id);
      collection.findOne({_id: req.body._id},search,function(err, doc)
      {
         if (doc){
             console.log(doc);
             res.json({sucess: true, model: doc});
         } else {
             console.log('not found');
             res.json({sucess: false, message: "not found"});
         }
     


  });
  });

return router;
}
