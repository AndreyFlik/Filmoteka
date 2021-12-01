const toggleMarkup = document.querySelector('.toggleMarkup');
const galleryList = document.querySelector('.gallery-list');

const Markup = {
  GRID: 'grid-markup',
  LIST: 'list-markup',
};

function changeMarkup() {
  if (this.classList.toggle('active') === true) {
    replaceMarkup(Markup.GRID, Markup.LIST);
  } else {
    replaceMarkup(Markup.LIST, Markup.GRID);
  }
}

function replaceMarkup(oldMarkup, newMarkup) {
  galleryList.classList.add(newMarkup);
  galleryList.classList.remove(oldMarkup);
  localStorage.setItem('markup', newMarkup);
}

const localStorageMarkup = localStorage.getItem('markup', Markup.GRID);
if (localStorageMarkup === Markup.LIST) {
  toggleMarkup.classList.toggle('active');
  galleryList.classList.add(Markup.LIST);
} else {
  galleryList.classList.add(Markup.GRID);
}

toggleMarkup.addEventListener('click', changeMarkup);
