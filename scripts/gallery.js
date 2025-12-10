/**
 * GALLERY.JS - Funcionalidad para la galería de imágenes en home page
 */

document.addEventListener('DOMContentLoaded', function () {

    // ===== DATOS DE LA GALERÍA (array de objetos) =====
    const galleryData = [
        {
            id: 1,
            image: 'images/marquiri.jpg',
            alt: 'Cozy cabin interior with fireplace',
            title: 'Rustic Cabin Interior',
            description: 'Warm and inviting rooms with comfortable furnishings'
        },
        {
            id: 2,
            image: 'images/pilaya.jpg',
            alt: 'Forest hiking trail',
            title: 'Guided Nature Walks',
            description: 'Explore our extensive network of hiking trails'
        },
        {
            id: 3,
            image: 'images/coimata.jpg',
            alt: 'Outdoor dining area',
            title: 'Al Fresco Dining',
            description: 'Enjoy meals in our beautiful outdoor setting'
        },
        {
            id: 4,
            image: 'images/jurina.jpg',
            title: 'Bird Watching Spot',
            alt: 'Bird watching in the forest',
            description: 'Perfect location for bird enthusiasts'
        },
        {
            id: 5,
            image: 'images/cover.jpg',
            alt: 'Evening bonfire',
            title: 'Evening Gatherings',
            description: 'Cozy bonfires under the stars'
        },
        {
            id: 6,
            image: 'images/cover2.jpg',
            alt: 'Wellness spa area',
            title: 'Wellness Center',
            description: 'Relax and rejuvenate in our spa'
        }
    ];

    // ===== ELEMENTOS DEL DOM =====
    const galleryGrid = document.getElementById('galleryGrid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!galleryGrid) return;

    // ===== VARIABLES DE ESTADO =====
    let currentPage = 0;
    const itemsPerPage = window.innerWidth < 768 ? 1 :
        window.innerWidth < 992 ? 2 : 3;

    // ===== FUNCIÓN PARA RENDERIZAR GALERÍA =====
    function renderGallery() {
        galleryGrid.innerHTML = '';

        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToShow = galleryData.slice(startIndex, endIndex);

        // Usar template literals para construir el HTML
        const galleryHTML = itemsToShow.map(item => `
            <div class="gallery-item" data-id="${item.id}">
                <img src="placeholder.jpg" 
                     data-src="${item.image}" 
                     alt="${item.alt}" 
                     class="lazy-img"
                     loading="lazy">
                <div class="gallery-overlay">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');

        galleryGrid.innerHTML = galleryHTML;

        // Actualizar estado de botones
        updateButtons();

        // Cargar imágenes lazy
        lazyLoadGalleryImages();

        // Agregar event listeners a los items
        addGalleryEventListeners();
    }

    // ===== FUNCIÓN PARA CARGAR IMÁGENES LAZY =====
    function lazyLoadGalleryImages() {
        const lazyImages = galleryGrid.querySelectorAll('.lazy-img');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            });
        }
    }

    // ===== FUNCIÓN PARA ACTUALIZAR BOTONES =====
    function updateButtons() {
        if (prevBtn) {
            prevBtn.disabled = currentPage === 0;
            prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
        }

        if (nextBtn) {
            const maxPage = Math.ceil(galleryData.length / itemsPerPage) - 1;
            nextBtn.disabled = currentPage >= maxPage;
            nextBtn.style.opacity = currentPage >= maxPage ? '0.5' : '1';
        }
    }

    // ===== FUNCIÓN PARA AGREGAR EVENT LISTENERS =====
    function addGalleryEventListeners() {
        const galleryItems = galleryGrid.querySelectorAll('.gallery-item');

        galleryItems.forEach(item => {
            item.addEventListener('click', function () {
                const id = parseInt(this.dataset.id);
                const galleryItem = galleryData.find(item => item.id === id);

                if (galleryItem) {
                    // Guardar vista en localStorage
                    saveToViewHistory(galleryItem);

                    // Mostrar modal o redirigir (simulado)
                    showGalleryDetail(galleryItem);
                }
            });
        });
    }

    // ===== FUNCIONES DE NAVEGACIÓN =====
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            if (currentPage > 0) {
                currentPage--;
                renderGallery();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            const maxPage = Math.ceil(galleryData.length / itemsPerPage) - 1;
            if (currentPage < maxPage) {
                currentPage++;
                renderGallery();
            }
        });
    }

    // ===== LOCALSTORAGE: GUARDAR HISTORIAL DE VISTAS =====
    function saveToViewHistory(item) {
        const viewHistory = JSON.parse(localStorage.getItem('galleryViewHistory') || '[]');

        // Evitar duplicados recientes
        const recentViews = viewHistory.filter(view =>
            view.id === item.id &&
            (Date.now() - new Date(view.timestamp).getTime()) < 3600000 // 1 hora
        );

        if (recentViews.length === 0) {
            viewHistory.unshift({
                id: item.id,
                title: item.title,
                timestamp: new Date().toISOString()
            });

            // Mantener solo las últimas 10 vistas
            if (viewHistory.length > 10) {
                viewHistory.pop();
            }

            localStorage.setItem('galleryViewHistory', JSON.stringify(viewHistory));
        }
    }

    // ===== MOSTRAR DETALLE DE GALERÍA =====
    function showGalleryDetail(item) {
        // Usar template literals para construir el mensaje
        const message = `
            🖼️ <strong>${item.title}</strong><br>
            ${item.description}<br><br>
            <em>This image has been saved to your view history.</em>
        `;

        // Mostrar notificación
        if (window.showNotification) {
            window.showNotification(`Viewing: ${item.title}`, 'success');
        } else {
            alert(`Viewing: ${item.title}\n${item.description}`);
        }
    }

    // ===== MANEJAR RESIZE DE VENTANA =====
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newItemsPerPage = window.innerWidth < 768 ? 1 :
                window.innerWidth < 992 ? 2 : 3;

            // Recalcular página actual si cambia itemsPerPage
            const firstItemIndex = currentPage * itemsPerPage;
            currentPage = Math.floor(firstItemIndex / newItemsPerPage);

            renderGallery();
        }, 250);
    });

    // ===== INICIALIZAR GALERÍA =====
    renderGallery();

    // ===== FUNCIÓN PARA OBTENER VISTAS RECIENTES (para usar en otras páginas) =====
    window.getRecentGalleryViews = function () {
        return JSON.parse(localStorage.getItem('galleryViewHistory') || '[]');
    };

    // ===== FUNCIÓN PARA LIMPIAR HISTORIAL =====
    window.clearGalleryHistory = function () {
        localStorage.removeItem('galleryViewHistory');
        if (window.showNotification) {
            window.showNotification('Gallery history cleared', 'success');
        }
    };
});