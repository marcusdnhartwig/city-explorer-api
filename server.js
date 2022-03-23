'use strict';
//import data from "./data/weather.json"

console.log('Our first server');
// REQUIRE
// In our servers, we have to use 'require' instead of import. Here we will list the requirements for server
const express = require('express');
require('dotenv').config();
const weatherData = require('./data/weather.json');
console.log(weatherData);
// let data = require('./data/pets.json');
// we must include cors if we want to share reessourcess over the web
const cors = require('cors');
const { request, response } = require('express');
const res = require('express/lib/response');
// USE
// Once we have required something, we have to use it. This is where we assigne the required field a variable. React does this in one step with "import." express takes 2 steps: 'require" and 'use.'
const app = express();
app.use(cors());
// define PORT and validate that my .env file is working
const PORT = process.env.PORT || 3002;
// if my server is running on 3002, I know ssomething is wrong with my .env file or how I'm importing the values from it.
// ROUTES
// We will write our endpoints here
// app.get() correlates to axios.get
app.get('/', (request, response) => {
  response.send('hello, from our server!');
  console.log(weatherData);
});

app.get('/weather-data', (request, response) => {
  let searchQuery = request.query;
  console.log(searchQuery);
  // console.log(searchQuery);
  let requestedCity = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.name.toLowerCase());
// response.send(requestedCity);
// response.send(requestedCity.city_name);
// console.log(requestedCity);
let dailyForcast = requestedCity.data.map((currentDay) => {
  return new Forcast(currentDay);
});
response.send(dailyForcast);
console.log('requestedCity:', requestedCity);
});


// Class-Forcast
class Forcast {
  constructor(dailyObj) {
    this.date = dailyObj.valid_date;
    this.description = dailyObj.weather.description;
  }
}




// LISTEN
// start the server
// listen is an Express method that takes in a port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));







