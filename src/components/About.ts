// About Section Component — Terminal & Bento Grid Redesign

import { aboutBio, highlights } from '../data';

export function createAbout(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'about';
  section.className = 'content-section about-section';

  section.innerHTML = `
    <div class="container">

      <!-- Section Header -->
      <div class="section-header fade-up">
        <p class="section-tag"><span class="tag-dot"></span> Developer Identity</p>
        <h2 class="section-title">Inside the Mind of Seyam</h2>
        <p class="section-subtitle">A CSE student at Green University of Bangladesh learning software engineering with C, Java, JS, React, Python, Dart & Flutter.</p>
      </div>

      <div class="about-bento-layout">

        <!-- Left: Developer Code Terminal -->
        <div class="about-terminal-card fade-up">
          <div class="terminal-topbar">
            <div class="terminal-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="terminal-filename">seyam_profile.dart</span>
            <button class="terminal-copy-btn" id="terminal-copy-btn">Copy</button>
          </div>

          <div class="terminal-code-body">
            <div class="code-line"><span class="ln">01</span><span class="kw">class</span> <span class="cls">Student</span> {</div>
            <div class="code-line"><span class="ln">02</span>  <span class="kw">final</span> <span class="typ">String</span> name = <span class="str">'Jihadul Islam Seyam'</span>;</div>
            <div class="code-line"><span class="ln">03</span>  <span class="kw">final</span> <span class="typ">String</span> role = <span class="str">'Aspiring Software Engineer'</span>;</div>
            <div class="code-line"><span class="ln">04</span>  <span class="kw">final</span> <span class="typ">String</span> university = <span class="str">'Green University of BD'</span>;</div>
            <div class="code-line"><span class="ln">05</span>  <span class="kw">final</span> <span class="typ">List</span>&lt;<span class="typ">String</span>&gt; learning = [</div>
            <div class="code-line"><span class="ln">06</span>    <span class="str">'C'</span>, <span class="str">'Java'</span>, <span class="str">'JS'</span>, <span class="str">'React'</span>, <span class="str">'Python'</span>, <span class="str">'Dart'</span>, <span class="str">'Flutter'</span></div>
            <div class="code-line"><span class="ln">07</span>  ];</div>
            <div class="code-line"><span class="ln">08</span>  <span class="kw">final</span> <span class="typ">bool</span> isLearning = <span class="num">true</span>;</div>
            <div class="code-line"><span class="ln">09</span>}</div>
            <div class="code-line"><span class="ln">10</span></div>
            <div class="code-line"><span class="ln">11</span><span class="cmt">// "Learning every day to become a software engineer."</span></div>
            <div class="code-line"><span class="ln">12</span><span class="kw">void</span> main() => Student().buildFuture();</div>
          </div>

          <div class="terminal-footer">
            <span class="terminal-status"><span class="status-dot"></span> Learning & Building</span>
            <span class="terminal-lang">Dart 3.2</span>
          </div>
        </div>

        <!-- Right: Bento Grid Stack -->
        <div class="about-bento-grid">

          <!-- Bento 1: Education Card -->
          <div class="bento-box bento-edu fade-up" style="--delay: 100ms">
            <div class="bento-icon-ring">🎓</div>
            <div class="bento-content">
              <span class="bento-badge">EDUCATION</span>
              <h3 class="bento-title">Green University of Bangladesh</h3>
              <p class="bento-desc">BSc in Computer Science & Engineering (Ongoing). Deepening core CS fundamentals, data structures, algorithms, and software design.</p>
            </div>
          </div>

          <!-- Bento 2: Software Engineering Focus -->
          <div class="bento-box bento-flutter fade-up" style="--delay: 200ms">
            <div class="bento-icon-ring">💻</div>
            <div class="bento-content">
              <span class="bento-badge">GOAL</span>
              <h3 class="bento-title">Aspiring Software Engineer</h3>
              <p class="bento-desc">Currently mastering C, Java, JS, React, Python, Dart & Flutter to build robust web and mobile applications.</p>
            </div>
          </div>

          <!-- Bento 3: Quick Stats -->
          <div class="bento-box bento-stats fade-up" style="--delay: 300ms">
            <div class="mini-stat-item">
              <span class="mini-stat-num">10+</span>
              <span class="mini-stat-lbl">Apps Built</span>
            </div>
            <div class="stat-divider-v"></div>
            <div class="mini-stat-item">
              <span class="mini-stat-num">3+</span>
              <span class="mini-stat-lbl">Years Learning</span>
            </div>
            <div class="stat-divider-v"></div>
            <div class="mini-stat-item">
              <span class="mini-stat-num">20+</span>
              <span class="mini-stat-lbl">Projects Done</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;

  // Terminal Copy Button functionality
  const copyBtn = section.querySelector<HTMLButtonElement>('#terminal-copy-btn');
  copyBtn?.addEventListener('click', () => {
    const code = `class Developer {
  final String name = 'Jihadul Islam Seyam';
  final String role = 'Flutter Mobile Developer';
  final String university = 'Green University of BD';
  final List<String> skills = ['Flutter', 'Dart', 'Firebase', 'BLoC', 'REST APIs'];
  final bool isAvailable = true;
}`;
    navigator.clipboard.writeText(code).then(() => {
      copyBtn.textContent = 'Copied! ✓';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
    });
  });

  return section;
}
