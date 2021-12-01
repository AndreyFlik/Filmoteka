import './services/localStorage';

import './header';
import './footer';
import { renderMovies } from './services/markupMovies';
import cardTpl from '../templates/card.hbs';
import './services/modalMovie';
import startPagination from './services/tuiPagination';
import './scrollUp';
import { fetchGenre, fetchMovies } from './services/apiService';
import './services/toggleMarkup';

fetchGenre()
  .then(fetchMovies)
  .then(data => {
    renderMovies(data.results);
    startPagination(data.total_results);
  });
