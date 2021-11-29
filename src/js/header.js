import seachMovies from './services/apiSeach';
import refs from './services/refs.js';
import renderMovies from './services/markupMovies';
import getMovies from './services/getMovies.js';
import startPagination from './services/tuiPagination';

const ERROR_NOT_FOUND = 'Search result not successful. Enter the correct movie name.';

refs.inputMovies.addEventListener('input', getInputMovies);

function getInputMovies(event) {
  if (!event.target.value.length) {
    return getMovies();
  }
  return seachMovies(event.target.value)
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
