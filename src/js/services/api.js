import 'js-loading-overlay';
import { renderMovies } from './markupMovies';

const BASE_URL = 'https://api.themoviedb.org/3/';

const API = '1db5479ca98fac1ae129bcbe15cc6182';
const getMovies = (page = 1) => {
  const queryParams = new URLSearchParams({
    api_key: API,
    page: page,
  });
  return fetch(`${BASE_URL}trending/movie/week?${queryParams}`)
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(new Error('Something went wrong'));
    })
    .then(data => {
      renderMovies(data.results);
      return data;
    })
    .catch(err => handleError(err));
};

const handleError = err => {
  console.log(err);
};
// // =================================================

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

const seachMovies = async (query, page = 1) => {
  JsLoadingOverlay.show(configs);
  const seachParams = new URLSearchParams({
    api_key: API,
    page: page,
  });
  const response = await fetch(`${BASE_URL}search/movie?${seachParams}&query=${query}`).then(
    res => {
      if (res.ok) return res.json();
      return Promise.reject(new Error('Something went wrong'));
    },
  );
  JsLoadingOverlay.hide();
  return response;
};

// ==============================
export { getMovies, seachMovies };
