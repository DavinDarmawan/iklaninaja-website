// Portfolio Modal Script - Standalone

console.log("portfolio.js loaded");

document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ Portfolio.js: DOMContentLoaded fired");

  // Get modal elements
  const portfolioModal = document.getElementById("portfolioModal");
  const closePortfolioModal = document.querySelector(".close-modal-portfolio");

  console.log("Modal check:", {
    modal: !!portfolioModal,
    closeBtn: !!closePortfolioModal,
  });

  if (!portfolioModal) {
    console.error("❌ portfolioModal element not found!");
    return;
  }

  // Portfolio data
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

  // Get all portfolio items
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  console.log(`✅ Found ${portfolioItems.length} portfolio items`);

  // Add click listener to each portfolio item
  portfolioItems.forEach((item) => {
    const dataId = item.getAttribute("data-portfolio");
    console.log(`📌 Adding listener to: ${dataId}`);

    item.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const portfolioId = this.getAttribute("data-portfolio");
      console.log(`🖱️ CLICKED: ${portfolioId}`);

      const data = portfolioData[portfolioId];

      if (!data) {
        console.error(`❌ Data not found for: ${portfolioId}`);
        return;
      }

      // Set modal content
      try {
        document.getElementById("portfolioImage").src = data.image;
        document.getElementById("portfolioTitle").textContent = data.title;
        document.getElementById("portfolioDescription").textContent =
          data.description;

        // Render results
        document.getElementById("portfolioResults").innerHTML = data.results
          .map(
            (result) =>
              `<div class="flex items-start"><span class="text-green-500 mr-3 text-lg">✓</span><p class="text-gray-700">${result}</p></div>`,
          )
          .join("");

        // Render strategy
        document.getElementById("portfolioStrategy").innerHTML = data.strategy
          .map(
            (item, index) =>
              `<div class="flex items-start"><span class="text-blue-500 mr-3 font-semibold">${
                index + 1
              }.</span><p class="text-gray-700">${item}</p></div>`,
          )
          .join("");

        // Show modal
        portfolioModal.classList.add("active");
        console.log("✅ Modal shown");
      } catch (error) {
        console.error("❌ Error setting modal content:", error);
      }
    });
  });

  // Close button handler
  if (closePortfolioModal) {
    closePortfolioModal.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("🔴 Close button clicked");
      portfolioModal.classList.remove("active");
    });
  }

  // Background click to close
  portfolioModal.addEventListener("click", function (e) {
    if (e.target === portfolioModal) {
      console.log("🔴 Background clicked, closing modal");
      portfolioModal.classList.remove("active");
    }
  });

  console.log("✅ Portfolio modal initialization complete!");
});
