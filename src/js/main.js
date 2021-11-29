import './services/localStorage';

import './header';
import './footer';
import makeMoviesMarkup from './services/markupMovies';
import { getMovies } from './services/api';
import cardTpl from '../templates/card.hbs';
import './services/modalFilm';
import startPagination from './services/tuiPagination';
import './scrollUp';

getMovies().then(data => {
  startPagination(data.total_results);
});
