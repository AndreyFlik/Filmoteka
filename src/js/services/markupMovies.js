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
        const normalizedGenres = genresArr.reduce(
          (acc, { id, name }) => ({ ...acc, [id]: name }),
          {},
        );
        if (genresOfMovie.length > 2) genresOfMovie.splice(2, genresOfMovie.length - 1);
        genresOfMovie = genre_ids.map(id => normalizedGenres[id]).join(', ');
      } else {
        const genresInSearch = genre_ids.split(', ');
        genresOfMovie =
          genresInSearch.length > 2 ? [genresInSearch[0], genresInSearch[1]].join(', ') : genre_ids;
      }

      return cardTpl({ title, poster, vote_average, genresOfMovie, releaseYear, id });
    })
    .join('');
};
const renderMovies = data => {
  refs.trendMovies.innerHTML = makeMoviesMarkup(data);
};

export { makeMoviesMarkup, renderMovies };
