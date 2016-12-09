var express = require('express');
var router = express.Router();

// pull in model for restaurant
// Restaurant = require('../models/restauraunt');


/* GET all of the restaurants */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET individual restaurants */
router.get('/:id', function(req, res, next) {
  //res.render('restaurant')
});

module.exports = router;
