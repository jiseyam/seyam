// Floating capsule Navbar component
export function createNavbar() {
    const header = document.createElement('header');
    header.className = 'glass-header';
    header.innerHTML = `
    <nav class="glass-nav" role="navigation" aria-label="Main navigation">
      <div class="nav-sheen"></div>
      <ul class="nav-links" role="list">
        <li>
          <a href="#home" class="nav-link active" id="nav-home" aria-label="Go to home section">
            <svg class="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="#about" class="nav-link" id="nav-about" aria-label="Go to about section">
            <svg class="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>
            <span>About</span>
          </a>
        </li>
        <li>
          <a href="#skills" class="nav-link" id="nav-skills" aria-label="Go to skills section">
            <svg class="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span>Skills</span>
          </a>
        </li>
        <li>
          <a href="#projects" class="nav-link" id="nav-projects" aria-label="Go to projects section">
            <svg class="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="6" height="4" rx="1"/><rect x="9" y="3" width="13" height="4" rx="1"/><rect x="2" y="10" width="13" height="4" rx="1"/><rect x="18" y="10" width="4" height="4" rx="1"/><rect x="2" y="17" width="4" height="4" rx="1"/><rect x="9" y="17" width="13" height="4" rx="1"/></svg>
            <span>Apps</span>
          </a>
        </li>
        <li>
          <a href="#contact" class="nav-link" id="nav-contact" aria-label="Go to contact section">
            <svg class="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>Contact</span>
          </a>
        </li>
      </ul>
    </nav>
  `;
    // Smooth scroll on nav click
    header.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (!href)
                return;
            const target = document.querySelector(href);
            target?.scrollIntoView({ behavior: 'smooth' });
        });
    });
    return header;
}
