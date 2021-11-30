import filmTpl from '../../templates/film.hbs';
import refs from './refs';
import Modal from './modal';

const data = {
  poster: 'https://cdn.pixabay.com/photo/2021/10/27/19/09/cat-6748193_960_720.jpg',
  title: 'Avengers: Infinity War',
  vote: '8.3',
  votes: '3021',
  popularity: '86',
  originalTitle: 'Avengers: Infinity War of King',
  genre: 'Horror, Drama, Musical',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto, autem fugit illo numquam omnis perferendis quos sequi! Alias commodi dolor esse exercitationem iste laudantium minima nemo, neque placeat porro possimus, soluta sunt ullam vero voluptatem? A, ab alias eaque fugiat impedit iure, laudantium, nam quae qui quo recusandae sed.',
};

const modal = new Modal(filmTpl);

const onClickGallery = e => {
  if (e.target.closest('.card')) {
    modal.renderAndShow(data);
  }
};

refs.trendMovies.addEventListener('click', onClickGallery);
