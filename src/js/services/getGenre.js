const BASE_GENRE_URL =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=1db5479ca98fac1ae129bcbe15cc6182';

const fetchGenre = () => {
  return fetch(BASE_GENRE_URL).then(res => res.json());
};
let genres = [];
fetchGenre().then(data => genres.push(...data.genres));

export default genres;
