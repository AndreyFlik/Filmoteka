import refs from './refs';
import photo1 from '../../images/our-team/roman.jpg';
import photo2 from '../../images/our-team/yelyzaveta.jpg';
import photo3 from '../../images/our-team/alex.jpg';
import photo4 from '../../images/our-team/yurii.jpg';
import photo5 from '../../images/our-team/andrii.jpg';
import photo6 from '../../images/our-team/olexander.jpg';
import photo7 from '../../images/our-team/valerian.jpg';
import sprite from '../../images/sprite.svg';
import template from '../../templates/footer-modal-markup.hbs';

const pathInstagram = sprite + '#icon-instagram';
const pathFacebook = sprite + '#icon-facebook';
const pathLinkedin = sprite + '#icon-linkedin';
const pathGithub = sprite + '#icon-github';

const onFooterClick = () => {
  refs.modalContent.innerHTML = template({
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
    photo7,
    pathInstagram,
    pathFacebook,
    pathLinkedin,
    pathGithub,
  });
  refs.modalBackdrop.classList.remove('is-hidden');
  refs.body.style.overflow = 'hidden';
};

refs.footerModalLink.addEventListener('click', onFooterClick);
