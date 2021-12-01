import refs from './refs';
import { fetchMovieById } from './apiService';

const getVideoTrailer = (id, whatToInsert, whereToInsert) => {
  return fetchMovieById(id).then(res => {
    const { results } = res.videos;
    const keyVideo = results[0].key;
    const markup = `
      <iframe
      src="https://www.youtube.com/embed/${keyVideo}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>;
    `;
    const render = (data, whatToInsert, whereToInsert) => {
      whatToInsert.insertAdjacentHTML(whereToInsert, data);
    };
    render(markup, whatToInsert, whereToInsert);
  });
};

// agetVideoTrailer(343611, refs.trendMovies, 'beforeend');

export default getVideoTrailer;
//api.themoviedb.org/3/movie/343611?api_key={api_key}&append_to_response=videos
