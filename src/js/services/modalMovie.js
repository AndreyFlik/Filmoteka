import movieTpl from '../../templates/film.hbs';
import trailerTpl from '../../templates/trailer.hbs';
import refs from './refs';
import Modal from './modal';
import { fetchMovieById } from './apiService';
import emptyImg from '../../images/not_found.jpg';
import sprite from '../../images/sprite.svg';
import addClass from './localStorage';

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TRAILER_BASE_URL = 'https://www.youtube.com/embed/';
const iconYoutube = sprite + '#icon-youtube';
const modal = new Modal(movieTpl);

const onClickGallery = e => {
  const card = e.target.closest('.card');

  if (!card) return;

  renderModalFilm(card.dataset.id).catch(err => console.log(err));
};

const renderModalFilm = async id => {
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
    videos,
  } = await fetchMovieById(id);

  const poster = poster_path ? POSTER_BASE_URL + poster_path : emptyImg;
  const trailer = videos.results[0].key;
  const genre = genres.map(item => item.name).join(', ');
  const year = new Date(release_date).getFullYear();

  const movieData = {
    id,
    poster,
    iconYoutube,
    trailer,
    title,
    vote: vote_average,
    votes: vote_count,
    popularity,
    originalTitle: original_title,
    genre,
    year,
    overview,
  };

  modal.setTemplate(movieTpl);
  modal.render(movieData);
  modal.show();
  addClass();

  const btnPlay = document.querySelector('.modal .film__play');
  btnPlay.addEventListener('click', onClickPlay);
};

const renderModalTrailer = async id => {
  const { videos } = await fetchMovieById(id);
  const path = TRAILER_BASE_URL + videos.results[0].key;

  modal.setTemplate(trailerTpl);
  modal.render({ path });
};

const onClickPlay = e => {
  const film = e.target.closest('.film');
  const id = film.dataset.id;
  renderModalTrailer(id).catch(err => console.log(err));
};

refs.trendMovies.addEventListener('click', onClickGallery);
refs.watched.addEventListener('click', onClickGallery);
refs.queue.addEventListener('click', onClickGallery);

function galleryWatched() {
  refs.watched.classList.remove('is-hidden');
  refs.queue.classList.add('is-hidden');
}

function galleryQueue() {
  refs.watched.classList.add('is-hidden');
  refs.queue.classList.remove('is-hidden');
}

refs.libraryLink.addEventListener('click', galleryWatched);
refs.watchedBtn.addEventListener('click', galleryWatched);
refs.queueBtn.addEventListener('click', galleryQueue);
