import 'js-loading-overlay';

const BASE_SEACH_URL = 'https://api.themoviedb.org/3/search/movie';
const API = '1db5479ca98fac1ae129bcbe15cc6182';

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
  const response = await fetch(`${BASE_SEACH_URL}?${seachParams}&query=${query}`).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(new Error('Something went wrong'));
  });
  JsLoadingOverlay.hide();
  return response;
};

export default seachMovies;
