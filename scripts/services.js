// scripts/services.js

document.addEventListener('DOMContentLoaded', function () {
    const roomsContainer = document.getElementById('roomsContainer');
    const favoritesBtn = document.getElementById('favoritesBtn');
    const favoritesModal = document.getElementById('favoritesModal');
    const closeModal = document.querySelector('.close-modal');
    const favoritesList = document.getElementById('favoritesList');
    const clearFavoritesBtn = document.getElementById('clearFavoritesBtn');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Datos de las caminatas (hikes)
    const servicesData = {
        rooms: [
            {
                id: 1,
                type: 'full day',
                name: 'Marquiri',
                description: 'Hike through Tarija’s canyon to Marquiri, a powerful waterfall framed by towering rock walls.',
                price: 60,
                size: '24 km',
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
                size: '60 km',
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
                size: '19 km',
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
                size: '21 km',
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
                size: '80 km',
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

    // Crear tarjeta para cada hike (antes "habitación")
    function createRoomCard(room) {
        const isFavorite = favorites.includes(room.id);
        const featuredBadge = room.featured ? '<span class="featured-badge">Featured</span>' : '';

        return `
            <div class="service-card" data-type="${room.type}" data-id="${room.id}">
                ${featuredBadge}
                <div class="card-image">
                    <img src="${room.image}" alt="${room.name}" loading="lazy" onerror="this.src='images/default-room.jpg'">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${room.name}</h3>
                    <p class="card-description">${room.description}</p>
                    
                    <div class="card-details">
                        <div class="detail-item">
                            <span class="detail-label">Distance:</span>
                            <span class="detail-value">${room.size}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Capacity:</span>
                            <span class="detail-value">${room.capacity}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Type:</span>
                            <span class="detail-value">${room.type.charAt(0).toUpperCase() + room.type.slice(1)}</span>
                        </div>
                    </div>
                    
                    <div class="amenities">
                        ${room.amenities
                            .slice(0, 3)
                            .map(amenity => `<span class="amenity-tag">${amenity}</span>`)
                            .join('')}
                        ${room.amenities.length > 3
                            ? `<span class="amenity-tag">+${room.amenities.length - 3} more</span>`
                            : ''}
                    </div>
                    
                    <div class="card-footer">
                        <div class="price">
                            <span class="price-amount">$${room.price}</span>
                            <span class="price-unit">/person</span>
                        </div>
                        <div class="card-actions">
                            <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${room.id}" aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                                ${isFavorite ? '♥' : '♡'}
                            </button>
                            <button class="btn btn-small book-btn" data-id="${room.id}">Book Hike</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Crear tarjeta de actividad
    function createActivityCard(activity) {
        return `
            <div class="service-card" data-id="${activity.id}">
                ${activity.featured ? '<span class="featured-badge">Popular</span>' : ''}
                <div class="card-image">
                    <img src="${activity.image}" alt="${activity.name}" loading="lazy" onerror="this.src='images/default-activity.jpg'">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${activity.name}</h3>
                    <p class="card-description">${activity.description}</p>
                    
                    <div class="card-details">
                        <div class="detail-item">
                            <span class="detail-label">Duration:</span>
                            <span class="detail-value">${activity.duration}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Difficulty:</span>
                            <span class="detail-value">${activity.difficulty}</span>
                        </div>
                    </div>
                    
                    <div class="card-footer">
                        <div class="price">
                            <span class="price-amount">$${activity.price}</span>
                            <span class="price-unit">/person</span>
                        </div>
                        <button class="btn btn-small book-activity-btn" data-id="${activity.id}">Book Activity</button>
                    </div>
                </div>
            </div>
        `;
    }

    // (Actualmente no se usa en el HTML, pero se mantiene por si lo necesitas luego)
    function createDiningCard(dining) {
        return `
            <div class="service-card" data-id="${dining.id}">
                ${dining.featured ? '<span class="featured-badge">Featured</span>' : ''}
                <div class="card-image">
                    <img src="${dining.image}" alt="${dining.name}" loading="lazy" onerror="this.src='images/default-dining.jpg'">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${dining.name}</h3>
                    <p class="card-description">${dining.description}</p>
                    
                    <div class="card-details">
                        <div class="detail-item">
                            <span class="detail-label">Type:</span>
                            <span class="detail-value">${dining.type}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Hours:</span>
                            <span class="detail-value">${dining.hours}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Price:</span>
                            <span class="detail-value">${dining.price}</span>
                        </div>
                    </div>
                    
                    <div class="card-footer">
                        <button class="btn btn-small btn-secondary" onclick="window.location.href='reservations.html'">Reserve Table</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Renderizar hikes (antes "rooms")
    function renderRooms(filter = 'all') {
        let filteredRooms = servicesData.rooms;

        // Filtro por tipo
        if (filter !== 'all') {
            filteredRooms = filteredRooms.filter(
                room => room.type.toLowerCase() === filter.toLowerCase()
            );
        }

        // Renderizar
        if (filteredRooms.length > 0) {
            roomsContainer.innerHTML = filteredRooms.map(createRoomCard).join('');
        } else {
            roomsContainer.innerHTML = `
                <div class="no-results">
                    <p>😔 No hikes match your criteria.</p>
                    <p>Try a different filter.</p>
                    <button class="btn btn-secondary mt-2" id="resetFiltersBtn">Reset Filters</button>
                </div>
            `;

            document.getElementById('resetFiltersBtn')?.addEventListener('click', function () {
                filterButtons.forEach(btn => {
                    if (btn.dataset.filter === 'all') {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                renderRooms('all');
            });
        }

        // Eventos de los botones dentro de las tarjetas
        addCardEventListeners();
    }

    // Renderizar actividades
    function renderActivities() {
        const activitiesContainer = document.getElementById('activitiesContainer');
        if (activitiesContainer) {
            activitiesContainer.innerHTML = servicesData.activities
                .map(createActivityCard)
                .join('');

            document.querySelectorAll('.book-activity-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    const activityId = this.dataset.id;
                    const activity = servicesData.activities.find(a => a.id == activityId);
                    alert(
                        `Booking ${activity.name} for $${activity.price}/person\nYou'll be redirected to reservations page.`
                    );
                    window.location.href = 'reservations.html';
                });
            });
        }
    }

    // Renderizar restaurantes (sólo si existiera un contenedor en el HTML)
    function renderDining() {
        const diningContainer = document.getElementById('diningContainer');
        if (diningContainer && servicesData.dining) {
            diningContainer.innerHTML = servicesData.dining.map(createDiningCard).join('');
        }
    }

    // Eventos en tarjetas de hikes
    function addCardEventListeners() {
        // Botones de favoritos
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const roomId = parseInt(this.dataset.id);
                toggleFavorite(roomId);
            });
        });

        // Botones de reserva
        document.querySelectorAll('.book-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const roomId = parseInt(this.dataset.id);
                const room = servicesData.rooms.find(r => r.id === roomId);
                alert(
                    `Booking ${room.name} hike for $${room.price}/person\nRedirecting to reservations...`
                );
                // Se mantiene el parámetro "room" para no romper reservations.html
                window.location.href = `reservations.html?room=${roomId}`;
            });
        });

        // Click en tarjeta completa (excepto botones)
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', function (e) {
                if (!e.target.closest('.favorite-btn, .book-btn, .btn')) {
                    const roomId = parseInt(this.dataset.id);
                    const room = servicesData.rooms.find(r => r.id === roomId);
                    if (room) showRoomDetails(room);
                }
            });
        });
    }

    // Detalles de un hike (modal)
    function showRoomDetails(room) {
        const modalHTML = `
            <div class="room-details-modal" id="roomDetailsModal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="modal-body">
                        <div class="room-details-grid">
                            <div class="room-image">
                                <img src="${room.image}" alt="${room.name}" onerror="this.src='images/default-room.jpg'">
                            </div>
                            <div class="room-info">
                                <h2>${room.name}</h2>
                                <p class="room-type">${room.type.charAt(0).toUpperCase() + room.type.slice(1)} Hike</p>
                                <p class="room-description">${room.description}</p>
                                
                                <div class="details-grid">
                                    <div class="detail">
                                        <strong>Distance:</strong> ${room.size}
                                    </div>
                                    <div class="detail">
                                        <strong>Capacity:</strong> ${room.capacity}
                                    </div>
                                    <div class="detail">
                                        <strong>Price:</strong> $${room.price}/person
                                    </div>
                                </div>
                                
                                <div class="amenities-list">
                                    <h3>Amenities</h3>
                                    <ul>
                                        ${room.amenities.map(amenity => `<li>${amenity}</li>`).join('')}
                                    </ul>
                                </div>
                                
                                <div class="modal-actions">
                                    <button class="btn" onclick="window.location.href='reservations.html?room=${room.id}'">Book Hike</button>
                                    <button class="btn btn-secondary close-details-btn">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const existingModal = document.getElementById('roomDetailsModal');
        if (existingModal) existingModal.remove();

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById('roomDetailsModal');
        modal.style.display = 'block';

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.display = 'none';
            setTimeout(() => modal.remove(), 300);
        });

        modal.querySelector('.close-details-btn').addEventListener('click', () => {
            modal.style.display = 'none';
            setTimeout(() => modal.remove(), 300);
        });

        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                modal.style.display = 'none';
                setTimeout(() => modal.remove(), 300);
            }
        });
    }

    // Alternar favoritos
    function toggleFavorite(roomId) {
        const index = favorites.indexOf(roomId);
        const btn = document.querySelector(`.favorite-btn[data-id="${roomId}"]`);

        if (index > -1) {
            favorites.splice(index, 1);
            if (btn) {
                btn.classList.remove('active');
                btn.innerHTML = '♡';
                btn.setAttribute('aria-label', 'Add to favorites');
            }
        } else {
            favorites.push(roomId);
            if (btn) {
                btn.classList.add('active');
                btn.innerHTML = '♥';
                btn.setAttribute('aria-label', 'Remove from favorites');
            }
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesButton();
    }

    // Actualizar contador de favoritos
    function updateFavoritesButton() {
        favoritesBtn.textContent = `Favorites (${favorites.length})`;
    }

    // Mostrar modal de favoritos
    function showFavorites() {
        favoritesList.innerHTML = '';

        if (favorites.length === 0) {
            favoritesList.innerHTML = `
                <li class="empty-favorites">
                    <p>No favorites yet.</p>
                    <p>Click the ♡ on any hike to add it to your favorites.</p>
                </li>
            `;
        } else {
            favorites.forEach(roomId => {
                const room = servicesData.rooms.find(r => r.id === roomId);
                if (room) {
                    const li = document.createElement('li');
                    li.className = 'favorite-item';
                    li.innerHTML = `
                        <div class="favorite-item-content">
                            <img src="${room.image}" alt="${room.name}" onerror="this.src='images/default-room.jpg'">
                            <div class="favorite-info">
                                <h4>${room.name}</h4>
                                <p>$${room.price}/person</p>
                                <p class="favorite-desc">${room.type.charAt(0).toUpperCase() + room.type.slice(1)} Hike</p>
                            </div>
                        </div>
                        <div class="favorite-actions">
                            <button class="btn btn-small" onclick="window.location.href='reservations.html?room=${room.id}'">Book</button>
                            <button class="remove-favorite" data-id="${roomId}" aria-label="Remove">✕</button>
                        </div>
                    `;
                    favoritesList.appendChild(li);
                }
            });
        }

        document.querySelectorAll('.remove-favorite').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const roomId = parseInt(this.dataset.id);
                toggleFavorite(roomId);
                showFavorites();
                renderRooms(getActiveFilter());
            });
        });

        favoritesModal.style.display = 'block';
    }

    // Filtro activo
    function getActiveFilter() {
        const activeBtn = document.querySelector('.filter-btn.active');
        return activeBtn ? activeBtn.dataset.filter : 'all';
    }

    // Inicializar filtros
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            renderRooms(filter);
        });
    });

    // Eventos del modal de favoritos
    favoritesBtn.addEventListener('click', showFavorites);
    closeModal.addEventListener('click', function () {
        favoritesModal.style.display = 'none';
    });

    clearFavoritesBtn.addEventListener('click', function () {
        if (favorites.length > 0 && confirm('Are you sure you want to clear all favorites?')) {
            favorites = [];
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavoritesButton();
            showFavorites();
            renderRooms(getActiveFilter());
        }
    });

    // Cerrar modal de favoritos al hacer clic fuera
    window.addEventListener('click', function (event) {
        if (event.target === favoritesModal) {
            favoritesModal.style.display = 'none';
        }
    });

    // Cerrar modales con Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const favModal = document.getElementById('favoritesModal');
            const roomDetailsModal = document.getElementById('roomDetailsModal');

            if (favModal && favModal.style.display === 'block') {
                favModal.style.display = 'none';
            }

            if (roomDetailsModal && roomDetailsModal.style.display === 'block') {
                roomDetailsModal.style.display = 'none';
                setTimeout(() => roomDetailsModal.remove(), 300);
            }
        }
    });

    // Inicializar todo
    renderRooms();
    renderActivities();
    renderDining();
    updateFavoritesButton();

    console.log('Services page loaded successfully!');
});
