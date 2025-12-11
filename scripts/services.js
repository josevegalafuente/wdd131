document.addEventListener('DOMContentLoaded', function () {

    const hikesContainer = document.getElementById('roomsContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!hikesContainer) return;


    const servicesData = {
        hikes: [
            {
                id: 1,
                type: 'full day',
                name: 'Marquiri',
                description: 'Hike through Tarija’s canyon to Marquiri, a powerful waterfall framed by towering rock walls.',
                price: 60,
                distance: '24 km',
                capacity: '10 adults',
                amenities: [
                    'Light breakfast (yogurt and an apple)',
                    'transportation to the trail starting point',
                    'two bottles of water per guest',
                    'Afternoon lodging',
                    'Lunch after the hike',
                    'Return transportation'
                ],
                featured: true,
                image: 'images/marquiri.jpg'
            },
            {
                id: 2,
                type: 'Multi-Day Treks',
                name: 'Pilaya Canyon',
                description: 'Pilaya Canyon reveals immense depths, sweeping cliffs, and breathtaking panoramic views in Tarija.',
                price: 180,
                distance: '60 km',
                capacity: '10 adults',
                amenities: [
                    'Bolivian Breakfast',
                    'Transportation to the trail starting point',
                    'Four bottles of water per guest',
                    'Lunch after the hike',
                    'Dinner',
                    'Camping equipment',
                    'Return transportation'
                ],
                featured: true,
                image: 'images/pilaya.jpg'
            },
            {
                id: 3,
                type: 'Half-day',
                name: 'Coimata',
                description: 'Small Coimata waterfall framed by lush cliffs, offering a refreshing and serene nature spot.',
                price: 30,
                distance: '19 km',
                capacity: '20 adults + 10 children',
                amenities: [
                    'Transportation to the trail starting point',
                    'One bottle of water per guest',
                    'Afternoon lodging',
                    'Return transportation'
                ],
                featured: true,
                image: 'images/coimata.jpg'
            },
            {
                id: 4,
                type: 'Half-day',
                name: 'Jurina',
                description: 'Small Jurina waterfall framed by lush cliffs, offering a refreshing and serene nature spot.',
                price: 40,
                distance: '21 km',
                capacity: '20 adults + 10 children',
                amenities: [
                    'Transportation to the trail starting point',
                    'One bottle of water per guest',
                    'Afternoon lodging',
                    'Return transportation'
                ],
                featured: true,
                image: 'images/jurina.jpg'
            },
            {
                id: 5,
                type: 'Challenging',
                name: 'Inca Trail',
                description: 'Tajzara’s Inca Trail offers ancient stone paths, wide highland views, and a peaceful trek.',
                price: 120,
                distance: '80 km',
                capacity: '10 adults',
                amenities: [
                    'Bolivian Breakfast',
                    'Transportation to the trail starting point',
                    'Two bottles of water per guest',
                    'Lunch after the hike',
                    'Dinner',
                    'Return transportation'
                ],
                featured: true,
                image: 'images/cover.jpg'
            }
        ],
        activities: [
            {
                id: 101,
                name: 'Camping',
                description: 'Experience the night in nature with guided forest walks, mountain views, and a true outdoor adventure.',
                price: 50,
                duration: '12 hours',
                difficulty: 'Easy',
                featured: true,
                image: 'images/camping.jpg'
            },
            {
                id: 102,
                name: 'Glamping',
                description: 'Enjoy comfort in the wilderness with panoramic views and a relaxing experience close to nature.',
                price: 80,
                duration: '12 hours',
                difficulty: 'Easy',
                featured: true,
                image: 'images/glamping.jpg'
            },
            {
                id: 103,
                name: 'Alpina',
                description: 'Stay in a cozy alpine cabin surrounded by peaceful forest scenery, perfect for a quiet nature escape.',
                price: 120,
                duration: '12 hours',
                difficulty: 'Easy',
                featured: true,
                image: 'images/alpina.jpg'
            }
        ]
    };

    function createHikeCard(hike) {
        const featuredBadge = hike.featured
            ? '<span class="featured-badge">Featured</span>'
            : '';

        return `
            <div class="service-card" data-type="${hike.type}" data-id="${hike.id}">
                ${featuredBadge}
                <div class="card-image">
                    <img src="${hike.image}" 
                         alt="${hike.name}" 
                         loading="lazy" 
                         onerror="this.src='images/default-hike.jpg'">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${hike.name}</h3>
                    <p class="card-description">${hike.description}</p>
                    
                    <div class="card-details">
                        <div class="detail-item">
                            <span class="detail-label">Distance:</span>
                            <span class="detail-value">${hike.distance}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Capacity:</span>
                            <span class="detail-value">${hike.capacity}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Type:</span>
                            <span class="detail-value">
                                ${hike.type.charAt(0).toUpperCase() + hike.type.slice(1)}
                            </span>
                        </div>
                    </div>
                    
                    <div class="amenities">
                        ${hike.amenities
                            .slice(0, 3)
                            .map(amenity => `<span class="amenity-tag">${amenity}</span>`)
                            .join('')}
                        ${hike.amenities.length > 3
                            ? `<span class="amenity-tag">+${hike.amenities.length - 3} more</span>`
                            : ''}
                    </div>
                    
                    <div class="card-footer">
                        <div class="price">
                            <span class="price-amount">$${hike.price}</span>
                            <span class="price-unit">/person</span>
                        </div>
                        <div class="card-actions">
                            <button class="btn btn-small book-hike-btn" data-id="${hike.id}">
                                Book Hike
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function createActivityCard(activity) {
    const featuredBadge = activity.featured
        ? '<span class="featured-badge">Popular</span>'
        : '';

    return `
        <div class="service-card" data-id="${activity.id}">
            ${featuredBadge}
            <div class="card-image">
                <img src="${activity.image}" 
                     alt="${activity.name}" 
                     loading="lazy" 
                     onerror="this.src='images/default-activity.jpg'">
            </div>
            <div class="card-content">
                <h3 class="card-title">${activity.name}</h3>
                <p class="card-description">${activity.description}</p>
                
                <div class="card-details">
                    <div class="detail-item">
                        <span class="detail-label">Duration:</span>
                        <span class="detail-value">${activity.duration}</span>
                    </div>
                </div>
                
                <div class="card-footer">
                    <div class="price">
                        <span class="price-amount">$${activity.price}</span>
                        <span class="price-unit">/person</span>
                    </div>
                    <button class="btn btn-small book-activity-btn" data-id="${activity.id}">
                        Book Activity
                    </button>
                </div>
            </div>
        </div>
    `;
}

  
    function renderHikes(filter = 'all') {
        let filteredHikes = servicesData.hikes;

        if (filter !== 'all') {
            filteredHikes = filteredHikes.filter(
                hike => hike.type.toLowerCase() === filter.toLowerCase()
            );
        }

        if (filteredHikes.length > 0) {
            hikesContainer.innerHTML = filteredHikes.map(createHikeCard).join('');
        } else {
            hikesContainer.innerHTML = `
                <div class="no-results">
                    <p>😔 No hikes match your criteria.</p>
                    <p>Try a different filter.</p>
                    <button class="btn btn-secondary mt-2" id="resetFiltersBtn">
                        Reset Filters
                    </button>
                </div>
            `;

            const resetBtn = document.getElementById('resetFiltersBtn');
            if (resetBtn) {
                resetBtn.addEventListener('click', function () {
                    filterButtons.forEach(btn => {
                        if (btn.dataset.filter === 'all') {
                            btn.classList.add('active');
                        } else {
                            btn.classList.remove('active');
                        }
                    });
                    renderHikes('all');
                });
            }
        }

        addHikeCardEventListeners();
    }

    function renderActivities() {
        const activitiesContainer = document.getElementById('activitiesContainer');
        if (!activitiesContainer) return;

        activitiesContainer.innerHTML = servicesData.activities
            .map(createActivityCard)
            .join('');


        document.querySelectorAll('.book-activity-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const activityId = this.dataset.id;
                const activity = servicesData.activities.find(a => a.id == activityId);
                if (!activity) return;

                alert(
                    `Booking ${activity.name} for $${activity.price}/person\n` +
                    `You'll be redirected to reservations page.`
                );
                window.location.href = 'reservations.html';
            });
        });
    }


    function addHikeCardEventListeners() {

        hikesContainer.querySelectorAll('.book-hike-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const hikeId = parseInt(this.dataset.id, 10);
                const hike = servicesData.hikes.find(h => h.id === hikeId);
                if (!hike) return;

                alert(
                    `Booking ${hike.name} hike for $${hike.price}/person\n` +
                    `Redirecting to reservations...`
                );

                window.location.href = `reservations.html?hike=${hikeId}`;
            });
        });

 
        hikesContainer.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', function (e) {
                if (e.target.closest('.book-hike-btn, .btn')) return;

                const hikeId = parseInt(this.dataset.id, 10);
                const hike = servicesData.hikes.find(h => h.id === hikeId);
                if (hike) {
                    showHikeDetails(hike);
                }
            });
        });
    }


    function showHikeDetails(hike) {
        const existingModal = document.getElementById('hikeDetailsModal');
        if (existingModal) existingModal.remove();

        const modalHTML = `
            <div class="hike-details-modal" id="hikeDetailsModal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="modal-body">
                        <div class="hike-details-grid">
                            <div class="hike-image">
                                <img src="${hike.image}" 
                                     alt="${hike.name}" 
                                     onerror="this.src='images/default-hike.jpg'">
                            </div>
                            <div class="hike-info">
                                <h2>${hike.name}</h2>
                                <p class="hike-type">
                                    ${hike.type.charAt(0).toUpperCase() + hike.type.slice(1)} Hike
                                </p>
                                <p class="hike-description">${hike.description}</p>
                                
                                <div class="details-grid">
                                    <div class="detail">
                                        <strong>Distance:</strong> ${hike.distance}
                                    </div>
                                    <div class="detail">
                                        <strong>Capacity:</strong> ${hike.capacity}
                                    </div>
                                    <div class="detail">
                                        <strong>Price:</strong> $${hike.price}/person
                                    </div>
                                </div>
                                
                                <div class="amenities-list">
                                    <h3>Amenities</h3>
                                    <ul>
                                        ${hike.amenities.map(amenity => `<li>${amenity}</li>`).join('')}
                                    </ul>
                                </div>
                                
                                <div class="modal-actions">
                                    <button class="btn" 
                                            onclick="window.location.href='reservations.html?hike=${hike.id}'">
                                        Book Hike
                                    </button>
                                    <button class="btn btn-secondary close-hike-details-btn">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById('hikeDetailsModal');
        modal.style.display = 'block';

        const closeIcon = modal.querySelector('.close-modal');
        const closeBtn = modal.querySelector('.close-hike-details-btn');

        closeIcon.addEventListener('click', () => closeHikeDetailsModal(modal));
        closeBtn.addEventListener('click', () => closeHikeDetailsModal(modal));

        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeHikeDetailsModal(modal);
            }
        });
    }

    function closeHikeDetailsModal(modal) {
        modal.style.display = 'none';
        setTimeout(() => modal.remove(), 300);
    }


    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            renderHikes(filter);
        });
    });

    // Cerrar modal de detalles con tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;

        const hikeDetailsModal = document.getElementById('hikeDetailsModal');
        if (hikeDetailsModal && hikeDetailsModal.style.display === 'block') {
            closeHikeDetailsModal(hikeDetailsModal);
        }
    });


    renderHikes();
    renderActivities();

    console.log('Services page loaded successfully!');
});
