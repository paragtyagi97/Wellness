
var express = require('express');
var mongojs = require('mongojs');
var collection = require('../models/doctor');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var Router = express.Router();

module.exports = function(router){

router.get('/doctor/:id',function(req,res){
  db.collection("doctor",function(err,collection)
  {
      console.log(req.params.id);
      collection.findOne({_City: req.params.City},function(err, doc)
      {
         if (doc){
             console.log(doc._City);
         } else {
             console.log('City not found');
         }
     });

     collection.findOne({_Gender: req.params.Gender},function(err, doc)
     {
        if (doc){
            console.log(doc._Gender);
        } else {
            console.log('Gender not found');
        }
    });

    collection.findOne({_Speciality: req.params.Speciality},function(err, doc)
    {
       if (doc){
           console.log(doc._Speciality);
       } else {
           console.log('speciality not found');
       }
   });


  });
  });

return Router;
}
