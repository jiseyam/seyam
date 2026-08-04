// Projects Section — Dynamic JSON-Driven Interactive Card Showcase
import { projects as fallbackProjects } from '../data';
export function createProjects() {
    const section = document.createElement('section');
    section.id = 'projects';
    section.className = 'content-section projects-showcase-section';
    loadProjects().then(projectsList => {
        renderProjectsSection(section, projectsList);
    });
    return section;
}
async function loadProjects() {
    try {
        const response = await fetch('/projects.json');
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                return data;
            }
        }
    }
    catch (err) {
        console.warn('Unable to load /projects.json, falling back to data.ts:', err);
    }
    return fallbackProjects;
}
function renderProjectsSection(section, projectsList) {
    const isMaintenance = projectsList.some(p => p.id === 'under-maintenance');
    const flutterCount = projectsList.filter(p => p.category === 'flutter').length;
    const webCount = projectsList.filter(p => p.category === 'web').length;
    const backendCount = projectsList.filter(p => p.category === 'backend').length;
    section.innerHTML = `
    <div class="container proj-container">

      <!-- Section Header -->
      <div class="section-header fade-up">
        <p class="section-tag"><span class="tag-dot"></span> Featured Work</p>
        <h2 class="section-title">Apps Built by Seyam</h2>
        <p class="section-subtitle">
          ${isMaintenance
        ? 'Projects showcase is currently under maintenance. New apps & case studies are being updated!'
        : 'Explore my featured projects — scroll or use arrows to navigate through each app.'}
        </p>

        <!-- Filter pills — dynamically rendered based on available projects -->
        <div class="project-filters">
          <button class="filter-btn active" data-filter="all">✦ All (${projectsList.length})</button>
          ${flutterCount > 0 ? `<button class="filter-btn" data-filter="flutter">📱 Flutter (${flutterCount})</button>` : ''}
          ${webCount > 0 ? `<button class="filter-btn" data-filter="web">🌐 Web (${webCount})</button>` : ''}
          ${backendCount > 0 ? `<button class="filter-btn" data-filter="backend">🗄️ Backend (${backendCount})</button>` : ''}
        </div>
      </div>

      <!-- Main Showcase Wrapper -->
      <div class="proj-showcase-wrapper" id="proj-showcase">

        <!-- Card Deck Stage -->
        <div class="proj-deck-stage" id="proj-deck-stage">
          ${projectsList.map((p, i) => renderProjectCard(p, i)).join('')}
          <div class="empty-projects-card hidden" id="empty-projects-card">
            <div class="empty-card-inner">
              <span class="empty-emoji">🚧</span>
              <h3 class="empty-title">No Projects Found</h3>
              <p class="empty-sub">No projects added under this category yet. Check back soon!</p>
            </div>
          </div>
        </div>

        <!-- Right Side Progress Rail -->
        <div class="proj-deck-rail" id="proj-deck-rail">
          ${projectsList.map((_, i) => `
            <button class="proj-rail-item ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to project ${i + 1}">
              <span class="rail-num">${String(i + 1).padStart(2, '0')}</span>
              <span class="rail-bar"></span>
            </button>
          `).join('')}
        </div>

      </div>

      <!-- Bottom Control Bar -->
      <div class="proj-control-bar">
        <div class="proj-counter-display">
          <span class="counter-curr" id="counter-curr">01</span>
          <span class="counter-slash">/</span>
          <span class="counter-total" id="counter-total">${String(projectsList.length).padStart(2, '0')}</span>
        </div>

        <div class="proj-hint-pill">
          <span class="hint-icon">↕</span> Scroll or click arrows to explore next
        </div>
      </div>

    </div>

    <!-- Detail Modal -->
    <div class="modal-overlay hidden" id="project-modal">
      <div class="modal-card" id="modal-content"></div>
    </div>
  `;
    initShowcaseEngine(section, projectsList);
}
function renderProjectCard(p, index) {
    const isActive = index === 0;
    return `
    <div class="proj-showcase-card ${p.gradient} ${isActive ? 'active' : ''}" data-index="${index}" data-category="${p.category}" id="proj-card-${index}">

      <div class="card-bg-noise"></div>
      <div class="card-bg-glow"></div>

      <div class="card-inner-grid">

        <!-- Left: Details -->
        <div class="card-info-col">
          <div class="card-meta-top">
            <span class="card-badge">${categoryLabel(p.category)}</span>
            <span class="card-num-tag">PROJECT ${String(index + 1).padStart(2, '0')}</span>
          </div>

          <h3 class="card-title">${p.title}</h3>
          <p class="card-desc">${p.description}</p>

          <div class="card-features-block">
            <h4 class="features-label">✨ Key Highlights:</h4>
            <ul class="card-features-list">
              ${p.features.slice(0, 4).map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>

          <div class="card-tech-wrap">
            ${p.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
          </div>

          <div class="card-actions">
            <button class="glass-btn primary-btn card-modal-btn magnetic" data-id="${p.id}">
              Full Case Study ➔
            </button>
            ${p.github ? `
              <a href="${p.github}" target="_blank" rel="noopener" class="glass-btn outline-btn magnetic">
                GitHub Repository ↗
              </a>
            ` : ''}
          </div>
        </div>

        <!-- Right: 3D Visual -->
        <div class="card-visual-col">
          <div class="card-emoji-stage">
            <div class="card-emoji-ring">
              <span class="card-emoji">${p.emoji}</span>
            </div>
            <div class="card-glow-orb"></div>
          </div>
        </div>

      </div>

    </div>
  `;
}
function categoryLabel(cat) {
    const map = {
        flutter: '🚧 Under Maintenance',
        web: '🌐 Web App',
        backend: '🗄️ Backend Service',
    };
    return map[cat] ?? cat;
}
function initShowcaseEngine(section, projectsList) {
    let currentIndex = 0;
    let isAnimating = false;
    const counterCurr = section.querySelector('#counter-curr');
    const counterTotal = section.querySelector('#counter-total');
    const railContainer = section.querySelector('#proj-deck-rail');
    const emptyCard = section.querySelector('#empty-projects-card');
    function getCards() {
        return Array.from(section.querySelectorAll('.proj-showcase-card'));
    }
    function getVisibleCards() {
        return getCards().filter(c => c.style.display !== 'none');
    }
    function goToIndex(targetIndex, direction = 'next') {
        const visibleCards = getVisibleCards();
        if (visibleCards.length === 0 || isAnimating)
            return;
        const newIdx = Math.max(0, Math.min(targetIndex, visibleCards.length - 1));
        if (newIdx === currentIndex)
            return;
        isAnimating = true;
        const currentCard = visibleCards[currentIndex];
        const nextCard = visibleCards[newIdx];
        currentCard.classList.remove('active');
        currentCard.classList.add(direction === 'next' ? 'slide-out-up' : 'slide-out-down');
        nextCard.classList.remove('slide-out-up', 'slide-out-down');
        nextCard.classList.add('active', direction === 'next' ? 'slide-in-up' : 'slide-in-down');
        currentIndex = newIdx;
        updateUI();
        setTimeout(() => {
            currentCard.classList.remove('slide-out-up', 'slide-out-down');
            nextCard.classList.remove('slide-in-up', 'slide-in-down');
            isAnimating = false;
        }, 450);
    }
    function updateUI() {
        const visibleCards = getVisibleCards();
        const total = visibleCards.length;
        if (counterCurr)
            counterCurr.textContent = String(currentIndex + 1).padStart(2, '0');
        if (counterTotal)
            counterTotal.textContent = String(total).padStart(2, '0');
        const railItems = section.querySelectorAll('.proj-rail-item');
        railItems.forEach((item, i) => {
            item.classList.toggle('active', i === currentIndex);
        });
    }
    railContainer?.addEventListener('click', (e) => {
        const item = e.target.closest('.proj-rail-item');
        if (item && item.dataset.index) {
            const idx = parseInt(item.dataset.index, 10);
            const dir = idx > currentIndex ? 'next' : 'prev';
            goToIndex(idx, dir);
        }
    });
    let lastWheelTime = 0;
    const showcaseWrap = section.querySelector('#proj-showcase');
    showcaseWrap?.addEventListener('wheel', (e) => {
        const now = Date.now();
        if (now - lastWheelTime < 400)
            return;
        const visibleCards = getVisibleCards();
        if (e.deltaY > 25 && currentIndex < visibleCards.length - 1) {
            e.preventDefault();
            lastWheelTime = now;
            goToIndex(currentIndex + 1, 'next');
        }
        else if (e.deltaY < -25 && currentIndex > 0) {
            e.preventDefault();
            lastWheelTime = now;
            goToIndex(currentIndex - 1, 'prev');
        }
    }, { passive: false });
    let touchStartY = 0;
    showcaseWrap?.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    showcaseWrap?.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diffY = touchStartY - touchEndY;
        const visibleCards = getVisibleCards();
        if (diffY > 40 && currentIndex < visibleCards.length - 1) {
            goToIndex(currentIndex + 1, 'next');
        }
        else if (diffY < -40 && currentIndex > 0) {
            goToIndex(currentIndex - 1, 'prev');
        }
    }, { passive: true });
    section.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter || 'all';
            section.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const allCards = getCards();
            let matchCount = 0;
            allCards.forEach(card => {
                const cat = card.dataset.category || '';
                const matches = filter === 'all' || cat === filter;
                if (matches) {
                    card.style.display = 'block';
                    matchCount++;
                }
                else {
                    card.style.display = 'none';
                    card.classList.remove('active');
                }
            });
            if (matchCount === 0 && emptyCard) {
                emptyCard.classList.remove('hidden');
            }
            else if (emptyCard) {
                emptyCard.classList.add('hidden');
            }
            const railItems = section.querySelectorAll('.proj-rail-item');
            railItems.forEach((item, i) => {
                item.style.display = i < matchCount ? 'flex' : 'none';
            });
            currentIndex = 0;
            const visible = getVisibleCards();
            visible.forEach((c, i) => c.classList.toggle('active', i === 0));
            updateUI();
        });
    });
    section.querySelectorAll('.card-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const project = projectsList.find(p => p.id === id);
            if (project)
                openModal(project, section);
        });
    });
    updateUI();
}
function openModal(project, section) {
    const overlay = section.querySelector('#project-modal');
    const content = section.querySelector('#modal-content');
    if (!overlay || !content)
        return;
    content.innerHTML = `
    <button class="modal-close-btn" id="modal-close" aria-label="Close">✕</button>
    <div class="modal-hero ${project.gradient}">
      <div class="card-bg-noise"></div>
      <span class="modal-hero-emoji">${project.emoji}</span>
    </div>
    <div class="modal-body">
      <p class="modal-badge">${categoryLabel(project.category)}</p>
      <h2 class="modal-title">${project.title}</h2>
      <p class="modal-desc">${project.description}</p>
      <div class="modal-section">
        <h4 class="modal-subheading">✨ Key Highlights</h4>
        <ul class="modal-features">
          ${project.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
      <div class="modal-section">
        <h4 class="modal-subheading">🛠 Tech Stack</h4>
        <div class="proj-slide-tech" style="margin-top:10px">
          ${project.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
        </div>
      </div>
      ${project.github ? `
      <div class="modal-actions">
        <a href="${project.github}" target="_blank" rel="noopener" class="glass-btn primary-btn">View on GitHub Repository ↗</a>
      </div>` : ''}
    </div>
  `;
    content.querySelector('#modal-close')?.addEventListener('click', () => closeModal(section));
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function closeModal(section) {
    section.querySelector('#project-modal')?.classList.add('hidden');
    document.body.style.overflow = '';
}
