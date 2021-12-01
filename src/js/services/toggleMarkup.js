import cardTpl from '../../templates/card.hbs';
import cardTplExtended from '../../templates/card-extended.hbs';
import { currentResults } from './apiService';
import { renderMovies } from './markupMovies';

const toggleMarkup = document.querySelector('.toggleMarkup');
const galleryList = document.querySelector('.gallery-list');

let finalMarkup = null;
const Markup = {
  GRID: 'grid-markup',
  LIST: 'list-markup',
};

function changeMarkup() {
  toggleMarkup.classList.toggle('active');
  if (toggleMarkup.classList.contains('active')) {
    finalMarkup = cardTplExtended; //сначала разметка
    replaceMarkup(Markup.GRID, Markup.LIST); //после замена класса
  } else {
    finalMarkup = cardTpl;
    replaceMarkup(Markup.LIST, Markup.GRID);
  }
}

function replaceMarkup(oldMarkup, newMarkup) {
  galleryList.classList.add(newMarkup);
  galleryList.classList.remove(oldMarkup);
  localStorage.setItem('markup', newMarkup);
  renderMovies(currentResults);
}

const localStorageMarkup = localStorage.getItem('markup', Markup.GRID);
if (localStorageMarkup === Markup.LIST) {
  toggleMarkup.classList.toggle('active');
  galleryList.classList.add(Markup.LIST);
  finalMarkup = cardTplExtended;
} else {
  galleryList.classList.add(Markup.GRID);
  finalMarkup = cardTpl;
}

toggleMarkup.addEventListener('click', changeMarkup);

export { finalMarkup };

// console.log(window.innerWidth); - проверка для отрисовки переключателя
