import filmTpl from '../../templates/film.hbs';
import refs from './refs';

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

const onClickCard = e => {
  const card = e.target.closest('.card');

  if (!card) {
    return;
  }

  refs.modalContent.innerHTML = filmTpl(data);
  refs.modalBackdrop.classList.remove('is-hidden');
};

const onClickClose = () => {
  refs.modalBackdrop.classList.add('is-hidden');
};

const onClickBackdrop = e => {
  const isClickBackdrop = e.target === e.currentTarget;
  const isClickContainer = e.target.parentElement === e.currentTarget;

  if (isClickBackdrop || isClickContainer) {
    onClickClose();
  }
};

refs.trendMovies.addEventListener('click', onClickCard);
refs.modalBtnClose.addEventListener('click', onClickClose);
refs.modalBackdrop.addEventListener('click', onClickBackdrop);
