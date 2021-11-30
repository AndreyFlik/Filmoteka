import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import refs from './refs';
// import { getMovies, seachMovies } from './api';
import { fetchMovies } from './apiService';
import renderMovies from './markupMovies';
import { backToTop } from '../scrollUp';

function startPagination(totalItems = 20000, query = '') {
  const ITEMS_PER_PAGE = 20; //Number of items to draw per page //Количество элементов для рисования на странице
  const VISIBLE_PAGES = window.innerWidth < 768 ? 3 : 5; // Number of pages to display // Количество страниц для отображения по номерам
  const options = {
    totalItems,
    itemsPerPage: ITEMS_PER_PAGE,
    visiblePages: VISIBLE_PAGES, //уточнить изменения в зависимости от медиаправил!!!
    page: 1, //
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };
  const pagination = new Pagination(refs.container, options);

  pagination.on('afterMove', event => {
    backToTop();
    const page = pagination.getCurrentPage();
    fetchMovies(page, query)
      .then(data => {
        renderMovies(data.results);
      })
      .catch(error => console.log(error.message));
    // if (query) {
    //   seachMovies(query, page)
    // .then(data => {
    //   renderMovies(data.results);
    // })
    //     .catch(error => console.log(error.message));
    // } else {
    //   getMovies(page);
    // }
  });
}
export default startPagination;
