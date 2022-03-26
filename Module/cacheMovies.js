'use strict';
const axios = require('axios');
let cache = require('./cache.js');

async function getMovie(request, response) {
  try {
    let city = request.query.city;
    // set up cache key
    let key = 'movie-' + city;
    // console.log(city);
    // check cache for existing data
    if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24 * 7)) {
      console.log('Cache hits: Movie');
      response.status(200).send(cache[key].data);
    } else {
      let url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`);
      //console.log(url);
      let cityMovie = await axios.get(url);
      let movieDisplay = [];
      console.log(cityMovie.data.results);

      cityMovie.data.results.forEach(title => {
        let movie = new Movie(title);
        movieDisplay.push(movie);
      });
      cache[key] = { data: movieDisplay, timestamp: Date.now };
      response.send(movieDisplay);
    }
  } catch (error) {
    response.status(500).send('your movies could not be found');
  }
}
  // if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
  //   console.log('Cache hit');
  // } else {
  //   console.log('Cache miss');
  //   cache[key] = {};
  //   cache[key].timestamp = Date.now();
  //   cache[key].data = axios.get(url)
  //   .then(response => parseMovies(response.data));
  // }

  // return cache[key].data;



  class Movie {
    constructor(element) {
      this.title = element.title;
      this.description = element.overview;
      this.laguage = element.original_language;
      this.tagline = element.tagline;
      this.imageUrl = element.poster_path;
    }
  }

  module.exports = getMovie;
