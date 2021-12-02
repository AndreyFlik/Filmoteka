import emptyImg from '../../images/not_found.jpg';
import refs from './refs';
import { normalizedGenres } from './apiService';
import { finalMarkup } from './toggleMarkup';
import normolixeText from './normolizeText';

const makeMoviesMarkup = movies => {
  return movies
    .map(
      ({
        title,
        poster_path,
        vote_average,
        genre_ids,
        release_date,
        id,
        overview,
        original_title,
        vote_count,
        popularity,
      }) => {
        const releaseYear = new Date(release_date).getFullYear();
        let poster = emptyImg;
        let genresOfMovie = genre_ids;
        if (poster_path) {
          poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
        }
        if (Array.isArray(genresOfMovie)) {
          if (genresOfMovie.length > 2) genresOfMovie.splice(2, genresOfMovie.length - 1);
          genresOfMovie = genre_ids.map(id => normalizedGenres[id]).join(', ');
        } else {
          const genresInSearch = genre_ids.split(', ');
          genresOfMovie =
            genresInSearch.length > 2
              ? [genresInSearch[0], genresInSearch[1]].join(', ')
              : genre_ids;
        }

        return finalMarkup({
          title,
          poster,
          vote_average,
          genresOfMovie,
          releaseYear,
          id,
          overview: normolixeText(overview),
          original_title,
          vote_count,
          popularity,
        });
      },
    )
    .join('');
};
const renderMovies = data => {
  refs.trendMovies.innerHTML = makeMoviesMarkup(data);
};

export { makeMoviesMarkup, renderMovies };
