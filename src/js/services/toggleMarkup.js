import cardTpl from '../../templates/card.hbs';
import cardTplExtended from '../../templates/card-extended.hbs';
import { currentResults } from './apiService';
import { renderMovies } from './markupMovies';
import refs from './refs';

let finalMarkup = null;
const Markup = {
  GRID: 'grid-markup',
  LIST: 'list-markup',
};

function changeMarkup() {
  refs.toggleMarkup.classList.toggle('active');
  if (refs.toggleMarkup.classList.contains('active')) {
    finalMarkup = cardTplExtended; //сначала разметка
    replaceMarkup(Markup.GRID, Markup.LIST); //после замена класса
  } else {
    finalMarkup = cardTpl;
    replaceMarkup(Markup.LIST, Markup.GRID);
  }
}

function replaceMarkup(oldMarkup, newMarkup) {
  refs.trendMovies.classList.add(newMarkup);
  refs.trendMovies.classList.remove(oldMarkup);
  localStorage.setItem('markup', newMarkup);
  renderMovies(currentResults);
}

const localStorageMarkup = localStorage.getItem('markup', Markup.GRID);
if (localStorageMarkup === Markup.LIST) {
  refs.toggleMarkup.classList.toggle('active');
  refs.trendMovies.classList.add(Markup.LIST);
  finalMarkup = cardTplExtended;
} else {
  refs.trendMovies.classList.add(Markup.GRID);
  finalMarkup = cardTpl;
}

if (window.innerWidth < 768) finalMarkup = cardTpl;

const changeFinalMarkup = markupFunc => {
  finalMarkup = markupFunc;
};

refs.toggleMarkup.addEventListener('click', changeMarkup);

export { finalMarkup, changeFinalMarkup };
