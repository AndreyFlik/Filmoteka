const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';
const API = '1db5479ca98fac1ae129bcbe15cc6182';

let page = 1;
const queryParams = new URLSearchParams({
  api_key: API,
  page: page,
});

const fetchMovies = () => {
  return fetch(`${BASE_URL}?${queryParams}`).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(new Error('Something went wrong'));
  });
};

export default fetchMovies;
