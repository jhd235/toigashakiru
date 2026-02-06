/* ========================================
   Wedding Invitation — Тойға шақыру
   JavaScript: Animations, Countdown, RSVP
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ======================================
  // 1. Countdown Timer
  // ======================================
  const weddingDate = new Date('2026-03-28T19:00:00');

  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ======================================
  // 2. Scroll Animations (Intersection Observer)
  // ======================================
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // ======================================
  // 3. Floating Petals
  // ======================================
  const petalsContainer = document.getElementById('petals');
  const petalCount = 15;

  function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const startLeft = Math.random() * 100;
    const size = 8 + Math.random() * 10;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 10;
    const rotation = Math.random() * 360;

    petal.style.left = `${startLeft}%`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.transform = `rotate(${rotation}deg)`;

    petalsContainer.appendChild(petal);
  }

  for (let i = 0; i < petalCount; i++) {
    createPetal();
  }

  // ======================================
  // 4. RSVP Form
  // ======================================
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSuccess = document.getElementById('rsvpSuccess');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const guests = document.getElementById('guests').value;
      const wishes = document.getElementById('wishes').value;

      // Log the form data (in production, send to server)
      console.log('RSVP submitted:', { name, phone, guests, wishes });

      // Show success message
      rsvpForm.style.display = 'none';
      rsvpSuccess.style.display = 'block';

      // Smooth scroll to success message
      rsvpSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // ======================================
  // 5. Smooth scroll for anchor links
  // ======================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ======================================
  // 6. Parallax effect on hero (subtle)
  // ======================================
  const heroContent = document.querySelector('.hero-content');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroContent && scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
      heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 0.8;
    }
  });

});
