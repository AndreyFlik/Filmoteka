const themeBtnRef = document.querySelector('.theme__btn');
const bodyRef = document.querySelector('body');

const changeTheme = e => {
  if (e.currentTarget.tagName !== 'BUTTON') return;
  bodyRef.classList.toggle('dark-theme');
  if (bodyRef.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark-theme');
  } else {
    localStorage.removeItem('theme');
  }
};

if (localStorage.getItem('theme') === 'dark-theme') {
  bodyRef.classList.add('dark-theme');
} else {
  bodyRef.classList.remove('dark-theme');
}

themeBtnRef.addEventListener('click', changeTheme);
