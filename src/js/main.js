import './services/localStorage';

import './header';
import './footer';
// import makeMoviesMarkup from './services/markupMovies';
import renderMovies from './services/markupMovies';
// import { getMovies } from './services/api';
import cardTpl from '../templates/card.hbs';
import './services/modalFilm';
import startPagination from './services/tuiPagination';
import './scrollUp';
import { fetchGenre, fetchMovies, fetchMovieById } from './services/apiService';

fetchGenre()
  .then(fetchMovies)
  .then(data => {
    renderMovies(data.results);
    startPagination(data.total_results);
  });

// getMovies().then(data => {
//   startPagination(data.total_results);
// });
