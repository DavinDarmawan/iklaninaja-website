// public/js/main.js

console.log("main.js berhasil dimuat dan dieksekusi.");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded - Starting initialization");

  // --- Fungsionalitas Menu Hamburger dengan smooth animation ---
  const hamburgerButton = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburgerButton && mobileMenu) {
    hamburgerButton.addEventListener("click", () => {
      hamburgerButton.classList.toggle("hamburger-active");
      mobileMenu.classList.toggle("hidden");
    });

    const mobileMenuLinks = mobileMenu.querySelectorAll("a");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburgerButton.classList.remove("hamburger-active");
        mobileMenu.classList.add("hidden");
      });
    });
  } else {
    console.warn("Elemen hamburger menu atau mobile menu tidak ditemukan.");
  }

  // --- Button loading state handler ---
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("load-btn")) {
      const btn = e.target;
      btn.classList.add("btn-loading");
      btn.innerHTML = '<span class="spinner"></span> Loading...';

      setTimeout(() => {
        btn.classList.remove("btn-loading");
        btn.innerHTML = "Sukses!";
      }, 2000);
    }
  });

  // --- Smooth scroll for navigation links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // --- Scroll-triggered animations ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll("[data-aos]").forEach((el) => {
    observer.observe(el);
  });

  // --- Parallax scrolling effect ---
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll("[data-parallax]");

    parallaxElements.forEach((el) => {
      const yPos = scrolled * 0.5;
      el.style.transform = `translateY(${yPos}px)`;
    });
  });

  // --- Form validation handler ---
  document.addEventListener("submit", function (e) {
    if (e.target.classList.contains("form-validate")) {
      const inputs = e.target.querySelectorAll(
        "input[required], textarea[required]",
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          input.style.borderColor = "red";
          isValid = false;
        } else {
          input.style.borderColor = "";
        }
      });

      if (!isValid) {
        e.preventDefault();
        alert("Mohon lengkapi semua field yang diperlukan");
      }
    }
  });

  // --- Mouse position tracking for interactive effects ---
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // --- Service card interaction ---
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 20px 40px rgba(0, 123, 255, 0.2)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.boxShadow = "";
    });
  });

  // --- Responsive observer for animations ---
  const mediaQuery = window.matchMedia("(max-width: 768px)");

  function handleMediaChange(e) {
    if (e.matches) {
      // Mobile view
      document.querySelectorAll(".service-card").forEach((card) => {
        card.style.transform = "scale(1)";
      });
    }
  }

  mediaQuery.addEventListener("change", handleMediaChange);
  handleMediaChange(mediaQuery);

  // --- Notification system ---
  function showNotification(message, type = "success", duration = 3000) {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 2rem;
      background-color: ${type === "success" ? "#10b981" : "#ef4444"};
      color: white;
      border-radius: 0.5rem;
      z-index: 1001;
      animation: slideDown 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, duration);
  }

  // --- Dark mode toggle (optional) ---
  function initDarkMode() {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
      darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem(
          "darkMode",
          document.body.classList.contains("dark-mode"),
        );
      });

      if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
      }
    }
  }

  initDarkMode();

  // --- Counter Animation for Statistics dengan Intersection Observer ---
  function animateCounter(element, target, suffix = "") {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const steps = 100;
    const stepDuration = duration / steps;

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(counter);
      }
      element.textContent = Math.floor(current) + suffix;
    }, stepDuration);
  }

  const statsSection = document.getElementById("statistik");
  const statsCards = document.querySelectorAll(".stat-card");
  let hasAnimated = false;

  // Intersection Observer untuk animasi saat section terlihat
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          statsCards.forEach((card, index) => {
            const target = parseInt(card.getAttribute("data-stat"));
            const suffix = card.getAttribute("data-suffix") || "+";
            const statNumber = card.querySelector(".stat-number");

            // Delay untuk setiap card
            setTimeout(() => {
              // Animate the card entrance
              card.style.opacity = "0";
              card.style.transform = "translateY(30px)";

              // Force reflow to make animation work
              card.offsetHeight;

              card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";

              // Start counter animation
              animateCounter(statNumber, target, suffix);

              // Animate progress bar
              const progressFill = card.querySelector(".progress-fill");
              if (progressFill) {
                progressFill.style.animation = "none";
                progressFill.offsetHeight; // Force reflow
                progressFill.style.animation =
                  "fill-progress 2s ease-out forwards";
              }
            }, index * 150);
          });
          hasAnimated = true;
        }
      });
    },
    { threshold: 0.2 },
  );

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // --- Service Modal ---
  const serviceModal = document.getElementById("serviceModal");
  const closeModal = document.querySelector(".close-modal");
  const serviceData = {
    "digital-advertising": {
      title: "Digital Advertising",
      description:
        "Layanan iklan berbayar di berbagai platform digital untuk meningkatkan jangkauan, awareness, dan konversi bisnis.",
      features:
        '<ul class="list-disc list-inside text-gray-600"><li>Facebook & Instagram Ads</li><li>Google Ads</li><li>TikTok Ads</li><li>Campaign Optimization</li></ul>',
    },
    "website-development": {
      title: "Website Development",
      description:
        "Pembuatan dan pengelolaan website yang fungsional, user-friendly, dan sesuai kebutuhan bisnis.",
      features:
        '<ul class="list-disc list-inside text-gray-600"><li>Desain Responsif</li><li>SEO Optimized</li><li>Fast Loading</li><li>Security & Maintenance</li></ul>',
    },
    "social-media": {
      title: "Social Media Management",
      description:
        "Pengelolaan akun media sosial untuk menjaga branding, engagement, dan komunikasi dengan audiens.",
      features:
        '<ul class="list-disc list-inside text-gray-600"><li>Content Creation</li><li>Community Management</li><li>Analytics & Reporting</li><li>Engagement Boost</li></ul>',
    },
    "visual-branding": {
      title: "Visual Branding",
      description:
        "Konsep kampanye kreatif yang bertujuan meningkatkan awareness, engagement, dan citra brand.",
      features:
        '<ul class="list-disc list-inside text-gray-600"><li>Logo Design</li><li>Brand Identity</li><li>Creative Campaign</li><li>Visual Assets</li></ul>',
    },
    "digital-consultant": {
      title: "Digital Consultant",
      description:
        "Layanan konsultasi strategi digital untuk membantu bisnis mengambil keputusan yang tepat.",
      features:
        '<ul class="list-disc list-inside text-gray-600"><li>Strategy Planning</li><li>Market Analysis</li><li>Digital Transformation</li><li>Performance Review</li></ul>',
    },
  };

  if (serviceModal && closeModal) {
    document.querySelectorAll(".service-card").forEach((card) => {
      card.addEventListener("click", function () {
        const service = this.getAttribute("data-service");
        const data = serviceData[service];
        if (data) {
          document.getElementById("modalTitle").textContent = data.title;
          document.getElementById("modalDescription").textContent =
            data.description;
          document.getElementById("modalFeatures").innerHTML = data.features;
          serviceModal.classList.add("active");
        }
      });
    });

    closeModal.addEventListener("click", () => {
      serviceModal.classList.remove("active");
    });

    window.addEventListener("click", (event) => {
      if (event.target === serviceModal) {
        serviceModal.classList.remove("active");
      }
    });
  }

  // --- Portfolio Modal dengan Detail Lengkap ---
  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded - Initializing Portfolio Modal");

    const portfolioModal = document.getElementById("portfolioModal");
    const closePortfolioModal = document.querySelector(
      ".close-modal-portfolio",
    );

    console.log("Portfolio Modal Elements:", {
      portfolioModal: !!portfolioModal,
      closePortfolioModal: !!closePortfolioModal,
    });

    if (!portfolioModal) {
      console.error(
        "❌ Portfolio Modal element dengan id 'portfolioModal' TIDAK ditemukan!",
      );
      return;
    }
    if (!closePortfolioModal) {
      console.warn("⚠️ Close button '.close-modal-portfolio' TIDAK ditemukan!");
    }

    const portfolioData = {
      "produsen-seragam": {
        title: "Produsen Seragam",
        image: "https://placehold.co/600x400/007BFF/FFFFFF?text=Campaign+1",
        description:
          "Kampanye digital marketing untuk perusahaan produsen seragam terkemuka yang ingin meningkatkan penjualan dan awareness di kalangan institusi pendidikan dan perusahaan.",
        results: [
          "Peningkatan penjualan sebesar 30% dalam 2 bulan",
          "Engagement rate meningkat 150% di Instagram",
          "ROI kampanye mencapai 4.5x dari budget iklan",
          "Menambah 500+ pelanggan baru dari target market",
        ],
        strategy: [
          "Instagram Ads dengan targeting audiens B2B (institusi pendidikan & perusahaan)",
          "User-generated content campaign dengan influencer lokal",
          "Retargeting campaign untuk visitor website yang belum convert",
          "A/B testing berbagai creative dan copy untuk optimasi maksimal",
        ],
      },
      "madu-langit": {
        title: "Madu Langit",
        image: "https://placehold.co/600x400/00FFFF/1A202C?text=Campaign+2",
        description:
          "Strategi SEO dan content marketing untuk meningkatkan visibility produk madu organik di search engine dan mendatangkan traffic organik berkualitas tinggi.",
        results: [
          "Peningkatan traffic organik sebesar 50% dalam 3 bulan",
          "Ranking page 1 Google untuk 20+ keyword relevan",
          "Click-through rate meningkat dari 2% menjadi 5.8%",
          "Lead organik berkualitas tinggi meningkat 200%",
        ],
        strategy: [
          "Optimasi SEO on-page dan technical SEO menyeluruh",
          "Pembuatan content pillar dan cluster untuk topik relevan",
          "Link building dari situs otoritatif di niche produk organik",
          "Monthly content calendar dengan keyword research mendalam",
        ],
      },
      kopilahdulu: {
        title: "kopilahdulu",
        image: "https://placehold.co/600x400/1A202C/00FFFF?text=Campaign+3",
        description:
          "Kampanye viral di TikTok untuk membangun brand awareness produk minuman dan menghasilkan user-generated content dalam jumlah besar untuk authentic marketing.",
        results: [
          "Kampanye viral dengan 1+ juta views dalam 1 minggu",
          "5,000+ UGC dari user yang membuat konten sendiri",
          "Brand awareness meningkat 300% di kalangan Gen Z",
          "Konversi dari TikTok ke e-commerce sebesar 15%",
        ],
        strategy: [
          "TikTok Ads dengan challenge campaign yang engaging",
          "Kerjasama dengan 50+ micro-influencer TikTok",
          "Incentive program untuk encourage UGC berkualitas",
          "Community management aktif untuk viral momentum",
        ],
      },
      basrengteh: {
        title: "BasrengtehNay",
        image: "https://placehold.co/600x400/FF007B/FFFFFF?text=Campaign+4",
        description:
          "Membangun identitas brand baru yang kuat dan strategi konten yang konsisten untuk meningkatkan engagement dan loyalty pelanggan.",
        results: [
          "Peningkatan engagement rate sebesar 180%",
          "Followers organik bertambah 1000+ per bulan",
          "Brand recognition meningkat 250% dalam 3 bulan",
          "Customer lifetime value meningkat 120%",
        ],
        strategy: [
          "Rebranding dan pembuatan visual identity yang konsisten",
          "Content marketing strategy yang fokus pada storytelling",
          "Community building melalui engagement yang authentic",
          "Influencer collaboration untuk memperluas jangkauan",
        ],
      },
      kayana: {
        title: "Kayana",
        image: "https://placehold.co/600x400/7B00FF/FFFFFF?text=Campaign+5",
        description:
          "Membangun komunitas online yang aktif dan loyal di berbagai platform media sosial untuk menciptakan brand advocates.",
        results: [
          "Komunitas online tumbuh menjadi 50,000+ members",
          "Engagement rate tertinggi di antara competitor 280%",
          "User-generated content organik meningkat 300%",
          "Net Promoter Score mencapai 75+ (excellent)",
        ],
        strategy: [
          "Community management strategy yang customer-centric",
          "Regular contests dan giveaways untuk boost engagement",
          "Member spotlight program untuk menghargai loyalty",
          "Exclusive content dan early access untuk community members",
        ],
      },
      se7: {
        title: "SE7",
        image: "https://placehold.co/600x400/7B00FF/FFFFFF?text=Campaign+6",
        description:
          "Kampanye marketing terintegrasi untuk meluncurkan produk baru dengan strategi multi-channel yang komprehensif.",
        results: [
          "Penjualan produk melebihi target 150% di bulan pertama",
          "Reach organik mencapai 2 juta impressions",
          "Conversion rate 8.5% (above industry average)",
          "Customer acquisition cost turun 40%",
        ],
        strategy: [
          "Pre-launch buzz campaign dengan teaser content",
          "Launch day activation di semua platform serentak",
          "Influencer partnerships dan media relations",
          "Post-launch retention strategy dengan loyalty program",
        ],
      },
      warlen: {
        title: "Warlen",
        image: "https://placehold.co/600x400/00FF7B/1A202C?text=Campaign+7",
        description:
          "Kampanye email marketing yang dipersonalisasi untuk meningkatkan open rate, click rate, dan conversion dari email subscribers.",
        results: [
          "Email open rate meningkat dari 18% menjadi 35%",
          "Click-through rate naik 280% melalui personalisasi",
          "Conversion dari email mencapai 6.8%",
          "Revenue dari email marketing bertambah 450%",
        ],
        strategy: [
          "Email segmentation berdasarkan customer behavior",
          "A/B testing subject line dan content untuk optimal",
          "Personalization menggunakan dynamic content blocks",
          "Automation workflow untuk nurture leads secara efektif",
        ],
      },
    };

    const portfolioItems = document.querySelectorAll(".portfolio-item");
    console.log(`✅ Found ${portfolioItems.length} portfolio items`);

    portfolioItems.forEach((item) => {
      const dataPortfolio = item.getAttribute("data-portfolio");
      console.log("Attaching listener to portfolio item:", dataPortfolio);

      item.addEventListener("click", function (e) {
        e.stopPropagation();
        console.log("📌 Portfolio item CLICKED:", dataPortfolio);

        const portfolio = this.getAttribute("data-portfolio");
        const data = portfolioData[portfolio];

        if (!data) {
          console.error(
            "❌ Data untuk portfolio '" + portfolio + "' NOT FOUND",
          );
          console.log("Available data keys:", Object.keys(portfolioData));
          return;
        }

        console.log("✅ Opening modal with data:", data.title);

        try {
          document.getElementById("portfolioImage").src = data.image;
          document.getElementById("portfolioTitle").textContent = data.title;
          document.getElementById("portfolioDescription").textContent =
            data.description;

          // Render results
          const resultsDiv = document.getElementById("portfolioResults");
          resultsDiv.innerHTML = data.results
            .map(
              (result) =>
                `<div class="flex items-start"><span class="text-green-500 mr-3 text-lg">✓</span><p class="text-gray-700">${result}</p></div>`,
            )
            .join("");

          // Render strategy
          const strategyDiv = document.getElementById("portfolioStrategy");
          strategyDiv.innerHTML = data.strategy
            .map(
              (item, index) =>
                `<div class="flex items-start"><span class="text-blue-500 mr-3 font-semibold">${index + 1}.</span><p class="text-gray-700">${item}</p></div>`,
            )
            .join("");

          portfolioModal.classList.add("active");
          console.log("✅ Modal class 'active' added");
        } catch (error) {
          console.error("❌ Error saat set modal content:", error);
        }
      });
    });

    if (closePortfolioModal) {
      closePortfolioModal.addEventListener("click", () => {
        console.log("Close button clicked");
        portfolioModal.classList.remove("active");
      });
    } else {
      console.warn("⚠️ Close button not found, setting up alternative close");
    }

    window.addEventListener("click", (event) => {
      if (event.target === portfolioModal) {
        console.log("Background clicked, closing modal");
        portfolioModal.classList.remove("active");
      }
    });

    console.log("✅ Portfolio Modal initialization complete!");
    console.log("Portfolio Modal Status:", {
      modalElement: !!portfolioModal,
      closeButton: !!closePortfolioModal,
      portfolioItems: portfolioItems.length,
      portfolioDataKeys: Object.keys(portfolioData).length,
    });
  });

  // --- Logo hover scale on partner section ---
  const partnerImages = document.querySelectorAll("#official-partners img");
  if (partnerImages.length > 0) {
    partnerImages.forEach((img) => {
      img.style.cursor = "pointer";
    });
  }

  console.log("✅ Semua fitur interaktif telah diinisialisasi!");
}); // End of DOMContentLoaded
