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
router.post('/:id', function(req, res, next) {
  
});

module.exports = router;
