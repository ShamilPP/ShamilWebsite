// ============================================================
//  SHAMIL PP — Portfolio
//  Stack: GSAP 3 + ScrollTrigger + Lenis (smooth scroll)
// ============================================================

gsap.registerPlugin(ScrollTrigger);

// ==================== LENIS SMOOTH SCROLL ====================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
});

// Connect Lenis → GSAP ticker
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ==================== LOADER ====================
const loaderEl = document.getElementById('loader');
const loaderCounter = document.getElementById('loaderCounter');
let loaderObj = { val: 0 };

gsap.to(loaderObj, {
    val: 100,
    duration: 2.2,
    ease: 'power2.inOut',
    onUpdate() {
        loaderCounter.textContent = Math.round(loaderObj.val);
    },
    onComplete() {
        gsap.to(loaderEl, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete() {
                loaderEl.style.display = 'none';
                initAnimations();
            }
        });
    }
});

// ==================== CURSOR ====================
const cursorEl = document.getElementById('cursor');
const cursorGlow = document.getElementById('cursorGlow');
let cmx = 0, cmy = 0, gmx = 0, gmy = 0;

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cmx = e.clientX;
        cmy = e.clientY;
        cursorEl.style.left = cmx + 'px';
        cursorEl.style.top = cmy + 'px';
    });

    gsap.ticker.add(() => {
        gmx += (cmx - gmx) * 0.08;
        gmy += (cmy - gmy) * 0.08;
        cursorGlow.style.left = gmx + 'px';
        cursorGlow.style.top = gmy + 'px';
    });

    document.querySelectorAll('a,button,.card,.stack-item,.mantra-card,.hero-scroll-cta').forEach(el => {
        el.addEventListener('mouseenter', () => cursorEl.classList.add('is-hover'));
        el.addEventListener('mouseleave', () => cursorEl.classList.remove('is-hover'));
    });
}

// ==================== PROGRESS BAR ====================
const progressBar = document.getElementById('progressBar');
gsap.to(progressBar, {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
    }
});

// ==================== MAIN INIT ====================
function initAnimations() {
    heroAnimations();
    marqueeAnimations();
    textRevealAnimation();
    horizontalScrollAnimation();
    techStackAnimation();
    philosophyAnimation();
    mantraStackAnimation();
    finalAnimation();
}

// ==================== S1: HERO ====================
function heroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Name lines slide up
    tl.from('.hero-name-line span', {
        yPercent: 120,
        duration: 1.4,
        stagger: 0.15,
        ease: 'power4.out',
    });

    // Tag fade in
    tl.from('.hero-tag', {
        opacity: 0,
        y: 20,
        duration: 0.8,
    }, '-=0.6');

    // Scroll CTA
    tl.from('.hero-scroll-cta', {
        opacity: 0,
        y: 20,
        duration: 0.8,
    }, '-=0.4');

    // Parallax on scroll
    gsap.to('.hero-name-line:first-child span', {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
            trigger: '.s-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        }
    });
    gsap.to('.hero-name-line--stroke span', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.s-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        }
    });

    // Hero fade out on scroll
    gsap.to('.hero-content', {
        opacity: 0,
        scale: 0.9,
        ease: 'none',
        scrollTrigger: {
            trigger: '.s-hero',
            start: '60% top',
            end: 'bottom top',
            scrub: true,
        }
    });

    // Scroll CTA click
    document.querySelector('.hero-scroll-cta')?.addEventListener('click', () => {
        lenis.scrollTo('.s-marquee');
    });
}

// ==================== S2: MARQUEE ====================
function marqueeAnimations() {
    const rows = document.querySelectorAll('.marquee-row');

    rows.forEach(row => {
        const content = row.querySelector('.marquee-content');
        const speed = parseFloat(row.dataset.marqueeSpeed) || 1;

        // Duplicate content for seamless loop
        content.innerHTML += content.innerHTML;

        // Base scrolling
        const totalWidth = content.scrollWidth / 2;
        const duration = Math.abs(totalWidth / (50 * Math.abs(speed)));

        gsap.fromTo(content,
            { x: speed > 0 ? 0 : -totalWidth },
            {
                x: speed > 0 ? -totalWidth : 0,
                duration: duration,
                ease: 'none',
                repeat: -1,
            }
        );

        // Skew on scroll velocity
        gsap.to(content, {
            skewX: () => speed > 0 ? -4 : 4,
            ease: 'none',
            scrollTrigger: {
                trigger: '.s-marquee',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
                onUpdate: (self) => {
                    const v = self.getVelocity() / 1000;
                    gsap.to(content, {
                        skewX: Math.max(-12, Math.min(12, v * 0.8)),
                        duration: 0.4,
                        overwrite: true,
                    });
                }
            }
        });
    });

    // Fade in the whole section
    gsap.from('.s-marquee', {
        opacity: 0,
        scrollTrigger: {
            trigger: '.s-marquee',
            start: 'top 85%',
            end: 'top 50%',
            scrub: true,
        }
    });
}

// ==================== S3: TEXT REVEAL ====================
function textRevealAnimation() {
    const paragraph = document.getElementById('revealParagraph');
    if (!paragraph) return;

    // Split into words
    const text = paragraph.textContent.trim();
    paragraph.textContent = '';
    const words = text.split(/\s+/);
    const wordEls = words.map(w => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = w;
        paragraph.appendChild(span);
        return span;
    });

    // Scrub each word's opacity
    gsap.to(wordEls, {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
            trigger: '.s-text-reveal',
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: true,
        }
    });
}

// ==================== S4: HORIZONTAL SCROLL ====================
function horizontalScrollAnimation() {
    const section = document.querySelector('.s-hscroll');
    const track = document.getElementById('hscrollTrack');
    if (!section || !track) return;

    const cards = track.querySelectorAll('.card');
    const totalScroll = track.scrollWidth - window.innerWidth + 100;

    // Pin section & scrub horizontal
    const hPin = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => '+=' + totalScroll * 1.2,
        pin: '.hscroll-wrapper',
        scrub: 1,
        anticipatePin: 1,
    });

    gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => '+=' + totalScroll * 1.2,
            scrub: 1,
        }
    });

    // Cards stagger in
    cards.forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 60,
            rotateY: -8,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                containerAnimation: undefined,
                start: 'left 80%',
                toggleActions: 'play none none reverse',
                horizontal: true,
            }
        });
    });
}

// ==================== S5: TECH STACK ====================
function techStackAnimation() {
    const items = document.querySelectorAll('.stack-item');

    // Stagger in from bottom
    gsap.from(items, {
        y: 80,
        opacity: 0,
        scale: 0.9,
        stagger: {
            each: 0.08,
            from: 'random',
        },
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.s-stack',
            start: 'top 65%',
            toggleActions: 'play none none reverse',
        }
    });

    // Parallax each item differently
    items.forEach(item => {
        const speed = parseFloat(item.dataset.speed) || 1;
        gsap.to(item, {
            y: -30 * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: '.s-stack',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });
    });

    // Center bg text
    gsap.from('.stack-center-text', {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.s-stack',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
        }
    });
}

// ==================== S6: PHILOSOPHY ====================
function philosophyAnimation() {
    const lines = document.querySelectorAll('.phil-line span');

    gsap.from(lines, {
        yPercent: 120,
        stagger: 0.12,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
            trigger: '.s-philosophy',
            start: 'top 55%',
            toggleActions: 'play none none reverse',
        }
    });

    // Blob parallax & scale
    gsap.to('.phil-blob', {
        scale: 1.3,
        rotation: 180,
        ease: 'none',
        scrollTrigger: {
            trigger: '.s-philosophy',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        }
    });
}

// ==================== S7: STACKING MANTRAS ====================
function mantraStackAnimation() {
    const section = document.querySelector('.s-mantras');
    const cards = document.querySelectorAll('.mantra-card');
    if (!section || cards.length === 0) return;

    const cardCount = cards.length;
    const scrollPerCard = window.innerHeight * 0.8;
    const totalHeight = scrollPerCard * cardCount + window.innerHeight;

    section.style.height = totalHeight + 'px';

    cards.forEach((card, i) => {
        // Initial state: below and scaled down
        gsap.set(card, {
            y: 200,
            opacity: 0,
            scale: 0.92,
        });

        // Animate in
        gsap.to(card, {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: () => 'top+=' + (i * scrollPerCard) + ' top',
                end: () => 'top+=' + (i * scrollPerCard + scrollPerCard * 0.5) + ' top',
                scrub: 1,
            }
        });

        // Animate out (push up & shrink) — except last card
        if (i < cardCount - 1) {
            gsap.to(card, {
                y: -50,
                scale: 0.9,
                opacity: 0.3,
                ease: 'power2.in',
                scrollTrigger: {
                    trigger: section,
                    start: () => 'top+=' + ((i + 1) * scrollPerCard) + ' top',
                    end: () => 'top+=' + ((i + 1) * scrollPerCard + scrollPerCard * 0.4) + ' top',
                    scrub: 1,
                }
            });
        }
    });
}

// ==================== S8: FINAL ====================
function finalAnimation() {
    const rows = document.querySelectorAll('.final-name-row');

    rows.forEach((row, i) => {
        gsap.from(row, {
            scale: 0.3,
            opacity: 0,
            y: 80,
            duration: 1.4,
            delay: i * 0.12,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.s-final',
                start: 'top 60%',
                toggleActions: 'play none none reverse',
            }
        });
    });

    gsap.from('.final-sub', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.s-final',
            start: 'top 50%',
            toggleActions: 'play none none reverse',
        }
    });

    // Parallax name on scroll
    gsap.to('.final-name-row:first-child', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
            trigger: '.s-final',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        }
    });
}

// ==================== KEYBOARD NAV ====================
const allSections = document.querySelectorAll('[data-scroll-section]');
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const scrollY = window.pageYOffset;
        let current = 0;
        allSections.forEach((s, i) => {
            if (scrollY >= s.offsetTop - s.clientHeight / 3) current = i;
        });
        const next = e.key === 'ArrowDown'
            ? Math.min(current + 1, allSections.length - 1)
            : Math.max(current - 1, 0);
        lenis.scrollTo(allSections[next]);
    }
});
