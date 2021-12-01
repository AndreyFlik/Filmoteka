import refs from './refs';

class Modal {
  #contentTemplate;

  constructor(contentTemplate) {
    this.#contentTemplate = contentTemplate;
    refs.modalBtnClose.addEventListener('click', this.#onClickClose);
    refs.modalBackdrop.addEventListener('click', this.#onClickBackdrop);
  }

  setTemplate(contentTemplate) {
    this.#contentTemplate = contentTemplate;
  }

  render(templateData) {
    refs.modalContent.innerHTML = this.#contentTemplate(templateData);
  }

  show() {
    refs.modalBackdrop.classList.remove('is-hidden');
    refs.body.style.overflow = 'hidden';
    refs.body.addEventListener('keydown', this.#onKeydownEsc);
  }

  close() {
    refs.modalContent.innerHTML = '';
    refs.body.style.overflow = 'auto';
    refs.modalBackdrop.classList.add('is-hidden');
  }

  #onClickClose = () => {
    this.close();
  };

  #onKeydownEsc = e => {
    if (e.key === 'Escape') {
      e.currentTarget.removeEventListener('keydown', this.#onKeydownEsc);
      this.#onClickClose();
    }
  };

  #onClickBackdrop = e => {
    const isClickBackdrop = e.target === e.currentTarget;
    const isClickContainer = e.target.parentElement === e.currentTarget;

    if (isClickBackdrop || isClickContainer) {
      this.#onClickClose();
    }
  };
}

export default Modal;
