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
    const sectionTop = section.offsetTop - headerHeight - 1;
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

// Testimonial infinite scroll and manual navigation
document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.querySelector(".carousel-container");
  const carouselTrack = document.querySelector(".carousel-track");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const cardWrappers = document.querySelectorAll(".testimonial-card-wrapper");
  const originalCardCount = cardWrappers.length;

  let currentIndex = 0;
  let isMoving = false;

  // Duplicate cards for infinite scroll effect
  cardWrappers.forEach((card) => {
    const clone = card.cloneNode(true);
    carouselTrack.appendChild(clone);
  });

  const moveCarousel = (direction) => {
    if (isMoving) return;
    isMoving = true;

    // Update index based on direction
    currentIndex += direction;

    // Get live dimensions
    const cards = document.querySelectorAll(".testimonial-card-wrapper");
    if (cards.length === 0) return;
    const cardWidth = cards[0].offsetWidth;
    const containerWidth = carouselContainer.offsetWidth;
    const offset = (containerWidth - cardWidth) / 2;

    // Animate the scroll
    carouselTrack.style.transition = "transform 0.5s ease-in-out";
    carouselTrack.style.transform = `translateX(-${
      currentIndex * cardWidth - offset
    }px)`;

    // Logic for infinite loop
    carouselTrack.addEventListener(
      "transitionend",
      () => {
        isMoving = false;
        if (currentIndex >= originalCardCount) {
          carouselTrack.style.transition = "none";
          currentIndex = 0;
          carouselTrack.style.transform = `translateX(-${
            currentIndex * cardWidth - offset
          }px)`;
        } else if (currentIndex < 0) {
          carouselTrack.style.transition = "none";
          currentIndex = originalCardCount - 1;
          carouselTrack.style.transform = `translateX(-${
            currentIndex * cardWidth - offset
          }px)`;
        }
      },
      { once: true }
    );
  };

  // Event listeners for next and previous buttons
  if (nextBtn) {
    nextBtn.addEventListener("click", () => moveCarousel(1));
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => moveCarousel(-1));
  }

  // Initial position on load and update on resize
  const initialPosition = () => {
    const cards = document.querySelectorAll(".testimonial-card-wrapper");
    if (cards.length === 0) return;
    const cardWidth = cards[0].offsetWidth;
    const containerWidth = carouselContainer.offsetWidth;
    const offset = (containerWidth - cardWidth) / 2;
    carouselTrack.style.transform = `translateX(${offset}px)`;
  };

  window.addEventListener("load", initialPosition);
  window.addEventListener("resize", initialPosition);
});

// ===== MODAL FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", function () {
  // Service Modal
  const serviceDetailModal = document.getElementById("serviceDetailModal");
  const modalServiceTitle = document.getElementById("modalServiceTitle");
  const modalServiceDescription = document.getElementById(
    "modalServiceDescription"
  );
  const serviceLinks = document.querySelectorAll(".service-link");
  const closeServiceModalButton =
    serviceDetailModal.querySelector(".close-button");
  const modalCloseServiceBtn = document.getElementById("modalCloseBtn");

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
        modalServiceTitle.textContent = data.title;
        modalServiceDescription.textContent = data.description;
        serviceDetailModal.style.display = "block";
      }
    });
  });

  function closeServiceModal() {
    serviceDetailModal.style.display = "none";
  }

  closeServiceModalButton.onclick = closeServiceModal;
  modalCloseServiceBtn.onclick = closeServiceModal;

  // Portfolio Modal
  const portfolioDetailModal = document.getElementById("portfolioDetailModal");
  const modalPortfolioImage = document.getElementById("modalPortfolioImage");
  const modalPortfolioTitle = document.getElementById("modalPortfolioTitle");
  const modalPortfolioDescription = document.getElementById(
    "modalPortfolioDescription"
  );
  const portfolioLinks = document.querySelectorAll(".portfolio-view-link");
  const closePortfolioModalButton =
    portfolioDetailModal.querySelector(".close-button");
  const modalClosePortfolioBtn = document.getElementById(
    "modalPortfolioCloseBtn"
  );

  const portfolioData = {
    "portfolio-1": {
      title: "Kedai Kopi Budi",
      description:
        "Desain logo profesional dan modern untuk Kedai Kopi Budi, menciptakan identitas visual yang kuat dan mudah diingat oleh pelanggan.",
      image: "https://placehold.co/600x400/3a0ca3/f72585?text=Kedai+Kopi+Budi",
    },
    "portfolio-2": {
      title: "Homemade Cookies",
      description:
        "Pembuatan social media kit lengkap untuk Homemade Cookies, termasuk template untuk feed, story, dan highlight Instagram yang konsisten dan menarik.",
      image: "https://placehold.co/600x400/4cc9f0/3a0ca3?text=Homemade+Cookies",
    },
    "portfolio-3": {
      title: "Bengkel Motor Fauzi",
      description:
        "Pengembangan website UMKM yang responsif dan informatif untuk Bengkel Motor Fauzi, memudahkan pelanggan untuk melihat layanan dan melakukan booking online.",
      image: "https://placehold.co/600x400/f72585/ffffff?text=Bengkel+Motor",
    },
    "portfolio-4": {
      title: "Toko Baju Ani",
      description:
        "Desain logo yang unik dan stylish untuk Toko Baju Ani, memperkuat branding toko dan menarik target pasar yang lebih luas.",
      image: "https://placehold.co/600x400/212529/f8f9fa?text=Toko+Baju+Ani",
    },
    "portfolio-5": {
      title: "Catering Mama Lia",
      description:
        "Paket social media branding untuk Catering Mama Lia, fokus pada visual yang menggugah selera dan strategi konten untuk meningkatkan engagement.",
      image:
        "https://placehold.co/600x400/4361ee/f72585?text=Catering+Mama+Lia",
    },
    "portfolio-6": {
      title: "Klinik Kecantikan Sari",
      description:
        "Website profesional untuk Klinik Kecantikan Sari, menampilkan layanan, testimoni, dan informasi kontak secara elegan, meningkatkan kepercayaan pelanggan.",
      image:
        "https://placehold.co/600x400/3a0ca3/4cc9f0?text=Klinik+Kecantikan",
    },
  };

  portfolioLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const portfolioId = this.closest(".portfolio-item").dataset.id;
      const data = portfolioData[portfolioId];
      if (data) {
        modalPortfolioImage.src = data.image;
        modalPortfolioTitle.textContent = data.title;
        modalPortfolioDescription.textContent = data.description;
        portfolioDetailModal.style.display = "block";
      }
    });
  });

  function closePortfolioModal() {
    portfolioDetailModal.style.display = "none";
  }

  closePortfolioModalButton.onclick = closePortfolioModal;
  modalClosePortfolioBtn.onclick = closePortfolioModal;

  window.onclick = function (event) {
    if (event.target == serviceDetailModal) {
      closeServiceModal();
    }
    if (event.target == portfolioDetailModal) {
      closePortfolioModal();
    }
  };
});
