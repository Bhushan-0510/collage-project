function login() {
  const roleEl = document.getElementById("role");
  const role = roleEl ? roleEl.value.toLowerCase().trim() : "";

  if (!role) {
    alert('Please select a role');
    return;
  }

  if (role === "student") {
    window.location.href = "student-dashboard.html";
  } else if (role === "staff") {
    window.location.href = "staff-dashboard.html";
  } else if (role === "admin") {
    window.location.href = "admin-dashboard.html";
  } else {
    alert('Unknown role selected');
  }
}

document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      login();
    });
  }
  // highlight active navbar link
  function highlightActiveNav(){
    const navLinks = document.querySelectorAll('.navbar .nav-link, .navbar a.btn');
    const raw = window.location.pathname.split('/').pop();
    const current = raw === '' ? 'index.html' : raw;
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      const file = href.split('/').pop();
      if (file === current) {
        a.classList.add('active','fw-bold');
        a.setAttribute('aria-current','page');
      } else {
        a.classList.remove('active','fw-bold');
        a.removeAttribute('aria-current');
      }
    });
  }
  highlightActiveNav();
});
