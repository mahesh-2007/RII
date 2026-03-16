// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ── CONTACT FORM ──

// --- EMAILJS CONFIGURATION (replace these with your own values) ---
const EMAILJS_USER_ID = 'pavipavi8087@gmail.com';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

// NOTE: EmailJS won't work when opening the page as a local file (file://).
//       Serve it over http:// or https:// (e.g., via a simple local server).

if (typeof emailjs !== 'undefined' && EMAILJS_USER_ID && !EMAILJS_USER_ID.includes('YOUR_')) {
  emailjs.init(EMAILJS_USER_ID);
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = this.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = 'Sending…';
    btn.disabled = true;

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const templateParams = {
      to_email: 'pavipavi8087@gmail.com',
      first_name: data.firstName || '',
      last_name: data.lastName || '',
      email: data.email || '',
      phone: data.phone || '',
      booking_type: data.bookingType || '',
      message: data.message || ''
    };

    const serviceId = EMAILJS_SERVICE_ID;
    const templateId = EMAILJS_TEMPLATE_ID;

    const missingConfig =
      typeof emailjs === 'undefined' ||
      !EMAILJS_USER_ID || EMAILJS_USER_ID.includes('YOUR_') ||
      !serviceId || serviceId.includes('YOUR_') ||
      !templateId || templateId.includes('YOUR_');

    if (missingConfig) {
      console.warn('EmailJS not configured. Replace EMAILJS_USER_ID, EMAILJS_SERVICE_ID, and EMAILJS_TEMPLATE_ID in main.js with your values.');
      console.warn('Also, EmailJS requires the page to be served over http:// or https:// (not file://).');
      btn.textContent = '⚠️ Not Configured';
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 2000);
      return;
    }

    emailjs.send(serviceId, templateId, templateParams)
      .then(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#2A7A3B';
        btn.style.color = '#fff';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        btn.textContent = '❌ Send Failed';
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 3000);
      });
  });
}

// ── SMOOTH NAV HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--gold)' : '';
  });
});
