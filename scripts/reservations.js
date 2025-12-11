/**
 * RESERVATIONS.JS - Funcionalidad completa para la página de reservas
 * Incluye: formulario de reserva, validación, cálculo de precios, localStorage
 */

document.addEventListener('DOMContentLoaded', function () {

    // ===== DATOS DE HABITACIONES (array de objetos) =====
    const roomTypes = [
        {
            id: 'full day',
            name: 'Marquiri',
            description: 'Hike through Tarija’s canyon to Marquiri, a powerful waterfall framed by towering rock walls.',
            pricePerNight: 60,
            maxGuests: 10,
            amenities: ['Light breakfast (yogurt and an apple)', 'transportation to the trail starting point', 'two bottles of water per guest', 'Afternoon lodging', 'Lunch after the hike', 'Return transportation'],
            image: 'images/marquiri.jpg'
        },
        {
            id: 'Multi-Day Treks',
            name: 'Pilaya Canyon',
            description: 'Pilaya Canyon reveals immense depths, sweeping cliffs, and breathtaking panoramic views in Tarija.',
            pricePerNight: 180,
            maxGuests: 10,
            amenities: ['Bolivian Breakfast', 'Transportation to the trail starting point', 'Four bottles of water per guest', 'Lunch after the hike', 'Dinner', 'Camping equipment', 'Return transportation'],
            image: 'images/pilaya.jpg'
        },
        {
            id: 'Half-day',
            name: 'Coimata',
            description: 'Small Coimata waterfall framed by lush cliffs, offering a refreshing and serene nature spot.',
            pricePerNight: 30,
            maxGuests: 30,
            amenities: ['Transportation to the trail starting point', 'One bottle of water per guest', 'Afternoon lodging', 'Return transportation'],
            image: 'images/coimata.jpg'
        },
        {
            id: 'Challenging',
            name: 'Inca Trail',
            description: 'Tajzara’s Inca Trail offers ancient stone paths, wide highland views, and a peaceful trek.',
            pricePerNight: 120,
            maxGuests: 10,
            amenities: ['Bolivian Breakfast', 'Transportation to the trail starting point', 'Two bottles of water per guest', 'Lunch after the hike', 'Dinner', 'Return transportation'],
            image: 'images/cover.jpg'
        }
    ];


    // ===== SERVICIOS ADICIONALES =====
    const additionalServices = [
        { id: 'guide', name: 'Private Guide', price: 50, per: 'per day' },
        { id: 'camping', name: 'Camping Experience', price: 50, per: 'per person' },
        { id: 'glamping', name: 'Glamping Overnight Stay', price: 80, per: 'per person' },
        { id: 'alpina', name: 'Alpine Cabin Stay', price: 120, per: 'per person' },
    ];

    // ===== ELEMENTOS DEL DOM =====
    const reservationForm = document.getElementById('reservationForm');
    const roomTypeSelect = document.getElementById('roomType');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const guestsInput = document.getElementById('guests');
    const childrenInput = document.getElementById('children');
    const servicesContainer = document.getElementById('servicesContainer');
    const totalDisplay = document.getElementById('totalDisplay');
    const roomDetails = document.getElementById('roomDetails');
    const bookBtn = document.getElementById('bookBtn');
    const reservationSummary = document.getElementById('reservationSummary');
    const clearBtn = document.getElementById('clearBtn');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const specialRequestsInput = document.getElementById('specialRequests');

    // ===== VARIABLES DE ESTADO =====
    let selectedRoom = roomTypes[0];
    let selectedServices = [];
    let totalNights = 1;
    let totalPrice = 0;

    // ===== INICIALIZAR FECHAS =====
    function initializeDates() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Formatear fechas para input type="date"
        const formatDate = (date) => date.toISOString().split('T')[0];

        checkInInput.min = formatDate(today);
        checkInInput.value = formatDate(today);
        checkOutInput.min = formatDate(tomorrow);
        checkOutInput.value = formatDate(tomorrow);

        // Cargar reserva previa si existe
        loadPreviousReservation();
    }

    // ===== CARGAR TIPOS DE HABITACIÓN EN SELECT =====
    function loadRoomTypes() {
        roomTypeSelect.innerHTML = '<option value="">Select a room type</option>';

        roomTypes.forEach(room => {
            const option = document.createElement('option');
            option.value = room.id;
            option.textContent = `${room.name} - $${room.pricePerNight}/night`;
            roomTypeSelect.appendChild(option);
        });

        // Seleccionar primera habitación por defecto
        roomTypeSelect.value = roomTypes[0].id;
        updateRoomDetails();
    }

    // ===== CARGAR SERVICIOS ADICIONALES =====
    function loadAdditionalServices() {
        servicesContainer.innerHTML = '';

        additionalServices.forEach(service => {
            const serviceDiv = document.createElement('div');
            serviceDiv.className = 'service-option';
            serviceDiv.innerHTML = `
                <input type="checkbox" id="service-${service.id}" value="${service.id}">
                <label for="service-${service.id}">
                    <span class="service-name">${service.name}</span>
                    <span class="service-price">$${service.price} ${service.per}</span>
                </label>
            `;

            const checkbox = serviceDiv.querySelector('input');
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    selectedServices.push(service);
                } else {
                    selectedServices = selectedServices.filter(s => s.id !== service.id);
                }
                calculateTotal(); // Calcular automáticamente
            });

            servicesContainer.appendChild(serviceDiv);
        });
    }

    // ===== ACTUALIZAR DETALLES DE HABITACIÓN =====
    function updateRoomDetails() {
        selectedRoom = roomTypes.find(room => room.id === roomTypeSelect.value) || roomTypes[0];

        const amenitiesHTML = selectedRoom.amenities.map(amenity =>
            `<span class="amenity-tag">${amenity}</span>`
        ).join('');

        // Usar template literal para construir el HTML
        roomDetails.innerHTML = `
            <div class="room-detail-card">
                <h3>${selectedRoom.name}</h3>
                <p>${selectedRoom.description}</p>
                <div class="room-specs">
                    <div class="spec-item">
                        <strong>Price:</strong> $${selectedRoom.pricePerNight}/night
                    </div>
                    <div class="spec-item">
                        <strong>Max Guests:</strong> ${selectedRoom.maxGuests}
                    </div>
                </div>
                <div class="amenities">
                    <strong>Amenities:</strong>
                    <div class="amenities-list">${amenitiesHTML}</div>
                </div>
            </div>
        `;

        // Actualizar máximo de huéspedes
        guestsInput.max = selectedRoom.maxGuests;
        if (parseInt(guestsInput.value) > selectedRoom.maxGuests) {
            guestsInput.value = selectedRoom.maxGuests;
            showNotification(`Maximum guests for this room is ${selectedRoom.maxGuests}`, 'info');
        }

        calculateTotal(); // Calcular automáticamente
    }

    // ===== CALCULAR TOTAL (AUTOMÁTICO) =====
    function calculateTotal() {
        try {
            // Calcular noches
            const checkIn = new Date(checkInInput.value);
            const checkOut = new Date(checkOutInput.value);

            if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
                updateReservationSummary();
                return;
            }

            const timeDiff = checkOut.getTime() - checkIn.getTime();
            totalNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

            if (totalNights < 1 || isNaN(totalNights)) {
                totalNights = 1;
            }

            // Calcular precio base
            let basePrice = selectedRoom.pricePerNight * totalNights;

            // Calcular servicios
            let servicesPrice = 0;
            const guests = parseInt(guestsInput.value) || 1;

            selectedServices.forEach(service => {
                if (service.per.includes('per person')) {
                    servicesPrice += service.price * guests * (service.per.includes('per day') ? totalNights : 1);
                } else {
                    servicesPrice += service.price * (service.per.includes('per day') ? totalNights : 1);
                }
            });

            // Calcular total
            totalPrice = basePrice + servicesPrice;

            // Mostrar resumen automáticamente
            updateReservationSummary();

        } catch (error) {
            console.error('Error calculating total:', error);
        }
    }

    // ===== ACTUALIZAR RESUMEN DE RESERVA =====
    function updateReservationSummary() {
        if (!reservationSummary) return;

        const guests = parseInt(guestsInput.value) || 1;
        const children = parseInt(childrenInput.value) || 0;
        const totalPeople = guests + children;

        // Usar template literal para construir el HTML
        reservationSummary.innerHTML = `
            <h3>Reservation Summary</h3>
            <div class="summary-item">
                <span>Room:</span>
                <span>${selectedRoom.name}</span>
            </div>
            <div class="summary-item">
                <span>Dates:</span>
                <span>${formatDisplayDate(checkInInput.value)} - ${formatDisplayDate(checkOutInput.value)} (${totalNights} night${totalNights !== 1 ? 's' : ''})</span>
            </div>
            <div class="summary-item">
                <span>Guests:</span>
                <span>${totalPeople} ${totalPeople === 1 ? 'person' : 'people'} (${guests} adult${guests !== 1 ? 's' : ''}${children > 0 ? `, ${children} child${children !== 1 ? 'ren' : ''}` : ''})</span>
            </div>
            ${selectedServices.length > 0 ? `
            <div class="summary-item">
                <span>Services:</span>
                <span>
                    ${selectedServices.map(s => s.name).join(', ')}
                </span>
            </div>
            ` : ''}
            <div class="summary-total">
                <span>Total:</span>
                <span class="total-price">$${totalPrice.toFixed(2)}</span>
            </div>
            <p class="tax-note">* Taxes and fees not included</p>
        `;

        totalDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // ===== VALIDAR FORMULARIO =====
    function validateForm() {
        const errors = [];

        // Validar habitación
        if (!roomTypeSelect.value) {
            errors.push('Please select a room type');
        }

        // Validar fechas
        if (!checkInInput.value || !checkOutInput.value) {
            errors.push('Please select check-in and check-out dates');
        } else {
            const checkIn = new Date(checkInInput.value);
            const checkOut = new Date(checkOutInput.value);

            if (checkOut <= checkIn) {
                errors.push('Check-out date must be after check-in date');
            }
        }

        // Validar huéspedes
        const guests = parseInt(guestsInput.value);
        if (!guests || guests < 1) {
            errors.push('Please enter a valid number of guests');
        } else if (guests > selectedRoom.maxGuests) {
            errors.push(`Maximum guests for ${selectedRoom.name} is ${selectedRoom.maxGuests}`);
        }

        // Validar nombre
        if (!fullNameInput.value.trim()) {
            errors.push('Please enter your full name');
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            errors.push('Please enter your email address');
        } else if (!emailRegex.test(emailInput.value)) {
            errors.push('Please enter a valid email address');
        }

        return errors;
    }

    // ===== VALIDACIÓN AUTOMÁTICA DE FECHAS =====
    function validateDates() {
        if (!checkInInput.value || !checkOutInput.value) {
            return true;
        }

        const checkIn = new Date(checkInInput.value);
        const checkOut = new Date(checkOutInput.value);

        if (checkOut <= checkIn) {
            showNotification('Check-out date must be after check-in date', 'error');
            return false;
        }
        return true;
    }

    // ===== VALIDACIÓN AUTOMÁTICA DE HUÉSPEDES =====
    function validateGuests() {
        const guests = parseInt(guestsInput.value) || 0;
        if (guests > selectedRoom.maxGuests) {
            showNotification(`Maximum guests for ${selectedRoom.name} is ${selectedRoom.maxGuests}`, 'error');
            guestsInput.value = selectedRoom.maxGuests;
            calculateTotal();
            return false;
        }
        return true;
    }

    // ===== GUARDAR RESERVA EN LOCALSTORAGE =====
    function saveReservation() {
        const reservation = {
            id: 'INN-' + Date.now().toString().slice(-8),
            roomType: selectedRoom.id,
            roomName: selectedRoom.name,
            checkIn: checkInInput.value,
            checkOut: checkOutInput.value,
            guests: parseInt(guestsInput.value),
            children: parseInt(childrenInput.value) || 0,
            fullName: fullNameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            specialRequests: specialRequestsInput.value.trim(),
            services: selectedServices.map(s => ({ id: s.id, name: s.name })),
            totalNights: totalNights,
            totalPrice: totalPrice,
            createdAt: new Date().toISOString()
        };

        // Obtener reservas existentes
        const reservations = JSON.parse(localStorage.getItem('innReservations') || '[]');
        reservations.push(reservation);

        // Guardar en localStorage
        localStorage.setItem('innReservations', JSON.stringify(reservations));

        // Guardar última reserva para precargar
        localStorage.setItem('lastReservation', JSON.stringify(reservation));

        return reservation;
    }

    // ===== CARGAR RESERVA PREVIA =====
    function loadPreviousReservation() {
        const lastReservation = JSON.parse(localStorage.getItem('lastReservation'));

        if (lastReservation) {
            roomTypeSelect.value = lastReservation.roomType;
            checkInInput.value = lastReservation.checkIn;
            checkOutInput.value = lastReservation.checkOut;
            guestsInput.value = lastReservation.guests;
            childrenInput.value = lastReservation.children || 0;
            fullNameInput.value = lastReservation.fullName || '';
            emailInput.value = lastReservation.email || '';
            phoneInput.value = lastReservation.phone || '';
            specialRequestsInput.value = lastReservation.specialRequests || '';

            // Actualizar servicios seleccionados
            selectedServices = (lastReservation.services || []).map(service =>
                additionalServices.find(s => s.id === service.id)
            ).filter(Boolean);

            // Marcar checkboxes
            selectedServices.forEach(service => {
                const checkbox = document.getElementById(`service-${service.id}`);
                if (checkbox) checkbox.checked = true;
            });

            updateRoomDetails();
            showNotification('Previous reservation loaded', 'info');
        }
    }

    // ===== MOSTRAR CONFIRMACIÓN =====
    function showConfirmation(reservation) {
        const modal = document.createElement('div');
        modal.className = 'confirmation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>🎉 Reservation Confirmed!</h2>
                <p>Your booking has been successfully saved.</p>
                <div class="confirmation-details">
                    <p><strong>Confirmation #:</strong> ${reservation.id}</p>
                    <p><strong>Room:</strong> ${reservation.roomName}</p>
                    <p><strong>Dates:</strong> ${formatDisplayDate(reservation.checkIn)} - ${formatDisplayDate(reservation.checkOut)}</p>
                    <p><strong>Guests:</strong> ${reservation.guests + (reservation.children || 0)} people</p>
                    <p><strong>Total:</strong> $${reservation.totalPrice.toFixed(2)}</p>
                    ${reservation.services.length > 0 ? `<p><strong>Services:</strong> ${reservation.services.map(s => s.name).join(', ')}</p>` : ''}
                </div>
                <p>A confirmation email has been sent to ${reservation.email}</p>
                <button id="closeModal" class="btn">Close</button>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('closeModal').addEventListener('click', () => {
            modal.remove();
        });

        // Cerrar al hacer clic fuera del modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Cerrar con tecla Escape
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }

    // ===== FORMATEAR FECHA PARA MOSTRAR =====
    function formatDisplayDate(dateString) {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // ===== MOSTRAR NOTIFICACIÓN =====
    function showNotification(message, type = 'info') {
        // Reutilizar función global si existe
        if (window.showNotification) {
            window.showNotification(message, type);
            return;
        }

        // Fallback local
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            background-color: ${type === 'success' ? '#2d5016' : type === 'error' ? '#d9534f' : '#8f6b3c'};
            color: white;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ===== EVENT LISTENERS =====
    if (roomTypeSelect) {
        roomTypeSelect.addEventListener('change', function () {
            updateRoomDetails();
        });
    }

    if (checkInInput) {
        checkInInput.addEventListener('change', function () {
            if (validateDates()) {
                calculateTotal();
            }
        });

        checkOutInput.addEventListener('change', function () {
            if (validateDates()) {
                calculateTotal();
            }
        });

        guestsInput.addEventListener('input', function () {
            if (validateGuests()) {
                calculateTotal();
            }
        });

        childrenInput.addEventListener('input', calculateTotal);
    }

    if (bookBtn) {
        bookBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const errors = validateForm();

            if (errors.length > 0) {
                errors.forEach(error => showNotification(error, 'error'));
                return;
            }

            // Mostrar confirmación antes de guardar
            if (confirm(`Confirm booking for $${totalPrice.toFixed(2)}?`)) {
                // Guardar reserva
                const reservation = saveReservation();

                // Mostrar confirmación
                showConfirmation(reservation);

                // Resetear formulario (opcional)
                if (confirm('Would you like to make another reservation?')) {
                    reservationForm.reset();
                    selectedServices = [];
                    document.querySelectorAll('#servicesContainer input[type="checkbox"]').forEach(cb => {
                        cb.checked = false;
                    });
                    initializeDates();
                    updateRoomDetails();
                }

                showNotification('Reservation booked successfully!', 'success');
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function (e) {
            e.preventDefault();

            if (confirm('Are you sure you want to clear the form?')) {
                reservationForm.reset();
                selectedServices = [];
                document.querySelectorAll('#servicesContainer input[type="checkbox"]').forEach(cb => {
                    cb.checked = false;
                });
                initializeDates();
                updateRoomDetails();

                showNotification('Form cleared', 'info');
            }
        });
    }

    // ===== INICIALIZAR =====
    function initializeReservations() {
        initializeDates();
        loadRoomTypes();
        loadAdditionalServices();
        calculateTotal();
    }

    // ===== EXPORTAR FUNCIONES ÚTILES =====
    window.getReservationHistory = function () {
        return JSON.parse(localStorage.getItem('innReservations') || '[]');
    };

    window.clearReservationHistory = function () {
        if (confirm('Clear all reservation history?')) {
            localStorage.removeItem('innReservations');
            localStorage.removeItem('lastReservation');
            showNotification('Reservation history cleared', 'success');
        }
    };

    // Inicializar
    initializeReservations();

    // Añadir estilos CSS para las animaciones de notificación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});