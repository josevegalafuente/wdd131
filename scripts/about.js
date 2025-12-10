/**
 * ABOUT.JS - Funcionalidad para la página "About Us"
 * Incluye: timeline interactivo, galería del equipo y contador de visitas
 */

document.addEventListener('DOMContentLoaded', function () {

    // ===== DATOS DEL EQUIPO =====
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
        },
    ];

    // ===== DATOS DE TIMELINE =====
    const timelineEvents = [
        {
            year: '2005',
            title: 'The Dream Begins',
            description: 'Michael and Sarah purchase 50 acres of forest land with a vision to create a nature retreat.',
            icon: '💭'
        },
        {
            year: '2007',
            title: 'First Cabin Built',
            description: 'Construction completes on our first eco-friendly cabin, using sustainable materials and solar power.',
            icon: '🏠'
        },
        {
            year: '2010',
            title: 'Expansion',
            description: 'Three additional cabins and the main lodge are added to accommodate growing demand.',
            icon: '📈'
        },
        {
            year: '2013',
            title: 'Sustainability Certification',
            description: 'We receive Green Tourism Gold Certification for our environmental practices.',
            icon: '🌿'
        },
        {
            year: '2016',
            title: 'Community Partnership',
            description: 'Launch of partnerships with local farmers and artisans for all our supplies.',
            icon: '🤝'
        },
        {
            year: '2020',
            title: 'Adapting to Change',
            description: 'Successfully navigated pandemic challenges while maintaining our commitment to guest safety and nature.',
            icon: '🔄'
        },
        {
            year: '2023',
            title: 'Modernization',
            description: 'Complete renovation with enhanced amenities while preserving our rustic charm.',
            icon: '✨'
        }
    ];

    // ===== ELEMENTOS DEL DOM =====
    const teamGrid = document.getElementById('teamGrid');
    const timeline = document.getElementById('timeline');

    // ===== RENDERIZAR EQUIPO =====
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

    // ===== RENDERIZAR TIMELINE =====
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

    // ===== INTERACTIVIDAD DE TIMELINE =====
    function addTimelineInteractivity() {
        const timelineItems = document.querySelectorAll('.timeline-item');

        // Animación al hacer scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });

        timelineItems.forEach(item => observer.observe(item));

        // Click para ver detalle
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

    // ===== MOSTRAR DETALLE DE TIMELINE =====
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

        modal.querySelector('.close-timeline-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // ===== CONTADOR DE VISITAS =====
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
            background-color: rgba(45, 80, 22, 0.9);
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

    // ===== LAZY LOAD IMÁGENES =====
    function lazyLoadAboutImages() {
        const lazyImages = document.querySelectorAll('.lazy-img');

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
        }
    }

    // ===== INICIALIZAR PÁGINA ABOUT =====
    function initializeAboutPage() {
        renderTeam();
        renderTimeline();
        updateVisitCounter();
        lazyLoadAboutImages();
    }

    // Inicializar
    initializeAboutPage();
});
