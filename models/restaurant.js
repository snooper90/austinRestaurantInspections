const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const RestaurantSchema = new Schema({
  name: String,
  location: String,
  raiting: Array
  created:
},
{
  timestamps: true
});

const Restaurant = mongoose.model('restaurant', RestaurantSchema);

module.exports = Restaurant;