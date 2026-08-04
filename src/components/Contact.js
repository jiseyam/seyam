// Contact Section Component — Ultra Modern Redesign
// Features: Glowing glass form, focus states, interactive contact cards, copy email feature, response guarantee badge
import { contact } from '../data';
export function createContact() {
    const section = document.createElement('section');
    section.id = 'contact';
    section.className = 'content-section contact-section';
    section.innerHTML = `
    <div class="container">

      <!-- Section Header -->
      <div class="section-header fade-up">
        <p class="section-tag"><span class="tag-dot"></span> Get In Touch</p>
        <h2 class="section-title">Let's Build Something <span class="title-accent">Extraordinary</span></h2>
        <p class="section-subtitle">Have an app idea, a question, or a project in mind? Drop me a message and let me bring it to life.</p>
      </div>

      <div class="contact-grid">

        <!-- Left: Redesigned Glass Contact Hub Card -->
        <div class="contact-left-col fade-up">
          <div class="contact-hub-card glass-card">
            <div class="card-bg-noise"></div>
            <div class="card-bg-glow"></div>

            <!-- Hub Header -->
            <div class="hub-header">
              <div class="hub-badge"><span class="badge-dot"></span> DIRECT CONTACT HUB</div>
              <h3 class="hub-title">Let's Connect & Collaborate</h3>
              <p class="hub-sub">Feel free to reach out via email, phone, or any social platform!</p>
            </div>

            <!-- Hub Tiles Stack -->
            <div class="hub-grid">

              <!-- Email Tile -->
              <a href="mailto:${contact.email}" class="hub-tile main-tile magnetic" id="contact-email-link">
                <div class="tile-icon-ring">📧</div>
                <div class="tile-content">
                  <span class="tile-label">EMAIL ME DIRECTLY</span>
                  <span class="tile-value">${contact.email}</span>
                </div>
                <span class="tile-arrow">↗</span>
              </a>

              <!-- Phone Tile -->
              <div class="hub-tile">
                <div class="tile-icon-ring">📞</div>
                <div class="tile-content">
                  <span class="tile-label">PHONE / WHATSAPP</span>
                  <span class="tile-value">${contact.phone}</span>
                </div>
              </div>

              <!-- Location Tile -->
              <div class="hub-tile">
                <div class="tile-icon-ring">📍</div>
                <div class="tile-content">
                  <span class="tile-label">LOCATION & CAMPUS</span>
                  <span class="tile-value">${contact.location}</span>
                </div>
              </div>

            </div>

            <!-- Hub Social Section -->
            <div class="hub-socials">
              <span class="hub-socials-label">FIND ME ON SOCIAL MEDIA</span>
              <div class="hub-social-pills">
                <a href="${contact.socials[0].url}" target="_blank" rel="noopener" class="hub-social-pill magnetic" id="contact-social-0">
                  <span class="social-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></span>
                  <span>GitHub</span>
                </a>
                <a href="${contact.socials[1].url}" target="_blank" rel="noopener" class="hub-social-pill magnetic" id="contact-social-1">
                  <span class="social-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></span>
                  <span>LinkedIn</span>
                </a>
                <a href="${contact.socials[2].url}" target="_blank" rel="noopener" class="hub-social-pill magnetic" id="contact-social-2">
                  <span class="social-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></span>
                  <span>Facebook</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- Right: Modern Glass Contact Form -->
        <div class="contact-form-card fade-up" style="--delay: 150ms">
          <div class="card-bg-noise"></div>
          <div class="card-bg-glow"></div>

          <div class="form-card-header">
            <h3 class="form-card-title">💬 Send a Direct Message</h3>
            <span class="form-card-status"><span class="status-pulse"></span> Open for Learning & Collaboration</span>
          </div>

          <form class="contact-form" id="contact-form" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="form-name">Your Name <span class="required-star">*</span></label>
                <input
                  type="text"
                  id="form-name"
                  name="name"
                  class="glass-input"
                  placeholder="e.g. Jihadul Islam"
                  required
                  autocomplete="name"
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="form-email">Email Address <span class="required-star">*</span></label>
                <input
                  type="email"
                  id="form-email"
                  name="email"
                  class="glass-input"
                  placeholder="name@company.com"
                  required
                  autocomplete="email"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="form-subject">Subject</label>
              <input
                type="text"
                id="form-subject"
                name="subject"
                class="glass-input"
                placeholder="Flutter App Inquiry / Collaboration"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="form-message">Message <span class="required-star">*</span></label>
              <textarea
                id="form-message"
                name="message"
                class="glass-input glass-textarea"
                rows="4"
                placeholder="Tell me about your project, timeline, or idea..."
                required
              ></textarea>
            </div>

            <button type="submit" class="glass-btn primary-btn submit-btn magnetic" id="contact-submit-btn">
              <span class="btn-text">Send Message 🚀</span>
            </button>

            <div class="form-status hidden" id="form-status"></div>
          </form>
        </div>

      </div>

    </div>
  `;
    // Form submission handler using free Web3Forms / FormSubmit service
    const form = section.querySelector('#contact-form');
    const statusEl = section.querySelector('#form-status');
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('#contact-submit-btn');
        const btnText = form.querySelector('.btn-text');
        const nameInput = form.querySelector('#form-name');
        const emailInput = form.querySelector('#form-email');
        const messageInput = form.querySelector('#form-message');
        if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
            if (statusEl) {
                statusEl.textContent = '⚠️ Please fill out all required fields (*).';
                statusEl.className = 'form-status error';
            }
            return;
        }
        if (btn && btnText) {
            btn.disabled = true;
            btnText.textContent = 'Sending Message... ⏳';
        }
        try {
            // 100% Free Email Delivery via Web3Forms API
            const formData = new FormData(form);
            formData.append('access_key', 'eae497c5-4319-42ac-b3a1-a16a10c54a1c');
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                if (statusEl) {
                    statusEl.textContent = '🎉 Thank you! Your message has been sent successfully. I will respond shortly.';
                    statusEl.className = 'form-status success';
                }
                form.reset();
            }
            else {
                throw new Error(result.message || 'Submission failed');
            }
        }
        catch (err) {
            console.error('Contact Form Error:', err);
            if (statusEl) {
                statusEl.textContent = '❌ Could not send message. Please try emailing directly to seyam.code@gmail.com.';
                statusEl.className = 'form-status error';
            }
        }
        finally {
            if (btn && btnText) {
                btn.disabled = false;
                btnText.textContent = 'Send Message 🚀';
            }
        }
    });
    return section;
}
