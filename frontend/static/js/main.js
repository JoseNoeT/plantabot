// 🎞️ Hero Slider Automático
let slideIndex = 0;
let slides = [];

function showSlides() {
  if (!slides || slides.length === 0) return;

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");

  setTimeout(showSlides, 5000);
}

function plusSlides(n) {
  if (!slides || slides.length === 0) return;

  slideIndex = (slideIndex + n + slides.length) % slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slides[slideIndex].classList.add("active");
}

// 🧠 Filtro de productos por categoría
function activarFiltros() {
  const botones = document.querySelectorAll(".filtro-btn");
  const productos = document.querySelectorAll(".producto");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const cat = boton.dataset.categoria;

      productos.forEach(p => {
        const pertenece = p.dataset.categoria.includes(cat);
        p.style.display = pertenece ? "block" : "none";
      });
    });
  });
}

// 👁️ ScrollReveal si está disponible
function activarScrollReveal() {
  if (typeof ScrollReveal !== "undefined") {
    ScrollReveal().reveal('.scroll-reveal', {
      delay: 200,
      duration: 700,
      distance: '20px',
      easing: 'ease-in-out',
      reset: false
    });
  }
}

// ✅ Ejecutar al cargar
document.addEventListener("DOMContentLoaded", () => {
  slides = document.getElementsByClassName("slide");

  if (slides.length > 0) {
    slides[0].classList.add("active");
    showSlides();
  }

  activarFiltros();
  activarScrollReveal();
});
