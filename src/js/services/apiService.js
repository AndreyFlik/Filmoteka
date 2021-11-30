const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '1db5479ca98fac1ae129bcbe15cc6182';

let genresArr = [];
let url = '';

let searchMovies = `${BASE_URL}/search/movie`;
let trendMovies = `${BASE_URL}/trending/movie/week`;

const fetchGenre = async () => {
  url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json(); //[{}, {}, ..., {}]

  genresArr = data.genres;
};

const fetchMovies = async (page = 1, query) => {
  if (query) {
    url = `${searchMovies}?api_key=${API_KEY}&query=${query}&page=${page}`;
  } else {
    url = `${trendMovies}?api_key=${API_KEY}&page=${page}`;
  }
  const response = await fetch(url);
  const data = await response.json(); // Получаем объект c полем results: [{}, {}, ..., {}]
  // ["названия жарнов", ""]
  data.results = data.results.map(movie => {
    return {
      ...movie,
      genres: movie.genre_ids
        .slice(0, 2)
        .map(id => {
          const movieGenre = genresArr.find(genre => genre.id === id);
          return movieGenre?.name || '';
        })
        .join(', '),
    };
  });
  return data;
};

const fetchMovieById = async id => {
  url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const movie = await response.json();
    url = '';

    return movie;
  } catch (error) {
    console.log(error);
  }
};

export { fetchGenre, genresArr, fetchMovies, fetchMovieById };
