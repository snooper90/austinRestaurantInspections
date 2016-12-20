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
  // Query database to find all restaurants that meet the searchParams
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
  //gather information for new restaurant
  let name = req.body.name;
  let raitings = req.body.raitings;
  let location = req.body.location;
  //Create a new restaurant object
  let restaurant = new Restaurant(
    {
      name:name,
      raitings:raitings,
      location:location
    }
  );
  // Check if record already exists
  
  //save the restaurant
  restaurant.save(function(err, savedResturant){
    if ( err ){
      console.log('====================================');
      console.log('Saving restaurant during update error: ' + error);
      console.log('====================================');
    }else{
      //
      res.redirect('/restaurants/' + savedResturant._id)
    }
  })
});


/* Update individual restaurant (only updateing the reviews) */

router.put('/:id', function(req, res, next){
  restaurantId = req.params._id;
  //gather data to be changed
  let raitings =  req.body.raitings;
  //find restaurant to be updated
  Restaurant.findById(restaurantId, function(err, restaurant){
    if ( err ) {
      console.log('====================================');
      console.log('Finding restaurant during update err: ' + err);
      console.log('====================================');
    }else{
      //
      restaurant.raitings = raitings;
      restaurant.save(function(error, updatedRestaurant){
        if ( error ){
          console.log('====================================');
          console.log('Saving restaurant during update error: ' + error);
          console.log('====================================');
        }else{
          console.log('success updating restaurant with _id : ' + updatedRestaurant._id);
          res.redirect('/restaurants/' + updatedRestaurant._id)
        }
      });
    }
  })
});

/* Delete individual restaurant (Not currently needed) */

// router.delete('/:id', function(req, res, next){
//
// });

module.exports = router;
