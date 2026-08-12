/* ==========================================================================
   Milton Chino - Portfolio Interactive Scripts
   Light Theme Handler, QA Tabs, Main Project Showcase & Modal Controls
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // --------------------------------------------------
  // 1. Theme Toggle Handler (Default Light Mode)
  // --------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  if (themeToggleBtn) {
    // Check saved theme or default to light
    const savedTheme = localStorage.getItem('mc_portfolio_theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('mc_portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
      } else {
        icon.className = 'fa-solid fa-moon';
      }
    }
  }

  // --------------------------------------------------
  // 2. Mobile Menu Toggle
  // --------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close mobile nav when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // --------------------------------------------------
  // 3. Smooth Navigation & Scroll Active State
  // --------------------------------------------------
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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

  // --------------------------------------------------
  // 4. Main Project Placeholder Link Listener
  // --------------------------------------------------
  const mainProjectLiveLink = document.getElementById('main-project-live-link');
  if (mainProjectLiveLink) {
    mainProjectLiveLink.addEventListener('click', (e) => {
      const href = mainProjectLiveLink.getAttribute('href');
      if (href === '#' || href === '') {
        e.preventDefault();
        alert('Notice: This is a placeholder link for your Featured Showcase Project.\n\nTo add your actual URL, open portfolio/v1/index.html and update line 185: href="YOUR_URL_HERE".');
      }
    });
  }

  // Add click to zoom on main image preview
  const mainHeroImg = document.getElementById('current-hero-img');
  if (mainHeroImg) {
    mainHeroImg.addEventListener('click', () => {
      openModal(mainHeroImg.src);
    });
  }

});

// --------------------------------------------------
// 5. Featured Gallery Image Switcher
// --------------------------------------------------
function switchMainImage(imagePath, caption) {
  const currentHeroImg = document.getElementById('current-hero-img');
  if (currentHeroImg) {
    currentHeroImg.style.opacity = '0.5';
    setTimeout(() => {
      currentHeroImg.src = imagePath;
      currentHeroImg.alt = caption || 'Main Project Showcase';
      currentHeroImg.style.opacity = '1';
    }, 150);
  }
}

// --------------------------------------------------
// 6. Interactive Troubleshooting QA Tabs
// --------------------------------------------------
function switchTab(tabId) {
  // Remove active from all tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Hide all tab content panes
  document.querySelectorAll('.tab-content').forEach(pane => {
    pane.classList.remove('active');
  });

  // Activate selected button and tab
  const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => 
    btn.getAttribute('onclick').includes(tabId)
  );
  if (activeBtn) activeBtn.classList.add('active');

  const selectedPane = document.getElementById(tabId);
  if (selectedPane) selectedPane.classList.add('active');
}

// --------------------------------------------------
// 7. Lightbox Modal Controls
// --------------------------------------------------
function openModal(imgSrc) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img-display');
  if (modal && modalImg) {
    modalImg.src = imgSrc;
    modal.classList.add('active');
  }
}

function closeModal() {
  const modal = document.getElementById('image-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}
