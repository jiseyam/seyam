// Footer Component
export function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'glass-footer';
    footer.innerHTML = `
    <div class="container footer-inner">
      <p class="footer-name">Jihadul Islam Seyam</p>
      <p class="footer-copy">
        &copy; ${new Date().getFullYear()} — Crafted with 🦋 Flutter passion & TypeScript precision.
      </p>
      <p class="footer-made-with">
        Made with <span class="heart">♥</span> in Dhaka, Bangladesh
      </p>
    </div>
  `;
    return footer;
}
