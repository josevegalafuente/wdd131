// scripts/services.js

document.addEventListener('DOMContentLoaded', function () {
    const roomsContainer = document.getElementById('roomsContainer');
    const favoritesBtn = document.getElementById('favoritesBtn');
    const favoritesModal = document.getElementById('favoritesModal');
    const closeModal = document.querySelector('.close-modal');
    const favoritesList = document.getElementById('favoritesList');
    const clearFavoritesBtn = document.getElementById('clearFavoritesBtn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('serviceSearch');

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Datos de las habitaciones
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
                amenities: ['Light breakfast (yogurt and an apple)', 'transportation to the trail starting point', 'two bottles of water per guest', 'Afternoon lodging', 'Lunch after the hike', 'Return transportation'],
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
                amenities: ['Bolivian Breakfast', 'Transportation to the trail starting point', 'Four bottles of water per guest', 'Lunch after the hike', 'Dinner', 'Camping equipment', 'Return transportation'],
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
                amenities: ['Transportation to the trail starting point', 'One bottle of water per guest', 'Afternoon lodging', 'Return transportation'],
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
                amenities: ['Transportation to the trail starting point', 'One bottle of water per guest', 'Afternoon lodging', 'Return transportation'],
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
                amenities: ['Bolivian Breakfast', 'Transportation to the trail starting point', 'Two bottles of water per guest', 'Lunch after the hike', 'Dinner', 'Return transportation'],
                featured: true,
                image: 'images/cover.jpg'
            }
        ],
        activities: [
            {
                id: 101,
                name: 'Camping',
                description: 'Explore the forest with our experienced naturalist guide. Learn about local flora and fauna.',
                price: 50,
                duration: '12 hours',
                difficulty: 'Easy',
                featured: true,
                image: 'images/camping.jpg'
            },
            {
                id: 102,
                name: 'Glamping',
                description: 'Start your day with a peaceful yoga session in our forest clearing.',
                price: 80,
                duration: '12 hours',
                difficulty: 'Easy',
                featured: true,
                image: 'images/glamping.jpg'
            }
        ],
        
    };

    // Función para crear tarjeta de habitación (SIN BOTÓN DETAILS)
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
                            <span class="detail-label">Size:</span>
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
                        ${room.amenities.slice(0, 3).map(amenity =>
            `<span class="amenity-tag">${amenity}</span>`
        ).join('')}
                        ${room.amenities.length > 3 ? `<span class="amenity-tag">+${room.amenities.length - 3} more</span>` : ''}
                    </div>
                    
                    <div class="card-footer">
                        <div class="price">
                            <span class="price-amount">$${room.price}</span>
                            <span class="price-unit">/night</span>
                        </div>
                        <div class="card-actions">
                            <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${room.id}" aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                                ${isFavorite ? '♥' : '♡'}
                            </button>
                            <button class="btn btn-small book-btn" data-id="${room.id}">Book Now</button>
                            <!-- BOTÓN DETAILS ELIMINADO -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Función para crear tarjeta de actividad
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

    // Función para crear tarjeta de restaurante (SIN BOTÓN VIEW MENU)
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
                        <!-- BOTÓN VIEW MENU ELIMINADO -->
                        <button class="btn btn-small btn-secondary" onclick="window.location.href='reservations.html'">Reserve Table</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Función para renderizar habitaciones
    function renderRooms(filter = 'all', searchTerm = '') {
        let filteredRooms = servicesData.rooms;

        // Aplicar filtro por tipo
        if (filter !== 'all') {
            filteredRooms = filteredRooms.filter(room => room.type === filter);
        }

        // Aplicar búsqueda
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filteredRooms = filteredRooms.filter(room =>
                room.name.toLowerCase().includes(term) ||
                room.description.toLowerCase().includes(term) ||
                room.amenities.some(a => a.toLowerCase().includes(term)) ||
                room.type.toLowerCase().includes(term)
            );
        }

        // Renderizar
        if (filteredRooms.length > 0) {
            roomsContainer.innerHTML = filteredRooms.map(createRoomCard).join('');
        } else {
            roomsContainer.innerHTML = `
                <div class="no-results">
                    <p>😔 No rooms match your criteria.</p>
                    <p>Try a different filter or search term.</p>
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
                searchInput.value = '';
                renderRooms('all', '');
            });
        }

        // Agregar eventos a los botones
        addCardEventListeners();
    }

    // Función para renderizar actividades
    function renderActivities() {
        const activitiesContainer = document.getElementById('activitiesContainer');
        if (activitiesContainer) {
            activitiesContainer.innerHTML = servicesData.activities.map(createActivityCard).join('');

            // Agregar eventos a botones de actividades
            document.querySelectorAll('.book-activity-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    const activityId = this.dataset.id;
                    const activity = servicesData.activities.find(a => a.id == activityId);
                    alert(`Booking ${activity.name} for $${activity.price}/person\nYou'll be redirected to reservations page.`);
                    window.location.href = 'reservations.html';
                });
            });
        }
    }

    // Función para renderizar restaurantes
    function renderDining() {
        const diningContainer = document.getElementById('diningContainer');
        if (diningContainer) {
            diningContainer.innerHTML = servicesData.dining.map(createDiningCard).join('');
        }
    }

    // Agregar eventos a las tarjetas
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
                alert(`Booking ${room.name} for $${room.price}/night\nRedirecting to reservations...`);
                window.location.href = `reservations.html?room=${roomId}`;
            });
        });

        // BOTONES DE DETALLES ELIMINADOS

        // Click en tarjeta completa (excepto en botones)
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', function (e) {
                // Actualizado: sin details-btn
                if (!e.target.closest('.favorite-btn, .book-btn, .btn')) {
                    const roomId = parseInt(this.dataset.id);
                    const room = servicesData.rooms.find(r => r.id === roomId);
                    if (room) showRoomDetails(room);
                }
            });
        });
    }

    // Mostrar detalles de habitación
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
                                <p class="room-type">${room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room</p>
                                <p class="room-description">${room.description}</p>
                                
                                <div class="details-grid">
                                    <div class="detail">
                                        <strong>Size:</strong> ${room.size}
                                    </div>
                                    <div class="detail">
                                        <strong>Capacity:</strong> ${room.capacity}
                                    </div>
                                    <div class="detail">
                                        <strong>Price:</strong> $${room.price}/night
                                    </div>
                                </div>
                                
                                <div class="amenities-list">
                                    <h3>Amenities</h3>
                                    <ul>
                                        ${room.amenities.map(amenity => `<li>${amenity}</li>`).join('')}
                                    </ul>
                                </div>
                                
                                <div class="modal-actions">
                                    <button class="btn" onclick="window.location.href='reservations.html?room=${room.id}'">Book Now</button>
                                    <button class="btn btn-secondary close-details-btn">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remover modal existente si hay
        const existingModal = document.getElementById('roomDetailsModal');
        if (existingModal) existingModal.remove();

        // Agregar nuevo modal al body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Mostrar modal
        const modal = document.getElementById('roomDetailsModal');
        modal.style.display = 'block';

        // Eventos del modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.display = 'none';
            setTimeout(() => modal.remove(), 300);
        });

        modal.querySelector('.close-details-btn').addEventListener('click', () => {
            modal.style.display = 'none';
            setTimeout(() => modal.remove(), 300);
        });

        // Cerrar al hacer clic fuera
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                modal.style.display = 'none';
                setTimeout(() => modal.remove(), 300);
            }
        });
    }

    // Función para alternar favoritos
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
                    <p>Click the ♡ on any room to add it to your favorites.</p>
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
                                <p>$${room.price}/night</p>
                                <p class="favorite-desc">${room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room</p>
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

        // Agregar eventos a los botones de eliminar
        document.querySelectorAll('.remove-favorite').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const roomId = parseInt(this.dataset.id);
                toggleFavorite(roomId);
                showFavorites(); // Actualizar la lista
                renderRooms(getActiveFilter(), searchInput.value); // Actualizar las tarjetas
            });
        });

        favoritesModal.style.display = 'block';
    }

    // Obtener filtro activo
    function getActiveFilter() {
        const activeBtn = document.querySelector('.filter-btn.active');
        return activeBtn ? activeBtn.dataset.filter : 'all';
    }

    // Inicializar filtros
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remover clase activa de todos los botones
            filterButtons.forEach(b => b.classList.remove('active'));
            // Agregar clase activa al botón clickeado
            this.classList.add('active');

            const filter = this.dataset.filter;
            renderRooms(filter, searchInput.value);
        });
    });

    // Evento de búsqueda
    searchInput.addEventListener('input', function () {
        const activeFilter = getActiveFilter();
        renderRooms(activeFilter, this.value);
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
            renderRooms(getActiveFilter(), searchInput.value);
        }
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function (event) {
        if (event.target === favoritesModal) {
            favoritesModal.style.display = 'none';
        }
    });

    // Cerrar modal con Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const favoritesModal = document.getElementById('favoritesModal');
            const roomDetailsModal = document.getElementById('roomDetailsModal');

            if (favoritesModal && favoritesModal.style.display === 'block') {
                favoritesModal.style.display = 'none';
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