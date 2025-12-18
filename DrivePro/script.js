document.addEventListener('DOMContentLoaded', () => {
    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            console.log('Form submitted:', data);
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add mobile menu logic here if needed in the future
    // For now, the layout is simple enough or uses CSS hover/media queries

    // Sticky Navbar Scroll Effect
    const header = document.querySelector('.header-main');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const headerNav = document.querySelector('.header-nav');
    const headerActions = document.querySelector('.header-actions');
    const menuClose = document.querySelector('.menu-close');

    function toggleMenu() {
        if (headerNav) headerNav.classList.toggle('active');
        if (headerActions) headerActions.classList.toggle('active');
        if (menuToggle) menuToggle.classList.toggle('active');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (menuClose) {
        menuClose.addEventListener('click', toggleMenu);
    }

    // Toggle Pricing Features
    const featureToggles = document.querySelectorAll('.toggle-features');
    featureToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const list = toggle.nextElementSibling;
            if (list && list.classList.contains('features-list')) {
                list.classList.toggle('visible');
                // Toggle text symbol
                if (list.classList.contains('visible')) {
                    toggle.textContent = toggle.textContent.replace('+', '-');
                } else {
                    toggle.textContent = toggle.textContent.replace('-', '+');
                }
            }
        });
    });
});
