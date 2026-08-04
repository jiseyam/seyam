// Skills Section Component — 100% Full-Bleed Infinite Seamless Marquee
import { skills, techTags } from '../data';
export function createSkills() {
    const section = document.createElement('section');
    section.id = 'skills';
    section.className = 'content-section skills-section';
    const tagsLeft = [...techTags];
    const tagsRight = [...techTags].reverse();
    const pillsLeftHTML = tagsLeft.map(tag => `<span class="marquee-pill">${tag}</span>`).join('');
    const pillsRightHTML = tagsRight.map(tag => `<span class="marquee-pill alt">${tag}</span>`).join('');
    section.innerHTML = `
    <div class="container skills-container">

      <!-- Section Header -->
      <div class="section-header fade-up">
        <p class="section-tag"><span class="tag-dot"></span> Tech Stack & Orbit</p>
        <h2 class="section-title">My Skill Galaxy</h2>
        <p class="section-subtitle">Hover over any skill node in the orbit to explore my proficiency & expertise.</p>
      </div>

      <!-- Centered Galaxy Orbit Showcase -->
      <div class="skills-galaxy-wrapper fade-up" style="--delay: 100ms">

        <!-- Center Node -->
        <div class="galaxy-center-node">
          <div class="galaxy-pulse-ring ring-1"></div>
          <div class="galaxy-pulse-ring ring-2"></div>
          <div class="galaxy-pulse-ring ring-3"></div>
          <span class="galaxy-center-emoji">🦋</span>
          <span class="galaxy-center-title">Skill Galaxy</span>
          <span class="galaxy-center-sub">Cross-Platform Specialist</span>
        </div>

        <!-- Orbiting Skill Badges -->
        ${skills.map((s, i) => `
          <div class="galaxy-skill-badge orbit-pos-${i}" style="--orbit-delay: ${i * 0.4}s">
            <div class="badge-inner">
              <span class="skill-badge-icon">${s.icon}</span>
              <div class="skill-badge-text">
                <strong>${s.name}</strong>
                <span>${s.level}% Proficiency</span>
              </div>
            </div>
          </div>
        `).join('')}

      </div>

    </div>

    <!-- 100% Full-Bleed Edge-to-Edge Infinite Dual Marquee Stream -->
    <div class="tech-marquee-wrapper fade-up" style="--delay: 200ms">
      
      <!-- Top Track: Left Scrolling -->
      <div class="marquee-track marquee-left">
        <div class="marquee-content">
          ${pillsLeftHTML}
        </div>
        <div class="marquee-content" aria-hidden="true">
          ${pillsLeftHTML}
        </div>
      </div>

      <!-- Bottom Track: Right Scrolling -->
      <div class="marquee-track marquee-right">
        <div class="marquee-content">
          ${pillsRightHTML}
        </div>
        <div class="marquee-content" aria-hidden="true">
          ${pillsRightHTML}
        </div>
      </div>

    </div>
  `;
    return section;
}
