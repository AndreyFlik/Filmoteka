// this is just an example

import cardTpl from './card.hbs';
const main = document.querySelector('main');

const data = [
  {
    title: 'Avengers: Infinity War',
    image: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg',
    genre: 'Horror, Comedy',
    year: '2020',
    vote: '9.6',
  },
  {
    title: 'Deadpool 2',
    image: 'https://cdn.pixabay.com/photo/2021/10/27/19/09/cat-6748193_960_720.jpg',
    genre: 'Horror, Drama, Musical',
    year: '2018',
    vote: '8.3',
  },
  {
    title: "To All the Boys I've Loved Before",
    image: 'https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662_960_720.jpg',
    genre: 'History, Drama',
    year: '1986',
    vote: '7.2',
  },
];

main.innerHTML = data.map(item => cardTpl(item)).join('');
