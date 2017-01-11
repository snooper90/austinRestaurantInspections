// Remove line 1 from inspection csv
"use strict"
const fs = require('fs')
const Restaurant = require('../models/restaurant');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONN_FOOD_SAFTY);

fs.readFile('Restaurant_Inspection_Scores.csv', 'utf8', function (err,data) {
  // Prepair the data by putting it into a sorted array
  let prepairedData = prepairData(data)

  // Combine the arrays into a shorter array
  let reducedArray = reduceArray(prepairedData);

  // Save to database
  saveToDatabase(reducedArray);

  // Disconnect from DB
  mongoose.disconnect()
});


function prepairData(data){
  console.log("Sorting data...");
  // Remove /n and replace with a comma
  let cleanData = data.replace(/\n/g, ",");
  // Seperate data by comma while ignoring commas in quotation marks
  let arrayOfData = cleanData.match(/(".*?"|[^\s",][^",]+[^\s",]|[0-9]{1,2})(?=\s*,|\s*$)(\n*)/g);
  let splitArrayOfData = [];

  // Loop through the array of data and seperate it into each individual inspection
  while(arrayOfData.length) {
    splitArrayOfData.push(arrayOfData.splice(0,7));
  }
  // Sort the data by the id
  splitArrayOfData.sort(sortFunction);
  return splitArrayOfData;
}

function reduceArray(array) {
  console.log("Reducing array...");
  let reducedArray = [];
  let previousId;
  let currentReducedIndex = -1;
  for( var i = 0; i < array.length; i++){
    let currentId = array[i][5];
    let score = array[i][3];
    let description = array[i][6]
    let date = array[i][2]
    // Check if current id is equal to previous id
    if (currentId != previousId){
      // If it is not the same as the previous id create a new array and insert it into the reducedArray
      let name = array[i][0];
      let zip = array[i][1];
      // Remove the quotation marks
      let locationInfo = array[i][4]
      let address = locationInfo.substring(1, locationInfo.indexOf(',('));
      let coordinates = locationInfo.substring(locationInfo.indexOf(',(') + 2, locationInfo.length-2);
      reducedArray.push([currentId, name, address, zip, coordinates, [[score, description, date]]]);
      // Increase current index
      currentReducedIndex++;
      // Set the previousId to equal the current id
      previousId = currentId;
    }else{
      // Add the information about the visit
      reducedArray[currentReducedIndex][5].push([ score, description, date]);
    };
  };
  return reducedArray
}

function saveToDatabase(array){
  console.log("Saving to database...");
  // Loop through array
   for( var i = 0; i < array.length ; i ++){
  // Create the restaurant
   let restaurant = new Restaurant({
      _id: array[i][0],
      name: array[i][1],
      location: array[i][2],
      zipCode: array[i][3],
      coordinates: array[i][4],
      inspections: array[i][5]
    });
    // Save the restaurant
    restaurant.save();
   }
}

function sortFunction(a, b) {
    if (a[5] === b[5]) {
        return 0;
    }
    else {
        return (a[5] < b[5]) ? -1 : 1;
    }
}
