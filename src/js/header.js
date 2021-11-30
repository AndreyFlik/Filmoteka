// import { seachMovies } from './services/api';
import refs from './services/refs.js';
import renderMovies from './services/markupMovies';
// import { getMovies } from './services/api';
import { fetchMovies } from './services/apiService';
import startPagination from './services/tuiPagination';
const debounce = require('lodash.debounce');

const ERROR_NOT_FOUND = 'Search result not successful. Enter the correct movie name.';

refs.inputMovies.addEventListener('input', debounce(getInputMovies, 1000));
const startPage = 1;

function getInputMovies(event) {
  if (!event.target.value.length) {
    refs.searchProblemAlarm.classList.add('visually-hidden', 'is-hidden');
    return fetchMovies().then(data => {
      startPagination(data.total_results);
      renderMovies(data.results);
    });
    // return getMovies();
  }
  // return seachMovies(event.target.value)
  return fetchMovies(startPage, event.target.value)
    .then(respons => {
      if (respons.total_results === 0) {
        refs.searchProblemAlarm.classList.remove('visually-hidden', 'is-hidden');
        return Promise.reject(new Error(ERROR_NOT_FOUND));
      } else {
        refs.searchProblemAlarm.classList.add('visually-hidden', 'is-hidden');
        return respons;
      }
    })
    .then(data => {
      startPagination(data.total_results, event.target.value);
      renderMovies(data.results);
    })
    .catch(error => console.log(error.message));
}
