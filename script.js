// ==================== LOADING SCREEN ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 2500);
});

// ==================== CUSTOM CURSOR ====================
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Smooth cursor outline follow
function animateCursorOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateCursorOutline);
}
animateCursorOutline();

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, .tech-card, .project-card, .stat-card, .connect-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.width = '16px';
        cursorDot.style.height = '16px';
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.borderColor = 'var(--secondary-color)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.borderColor = 'var(--primary-color)';
    });
});

// ==================== NAVIGATION DOTS ====================
const sections = document.querySelectorAll('.section');
const navDots = document.querySelectorAll('.nav-dot');

// Smooth scroll to section
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        sections[index].scrollIntoView({ behavior: 'smooth' });
    });
});

// Update active dot on scroll
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            updateActiveDot();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

function updateActiveDot() {
    let current = '';
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = index;
        }
    });
    
    navDots.forEach(dot => dot.classList.remove('active'));
    if (navDots[current]) {
        navDots[current].classList.add('active');
    }
}

// ==================== INTERSECTION OBSERVER ====================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger stat counter animation
            if (entry.target.classList.contains('stat-card')) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('counted')) {
                    animateStatCounter(statNumber);
                    statNumber.classList.add('counted');
                }
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.stat-card').forEach(el => {
    observer.observe(el);
});

// ==================== STAT COUNTER ANIMATION ====================
function animateStatCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 100 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
        }
    }, 16);
}

// ==================== PARALLAX EFFECT ====================
let ticking = false;
let lastScrollY = window.pageYOffset;

window.addEventListener('scroll', () => {
    lastScrollY = window.pageYOffset;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
});

function updateParallax() {
    const scrolled = lastScrollY;
    
    // Matrix background parallax
    const matrixBg = document.querySelector('.matrix-bg');
    if (matrixBg) {
        matrixBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Floating icons parallax
    const floatingIcons = document.querySelectorAll('.icon-orbit');
    floatingIcons.forEach((icon, index) => {
        const speed = 0.3 + (index * 0.1);
        icon.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
    
    // Grid background parallax
    const gridBg = document.querySelector('.grid-bg');
    if (gridBg) {
        const rect = gridBg.getBoundingClientRect();
        const offset = (window.innerHeight - rect.top) / window.innerHeight;
        gridBg.style.opacity = Math.max(0.3, 1 - offset);
    }
}

// ==================== TILT EFFECT ====================
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ==================== MATRIX RAIN EFFECT ====================
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.1';
    
    const section1 = document.getElementById('section1');
    if (section1) {
        section1.appendChild(canvas);
    }
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize matrix rain on first section
createMatrixRain();

// ==================== PARTICLE EFFECT ====================
function createParticles() {
    const particlesBg = document.querySelector('.particles-bg');
    if (!particlesBg) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5;
        particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesBg.appendChild(particle);
    }
}

createParticles();

// ==================== TYPEWRITER EFFECT ====================
function typewriterEffect() {
    const elements = document.querySelectorAll('.reveal-text');
    elements.forEach((el, index) => {
        const text = el.textContent;
        el.textContent = '';
        el.style.opacity = '1';
        
        let charIndex = 0;
        setTimeout(() => {
            const timer = setInterval(() => {
                if (charIndex < text.length) {
                    el.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(timer);
                }
            }, 50);
        }, index * 1000);
    });
}

// Trigger typewriter when section is visible
const mysterySection = document.getElementById('section2');
const mysteryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
            typewriterEffect();
            entry.target.classList.add('typed');
        }
    });
}, { threshold: 0.5 });

if (mysterySection) {
    mysteryObserver.observe(mysterySection);
}

// ==================== GLITCH TEXT ON HOVER ====================
document.querySelectorAll('.glitch-subtle').forEach(el => {
    el.addEventListener('mouseenter', () => {
        let glitchInterval = setInterval(() => {
            el.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        }, 50);
        
        setTimeout(() => {
            clearInterval(glitchInterval);
            el.style.transform = 'translate(0, 0)';
        }, 300);
    });
});

// ==================== SMOOTH REVEAL ANIMATIONS ====================
const revealElements = document.querySelectorAll('.fade-in, .hero-title, .reveal-line');
revealElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
});

// ==================== SCROLL TO ENTER ====================
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    document.getElementById('section2').scrollIntoView({ behavior: 'smooth' });
});

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    const currentSection = getCurrentSection();
    
    if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        e.preventDefault();
        sections[currentSection + 1].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' && currentSection > 0) {
        e.preventDefault();
        sections[currentSection - 1].scrollIntoView({ behavior: 'smooth' });
    }
});

function getCurrentSection() {
    let current = 0;
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = index;
        }
    });
    return current;
}

// ==================== PERFORMANCE OPTIMIZATIONS ====================
// Debounce function for resize events
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

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate positions if needed
    updateActiveDot();
}, 250));

// ==================== EASTER EGGS ====================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 5s infinite';
    
    // Create confetti effect
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.zIndex = '10000';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = 'fall 3s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Add rainbow and fall animations
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
`;
document.head.appendChild(style);

// ==================== INITIAL SETUP ====================
window.addEventListener('DOMContentLoaded', () => {
    // Set initial active dot
    updateActiveDot();
    
    // Add smooth transitions to all sections
    sections.forEach(section => {
        section.style.transition = 'opacity 0.5s ease-in-out';
    });
    
    console.log('%c🚀 Welcome to Shamil PP\'s Portfolio!', 'font-size: 20px; color: #00ff88; font-weight: bold;');
    console.log('%c💻 Built with passion and creativity', 'font-size: 14px; color: #0088ff;');
    console.log('%c🎨 Try the Konami Code for a surprise!', 'font-size: 12px; color: #ff0088;');
});

// ==================== MOBILE OPTIMIZATIONS ====================
if (window.innerWidth <= 768) {
    // Disable some heavy animations on mobile
    document.querySelectorAll('.matrix-bg, .grid-bg').forEach(el => {
        el.style.animation = 'none';
    });
    
    // Simplify cursor on mobile
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
}

// ==================== ACCESSIBILITY ====================
// Add focus styles for keyboard navigation
const focusableElements = document.querySelectorAll('a, button, .nav-dot');
focusableElements.forEach(el => {
    el.addEventListener('focus', () => {
        el.style.outline = '2px solid var(--primary-color)';
        el.style.outlineOffset = '4px';
    });
    
    el.addEventListener('blur', () => {
        el.style.outline = 'none';
    });
});

// Prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

