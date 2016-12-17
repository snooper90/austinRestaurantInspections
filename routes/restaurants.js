"use strict"

const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');


/* GET all of the restaurants */
router.get('/', function(req, res, next) {
  Restaurant.find({},
    function(err, restaurants){
      res.send(restaurants);
    }
  );
});

/* GET individual restaurants */
router.get('/:id', function(req, res, next) {
  //res.render('restaurant')
});

/* POST individual restaurant */
router.post('/', function(req, res, next) {

  const name = req.body.name;
  const raitings = req.body.raitings;
  const location = req.body.location;
  let restaurant = new Restaurant(
    {
      name:name,
      raitings:raitings,
      location:location
    }
  );
  res.send(restaurant);
  //resturant.save()

});

module.exports = router;
