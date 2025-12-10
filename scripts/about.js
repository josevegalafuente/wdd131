/**
 * ABOUT.JS - Funcionalidad para la página "About Us"
 * Incluye: timeline interactivo, carrusel de premios, galería del equipo
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

    // ===== DATOS DE PREMIOS =====
    const awards = [
        {
            id: 1,
            name: 'Green Tourism Gold Award',
            year: '2023',
            organization: 'Sustainable Tourism Council',
            description: 'Highest recognition for environmental practices in hospitality'
        },
        {
            id: 2,
            name: 'Best Eco-Retreat',
            year: '2022',
            organization: 'Travel & Nature Magazine',
            description: 'Readers\' Choice Award for sustainable travel'
        },
        {
            id: 3,
            name: 'Community Impact Award',
            year: '2021',
            organization: 'Local Business Association',
            description: 'For outstanding support of local suppliers and employment'
        },
        {
            id: 4,
            name: 'Excellence in Hospitality',
            year: '2020',
            organization: 'State Tourism Board',
            description: 'Recognition for exceptional guest service'
        },
        {
            id: 5,
            name: 'Wildlife Conservation Partner',
            year: '2019',
            organization: 'Forest Preservation Society',
            description: 'For habitat protection and wildlife monitoring efforts'
        }
    ];

    // ===== ELEMENTOS DEL DOM =====
    const teamGrid = document.getElementById('teamGrid');
    const timeline = document.getElementById('timeline');
    const awardsSlider = document.getElementById('awardsSlider');

    // ===== RENDERIZAR EQUIPO =====
    function renderTeam() {
        if (!teamGrid) return;

        // Usar template literal para construir el HTML
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

        // Agregar interactividad
        addTimelineInteractivity();
    }

    // ===== RENDERIZAR PREMIOS =====
    function renderAwards() {
        if (!awardsSlider) return;

        awardsSlider.innerHTML = awards.map(award => `
            <div class="award-card">
                <div class="award-header">
                    <span class="award-year">${award.year}</span>
                    <h3>${award.name}</h3>
                </div>
                <div class="award-body">
                    <p class="award-org">By: ${award.organization}</p>
                    <p class="award-desc">${award.description}</p>
                </div>
            </div>
        `).join('');

        // Inicializar carrusel
        initializeAwardsCarousel();
    }

    // ===== INTERACTIVIDAD DE TIMELINE =====
    function addTimelineInteractivity() {
        const timelineItems = document.querySelectorAll('.timeline-item');

        // Observador de intersección para animaciones
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });

        timelineItems.forEach(item => observer.observe(item));

        // Agregar tooltips
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

    // ===== CARRUSEL DE PREMIOS =====
    function initializeAwardsCarousel() {
        if (!awardsSlider) return;

        let currentIndex = 0;
        const awardCards = awardsSlider.querySelectorAll('.award-card');
        const totalAwards = awardCards.length;

        // Mostrar solo 3 premios a la vez
        function showAwards() {
            awardCards.forEach((card, index) => {
                card.style.display = 'none';
                if (index >= currentIndex && index < currentIndex + 3) {
                    card.style.display = 'block';
                }
            });
        }

        // Botones de navegación
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn prev';
        prevBtn.innerHTML = '‹';
        prevBtn.addEventListener('click', () => {
            currentIndex = Math.max(0, currentIndex - 1);
            showAwards();
        });

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn next';
        nextBtn.innerHTML = '›';
        nextBtn.addEventListener('click', () => {
            currentIndex = Math.min(totalAwards - 3, currentIndex + 1);
            showAwards();
        });

        awardsSlider.parentElement.appendChild(prevBtn);
        awardsSlider.parentElement.appendChild(nextBtn);

        // Auto-rotación cada 5 segundos
        let autoRotate = setInterval(() => {
            currentIndex = (currentIndex + 1) % (totalAwards - 2);
            showAwards();
        }, 5000);

        // Pausar auto-rotación al interactuar
        awardsSlider.addEventListener('mouseenter', () => clearInterval(autoRotate));
        awardsSlider.addEventListener('mouseleave', () => {
            autoRotate = setInterval(() => {
                currentIndex = (currentIndex + 1) % (totalAwards - 2);
                showAwards();
            }, 5000);
        });

        showAwards();
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
        let visits = parseInt(localStorage.getItem(visitKey) || '0');
        visits++;
        localStorage.setItem(visitKey, visits.toString());

        // Mostrar contador sutilmente
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

        // Ocultar después de 5 segundos
        setTimeout(() => {
            visitCounter.style.opacity = '0.5';
        }, 3000);
    }

    // ===== INICIALIZAR =====
    function initializeAboutPage() {
        renderTeam();
        renderTimeline();
        renderAwards();
        updateVisitCounter();

        // Lazy load images
        lazyLoadAboutImages();
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

    // ===== EXPORTAR FUNCIONES =====
    window.getTeamMembers = function () {
        return teamMembers;
    };

    window.getTimelineEvents = function () {
        return timelineEvents;
    };

    // Inicializar
    initializeAboutPage();
});