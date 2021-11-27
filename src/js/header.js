import seachMovies from './services/apiSeach';
import cardTpl from '../templates/card.hbs';
import refs from './services/refs.js';
// refs.trendMovies;
const inputMovies = document.querySelector('#header__form');
const searchProblemAlarm = document.querySelector('.form__text');

inputMovies.addEventListener('input', getInputMovies);

function getInputMovies(event) {
  //   console.log(event.target.value);
  return seachMovies(event.target.value)
    .then(respons => {
      //   console.log(respons);
      if (respons.total_results === 0) {
        return searchProblemAlarm.classList.remove('visually-hidden', 'is-hidden');
      } else {
        searchProblemAlarm.classList.add('visually-hidden', 'is-hidden');
        return respons.results;
      }
    })
    .then(results =>
      results.map(
        // movie => console.log(movie.poster_path),
        movie => ({
          title: movie.title,
          image: movie.poster_path,
          genre: movie.genre_ids,
          year: movie.release_date,
          vote: movie.vote_average,
        }),
        (refs.trendMovies.innerHTML = results.map(item => cardTpl(item)).join('')),
      ),
    )
    .catch(error => console.log(error));
}
// console.log(movie),
// ({});
// const data = [
//   {
//     title: 'Avengers: Infinity War',
//     image: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg',
//     genre: 'Horror, Comedy',
//     year: '2020',
//     vote: '9.6',
//   },
//   {
//     title: 'Deadpool 2',
//     image: 'https://cdn.pixabay.com/photo/2021/10/27/19/09/cat-6748193_960_720.jpg',
//     genre: 'Horror, Drama, Musical',
//     year: '2018',
//     vote: '8.3',
//   },
//   {
//     title: "To All the Boys I've Loved Before",
//     image: 'https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662_960_720.jpg',
//     genre: 'History, Drama',
//     year: '1986',
//     vote: '7.2',
//   },
// ];
