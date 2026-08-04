// Scroll-driven animations using Intersection Observer
/**
 * Fade elements up as they enter the viewport
 */
export function setupFadeInOnScroll(selector, options = {}) {
    const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', stagger = 0, once = true, } = options;
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(32px)';
        el.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * stagger}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * stagger}ms`;
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                if (once)
                    observer.unobserve(entry.target);
            }
            else if (!once) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(32px)';
            }
        });
    }, { threshold, rootMargin });
    elements.forEach(el => observer.observe(el));
}
/**
 * Animate skill bars when they enter the viewport
 */
export function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-fill[data-level]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.dataset.level || '0';
                setTimeout(() => {
                    bar.style.width = `${level}%`;
                }, 200);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    bars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}
/**
 * Magnetic button hover effect
 */
export function setupMagneticButtons(selector = '.magnetic') {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'transform 0.15s ease';
        });
    });
}
/**
 * Typewriter effect for rotating roles
 */
export function setupTypewriter(el, texts, options = {}) {
    const { speed = 80, pause = 2200 } = options;
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    function tick() {
        const current = texts[textIndex % texts.length];
        el.textContent = isDeleting
            ? current.substring(0, charIndex - 1)
            : current.substring(0, charIndex + 1);
        if (!isDeleting) {
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(tick, pause);
                return;
            }
        }
        else {
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                textIndex++;
            }
        }
        const delay = isDeleting ? speed / 2 : speed;
        setTimeout(tick, delay);
    }
    tick();
}
/**
 * Cursor glow that follows mouse
 */
export function setupCursorGlow() {
    // Background radial light
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    // Butterfly Sparkle Custom Cursor
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    cursorDot.innerHTML = '🦋';
    const cursorRing = document.createElement('div');
    cursorRing.className = 'custom-cursor-ring';
    document.body.append(cursorDot, cursorRing);
    let mouseX = -100, mouseY = -100;
    let glowX = -100, glowY = -100;
    let ringX = -100, ringY = -100;
    let lastSparkleTime = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
        // Spawn micro sparkle particles on movement
        const now = Date.now();
        if (now - lastSparkleTime > 45) {
            lastSparkleTime = now;
            spawnSparkle(mouseX, mouseY);
        }
    });
    function spawnSparkle(x, y) {
        if (window.innerWidth < 768)
            return;
        const particle = document.createElement('div');
        particle.className = 'cursor-sparkle';
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        particle.style.left = `${x + offsetX}px`;
        particle.style.top = `${y + offsetY}px`;
        document.body.appendChild(particle);
        setTimeout(() => {
            particle.remove();
        }, 600);
    }
    // Interactive hover detection
    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        const isInteractive = target.closest('a, button, input, textarea, select, .magnetic, .glass-card, .proj-showcase-card, .galaxy-skill-badge, .bento-box, .hub-tile');
        if (isInteractive) {
            document.body.classList.add('cursor-hover');
        }
        else {
            document.body.classList.remove('cursor-hover');
        }
    });
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-active'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-active'));
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
    });
    let lastCursorTime = performance.now();
    function animate(now) {
        const dt = Math.min((now - lastCursorTime) / 1000, 0.1);
        lastCursorTime = now;
        const glowLerp = 1 - Math.exp(-6 * dt);
        const ringLerp = 1 - Math.exp(-14 * dt);
        glowX += (mouseX - glowX) * glowLerp;
        glowY += (mouseY - glowY) * glowLerp;
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;
        ringX += (mouseX - ringX) * ringLerp;
        ringY += (mouseY - ringY) * ringLerp;
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}
/**
 * Active nav link highlight on scroll
 */
export function setupScrollSpy(sectionIds, navLinkSelector) {
    const links = document.querySelectorAll(navLinkSelector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(link => link.classList.remove('active'));
                const active = document.querySelector(`${navLinkSelector}[href="#${entry.target.id}"]`);
                active?.classList.add('active');
            }
        });
    }, { threshold: 0.4 });
    sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el)
            observer.observe(el);
    });
}
