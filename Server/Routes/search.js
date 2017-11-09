var express = require('express');
var mongo = require('mongodb');
var router = express();
var mongoose = require('mongoose');
var searchfilter = require('../models/user');


http://localhost:8080/api/users/

function search(query) 
{
  return function(element)
   {
    for(var searchfilter in query) 
    {
      if(query[searchfilter] != element[searchfilter]) 
      {
        return false;
      }
    }
    return true;
  }
}

exports.search = function(query) {
  return users.filter(search(query));
}

module.exports = function(router){

router.post('/users', function(req, res, next) {
      var user = new searchfilter();
      user.City = req.query.City;
      user.Name = req.query.Name;
      user.Gender = req.query.Gender;
      user.Speciality = req.query.Speciality;
      City = City !== 'undefined' ? parseInt(City) : undefined;
      Name = Name !== 'undefined' ? parseInt(Name) : undefined;
      Gender = Gender !== 'undefined' ? parseInt(Gender) : undefined;
      Speciality = Speciality  !== 'undefined' ? parseInt(Speciality) : undefined;


  res.status(200).json({ users: users.search(City, Name, Gender, Speciality) });
});

router.get('/users', function(req, res, next) {
  return res.json({ users: users.search(req.query) });
});

return router;

};