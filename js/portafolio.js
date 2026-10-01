/*
 * portafolio.js
 * Basado en main.js de la plantilla MyResume (BootstrapMade).
 * Se quitaron las funciones de librerías que no se usan (Isotope, GLightbox,
 * Swiper, PureCounter, Waypoints) y se reemplazaron por JavaScript simple.
 */

(function () {
  "use strict";

  /* 1. Abrir / cerrar el menú en celular (de la plantilla) */
  const header = document.querySelector('#header');
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    header.classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  document.querySelectorAll('#navmenu a').forEach((link) => {
    link.addEventListener('click', () => {
      if (document.querySelector('.header-show')) headerToggle();
    });
  });

  /* 2. Botón "volver arriba" (de la plantilla) */
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /* 3. Animaciones al hacer scroll con AOS (de la plantilla) */
  window.addEventListener('load', () => {
    if (window.AOS) {
      AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
    }
  });

  /* 4. Texto animado con Typed.js (de la plantilla) */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && window.Typed) {
    const frases = selectTyped.getAttribute('data-typed-items').split(',').map((t) => t.trim());
    new Typed('.typed', { strings: frases, loop: true, typeSpeed: 70, backSpeed: 40, backDelay: 2000 });
  }

  /* 5. Barras de habilidades: se llenan al verse en pantalla
        (antes usaba la librería Waypoints, ahora IntersectionObserver) */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.progress-bar').forEach((barra) => {
        barra.style.width = barra.getAttribute('aria-valuenow') + '%';
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skills-animation').forEach((el) => observer.observe(el));

  /* 6. Filtro de proyectos (antes usaba Isotope, ahora JavaScript simple) */
  const filtros = document.querySelectorAll('.portfolio-filters li');
  const proyectos = document.querySelectorAll('.portfolio-item');
  filtros.forEach((filtro) => {
    filtro.addEventListener('click', () => {
      document.querySelector('.portfolio-filters .filter-active').classList.remove('filter-active');
      filtro.classList.add('filter-active');
      const categoria = filtro.dataset.filter;
      proyectos.forEach((p) => {
        p.classList.toggle('oculto', categoria !== 'todos' && p.dataset.categoria !== categoria);
      });
    });
  });

  /* 7. Formulario de contacto con validación (sin PHP) */
  const form = document.getElementById('formContacto');
  const mensajeOk = document.getElementById('mensajeOk');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      mensajeOk.classList.remove('visible');
      return;
    }
    const nombre = document.getElementById('nombre').value.trim();
    mensajeOk.textContent = '¡Gracias, ' + nombre + '! Tu mensaje fue registrado.';
    mensajeOk.classList.add('visible');
    form.reset();
    form.classList.remove('was-validated');
  });

  /* 8. Resaltar en el menú la sección visible (de la plantilla) */
  const navLinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    navLinks.forEach((link) => {
      const section = document.querySelector(link.hash);
      if (!section) return;
      const posicion = window.scrollY + 200;
      if (posicion >= section.offsetTop && posicion <= section.offsetTop + section.offsetHeight) {
        document.querySelectorAll('.navmenu a.active').forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /* 9. Año actual en el pie de página */
  document.getElementById('anio').textContent = new Date().getFullYear();

})();
