// ==========================================
// ARMS - Modern Education Software Website
// JavaScript for Parallax, Animations & Interactions
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // NAVBAR SCROLL EFFECT
  // ==========================================
  
  const navbar = document.querySelector('.navbar');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  // Add scrolled class to navbar on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (navbarToggle) {
    navbarToggle.addEventListener('click', function() {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.navbar-menu .nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
      });
    });
  }
  
  // ==========================================
  // PARALLAX SCROLLING EFFECT
  // ==========================================
  
  const heroContent = document.querySelector('.hero-content');
  
  if (heroContent) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const heroSection = document.querySelector('.hero');
      
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const heroTop = heroSection.offsetTop;
        
        // Only apply parallax if hero is still in view
        if (scrolled < heroTop + heroHeight) {
          heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
          // Keep text visible with minimum opacity of 0.4
          const opacity = Math.max(0.4, 1 - (scrolled / (heroHeight * 1.5)));
          heroContent.style.opacity = opacity;
        } else {
          // Restore visibility when scrolled past hero
          heroContent.style.opacity = 1;
          heroContent.style.transform = 'translateY(0)';
        }
      }
    });
  }
  
  // ==========================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================
  
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
  
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);
    
    // Observe all scroll-reveal elements
    revealElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback: Show all elements immediately if IntersectionObserver is not supported
    revealElements.forEach(element => {
      element.classList.add('active');
    });
  }
  
  // ==========================================
  // FEATURE CARDS STAGGER ANIMATION
  // ==========================================
  
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('scroll-reveal');
  });
  
  const facultyCards = document.querySelectorAll('.faculty-card');
  facultyCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('scroll-reveal');
  });
  
  const syllabusItems = document.querySelectorAll('.syllabus-item');
  syllabusItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('scroll-reveal-left');
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
  // ACTIVE NAV LINK HIGHLIGHTING
  // ==========================================
  
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-menu .nav-link');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
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
  // FORM VALIDATION & INTERACTION
  // ==========================================
  
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
    
    inputs.forEach(input => {
      // Add floating label effect
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        if (this.value === '') {
          this.parentElement.classList.remove('focused');
        }
      });
      
      // Real-time validation
      input.addEventListener('input', function() {
        validateField(this);
      });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });
      
      if (isValid) {
        // Show success message
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        contactForm.reset();
      } else {
        showNotification('Please fill in all fields correctly.', 'error');
      }
    });
  }
  
  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    if (value === '') {
      isValid = false;
      field.classList.add('error');
    } else if (field.type === 'email' && !isValidEmail(value)) {
      isValid = false;
      field.classList.add('error');
    } else {
      field.classList.remove('error');
    }
    
    return isValid;
  }
  
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // ==========================================
  // LOGIN FORM HANDLING
  // ==========================================
  
  window.loginRedirect = function() {
    const roleSelect = document.getElementById('role');
    const userIdInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    
    // Basic validation
    if (!userIdInput || !passwordInput) {
      showNotification('Please enter your credentials.', 'error');
      return;
    }
    
    const userId = userIdInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (userId === '' || password === '') {
      showNotification('Please enter both User ID and Password.', 'error');
      return;
    }
    
    const role = roleSelect ? roleSelect.value : 'student';
    
    // Show loading state
    showNotification('Authenticating...', 'info');
    
    // Simulate authentication delay
    setTimeout(() => {
      if (role === 'student') {
        showNotification('Student Dashboard will open after backend integration.', 'info');
      } else if (role === 'staff') {
        showNotification('Staff Dashboard will open after backend integration.', 'info');
      } else if (role === 'admin') {
        showNotification('Admin Panel will open after backend integration.', 'info');
      }
    }, 1000);
  };
  
  // ==========================================
  // NOTIFICATION SYSTEM
  // ==========================================
  
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 2rem;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      animation: slideInRight 0.4s ease-out;
      max-width: 400px;
      font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.4s ease-out';
      setTimeout(() => {
        notification.remove();
      }, 400);
    }, 4000);
  }
  
  // ==========================================
  // CARD TILT EFFECT (3D)
  // ==========================================
  
  const tiltCards = document.querySelectorAll('.feature-card, .faculty-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
  
  // ==========================================
  // CURSOR FOLLOW EFFECT
  // ==========================================
  
  let cursor = null;
  let cursorFollower = null;
  
  function initCustomCursor() {
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease;
    `;
    
    cursorFollower = document.createElement('div');
    cursorFollower.className = 'custom-cursor-follower';
    cursorFollower.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid rgba(99, 102, 241, 0.3);
      pointer-events: none;
      z-index: 9998;
      transition: all 0.15s ease;
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    document.addEventListener('mousemove', function(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      setTimeout(() => {
        cursorFollower.style.left = (e.clientX - 20) + 'px';
        cursorFollower.style.top = (e.clientY - 20) + 'px';
      }, 50);
    });
    
    // Scale cursor on clickable elements
    const clickables = document.querySelectorAll('a, button, input, select, textarea');
    clickables.forEach(element => {
      element.addEventListener('mouseenter', function() {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
      });
      
      element.addEventListener('mouseleave', function() {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
      });
    });
  }
  
  // Only initialize custom cursor on desktop
  if (window.innerWidth > 768) {
    initCustomCursor();
  }
  
  // ==========================================
  // PERFORMANCE OPTIMIZATION
  // ==========================================
  
  // Debounce function for scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Throttle function for scroll events
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // ==========================================
  // PAGE LOAD ANIMATION
  // ==========================================
  
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero content sequentially
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.animation = `fadeInUp 0.8s ease-out forwards`;
      }, index * 100);
    });
  });
  
  // ==========================================
  // BACK TO TOP BUTTON
  // ==========================================
  
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
  `;
  
  document.body.appendChild(backToTop);
  
  window.addEventListener('scroll', throttle(function() {
    if (window.scrollY > 500) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  }, 100));
  
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  backToTop.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.5)';
  });
  
  backToTop.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.4)';
  });
  
  // ==========================================
  // ACCESSIBILITY ENHANCEMENTS
  // ==========================================
  
  // Keyboard navigation for mobile menu
  if (navbarToggle) {
    navbarToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  }
  
  // Focus trap in mobile menu when open
  const focusableElements = 'a[href], button, input, select, textarea';
  
  if (navbarMenu) {
    navbarMenu.addEventListener('keydown', function(e) {
      if (e.key === 'Tab' && this.classList.contains('active')) {
        const focusable = Array.from(this.querySelectorAll(focusableElements));
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];
        
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
      
      // Close menu on Escape
      if (e.key === 'Escape' && this.classList.contains('active')) {
        navbarToggle.click();
        navbarToggle.focus();
      }
    });
  }
  
  // ==========================================
  // PRINT STYLES
  // ==========================================
  
  window.addEventListener('beforeprint', function() {
    // Expand all collapsed sections before printing
    document.querySelectorAll('.collapse').forEach(element => {
      element.classList.add('show');
    });
  });
  
  console.log('%c🎓 ARMS - Academic Resource Management System', 'color: #667eea; font-size: 20px; font-weight: bold;');
  console.log('%c✨ Modern Education Software Platform', 'color: #764ba2; font-size: 14px;');
  
});
