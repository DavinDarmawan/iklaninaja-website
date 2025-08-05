// Function to add a class to an element when it is in the viewport.
// This is for the "animate on scroll" effect.
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

// Function to handle active navigation link highlighting based on scroll position.
function setActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.querySelector(".header");
  if (!header) return;
  const headerHeight = header.offsetHeight;

  let currentSectionId = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight - 1; // Subtract header height to adjust
    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === currentSectionId) {
      link.classList.add("active");
    }
  });
}

// Navbar Scroll Effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  setActiveNavLink();
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");

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
}

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

// Event listeners for "animate on scroll" and "active nav link"
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);
window.addEventListener("scroll", setActiveNavLink);
window.addEventListener("load", setActiveNavLink);

// Portfolio Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

if (filterButtons.length > 0 && portfolioItems.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");
      portfolioItems.forEach((item) => {
        // Use CSS display to show/hide items
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
}

// Testimonial Slider Functionality
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".testimonial-track");
  const cards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  const dotsContainer = document.querySelector(".slider-dots");

  if (!track || cards.length === 0) return; // Prevent errors if elements are not found

  let currentIndex = 0;
  const cardCount = cards.length;
  let isTransitioning = false;

  // Create dots
  dotsContainer.innerHTML = "";
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
    isTransitioning = false;
    const currentCard = track.children[currentIndex + 1];
    if (currentCard && currentCard.id === "first-clone") {
      track.style.transition = "none";
      currentIndex = 0;
      track.style.transform = `translateX(-${100 * (currentIndex + 1)}%)`;
      setTimeout(() => {
        track.style.transition = "transform 0.5s ease";
      }, 50);
    }
    if (currentCard && currentCard.id === "last-clone") {
      track.style.transition = "none";
      currentIndex = cardCount - 1;
      track.style.transform = `translateX(-${100 * (currentIndex + 1)}%)`;
      setTimeout(() => {
        track.style.transition = "transform 0.5s ease";
      }, 50);
    }
    updateDots();
  });

  // Next slide
  nextBtn.addEventListener("click", () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${100 * (currentIndex + 1)}%)`;
  });

  // Previous slide
  prevBtn.addEventListener("click", () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${100 * (currentIndex + 1)}%)`;
  });

  // Go to specific slide
  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = index;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${100 * (currentIndex + 1)}%)`;
    updateDots();
    setTimeout(() => {
      isTransitioning = false;
    }, 500); // Reset transition state
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
    if (!isTransitioning) {
      nextBtn.click();
    }
  }, 5000);

  // Pause on hover
  const slider = document.querySelector(".testimonials");
  slider.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
  });

  slider.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      if (!isTransitioning) {
        nextBtn.click();
      }
    }, 5000);
  });

  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoSlide);
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      autoSlide = setInterval(() => {
        if (!isTransitioning) {
          nextBtn.click();
        }
      }, 5000);
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

// SERVICE DETAIL MODAL
document.addEventListener("DOMContentLoaded", function () {
  const serviceDetailModal = document.getElementById("serviceDetailModal");
  const serviceTitle = document.getElementById("modalServiceTitle");
  const serviceDescription = document.getElementById("modalServiceDescription");
  const serviceLinks = document.querySelectorAll(".service-link");
  const closeButton = serviceDetailModal.querySelector(".close-button");

  const servicesData = {
    "logo-design": {
      title: "Desain Logo Kekinian",
      description:
        "Layanan desain logo kami menciptakan identitas visual yang unik dan modern untuk brand UMKM Anda. Kami fokus pada logo yang mudah diingat, relevan dengan bisnis Anda, dan terlihat profesional di berbagai platform.",
    },
    "social-media-kit": {
      title: "Social Media Kit",
      description:
        "Kami menyediakan paket lengkap template feed, story, dan highlight Instagram yang konsisten dan eye-catching. Dengan desain yang terpadu, media sosial Anda akan terlihat profesional dan menarik lebih banyak perhatian.",
    },
    "website-umkm": {
      title: "Website UMKM",
      description:
        "Layanan pembuatan website kami menawarkan situs profesional yang mobile-friendly dengan harga terjangkau. Website ini dirancang untuk meningkatkan kredibilitas, memudahkan pelanggan menemukan informasi, dan mendorong penjualan.",
    },
    "digital-marketing": {
      title: "Digital Marketing",
      description:
        "Tim kami akan menyusun strategi promosi digital yang tepat sasaran, mulai dari iklan di media sosial, SEO, hingga email marketing. Tujuannya adalah untuk menjangkau audiens yang lebih luas dan meningkatkan konversi penjualan Anda.",
    },
  };

  serviceLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const serviceType = this.closest(".service-card").dataset.service;
      const data = servicesData[serviceType];

      if (data) {
        serviceTitle.textContent = data.title;
        serviceDescription.textContent = data.description;
        serviceDetailModal.style.display = "block";
      }
    });
  });

  closeButton.onclick = function () {
    serviceDetailModal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == serviceDetailModal) {
      serviceDetailModal.style.display = "none";
    }
  };
});
