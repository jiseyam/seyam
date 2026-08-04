// main.ts — Portfolio Entry Point
// Orchestrates: preloader, canvas, components, and animations
import './styles/main.css';
import { TOTAL_FRAMES } from './data';
import { createPreloader, preloadFrames } from './components/Preloader';
import { createNavbar } from './components/Navbar';
import { createHero } from './components/Hero';
import { createAbout } from './components/About';
import { createSkills } from './components/Skills';
import { createProjects } from './components/Projects';
import { createContact } from './components/Contact';
import { createFooter } from './components/Footer';
import { setupTypewriter, setupMagneticButtons, animateSkillBars, setupCursorGlow, setupScrollSpy, } from './animations';
import { heroRoles } from './data';
// ─────────────────────────────────────────────
// 1. DOM Skeleton
// ─────────────────────────────────────────────
const app = document.getElementById('app');
// Canvas background
const canvasWrapper = document.createElement('div');
canvasWrapper.className = 'canvas-wrapper';
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
const canvasOverlay = document.createElement('div');
canvasOverlay.className = 'canvas-overlay';
canvasWrapper.append(canvas, canvasOverlay);
// Preloader
const preloader = createPreloader();
const progressFill = preloader.querySelector('#progress-fill');
const progressText = preloader.querySelector('#progress-text');
// Scroll track (all content sections)
const scrollTrack = document.createElement('div');
scrollTrack.id = 'scroll-track';
// Assemble sections
const navbar = createNavbar();
const hero = createHero();
const about = createAbout();
const skills = createSkills();
const projects = createProjects();
const contact = createContact();
const footer = createFooter();
scrollTrack.append(hero, about, skills, projects, contact, footer);
app.append(canvasWrapper, preloader, navbar, scrollTrack);
// ─────────────────────────────────────────────
// 2. Canvas Scroll Engine
// ─────────────────────────────────────────────
const ctx = canvas.getContext('2d');
let frames = [];
let currentFrame = 0;
let targetFrame = 0;
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(Math.round(currentFrame));
}
function drawFrame(index) {
    if (!frames.length)
        return;
    const i = Math.max(0, Math.min(index, frames.length - 1));
    const img = frames[i];
    if (!img?.naturalWidth)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    // Cover-fit the image to canvas
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale, dh = ih * scale;
    // Character focal point is at ~72% from the left in 16:9 frame
    const focalXRatio = 0.72;
    let dx;
    if (cw < 768) {
        // Mobile screen: align character to ~52% of mobile screen width
        const targetX = cw * 0.52;
        dx = targetX - (iw * focalXRatio * scale);
        // Ensure image fully covers canvas horizontally
        dx = Math.min(0, Math.max(cw - dw, dx));
    }
    else if (cw < 1024) {
        // Tablet screen: align character to ~62% of screen width
        const targetX = cw * 0.62;
        dx = targetX - (iw * focalXRatio * scale);
        dx = Math.min(0, Math.max(cw - dw, dx));
    }
    else {
        // Desktop: center fit
        dx = (cw - dw) / 2;
    }
    const dy = (ch - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
}
function onScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    targetFrame = Math.round(progress * (TOTAL_FRAMES - 1));
}
let lastAnimTime = performance.now();
function animationLoop(now) {
    const dt = Math.min((now - lastAnimTime) / 1000, 0.1);
    lastAnimTime = now;
    const diff = targetFrame - currentFrame;
    if (Math.abs(diff) > 0.05) {
        const lerpFactor = 1 - Math.exp(-10 * dt);
        currentFrame += diff * lerpFactor;
        drawFrame(Math.round(currentFrame));
    }
    requestAnimationFrame(animationLoop);
}
// ─────────────────────────────────────────────
// 3. Intersection Observer — Fade-up on scroll
// ─────────────────────────────────────────────
function setupFadeUpObserver() {
    const items = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.style.getPropertyValue('--delay') || `${i * 60}ms`;
                el.style.transitionDelay = delay;
                el.classList.add('visible');
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    items.forEach((el) => observer.observe(el));
}
// ─────────────────────────────────────────────
// 4. Boot Sequence
// ─────────────────────────────────────────────
async function boot() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    // Load frames with cinematic progress steps
    const progressStatus = preloader.querySelector('#progress-status');
    frames = await preloadFrames((pct) => {
        if (progressFill)
            progressFill.style.width = `${pct}%`;
        if (progressText)
            progressText.textContent = `${pct}%`;
        if (progressStatus) {
            if (pct < 30)
                progressStatus.textContent = 'Initializing 3D Character Canvas...';
            else if (pct < 70)
                progressStatus.textContent = 'Loading Glass Components & Shaders...';
            else if (pct < 99)
                progressStatus.textContent = 'Finalizing Smooth Physics Engine...';
            else
                progressStatus.textContent = 'Welcome to Seyam\'s Portfolio 🚀';
        }
    });
    // Fade out preloader
    preloader.classList.add('hidden');
    // Draw first frame & start loop
    drawFrame(0);
    requestAnimationFrame(animationLoop);
    // Scroll tracking
    window.addEventListener('scroll', onScroll, { passive: true });
    // Setup animations
    setupFadeUpObserver();
    animateSkillBars();
    setupCursorGlow();
    setupScrollSpy(['home', 'about', 'skills', 'projects', 'contact'], '.nav-link');
    // Typewriter
    const typewriterEl = document.getElementById('typewriter-target');
    if (typewriterEl) {
        setupTypewriter(typewriterEl, heroRoles, { speed: 80, pause: 2200 });
    }
    // Magnetic buttons (run after a tiny delay so DOM is fully painted)
    setTimeout(() => {
        setupMagneticButtons('.magnetic');
    }, 200);
    // Disable copying and dragging across the website
    document.addEventListener('copy', (e) => e.preventDefault());
    document.addEventListener('cut', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => e.preventDefault());
}
boot().catch(console.error);
