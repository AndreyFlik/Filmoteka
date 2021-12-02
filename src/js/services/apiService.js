import 'js-loading-overlay';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '1db5479ca98fac1ae129bcbe15cc6182';

const configs = {
  overlayBackgroundColor: '#666666',
  overlayOpacity: '0.1',
  spinnerIcon: 'ball-circus',
  spinnerColor: '#000',
  spinnerSize: '3x',
  overlayIDName: 'overlay',
  spinnerIDName: 'spinner',
  offsetY: 0,
  offsetX: 0,
  lockScroll: true,
  containerID: null,
};

let normalizedGenres = {};
let url = '';

let searchMovies = `${BASE_URL}/search/movie`;
let trendMovies = `${BASE_URL}/trending/movie/week`;
let currentResults = [];

const fetchGenre = async () => {
  JsLoadingOverlay.show(configs);
  url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json(); //[{}, {}, ..., {}]
  JsLoadingOverlay.hide();
  normalizedGenres = data.genres.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {});
};

const fetchMovies = async (page = 1, query) => {
  if (query) {
    // JsLoadingOverlay.show(configs);
    url = `${searchMovies}?api_key=${API_KEY}&query=${query}&page=${page}`;
  } else {
    // JsLoadingOverlay.show(configs);
    url = `${trendMovies}?api_key=${API_KEY}&page=${page}`;
  }
  JsLoadingOverlay.show(configs);
  const response = await fetch(url);
  const data = await response.json(); // Получаем объект c полем results: [{}, {}, ..., {}]

  data.results = data.results.map(movie => {
    return {
      ...movie,
      genres: movie.genre_ids
        .slice(0, 2)
        .map(id => normalizedGenres[id] || '')
        .filter(name => name)
        .join(', '),
    };
  });
  JsLoadingOverlay.hide();
  currentResults = data.results;
  return data;
};

const fetchMovieById = async id => {
  JsLoadingOverlay.show(configs);
  url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
  https: try {
    const response = await fetch(url);
    const movie = await response.json();
    url = '';
    JsLoadingOverlay.hide();

    return movie;
  } catch (error) {
    console.log(error);
  }
};

export { fetchGenre, normalizedGenres, fetchMovies, fetchMovieById, currentResults };
