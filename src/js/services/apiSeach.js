const BASE_SEACH_URL = 'https://api.themoviedb.org/3/search/movie';
const API = '1db5479ca98fac1ae129bcbe15cc6182';

const seachMovies = (query, page = 1) => {
  const seachParams = new URLSearchParams({
    api_key: API,
    page: page,
  });

  return fetch(`${BASE_SEACH_URL}?${seachParams}&query=${query}`).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(new Error('Something went wrong'));
  });
};

export default seachMovies;
