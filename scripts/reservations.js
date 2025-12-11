/**
 * RESERVATIONS.JS - Functionality for the reservations page
 * Handles: reservation form, validation, price calculation, localStorage
 */

document.addEventListener('DOMContentLoaded', function () {
    // ===== HIKE OPTIONS (array of objects) =====
    const hikeTypes = [
        {
            id: 'full day',
            name: 'Marquiri',
            description:
                'Hike through Tarija’s canyon to Marquiri, a powerful waterfall framed by towering rock walls.',
            pricePerNight: 60,
            maxGuests: 10,
            amenities: [
                'Light breakfast (yogurt and an apple)',
                'Transportation to the trail starting point',
                'Two bottles of water per guest',
                'Afternoon lodging',
                'Lunch after the hike',
                'Return transportation'
            ],
            image: 'images/marquiri.jpg'
        },
        {
            id: 'Multi-Day Treks',
            name: 'Pilaya Canyon',
            description:
                'Pilaya Canyon reveals immense depths, sweeping cliffs, and breathtaking panoramic views in Tarija.',
            pricePerNight: 180,
            maxGuests: 10,
            amenities: [
                'Bolivian Breakfast',
                'Transportation to the trail starting point',
                'Four bottles of water per guest',
                'Lunch after the hike',
                'Dinner',
                'Camping equipment',
                'Return transportation'
            ],
            image: 'images/pilaya.jpg'
        },
        {
            id: 'Half-day',
            name: 'Coimata',
            description:
                'Small Coimata waterfall framed by lush cliffs, offering a refreshing and serene nature spot.',
            pricePerNight: 30,
            maxGuests: 30,
            amenities: [
                'Transportation to the trail starting point',
                'One bottle of water per guest',
                'Afternoon lodging',
                'Return transportation'
            ],
            image: 'images/coimata.jpg'
        },
        {
            id: 'Challenging',
            name: 'Inca Trail',
            description:
                'Tajzara’s Inca Trail offers ancient stone paths, wide highland views, and a peaceful trek.',
            pricePerNight: 120,
            maxGuests: 10,
            amenities: [
                'Bolivian Breakfast',
                'Transportation to the trail starting point',
                'Two bottles of water per guest',
                'Lunch after the hike',
                'Dinner',
                'Return transportation'
            ],
            image: 'images/cover.jpg'
        }
    ];

    // ===== ADDITIONAL SERVICES =====
    const additionalServices = [
        { id: 'guide',   name: 'Private Guide',              price: 50,  per: 'per day' },
        { id: 'camping', name: 'Camping Experience',         price: 50,  per: 'per person' },
        { id: 'glamping',name: 'Glamping Overnight Stay',    price: 80,  per: 'per person' },
        { id: 'alpina',  name: 'Alpine Cabin Stay',          price: 120, per: 'per person' }
    ];

    // ===== DOM ELEMENTS =====
    const reservationForm      = document.getElementById('reservationForm');
    const hikeTypeSelect       = document.getElementById('hikeType');
    const checkInInput         = document.getElementById('checkIn');
    const checkOutInput        = document.getElementById('checkOut');
    const guestsInput          = document.getElementById('guests');
    const childrenInput        = document.getElementById('children');
    const servicesContainer    = document.getElementById('servicesContainer');
    const totalDisplay         = document.getElementById('totalDisplay');
    const hikeDetailsContainer = document.getElementById('hikeDetails');
    const bookBtn              = document.getElementById('bookBtn');
    const reservationSummary   = document.getElementById('reservationSummary');
    const clearBtn             = document.getElementById('clearBtn');
    const fullNameInput        = document.getElementById('fullName');
    const emailInput           = document.getElementById('email');
    const phoneInput           = document.getElementById('phone');
    const specialRequestsInput = document.getElementById('specialRequests');

    // ===== STATE =====
    let selectedHike     = hikeTypes[0];
    let selectedServices = [];
    let totalNights      = 1;
    let totalPrice       = 0;

    // ===== INITIALIZE DATES =====
    function initializeDates() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const formatDate = (date) => date.toISOString().split('T')[0];

        checkInInput.min = formatDate(today);
        checkInInput.value = formatDate(today);
        checkOutInput.min = formatDate(tomorrow);
        checkOutInput.value = formatDate(tomorrow);

        // Load last reservation if it exists
        loadPreviousReservation();
    }

    // ===== LOAD HIKES INTO SELECT =====
    function loadHikeTypes() {
        hikeTypeSelect.innerHTML = '<option value="">Select a hike</option>';

        hikeTypes.forEach(hike => {
            const option = document.createElement('option');
            option.value = hike.id;
            option.textContent = `${hike.name} - $${hike.pricePerNight}`;
            hikeTypeSelect.appendChild(option);
        });

        hikeTypeSelect.value = hikeTypes[0].id;
        updateHikeDetails();
    }

    // ===== LOAD ADDITIONAL SERVICES =====
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
                calculateTotal();
            });

            servicesContainer.appendChild(serviceDiv);
        });
    }

    // ===== UPDATE SELECTED HIKE DETAILS CARD =====
    function updateHikeDetails() {
    selectedHike =
        hikeTypes.find(hike => hike.id === hikeTypeSelect.value) || hikeTypes[0];

    const amenitiesHTML = selectedHike.amenities
        .map(amenity => `<span class="amenity-tag">${amenity}</span>`)
        .join('');

    hikeDetailsContainer.innerHTML = `
        <div class="room-detail-card">
            <h3>${selectedHike.name}</h3>
            <p>${selectedHike.description}</p>
            <div class="room-specs">
                <div class="spec-item">
                    <strong>Price:</strong> $${selectedHike.pricePerNight}
                </div>
                <div class="spec-item">
                    <strong>Max Guests:</strong> ${selectedHike.maxGuests}
                </div>
            </div>
            <div class="amenities">
                <strong>Amenities:</strong>
                <div class="amenities-list">${amenitiesHTML}</div>
            </div>
        </div>
    `;

    guestsInput.max = selectedHike.maxGuests;
    if (parseInt(guestsInput.value, 10) > selectedHike.maxGuests) {
        guestsInput.value = selectedHike.maxGuests;
        showNotification(
            `Maximum guests for this hike is ${selectedHike.maxGuests}`,
            'info'
        );
    }

    calculateTotal();
}

    // ===== CALCULATE TOTAL =====
    function calculateTotal() {
        try {
            const checkIn  = new Date(checkInInput.value);
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

            // Base price (per night)
            let basePrice = selectedHike.pricePerNight * totalNights;

            // Services price
            let servicesPrice = 0;
            const guests = parseInt(guestsInput.value, 10) || 1;

            selectedServices.forEach(service => {
                const perPerson = service.per.includes('per person');
                const perDay = service.per.includes('per day');

                if (perPerson) {
                    servicesPrice += service.price * guests * (perDay ? totalNights : 1);
                } else {
                    servicesPrice += service.price * (perDay ? totalNights : 1);
                }
            });

            totalPrice = basePrice + servicesPrice;

            updateReservationSummary();
        } catch (error) {
            console.error('Error calculating total:', error);
        }
    }

    // ===== UPDATE RESERVATION SUMMARY =====
    function updateReservationSummary() {
        if (!reservationSummary) return;

        const guests   = parseInt(guestsInput.value, 10) || 1;
        const children = parseInt(childrenInput.value, 10) || 0;
        const totalPeople = guests + children;

        reservationSummary.innerHTML = `
            <h3>Reservation Summary</h3>
            <div class="summary-item">
                <span>Hike:</span>
                <span>${selectedHike.name}</span>
            </div>
            <div class="summary-item">
                <span>Dates:</span>
                <span>
                    ${formatDisplayDate(checkInInput.value)} - 
                    ${formatDisplayDate(checkOutInput.value)} 
                    (${totalNights} night${totalNights !== 1 ? 's' : ''})
                </span>
            </div>
            <div class="summary-item">
                <span>Guests:</span>
                <span>
                    ${totalPeople} ${totalPeople === 1 ? 'person' : 'people'}
                    (${guests} adult${guests !== 1 ? 's' : ''}${
                        children > 0
                            ? `, ${children} child${children !== 1 ? 'ren' : ''}`
                            : ''
                    })
                </span>
            </div>
            ${
                selectedServices.length > 0
                    ? `
            <div class="summary-item">
                <span>Services:</span>
                <span>${selectedServices.map(s => s.name).join(', ')}</span>
            </div>
            `
                    : ''
            }
            <div class="summary-total">
                <span>Total:</span>
                <span class="total-price">$${totalPrice.toFixed(2)}</span>
            </div>
            <p class="tax-note">* Taxes and fees not included</p>
        `;

        totalDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // ===== FORM VALIDATION =====
    function validateForm() {
        const errors = [];

        if (!hikeTypeSelect.value) {
            errors.push('Please select a hike type');
        }

        if (!checkInInput.value || !checkOutInput.value) {
            errors.push('Please select check-in and check-out dates');
        } else {
            const checkIn  = new Date(checkInInput.value);
            const checkOut = new Date(checkOutInput.value);

            if (checkOut <= checkIn) {
                errors.push('Check-out date must be after check-in date');
            }
        }

        const guests = parseInt(guestsInput.value, 10);
        if (!guests || guests < 1) {
            errors.push('Please enter a valid number of guests');
        } else if (guests > selectedHike.maxGuests) {
            errors.push(
                `Maximum guests for ${selectedHike.name} is ${selectedHike.maxGuests}`
            );
        }

        if (!fullNameInput.value.trim()) {
            errors.push('Please enter your full name');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            errors.push('Please enter your email address');
        } else if (!emailRegex.test(emailInput.value)) {
            errors.push('Please enter a valid email address');
        }

        return errors;
    }

    // ===== DATE VALIDATION (live) =====
    function validateDates() {
        if (!checkInInput.value || !checkOutInput.value) {
            return true;
        }

        const checkIn  = new Date(checkInInput.value);
        const checkOut = new Date(checkOutInput.value);

        if (checkOut <= checkIn) {
            showNotification('Check-out date must be after check-in date', 'error');
            return false;
        }
        return true;
    }

    // ===== GUEST VALIDATION (live) =====
    function validateGuests() {
        const guests = parseInt(guestsInput.value, 10) || 0;
        if (guests > selectedHike.maxGuests) {
            showNotification(
                `Maximum guests for ${selectedHike.name} is ${selectedHike.maxGuests}`,
                'error'
            );
            guestsInput.value = selectedHike.maxGuests;
            calculateTotal();
            return false;
        }
        return true;
    }

    // ===== SAVE RESERVATION TO LOCALSTORAGE =====
    function saveReservation() {
        const reservation = {
            id: 'HIKE-' + Date.now().toString().slice(-8),
            hikeType: selectedHike.id,
            hikeName: selectedHike.name,
            checkIn: checkInInput.value,
            checkOut: checkOutInput.value,
            guests: parseInt(guestsInput.value, 10),
            children: parseInt(childrenInput.value, 10) || 0,
            fullName: fullNameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            specialRequests: specialRequestsInput.value.trim(),
            services: selectedServices.map(s => ({ id: s.id, name: s.name })),
            totalNights,
            totalPrice,
            createdAt: new Date().toISOString()
        };

        const reservations =
            JSON.parse(localStorage.getItem('innReservations') || '[]');
        reservations.push(reservation);

        localStorage.setItem('innReservations', JSON.stringify(reservations));
        localStorage.setItem('lastReservation', JSON.stringify(reservation));

        return reservation;
    }

    // ===== LOAD LAST RESERVATION =====
    function loadPreviousReservation() {
        const lastReservation = JSON.parse(
            localStorage.getItem('lastReservation') || 'null'
        );

        if (!lastReservation) return;

        if (hikeTypes.some(h => h.id === lastReservation.hikeType)) {
            hikeTypeSelect.value = lastReservation.hikeType;
        }

        checkInInput.value  = lastReservation.checkIn || checkInInput.value;
        checkOutInput.value = lastReservation.checkOut || checkOutInput.value;
        guestsInput.value   = lastReservation.guests || guestsInput.value;
        childrenInput.value = lastReservation.children || 0;
        fullNameInput.value = lastReservation.fullName || '';
        emailInput.value    = lastReservation.email || '';
        phoneInput.value    = lastReservation.phone || '';
        specialRequestsInput.value = lastReservation.specialRequests || '';

        selectedServices = (lastReservation.services || [])
            .map(service => additionalServices.find(s => s.id === service.id))
            .filter(Boolean);

        selectedServices.forEach(service => {
            const checkbox = document.getElementById(`service-${service.id}`);
            if (checkbox) checkbox.checked = true;
        });

        updateHikeDetails();
        showNotification('Previous reservation loaded', 'info');
    }

    // ===== CONFIRMATION MODAL =====
    function showConfirmation(reservation) {
        const modal = document.createElement('div');
        modal.className = 'confirmation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>🎉 Reservation Confirmed!</h2>
                <p>Your adventure has been successfully saved.</p>
                <div class="confirmation-details">
                    <p><strong>Confirmation #:</strong> ${reservation.id}</p>
                    <p><strong>Trail:</strong> ${reservation.hikeName}</p>
                    <p><strong>Dates:</strong> ${formatDisplayDate(
                        reservation.checkIn
                    )} - ${formatDisplayDate(reservation.checkOut)}</p>
                    <p><strong>Guests:</strong> ${
                        reservation.guests + (reservation.children || 0)
                    } people</p>
                    <p><strong>Total:</strong> $${reservation.totalPrice.toFixed(2)}</p>
                    ${
                        reservation.services.length > 0
                            ? `<p><strong>Services:</strong> ${reservation.services
                                  .map(s => s.name)
                                  .join(', ')}</p>`
                            : ''
                    }
                </div>
                <p>A confirmation email has been sent to ${reservation.email}</p>
                <button id="closeModal" class="btn">Close</button>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('closeModal').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }

    // ===== DATE FORMATTER =====
    function formatDisplayDate(dateString) {
        if (!dateString) return '';
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        if (window.showNotification) {
            window.showNotification(message, type);
            return;
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            background-color: ${
                type === 'success'
                    ? '#2d5016'
                    : type === 'error'
                    ? '#d9534f'
                    : '#8f6b3c'
            };
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
    if (hikeTypeSelect) {
        hikeTypeSelect.addEventListener('change', () => {
            updateHikeDetails();
        });
    }

    if (checkInInput && checkOutInput) {
        checkInInput.addEventListener('change', () => {
            if (validateDates()) calculateTotal();
        });

        checkOutInput.addEventListener('change', () => {
            if (validateDates()) calculateTotal();
        });
    }

    if (guestsInput) {
        guestsInput.addEventListener('input', () => {
            if (validateGuests()) calculateTotal();
        });
    }

    if (childrenInput) {
        childrenInput.addEventListener('input', () => {
            calculateTotal();
        });
    }

    if (bookBtn) {
        bookBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const errors = validateForm();
            if (errors.length > 0) {
                errors.forEach(error => showNotification(error, 'error'));
                return;
            }

            if (confirm(`Confirm booking for $${totalPrice.toFixed(2)}?`)) {
                const reservation = saveReservation();
                showConfirmation(reservation);

                if (confirm('Would you like to make another reservation?')) {
                    reservationForm.reset();
                    selectedServices = [];
                    document
                        .querySelectorAll('#servicesContainer input[type="checkbox"]')
                        .forEach(cb => {
                            cb.checked = false;
                        });
                    initializeDates();
                    updateHikeDetails();
                }

                showNotification('Reservation booked successfully!', 'success');
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (confirm('Are you sure you want to clear the form?')) {
                reservationForm.reset();
                selectedServices = [];
                document
                    .querySelectorAll('#servicesContainer input[type="checkbox"]')
                    .forEach(cb => {
                        cb.checked = false;
                    });
                initializeDates();
                updateHikeDetails();

                showNotification('Form cleared', 'info');
            }
        });
    }

    // ===== INITIALIZE ALL =====
    function initializeReservations() {
        initializeDates();
        loadHikeTypes();
        loadAdditionalServices();
        calculateTotal();
    }

    // ===== EXPORTED HELPERS (OPTIONAL) =====
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

    // Run init
    initializeReservations();

    // Notification animation keyframes
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
