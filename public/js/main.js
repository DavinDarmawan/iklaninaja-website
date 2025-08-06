// public/js/main.js

// Pesan ini akan muncul di konsol browser jika main.js berhasil dimuat.
console.log("main.js berhasil dimuat dan dieksekusi.");

// --- Fungsionalitas Menu Hamburger ---
const hamburgerButton = document.getElementById("hamburger-button");
const mobileMenu = document.getElementById("mobile-menu");

// Pastikan elemen-elemen ini ada di halaman sebelum menambahkan event listener
if (hamburgerButton && mobileMenu) {
  hamburgerButton.addEventListener("click", () => {
    hamburgerButton.classList.toggle("hamburger-active");
    mobileMenu.classList.toggle("hidden");
  });

  // Tutup menu mobile ketika link diklik
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburgerButton.classList.remove("hamburger-active");
      mobileMenu.classList.add("hidden");
    });
  });
} else {
  console.warn(
    "Elemen hamburger menu atau mobile menu tidak ditemukan. Fungsionalitas terkait mungkin tidak aktif."
  );
}

// --- Fungsionalitas Carousel Testimoni ---
const carousel = document.getElementById("testimonial-carousel");
const prevButton = document.getElementById("prev-testimonial");
const nextButton = document.getElementById("next-testimonial");
let currentIndex = 0;
let autoScrollInterval;

function updateCarousel() {
  // Pastikan carousel dan anak-anaknya ada sebelum mengakses offsetWidth
  if (carousel && carousel.children.length > 0) {
    const itemWidth = carousel.children[0].offsetWidth;
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }
}

function startAutoScroll() {
  stopAutoScroll(); // Hentikan interval yang sudah ada untuk mencegah duplikasi
  // Hanya auto-scroll jika ada lebih dari satu testimoni
  if (carousel && carousel.children.length > 1) {
    // Only auto-scroll if there's more than one testimonial
    autoScrollInterval = setInterval(() => {
      currentIndex =
        currentIndex === carousel.children.length - 1 ? 0 : currentIndex + 1;
      updateCarousel();
    }, 5000); // Ganti testimoni setiap 5 detik
  }
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Pastikan elemen-elemen carousel ada sebelum menambahkan event listener
if (carousel && prevButton && nextButton) {
  prevButton.addEventListener("click", () => {
    if (carousel.children.length > 0) {
      currentIndex =
        currentIndex === 0 ? carousel.children.length - 1 : currentIndex - 1;
      updateCarousel();
    }
  });

  nextButton.addEventListener("click", () => {
    if (carousel.children.length > 0) {
      currentIndex =
        currentIndex === carousel.children.length - 1 ? 0 : currentIndex + 1;
      updateCarousel();
    }
  });

  // Jeda auto-scroll saat hover
  if (carousel.parentElement) {
    // Pastikan parentElement ada
    carousel.parentElement.addEventListener("mouseenter", stopAutoScroll);
    carousel.parentElement.addEventListener("mouseleave", startAutoScroll);
  }

  // Pembaruan awal dan mulai auto-scroll saat halaman dimuat
  window.addEventListener("load", () => {
    updateCarousel();
    startAutoScroll();
  });
  window.addEventListener("resize", updateCarousel); // Sesuaikan saat ukuran jendela berubah
} else {
  console.warn(
    "Elemen carousel testimoni tidak ditemukan. Fungsionalitas carousel mungkin tidak aktif."
  );
}

// --- Integrasi Gemini API untuk Pembuatan Strategi (DIHAPUS) ---
// Kode terkait Gemini API telah dihapus dari file ini.
