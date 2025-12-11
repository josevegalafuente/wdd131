document.addEventListener('DOMContentLoaded', function () {


    const teamMembers = [
        {
            id: 1,
            name: 'Manuel La Fuente',
            role: 'Operations Director',
            bio: 'With a strong background in logistics and environmental management, Manuel oversees all operations to ensure every hiking experience is safe, organized, and aligned with our commitment to nature.',
            image: 'images/manuel.jpg',
            years: 'Since 2000'
        },
        {
            id: 2,
            name: 'Jose Vega',
            role: 'Lead Mountain Guide',
            bio: 'Raised among Tarija’s valleys and peaks, Jose brings deep local knowledge and a lifelong passion for the outdoors. He guides hikers through the region’s most remarkable trails while promoting respect for nature and safe exploration.',
            image: 'images/jose.jpg',
            years: 'Since 2014'
        },
        {
            id: 3,
            name: 'Gladys Castrillo',
            role: 'Guest Experience Coordinator',
            bio: 'Gladys ensures every visitor feels prepared and supported, managing lodging arrangements and providing essential trekking briefings. Her dedication helps guests start each adventure with confidence and clarity.',
            image: 'images/gladys.jpg',
            years: 'Since 2020'
        }
    ];

    const timelineEvents = [
    {
        year: '1974',
        title: 'Founding Inspiration',
        description: 'Lorenzo and his son Ramiro begin sharing their passion for Tarija’s mountains and nature with local hikers and friends.',
        icon: '🌄'
    },
    {
        year: '1990',
        title: 'Trail Beginnings',
        description: 'The family starts mapping informal routes, guiding small groups through waterfalls, canyons, and scenic valley paths.',
        icon: '🗺️'
    },
    {
        year: '2005',
        title: 'Growing Footsteps',
        description: 'Interest expands as new hikers discover Tarija’s landscapes, inspiring the family to formalize their guided trekking efforts.',
        icon: '🥾'
    },
    {
        year: '2015',
        title: 'Professional Guiding',
        description: 'Certified outdoor guides join the team, improving safety standards and elevating the quality of every hiking experience.',
        icon: '🎒'
    },
    {
        year: '2025',
        title: 'New Expedition Era',
        description: 'Hiking Tarija launches multi-day expeditions across highland lagoons, remote valleys, and protected natural areas.',
        icon: '⛰️'
    }
];


    const teamGrid = document.getElementById('teamGrid');
    const timeline = document.getElementById('timeline');


    function renderTeam() {
        if (!teamGrid) return;

        teamGrid.innerHTML = teamMembers.map(member => `
            <div class="team-card">
                <div class="team-image">
                    <img src="${member.image}" alt="${member.name}" class="lazy-img" loading="lazy">
                </div>
                <div class="team-info">
                    <h3>${member.name}</h3>
                    <p class="team-role">${member.role}</p>
                    <p class="team-years">${member.years}</p>
                    <p class="team-bio">${member.bio}</p>
                </div>
            </div>
        `).join('');
    }


    function renderTimeline() {
        if (!timeline) return;

        timeline.innerHTML = timelineEvents.map((event, index) => `
            <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
                <div class="timeline-content">
                    <div class="timeline-year">${event.year}</div>
                    <div class="timeline-icon">${event.icon}</div>
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                </div>
            </div>
        `).join('');

        addTimelineInteractivity();
    }

    function addTimelineInteractivity() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (!timelineItems.length) return;

        // Animación al hacer scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });

        timelineItems.forEach(item => observer.observe(item));

        timelineItems.forEach(item => {
            const year = item.querySelector('.timeline-year').textContent;
            item.title = `Click to learn more about ${year}`;

            item.addEventListener('click', function () {
                const event = timelineEvents.find(e => e.year === year);
                if (event) {
                    showTimelineDetail(event);
                }
            });
        });
    }

    function showTimelineDetail(event) {
        const modal = document.createElement('div');
        modal.className = 'timeline-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${event.year}: ${event.title}</h2>
                <div class="modal-icon">${event.icon}</div>
                <p>${event.description}</p>
                <button class="btn close-timeline-modal">Close</button>
            </div>
        `;

        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close-timeline-modal');
        closeBtn.addEventListener('click', () => modal.remove());

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

   
    function updateVisitCounter() {
        const visitKey = 'aboutPageVisits';
        let visits = parseInt(localStorage.getItem(visitKey) || '0', 10);
        visits++;
        localStorage.setItem(visitKey, visits.toString());

        const visitCounter = document.createElement('div');
        visitCounter.className = 'visit-counter';
        visitCounter.innerHTML = `
            <small>👁️ This page has been viewed ${visits} time${visits !== 1 ? 's' : ''}</small>
        `;
        visitCounter.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: rgba(73, 78, 69, 0.9);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            z-index: 100;
        `;

        document.body.appendChild(visitCounter);

        setTimeout(() => {
            visitCounter.style.opacity = '0.5';
        }, 3000);
    }

 
    function lazyLoadAboutImages() {
        const lazyImages = document.querySelectorAll('.lazy-img');
        if (!lazyImages.length) return;

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback: cargar directamente
            lazyImages.forEach(img => {
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
            });
        }
    }


    function initializeAboutPage() {
        renderTeam();
        renderTimeline();
        updateVisitCounter();
        lazyLoadAboutImages();
    }

    initializeAboutPage();
});
