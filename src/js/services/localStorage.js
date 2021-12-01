import refs from './refs';
import { makeMoviesMarkup } from './markupMovies';

const renderLib = (films, list) => {
  if (films.length === 0) {
    list.innerHTML = `<li class='myLib-empty'>Oops... it's empty here. Add some films!</li>`;
    list.classList.add('myLibEmpty');
  } else {
    list.classList.remove('myLibEmpty');
    list.innerHTML = makeMoviesMarkup(films);
  }
};

function addClass() {
  const filmRef = document.querySelector('.film');
  const id = +filmRef?.dataset.id;
  keysWatched.forEach(film => {
    const btnRef = document.querySelector(`div[data-id="${film.id}"] button.film__button--watch`);
    if (film.id === id) {
      btnRef?.classList.add(film.class);
      btnRef.textContent = film.textBtn;
    }
  });
  keysQueue.forEach(film => {
    const btnRef = document.querySelector(`div[data-id="${film.id}"] button.film__button--queue`);
    if (film.id === id) {
      btnRef?.classList.add(film.class);
      btnRef.textContent = film.textBtn;
    }
  });
}

function onLibClick(e) {
  if (
    e.target.classList.contains('header-button-watched') ||
    e.target.classList.contains('library')
  ) {
    refs.trendMovies.innerHTML = '';
    refs.queue.innerHTML = '';
    renderLib(keysWatched, refs.watched);
    addClass();
  } else if (e.target.classList.contains('header-button-queue')) {
    refs.trendMovies.innerHTML = '';
    refs.watched.innerHTML = '';
    renderLib(keysQueue, refs.queue);
    addClass();
  }
}

let keysWatched = [];
const dataWatched = localStorage.getItem('watched');
if (dataWatched) {
  keysWatched = JSON.parse(dataWatched);
}
let keysQueue = [];
const dataQueue = localStorage.getItem('queue');
if (dataQueue) {
  keysQueue = JSON.parse(dataQueue);
}

function addOrRemoveClick(
  e,
  classActive,
  arrayLocalData,
  list,
  key,
  classBtn,
  localText,
  textBtn,
  secondArray,
) {
  if (e.target.tagName !== 'BUTTON' && !e.target.classList.contains('film__button')) return false;

  let data = {};
  const filmRef = e.target.closest('.film');
  const id = +filmRef.dataset.id;

  if (e.target.classList.contains(classActive)) {
    e.target.classList.remove(classActive);
    e.target.textContent = `add to ${localText}`;

    const idx = arrayLocalData.findIndex(film => film.id === id);
    arrayLocalData.splice(idx, 1);

    localStorage.setItem(key, JSON.stringify(arrayLocalData));
    list.querySelector(`li[data-id="${id}"]`)?.remove();
    renderLib(arrayLocalData, list);
  } else if (
    !arrayLocalData.find(film => film.id === id) &&
    e.target.classList.contains(classBtn)
  ) {
    data.id = id;
    data.poster_path = filmRef.querySelector('.film__image').getAttribute('src');
    data.title = filmRef.querySelector('.film__title').textContent;
    data.vote_average = filmRef.querySelector('.film__accent').textContent;
    data.genre_ids = filmRef.querySelector('.film__value--genres').textContent;
    data.release_date = filmRef.querySelector('.film__value--year').textContent;
    data.class = classActive;
    data.text = localText;
    data.textBtn = textBtn;

    arrayLocalData.push(data);
    localStorage.setItem(key, JSON.stringify(arrayLocalData));
    e.target.classList.add(classActive);
    e.target.textContent = data.textBtn;
  }
}

refs.libraryBtns.addEventListener('click', onLibClick);
refs.body.addEventListener('click', () => {
  addOrRemoveClick(
    event,
    'active-watched',
    keysWatched,
    refs.watched,
    'watched',
    'film__button--watch',
    'watched',
    'Remove from watched',
    keysQueue,
  );
});
refs.body.addEventListener('click', () => {
  addOrRemoveClick(
    event,
    'active-queue',
    keysQueue,
    refs.queue,
    'queue',
    'film__button--queue',
    'queue',
    'Remove from queue',
    keysWatched,
  );
});

export default addClass;
