import movieTpl from '../../templates/film.hbs';
import refs from './refs';
import Modal from './modal';
import { fetchMovieById } from './apiService';
import emptyImg from '../../images/not_found.jpg';

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const modal = new Modal(movieTpl);

const onClickGallery = e => {
  const card = e.target.closest('.card');

  if (!card) return;

  renderModal(card).catch(err => console.log(err));
};

const renderModal = async card => {
  const id = card.dataset.id;

  const {
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    release_date,
    overview,
  } = await fetchMovieById(id);

  const poster = poster_path ? POSTER_BASE_URL + poster_path : emptyImg;
  const genre = genres.map(item => item.name).join(', ');
  const year = new Date(release_date).getFullYear();

  const movieData = {
    id,
    poster,
    title,
    vote: vote_average,
    votes: vote_count,
    popularity,
    originalTitle: original_title,
    genre,
    year,
    overview,
  };

  modal.renderAndShow(movieData);
};

refs.trendMovies.addEventListener('click', onClickGallery);
