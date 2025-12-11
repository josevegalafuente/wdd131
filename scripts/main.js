/**
 * MAIN.JS - Funcionalidades comunes para todas las páginas
 * Incluye: navegación responsive, funcionalidad básica, utilidades
 */

document.addEventListener('DOMContentLoaded', function () {

    // ===== NAVEGACIÓN RESPONSIVE =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');

            // Animación de hamburguesa a X
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Cerrar menú al hacer clic en un enlace
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ===== DETECTAR PÁGINA ACTIVA EN NAVEGACIÓN =====
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage ||
                (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // ===== FUNCIÓN PARA CARGAR IMÁGENES CON LAZY LOADING =====
    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('.lazy-img');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback para navegadores antiguos
            lazyImages.forEach(img => {
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
            });
        }
    }

    // ===== VALIDACIÓN DE EMAIL (se mantiene por si se usa en otros formularios) =====
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ===== INICIALIZAR FUNCIONALIDADES =====
    setActiveNavLink();
    lazyLoadImages();

    // ===== MANEJAR SCROLL PARA HEADER =====
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // ===== UTILIDAD: Formatear fecha =====
    window.formatDate = function (dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // ===== UTILIDAD: Mostrar notificación =====
    window.showNotification = function (message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            background-color: ${type === 'success' ? '#2d5016' : '#d9534f'};
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
    };
});

// ===== Footer: Año actual y última modificación =====
document.addEventListener('DOMContentLoaded', function () {

    // Año automático
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Última modificación del archivo
    const lastModSpan = document.getElementById('lastModification');
    if (lastModSpan) {
        const lastModDate = new Date(document.lastModified);

        const pad = (n) => String(n).padStart(2, '0');

        const formatted =
            `${pad(lastModDate.getDate())}/` +
            `${pad(lastModDate.getMonth() + 1)}/` +
            `${lastModDate.getFullYear()} ` +
            `${pad(lastModDate.getHours())}:` +
            `${pad(lastModDate.getMinutes())}:` +
            `${pad(lastModDate.getSeconds())}`;

        lastModSpan.textContent = formatted;
    }
});
