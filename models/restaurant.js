const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//[facility ID, name, address, [[review score, process description, date]
const RestaurantSchema = new Schema({
  _id: Number,
  name: String,
  location: String,
  zipCode: Number,
  coordinates:String,
  inspections: Array
},
{
   _id: false,
  timestamps: true
});

const Restaurant = mongoose.model('restaurant', RestaurantSchema);

module.exports = Restaurant;
