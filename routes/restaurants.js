"use strict"
/*  Requirements  */
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

/*  Middleware  */
// test id 584b0311734d1d55b6dc3ff9
// router.param('id', function (req, res, next, id) {
//   console.log("test for params is working: " + id)
//   next();
// });

/*  Routes */

/* GET all of the restaurants */
router.get('/', function(req, res, next) {
  let query = req.query;
  var searchParams = {};
  // Check if there is a query string
  if(Object.keys(query).length){
    searchParams = query;
  }
  Restaurant.find( searchParams,
    function(err, restaurants){
      res.send(restaurants);
    }
  );
});

/* GET individual restaurants */
router.get('/:id', function(req, res, next) {
  let restId = req.params.id;

  // MongoDB uses _id for primary key
  Restaurant.find({ _id: restId }, function(err, restaurant ){
    res.send(restaurant)
  });
  //res.render('restaurant', {restaurant})
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
