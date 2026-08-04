/**
 * VidrioMax Bolivia - Script Principal Interactivo
 * Cotizador de Servicios de Instalación (Vidrio, Aluminio y Policarbonato)
 * Más de 20 Años de Experiencia en Bolivia
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCalculator();
  initPortfolioFilter();
  initFaqAccordion();
  initSmoothScroll();
});

/* -------------------------------------------------------------------------- */
/* 1. Navbar Scroll Effect & Mobile Menu                                      */
/* -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 2. Cotizador Interactivo de Instalaciones (Vidrio, Aluminio, Policarbonato)*/
/* -------------------------------------------------------------------------- */
function initCalculator() {
  const calcForm = document.getElementById('glassCalcForm');
  const serviceTypeSelect = document.getElementById('calcService');
  const glassTypeSelect = document.getElementById('calcGlassType');
  const frameTypeSelect = document.getElementById('calcFrame');
  const widthInput = document.getElementById('calcWidth');
  const heightInput = document.getElementById('calcHeight');
  const citySelect = document.getElementById('calcCity');

  const resultPriceEl = document.getElementById('calcResultPrice');
  const resultAreaEl = document.getElementById('calcResultArea');
  const whatsappCtaBtn = document.getElementById('calcWhatsappBtn');

  // Comprehensive installation rates in Bolivianos (Bs. / m² installed)
  const materialPrices = {
    'templado_8mm': 360,           // Instalación Vidrio Templado 8mm
    'templado_10mm': 450,          // Instalación Vidrio Templado 10mm
    'policarbonato_alveolar': 280, // Instalación Techo Policarbonato Alveolar
    'policarbonato_compacto': 420, // Instalación Techo Policarbonato Compacto
    'compuesto_laminado': 540,      // Instalación Vidrio Laminado Compuesto
    'termoacustico_dvh': 720       // Instalación Vidrio Termoacústico DVH
  };

  const framePrices = {
    'aluminio_espanola': 220,      // Carpintería Aluminio Línea Española
    'aluminio_serie25': 130,       // Aluminio Serie 25 Estándar
    'sin_marco_inox': 180,         // Herrajes Acero Inoxidable / Spider
    'pvc_acustico': 290            // Estructura Aislante de PVC
  };

  const serviceMultipliers = {
    'ventana': 1.0,
    'box_bano': 1.05,
    'techo_vidrio': 1.25,          // Instalación de Techo/Cubierta (trabajo en altura/cubierta)
    'muro_cortina': 1.35,          // Fachadas de edificio (alta complejidad)
    'baranda': 1.20,
    'espejo': 0.95
  };

  function calculateQuote() {
    if (!calcForm) return;

    const width = parseFloat(widthInput.value) || 0;
    const height = parseFloat(heightInput.value) || 0;
    const service = serviceTypeSelect.value;
    const glassType = glassTypeSelect.value;
    const frameType = frameTypeSelect.value;
    const city = citySelect ? citySelect.value : 'Santa Cruz';

    const area = width * height;
    resultAreaEl.textContent = area > 0 ? area.toFixed(2) + ' m²' : '0.00 m²';

    if (area <= 0) {
      resultPriceEl.textContent = 'Bs. 0';
      whatsappCtaBtn.setAttribute('href', '#');
      return;
    }

    const baseMaterialRate = materialPrices[glassType] || 400;
    const baseFrameRate = framePrices[frameType] || 160;
    const multiplier = serviceMultipliers[service] || 1.0;

    // Minimum billable installation area (1 m²)
    const billableArea = Math.max(area, 1.0);
    
    // Total installation estimate
    const estimatedTotal = Math.round((baseMaterialRate + baseFrameRate) * billableArea * multiplier);

    // Formatted price range (Bs.)
    const minVal = Math.round(estimatedTotal * 0.95);
    const maxVal = Math.round(estimatedTotal * 1.05);

    resultPriceEl.textContent = `Bs. ${minVal.toLocaleString()} - ${maxVal.toLocaleString()}`;

    // Build pre-formatted WhatsApp Message
    const whatsappPhone = '59178945612'; // Business WhatsApp number for Bolivia
    const materialText = glassTypeSelect.options[glassTypeSelect.selectedIndex].text;
    const serviceText = serviceTypeSelect.options[serviceTypeSelect.selectedIndex].text;
    const frameText = frameTypeSelect.options[frameTypeSelect.selectedIndex].text;

    const msg = `Hola VidrioMax Bolivia! 🇧🇴 Quisiera cotizar el *Servicio de Instalación* de:\n` +
                `📐 *Trabajo:* ${serviceText}\n` +
                `📏 *Medidas:* ${width}m (Ancho) x ${height}m (Alto) = ${area.toFixed(2)} m²\n` +
                `🧱 *Material Estructural:* ${materialText}\n` +
                `🏗️ *Perfilería / Anclaje:* ${frameText}\n` +
                `📍 *Ubicación:* ${city}\n` +
                `💰 *Presupuesto Estimado Web:* Bs. ${minVal} - ${maxVal}\n\n` +
                `Por favor indíquenme disponibilidad para realizar la evaluación técnica de mi instalación.`;

    const encodedMsg = encodeURIComponent(msg);
    whatsappCtaBtn.setAttribute('href', `https://wa.me/${whatsappPhone}?text=${encodedMsg}`);
  }

  // Bind event listeners for dynamic updates
  if (calcForm) {
    calcForm.addEventListener('input', calculateQuote);
    calcForm.addEventListener('change', calculateQuote);
    // Initial calculation call
    calculateQuote();
  }
}

/* -------------------------------------------------------------------------- */
/* 3. Filtro de Galería de Proyectos (Portfolio)                              */
/* -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 4. Preguntas Frecuentes (FAQ Accordion)                                    */
/* -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all active items
      faqItems.forEach(i => i.classList.remove('active'));

      // If clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Smooth Scroll Helper                                                    */
/* -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
