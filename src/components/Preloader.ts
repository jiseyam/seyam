// Preloader component — Fullscreen Cinematic Loading Screen

import { TOTAL_FRAMES } from '../data';

export function createPreloader(): HTMLElement {
  const el = document.createElement('div');
  el.id = 'preloader';
  el.className = 'preloader-overlay fullscreen-preloader';
  el.innerHTML = `
    <!-- Background Ambient Orbs & Pattern -->
    <div class="preloader-bg-glow orb-1"></div>
    <div class="preloader-bg-glow orb-2"></div>
    <div class="preloader-bg-glow orb-3"></div>
    <div class="preloader-grid-pattern"></div>

    <!-- Fullscreen Content Layout -->
    <div class="preloader-fullscreen-content">

      <!-- Top Branding Tag -->
      <div class="preloader-brand-badge">
        <span class="tag-pulse"></span>
        <span>SEYAM PORTFOLIO 2026</span>
      </div>

      <!-- Center Hero Stage -->
      <div class="preloader-center-stage">
        <div class="preloader-avatar-stage">
          <div class="preloader-ring ring-outer"></div>
          <div class="preloader-ring ring-inner"></div>
          <div class="avatar-center">
            <span class="avatar-emoji">🦋</span>
          </div>
        </div>

        <h1 class="preloader-hero-title">Jihadul Islam Seyam</h1>
        <p class="preloader-hero-sub">Flutter App Developer & Software Engineer</p>
      </div>

      <!-- Bottom Full-Width Progress Section -->
      <div class="preloader-bottom-bar">
        <div class="progress-meta">
          <span class="progress-status-text" id="progress-status">Initializing 3D Character Canvas...</span>
          <span class="progress-percent-num" id="progress-text">0%</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" id="progress-fill"></div>
        </div>
      </div>

    </div>
  `;
  return el;
}

export async function preloadFrames(
  onProgress: (pct: number) => void
): Promise<HTMLImageElement[]> {
  const images: HTMLImageElement[] = [];
  const batchSize = 20;

  for (let start = 1; start <= TOTAL_FRAMES; start += batchSize) {
    const end = Math.min(start + batchSize - 1, TOTAL_FRAMES);
    const batch: Promise<HTMLImageElement>[] = [];

    for (let i = start; i <= end; i++) {
      const padded = String(i).padStart(3, '0');
      batch.push(loadImage(`/frames/ezgif-frame-${padded}.jpg`));
    }

    const loaded = await Promise.all(batch);
    images.push(...loaded);
    onProgress(Math.round((images.length / TOTAL_FRAMES) * 100));
  }

  return images;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      const fallback = new Image(1280, 720);
      resolve(fallback);
    };
    img.src = src;
  });
}
