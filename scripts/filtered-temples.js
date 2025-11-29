const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/aba-nigeria-temple/aba-nigeria-temple-5087-main.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-40551-main.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/payson-utah-temple/payson-utah-temple-62834-main.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/yigo-guam-temple/yigo-guam-temple-26495-main.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/washington-d.c.-temple/washington-d.c.-temple-14992-main.jpg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/lima-peru-temple/lima-peru-temple-12721-main.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/mexico-city-mexico-temple/mexico-city-mexico-temple-4060-main.jpg"
  },
  {
    templeName: "Buenos Aires Argentina",
    location: "Buenos Aires, Argentina",
    dedicated: "1986, January, 19",
    area: 30659,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/buenos-aires-argentina-temple/buenos-aires-argentina-temple-4087-main.jpg"
  },
  {
    templeName: "Salt Lake City Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "https://media.ldscdn.org/images/media-library/rome-italy-temple/rome-italy-temple-2190090-wallpaper.jpg?download=true"
  },
  
  {
    templeName: "Oakland California",
    location: "Oakland, California, United States",
    dedicated: "1964, November, 19",
    area: 80157,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/oakland-california-temple/oakland-california-temple-2654-main.jpg"
  },
  {
    templeName: "Salta Argentina",
    location: "Salta, Argentina",
    dedicated: "2024, June, 16",
    area: 27000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/salta-argentina-temple/salta-argentina-temple-48241-main.jpg"
  },
  
];


document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent += document.lastModified;



// Function to create temple card
function createTempleCard(temple) {
  const card = document.createElement('div');
  card.className = 'temple-card';

  card.innerHTML = `
    <img src="${temple.imageUrl}" alt="${temple.templeName}" class="temple-image" loading="lazy">
    <div class="temple-info">
      <h3 class="temple-name">${temple.templeName}</h3>
      <p class="temple-detail"><strong>Location:</strong> ${temple.location}</p>
      <p class="temple-detail"><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p class="temple-detail"><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
    </div>
  `;

  return card;
}

// Function to display temples
function displayTemples(filteredTemples) {
  const gallery = document.getElementById('templeGallery');
  gallery.innerHTML = '';

  filteredTemples.forEach(temple => {
    const card = createTempleCard(temple);
    gallery.appendChild(card);
  });
}

// Filter functions
function filterTemples(filter) {
  let filteredTemples = [];

  switch (filter) {
    case 'old':
      // Temples built before 1900
      filteredTemples = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year < 1900;
      });
      break;

    case 'new':
      // Temples built after 2000
      filteredTemples = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year > 2000;
      });
      break;

    case 'large':
      // Temples larger than 90,000 square feet
      filteredTemples = temples.filter(temple => temple.area > 90000);
      break;

    case 'small':
      // Temples smaller than 10,000 square feet
      filteredTemples = temples.filter(temple => temple.area < 10000);
      break;

    case 'home':
    default:
      // Display all temples
      filteredTemples = temples;
      break;
  }

  displayTemples(filteredTemples);
}

// Navigation event listeners
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));

      // Add active class to clicked link
      link.classList.add('active');

      // Filter temples based on data-filter attribute
      const filter = link.getAttribute('data-filter');
      filterTemples(filter);

      // Close mobile menu if open
      if (window.innerWidth < 1024) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  });
}

// Hamburger menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth < 1024) {
    if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Display all temples initially
  filterTemples('home');
  setupNavigation();
});