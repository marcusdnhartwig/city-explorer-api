'use strict';
console.log('Our first server');

// REQUIRE
// In our servers, we have to use 'require' instead of import. Here we will list the requirements for server
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const weatherData = require('./data/weather.json');
const { request, response } = require('express');
require('dotenv').config();

console.log(weatherData);

// USE
// we must include cors if we want to share reessourcess over the web
const app = express();
app.use(cors());

// define PORT and validate that my .env file is working
const PORT = process.env.PORT || 3002;

// ROUTES
// We will write our endpoints here
// app.get() correlates to axios.get
app.get('/weather', async (request, response, next) => {
  try {
    let city = request.query.city;
    let url = (`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=US&key=${process.env.WEATHER_API_KEY}`);
    let cityWeather = await axios.get(url);
    let weatherDisplay = [];

    cityWeather.data.data.forEach(date => {
      let forcast = new Forcast(date);
      weatherDisplay.push(forcast);
    });
    response.send(weatherDisplay);
  } catch (error) {
    next(error);
  }
});

app.get('/movies', async (request, response, next) => {
  try {
    let city = request.query.city;
    // console.log(city);
    let url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`);
    console.log(url);
    let cityMovie = await axios.get(url);
    let movieDisplay = [];
    console.log(cityMovie.data.results);

    cityMovie.data.results.forEach(title => {
      let movie = new Movie(title);
      movieDisplay.push(movie);
    });
    response.send(movieDisplay);
  } catch (error) {
    next(error);
  }
});

//ERRORS
//Handle Errors
app.get('*', (request, response) =>{
  response.send('All the 404s');
});
app.use((error, request, response, next)=>{
  if (error) {
    response.status(500).send(error.message);
  } else {
    next(error);
  }
});

// CLASSES
class Forcast {
  constructor(element) {
    this.date = element.datetime;
    this.description = element.weather.description;
  }
}
class Movie {
  constructor(element) {
    this.title = element.title;
    this.description = element.overview;
    this.laguage = element.original_language;
    this.tagline = element.tagline;
    let parsedMovies = [];
    element.results.forEach(movie =>
        
    );
  }
}

// LISTEN
// start the server
// listen is an Express method that takes in a port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

