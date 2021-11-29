import fetchMovies from './api';
import renderMovies from './markupMovies';
import startPagination from './tuiPagination';
const getMovies = (page = 1) => {
  return fetchMovies(page)
    .then(data => {
      renderMovies(data.results);
      return data;
    })
    .catch(err => handleError(err));
};

const handleError = err => {
  console.log(err);
};

export default getMovies;
