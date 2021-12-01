import cardTpl from '../../templates/card.hbs';
import emptyImg from '../../images/not_found.jpg';
import refs from './refs';
import { genresArr } from './apiService';

const makeMoviesMarkup = movies => {
  return movies
    .map(({ title, poster_path, vote_average, genre_ids, release_date, id }) => {
      const releaseYear = new Date(release_date).getFullYear();
      let poster = emptyImg;
      let genresOfMovie = genre_ids;
      if (poster_path) {
        poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
      }
      if (Array.isArray(genresOfMovie)) {
        const ids = genresOfMovie.map(id => {
          return genresArr.filter(genre => {
            if (genre.id === id) return genre.name;
          });
        });
        if (ids.length > 2) ids.splice(2, ids.length - 1);
        genresOfMovie = ids
          .flatMap(id => id)
          .map(genre => genre.name)
          .join(', ');
      }

      return cardTpl({ title, poster, vote_average, genresOfMovie, releaseYear, id });
    })
    .join('');
};
const renderMovies = data => {
  refs.trendMovies.innerHTML = makeMoviesMarkup(data);
};

export { makeMoviesMarkup, renderMovies };
