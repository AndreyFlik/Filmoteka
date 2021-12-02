import refs from './refs';

const changeTheme = e => {
  if (e.currentTarget.tagName !== 'BUTTON') return;
  refs.bodyRef.classList.toggle('dark-theme');
  if (refs.bodyRef.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark-theme');
  } else {
    localStorage.removeItem('theme');
  }
};

if (localStorage.getItem('theme') === 'dark-theme') {
  refs.bodyRef.classList.add('dark-theme');
} else {
  refs.bodyRef.classList.remove('dark-theme');
}

refs.themeBtnRef.addEventListener('click', changeTheme);
