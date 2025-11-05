const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedSpan = document.getElementById('lastModified');
if (lastModifiedSpan) {
  lastModifiedSpan.textContent = document.lastModified;
}

const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');

if (menuButton && navMenu) {
  menuButton.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  const mql = window.matchMedia('(min-width: 700px)');
  const handleChange = (e) => {
    if (e.matches) {
      navMenu.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  };

  if (mql.addEventListener) {
    mql.addEventListener('change', handleChange);
  } else {

    mql.addListener(handleChange);
  }
}
