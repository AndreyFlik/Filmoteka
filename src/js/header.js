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

function homeInputHeader() {
  refs.inputLink.classList.remove('is-hidden');
  refs.buttonsLink.classList.add('is-hidden');
  refs.homeLink.classList.add('navigation__link--active');
  refs.libraryLink.classList.remove('navigation__link--active');
  refs.headerRefs.classList.remove('bg-library');
  refs.logoTextRefs.classList.remove('is-hidden');
  refs.trendMovies.classList.remove('is-hidden');
  refs.paginationRefs.classList.remove('is-hidden');
}

function homeLibraryHeader() {
  refs.buttonsLink.classList.remove('is-hidden');
  refs.inputLink.classList.add('is-hidden');
  refs.homeLink.classList.remove('navigation__link--active');
  refs.libraryLink.classList.add('navigation__link--active');
  refs.headerRefs.classList.add('bg-library');
  refs.logoTextRefs.classList.add('is-hidden');
  refs.trendMovies.classList.add('is-hidden');
  refs.paginationRefs.classList.add('is-hidden');
}

function openQueue() {
  refs.queueBtn.classList.add('accent-color');
  refs.watchedBtn.classList.remove('accent-color');
}

function openWatched() {
  refs.queueBtn.classList.remove('accent-color');
  refs.watchedBtn.classList.add('accent-color');
}

refs.homeLink.addEventListener('click', homeInputHeader);
refs.libraryLink.addEventListener('click', homeLibraryHeader);

refs.queueBtn.addEventListener('click', openQueue);
refs.watchedBtn.addEventListener('click', openWatched);
