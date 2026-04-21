// ========================================
// SCROLL REVEAL - Animaciones al hacer scroll
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Opcional: dejar de observar después de animar
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos los elementos con clase scroll-reveal
document.querySelectorAll('.scroll-reveal').forEach((element) => {
    observer.observe(element);
});

// ========================================
// TECH BADGES - Interactividad
// ========================================

const techBadges = document.querySelectorAll('.tech-badge');

techBadges.forEach(badge => {
    // Click effect
    badge.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });

    // Add hover sound effect (opcional)
    badge.addEventListener('mouseenter', function() {
        playTechSound();
    });
});

// Sonido suave al pasar sobre tech badges (opcional)
function playTechSound() {
    // Crear un sonido suave con Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.frequency.value = 600;
        oscillator.type = 'sine';

        gain.gain.setValueAtTime(0.1, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Si hay error, simplemente ignorar
        console.log('Audio API no disponible');
    }
}

// ========================================
// PARALLAX BACKGROUND
// ========================================

const bgAnimation = document.querySelector('.bg-animation');
let rafId = null;

document.addEventListener('mousemove', (e) => {
    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;

        bgAnimation.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ========================================
// SMOOTH SCROLL PARA LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Si es un link válido a una sección
        if (href !== '#' && href !== '#home') {
            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT (Opcional)
// ========================================

let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    // Detectar scroll para cambios en estilos si es necesario
    lastScrollTop = window.scrollY;

    // Puedes agregar lógica aquí para cambiar estilos en el header
}, false);

// ========================================
// ANIMACIÓN DE NÚMEROS (Skills Progress)
// ========================================

function animateProgressBars() {
    const skillItems = document.querySelectorAll('.skill-item');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar && !progressBar.dataset.animated) {
                    const progress = progressBar.style.getPropertyValue('--progress');
                    progressBar.dataset.animated = 'true';
                    // La animación se ejecuta con CSS, este código es solo para trigger
                }
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => skillObserver.observe(item));
}

// Llamar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateProgressBars);
} else {
    animateProgressBars();
}

// ========================================
// PROJECT CARDS - HOVER EFFECT
// ========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ========================================
// SOCIAL BUTTONS - RIPPLE EFFECT (Opcional)
// ========================================

const socialButtons = document.querySelectorAll('.social-btn');

socialButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Crear efecto ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Remover ripple anterior si existe
        const oldRipple = this.querySelector('.ripple');
        if (oldRipple) oldRipple.remove();

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ========================================
// PERFORMANCE - Lazy Loading de imágenes
// ========================================

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

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// THEME DETECTION (Light/Dark Mode)
// ========================================

function detectSystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    prefersDark.addEventListener('change', (e) => {
        // El CSS maneja automáticamente el cambio con media queries
        console.log('Theme changed to:', e.matches ? 'dark' : 'light');
    });
}

detectSystemTheme();

// ========================================
// ACCESSIBILITY - Skip to main content
// ========================================

// Agregar soporte para navegación por teclado mejorada
document.addEventListener('keydown', (e) => {
    // Esc para cerrar cualquier modal o menu
    if (e.key === 'Escape') {
        // Implementar lógica de cierre si es necesario
    }

    // Tab para navegación accesible (manejado automáticamente)
});

// ========================================
// PERFORMANCE - Debounce function
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// UTILITY - Smooth number counter
// ========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========================================
// STATS - Cargar estadísticas de GitHub (Opcional)
// ========================================

async function loadGitHubStats() {
    // Esta función se puede usar para cargar estadísticas dinámicamente
    // Por ahora se deja como referencia para futuras implementaciones
    console.log('GitHub stats loading disabled - agregar con git posteriormente');
}

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Portafolio cargado correctamente');

    // Inicializar animaciones
    animateProgressBars();

    // Verificar soporte de características
    if ('serviceWorker' in navigator) {
        // PWA support (opcional para futuro)
        console.log('Service Worker soportado');
    }
});

// ========================================
// MONITOREO DE PERFORMANCE
// ========================================

if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                console.log('Performance entry:', entry.name, entry.duration);
            }
        });
        perfObserver.observe({ entryTypes: ['navigation', 'resource'] });
    } catch (e) {
        console.log('Performance monitoring no disponible');
    }
}

// ========================================
// EASTER EGGS (Opcional)
// ========================================

// Konami code para un easter egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    console.log('🎮 ¡Easter egg activado! 🎮');
    document.body.style.filter = 'hue-rotate(360deg)';
    setTimeout(() => {
        document.body.style.filter = '';
    }, 1000);
}

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (event) => {
    console.error('Error capturado:', event.error);
    // Aquí puedes agregar lógica de logging o notificación de errores
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rechazada:', event.reason);
});