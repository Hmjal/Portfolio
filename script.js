// ── Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightNavLink();
});

// ── Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Active nav link on scroll
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY;
  sections.forEach(sec => {
    const top    = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

// ── Contact form pseudo-submit
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// ── Intersection Observer: fade-in cards
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity  = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

// ── Certificate Modal Functions
function openCertModal(imageSrc, title) {
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  if (modal && modalImg) {
    modalImg.src = imageSrc;
    if (modalTitle) modalTitle.textContent = title;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeCertModal() {
  const modal = document.getElementById('certModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCertModal();
});

document.querySelectorAll('.project-card, .skill-card, .stat-card, .cert-card').forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

