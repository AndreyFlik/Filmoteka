import template from '../../templates/footer-modal.hbs';
import refs from './refs';

const onFooterClick = () => {
  console.log(onFooterClick);
  refs.modalContent.innerHTML = template();
  refs.modalBackdrop.classList.remove('is-hidden');
  refs.body.style.overflow = 'hidden';
};

refs.footerModalLink.addEventListener('click', onFooterClick);
