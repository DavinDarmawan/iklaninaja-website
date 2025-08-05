// Navbar Scroll Effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", function () {
  this.classList.toggle("active");
  navLinks.classList.toggle("active");

  // Toggle body scroll
  if (navLinks.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    if (navLinks.classList.contains("active")) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.classList.add("animated");
    }
  });
}

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Portfolio Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    this.classList.add("active");

    const filterValue = this.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      if (
        filterValue === "all" ||
        item.getAttribute("data-category") === filterValue
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Testimonial Slider Functionality
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".testimonial-track");
  const cards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  const dotsContainer = document.querySelector(".slider-dots");

  let currentIndex = 0;
  const cardCount = cards.length;

  // Create dots
  cards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  // Clone first and last cards for infinite loop
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cardCount - 1].cloneNode(true);

  firstClone.id = "first-clone";
  lastClone.id = "last-clone";

  track.appendChild(firstClone);
  track.insertBefore(lastClone, cards[0]);

  // Set initial position
  track.style.transform = `translateX(-${100 * (currentIndex + 1)}%)`;

  // Handle transitions
  track.addEventListener("transitionend", () => {
    if (cards[currentIndex].id === "first-clone") {
      track.style.transition = "none";
      currentIndex = 0;
      track.style.transform = `translateX(-${100 * (currentIndex + 1)}%)`;
      setTimeout(() => {
        track.style.transition = "transform 0.5s ease";
      });
    }

    if (cards[currentIndex].id === "last-clone") {
      track.style.transition = "none";
      currentIndex = cardCount - 1;
      track.style.transform = `translateX(-${100 * (currentIndex + 1)}%)`;
      setTimeout(() => {
        track.style.transition = "transform 0.5s ease";
      });
    }

    updateDots();
  });

  // Next slide
  nextBtn.addEventListener("click", () => {
    if (currentIndex >= cardCount - 1) return;
    currentIndex++;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${100 * (currentIndex + 1)}%)`;
  });

  // Previous slide
  prevBtn.addEventListener("click", () => {
    if (currentIndex <= 0) return;
    currentIndex--;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${100 * (currentIndex + 1)}%)`;
  });

  // Go to specific slide
  function goToSlide(index) {
    currentIndex = index;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${100 * (currentIndex + 1)}%)`;
    updateDots();
  }

  // Update dot indicators
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.remove("active");
      if (index === currentIndex) {
        dot.classList.add("active");
      }
    });
  }

  // Auto slide
  let autoSlide = setInterval(() => {
    nextBtn.click();
  }, 5000);

  // Pause on hover
  const slider = document.querySelector(".testimonials");
  slider.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
  });

  slider.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      nextBtn.click();
    }, 5000);
  });

  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextBtn.click();
    }

    if (touchEndX > touchStartX + 50) {
      prevBtn.click();
    }
  }
});
