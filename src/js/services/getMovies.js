import fetchMovies from './api';
import renderMovies from './markupMovies';
const getMovies = () => {
  fetchMovies()
    .then(data => {
      renderMovies(data.results);
    })
    .catch(err => handleError(err));
};

const handleError = err => {
  console.log(err);
};

export default getMovies;
