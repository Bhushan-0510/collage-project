// ==========================================
// ARMS - Modern Education Software Website
// JavaScript for Animations & Interactions
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // NAVBAR SCROLL EFFECT
  // ==========================================
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-lg');
    } else {
      navbar.classList.remove('shadow-lg');
    }
  });
  
  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
  
  // ==========================================
  // FLOATING PARTICLES ANIMATION
  // ==========================================
  function createParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.animationDuration = `${15 + Math.random() * 10}s`;
      heroParticles.appendChild(particle);
    }
  }
  
  createParticles();
  
  // ==========================================
  // SCROLL REVEAL ANIMATIONS (AOS-like)
  // ==========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);
  
  // Observe all elements with data-aos attribute
  const aosElements = document.querySelectorAll('[data-aos]');
  aosElements.forEach(element => {
    observer.observe(element);
  });
  
  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ==========================================
  // FORM VALIDATION & INTERACTION
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Basic validation
      if (!name || !email || !subject || !message) {
        showNotification('Please fill in all required fields.', 'warning');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'warning');
        return;
      }
      
      // Show success message
      showNotification('Message sent successfully! We will get back to you soon.', 'success');
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // ==========================================
  // LOGIN FORM HANDLING - UPDATED FOR LOCALHOST REDIRECT
  // ==========================================
  window.loginRedirect = function() {
    const userId = document.getElementById('userId').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Basic validation
    if (!userId || !password) {
      showNotification('Please enter both User ID and Password.', 'warning');
      return;
    }
    
    // Show loading state
    showNotification('Authenticating...', 'info');
    
    // ============================================
    // MOCK AUTHENTICATION (Replace with real API call later)
    // ============================================
    
    // Determine role based on userId pattern
    let role = "student"; // default
    let collegeCode = "ABC123";

    if (userId.toLowerCase().startsWith('sa')) {
      role = "superadmin";
    } else if (userId.toLowerCase().startsWith('admin')) {
      role = "admin";
    } else if (userId.toLowerCase().startsWith('fac')) {
      role = "faculty";
    } else {
      role = "student";
    }

    // Create token object
    const token = {
      role: role,
      collegeCode: collegeCode,
      userId: userId,
      loginTime: new Date().toISOString()
    };

    // Encode token as URL parameter
    const encodedToken = encodeURIComponent(JSON.stringify(token));

    // Redirect to localhost with token
    setTimeout(() => {
      window.location.href = `http://localhost:5173/auth/callback?token=${encodedToken}`;
    }, 500);
  };
  
  // ==========================================
  // TOAST NOTIFICATION SYSTEM
  // ==========================================
  function showNotification(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
      toastContainer.style.zIndex = '9999';
      document.body.appendChild(toastContainer);
    }
    
    // Define toast colors based on type
    const typeColors = {
      success: 'bg-success',
      warning: 'bg-warning',
      danger: 'bg-danger',
      info: 'bg-primary'
    };
    
    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white border-0 ${typeColors[type] || typeColors.info}`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
    
    toastContainer.appendChild(toastEl);
    
    // Initialize and show toast
    const toast = new bootstrap.Toast(toastEl, {
      autohide: true,
      delay: 4000
    });
    toast.show();
    
    // Remove toast element after it's hidden
    toastEl.addEventListener('hidden.bs.toast', function() {
      toastEl.remove();
    });
  }
  
  // ==========================================
  // BACK TO TOP BUTTON
  // ==========================================
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // ==========================================
  // CARD HOVER EFFECTS
  // ==========================================
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    }); 
  });
  
  // ==========================================
  // ACTIVE NAV LINK HIGHLIGHTING
  // ==========================================
  const currentLocation = window.location.pathname.split('/').pop();
  const menuItems = document.querySelectorAll('.navbar-nav .nav-link');
  
  menuItems.forEach(item => {
    if (item.getAttribute('href') === currentLocation || 
        (currentLocation === '' && item.getAttribute('href') === 'index.html')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
  
  // ==========================================
  // PARALLAX EFFECT ON HERO
  // ==========================================
  const heroContent = document.querySelector('.hero-content');
  
  if (heroContent) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 800);
      }
    });
  }
  
  // ==========================================
  // FORM INPUT ANIMATIONS
  // ==========================================
  const formInputs = document.querySelectorAll('.form-control, .form-select');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (this.value === '') {
        this.parentElement.classList.remove('focused');
      }
    });
  });
  
  // ==========================================
  // ACCESSIBILITY ENHANCEMENTS
  // ==========================================
  
  // Keyboard navigation for cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
  });
  
  // Focus trap in mobile menu when open
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapseEl = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapseEl) {
    navbarCollapseEl.addEventListener('shown.bs.collapse', function() {
      const firstLink = this.querySelector('.nav-link');
      if (firstLink) firstLink.focus();
    });
    
    navbarCollapseEl.addEventListener('hidden.bs.collapse', function() {
      navbarToggler.focus();
    });
  }
  
  // ==========================================
  // PERFORMANCE OPTIMIZATION
  // ==========================================
  
  // Throttle scroll events
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // ==========================================
  // PAGE LOAD ANIMATION
  // ==========================================
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add stagger animation to hero content
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
      element.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`;
    });
  });
  
  // ==========================================
  // CONSOLE LOG
  // ==========================================
  console.log('%c🎓 ARMS - Academic Resource Management System', 'color: #6366f1; font-size: 20px; font-weight: bold;');
  console.log('%c✨ Modern Education Software Platform', 'color: #764ba2; font-size: 14px;');
  
});
