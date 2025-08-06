Struktur Proyek IklaninAja di VS Code
Untuk memulai proyek Anda secara profesional, penting untuk memiliki struktur folder yang terorganisir. Ini akan membantu Anda mengelola kode, aset, dan sumber daya lainnya dengan mudah.

iklaninaja-website/
├── public/
│ ├── index.html (Halaman utama/homepage)
│ ├── tentang-kami.html (Halaman "Tentang Kami")
│ ├── layanan.html (Halaman detail layanan)
│ ├── portofolio.html (Halaman detail portofolio)
│ ├── testimoni.html (Halaman detail testimoni, jika terpisah)
│ ├── kontak.html (Halaman "Hubungi Kami")
│ ├── css/
│ │ └── style.css (File CSS kustom Anda, jika ada di luar Tailwind)
│ ├── js/
│ │ └── main.js (File JavaScript utama untuk fungsionalitas umum)
│ │ └── home.js (JavaScript spesifik untuk homepage, opsional)
│ └── images/ (Folder untuk semua gambar, ilustrasi, ikon)
│ ├── hero-bg.jpg
│ ├── illustration-digital.png
│ └── client-logo-1.png
├── .gitignore (Untuk kontrol versi Git, mengabaikan file yang tidak perlu)
├── README.md (Dokumentasi proyek singkat)
└── package.json (Jika Anda menggunakan Node.js untuk alat seperti PostCSS/Autoprefixer/bundler)

Penjelasan Struktur:

iklaninaja-website/: Ini adalah folder utama proyek Anda. Semua yang terkait dengan website akan berada di dalamnya.

public/: Folder ini adalah "akar" dari website Anda. Semua file yang akan diakses oleh browser (HTML, CSS, JavaScript, gambar) harus berada di sini. Ini adalah praktik terbaik untuk memisahkan kode sumber dari aset yang akan di-deploy.

index.html: Ini adalah halaman beranda yang sudah kita kerjakan.

Halaman HTML lainnya: Untuk setiap menu navigasi utama (tentang-kami.html, layanan.html, dst.), Anda akan membuat file HTML terpisah. Ini akan membuat website Anda lebih modular dan mudah dikelola daripada satu file HTML yang sangat panjang.

css/: Meskipun Anda menggunakan CDN Tailwind, jika Anda memiliki CSS kustom tambahan atau ingin mengkompilasi Tailwind secara lokal (untuk optimasi lebih lanjut), file style.css akan berada di sini.

js/: Folder ini akan menampung semua file JavaScript Anda.

main.js: Untuk fungsionalitas JavaScript yang berlaku di seluruh website (misalnya, navigasi hamburger, floating CTA).

home.js: Jika ada fungsionalitas JavaScript yang sangat spesifik hanya untuk homepage (seperti carousel testimonial atau integrasi Gemini API di halaman ini), Anda bisa memisahkannya ke file ini untuk menjaga main.js tetap bersih.

images/: Tempat untuk semua aset visual Anda.

.gitignore: Penting jika Anda menggunakan Git (sistem kontrol versi) untuk melacak perubahan kode Anda. File ini memberitahu Git file atau folder mana yang harus diabaikan (misalnya, node_modules/ jika Anda menginstal dependensi).

README.md: File ini berisi deskripsi singkat tentang proyek, cara menjalankannya, dan informasi penting lainnya. Sangat berguna untuk kolaborasi atau referensi di masa mendatang.

package.json: Jika Anda berencana untuk menggunakan alat pengembangan JavaScript modern (seperti PostCSS untuk mengkompilasi Tailwind secara lokal, atau bundler seperti Webpack/Vite), file ini akan mengelola dependensi proyek Anda. Untuk permulaan dengan CDN Tailwind, ini mungkin belum wajib, tetapi bagus untuk diketahui.

Algoritma Fitur Utama
Berikut adalah algoritma langkah demi langkah untuk fungsionalitas kunci yang telah atau akan kita implementasikan:

1. Algoritma Navigasi Hamburger (Mobile)
   Tujuan: Mengganti ikon hamburger dengan ikon "X" dan menampilkan/menyembunyikan menu navigasi di perangkat seluler.

Inisialisasi:

Dapatkan referensi ke tombol hamburger (hamburgerButton).

Dapatkan referensi ke menu seluler (mobileMenu).

Event Listener (Klik Tombol Hamburger):

Tambahkan event listener click ke hamburgerButton.

Saat diklik:

Toggle Kelas Aktif: Alihkan kelas CSS (misalnya, hamburger-active) pada hamburgerButton. Kelas ini akan memicu animasi CSS untuk mengubah ikon hamburger menjadi "X".

Toggle Visibilitas Menu: Alihkan kelas CSS (misalnya, hidden) pada mobileMenu. Ini akan menampilkan atau menyembunyikan menu.

Event Listener (Klik Tautan Menu Seluler):

Dapatkan semua tautan di dalam mobileMenu.

Untuk setiap tautan:

Tambahkan event listener click.

Saat diklik (setelah navigasi ke bagian yang relevan):

Hapus kelas hamburger-active dari hamburgerButton.

Tambahkan kelas hidden ke mobileMenu untuk menyembunyikan menu kembali.

2. Algoritma Carousel Testimoni
   Tujuan: Menampilkan testimoni pelanggan secara bergantian dengan navigasi manual dan otomatis.

Inisialisasi:

Dapatkan referensi ke kontainer carousel (carousel).

Dapatkan referensi ke tombol "Sebelumnya" (prevButton) dan "Berikutnya" (nextButton).

Inisialisasi currentIndex = 0 (menunjukkan testimoni pertama).

Deklarasikan variabel autoScrollInterval untuk interval auto-scroll.

Fungsi updateCarousel():

Hitung Lebar Item: Dapatkan lebar dari satu item testimoni (carousel.children[0].offsetWidth).

Geser Carousel: Atur properti transform: translateX() pada carousel berdasarkan currentIndex dan itemWidth untuk menggeser testimoni yang terlihat.

Event Listener (Klik Tombol Navigasi):

prevButton:

Saat diklik:

Jika currentIndex adalah 0, set currentIndex ke testimoni terakhir (carousel.children.length - 1).

Jika tidak, kurangi currentIndex sebesar 1.

Panggil updateCarousel().

nextButton:

Saat diklik:

Jika currentIndex adalah testimoni terakhir, set currentIndex ke 0.

Jika tidak, tambahkan currentIndex sebesar 1.

Panggil updateCarousel().

Fungsi startAutoScroll():

Panggil stopAutoScroll() terlebih dahulu untuk membersihkan interval yang mungkin sudah ada.

Set autoScrollInterval menggunakan setInterval():

Di dalam interval, tambahkan currentIndex sebesar 1.

Jika currentIndex melebihi jumlah testimoni, set kembali ke 0.

Panggil updateCarousel().

Atur durasi interval (misalnya, 5000 ms atau 5 detik).

Fungsi stopAutoScroll():

Hapus autoScrollInterval menggunakan clearInterval().

Interaksi Hover (Opsional):

Tambahkan event listener mouseenter ke kontainer carousel untuk memanggil stopAutoScroll().

Tambahkan event listener mouseleave ke kontainer carousel untuk memanggil startAutoScroll().

Inisialisasi Awal:

Saat halaman dimuat (window.onload atau DOMContentLoaded):

Panggil updateCarousel() untuk menampilkan testimoni pertama.

Panggil startAutoScroll() untuk memulai auto-scroll.

Saat ukuran jendela berubah (window.onresize):

Panggil updateCarousel() untuk menyesuaikan posisi carousel.

3. Algoritma Integrasi Gemini API (Rekomendasi Strategi)
   Tujuan: Mengambil input pengguna dan menggunakan Gemini API untuk menghasilkan rekomendasi strategi digital.

Inisialisasi:

Dapatkan referensi ke elemen input teks (businessNeedsInput).

Dapatkan referensi ke tombol "Dapatkan Rekomendasi" (generateStrategyBtn).

Dapatkan referensi ke area output strategi (strategyOutput, strategyText).

Dapatkan referensi ke indikator loading (loadingSpinner, buttonText).

Dapatkan referensi ke pesan error (errorMessage).

Event Listener (Klik Tombol Generate):

Tambahkan event listener click ke generateStrategyBtn.

Saat diklik:

Validasi Input: Periksa apakah businessNeedsInput tidak kosong. Jika kosong, tampilkan pesan peringatan (gunakan modal kustom, bukan alert()).

Tampilkan Status Loading:

Sembunyikan buttonText.

Tampilkan loadingSpinner.

Nonaktifkan generateStrategyBtn (disabled = true).

Sembunyikan strategyOutput dan errorMessage.

Persiapkan Prompt: Buat array chatHistory dengan objek yang berisi role: "user" dan parts: [{ text: prompt_string }]. Prompt string harus jelas dan mengarahkan Gemini untuk memberikan rekomendasi strategi yang ringkas.

Siapkan Payload API: Buat objek payload yang berisi contents (dari chatHistory).

Konfigurasi API: Tentukan apiKey (akan disediakan oleh Canvas) dan apiUrl untuk model Gemini yang akan digunakan (gemini-2.5-flash-preview-05-20).

Loop Retry dengan Exponential Backoff:

Inisialisasi retries = 0 dan maxRetries = 5.

Gunakan loop while (retries < maxRetries):

Di dalam blok try...catch:

Panggil API: Lakukan fetch ke apiUrl dengan metode POST, header Content-Type: application/json, dan body yang di-JSON-kan dari payload.

Cek Respons HTTP:

Jika response.ok adalah false:

Jika response.status adalah 429 (Too Many Requests): Hitung delay menggunakan exponential backoff (Math.pow(2, retries) _ baseDelay + Math.random() _ baseDelay), tambahkan retries, tunggu delay menggunakan new Promise(res => setTimeout(res, delay)), lalu continue loop untuk mencoba lagi.

Jika error HTTP lainnya, throw new Error.

Parse Respons JSON: const result = await response.json();.

Ekstrak Teks Rekomendasi: Periksa struktur result untuk memastikan result.candidates[0].content.parts[0].text ada.

Tampilkan Hasil: Set strategyText.textContent dengan teks rekomendasi dan tampilkan strategyOutput.

Keluar Loop: Gunakan break jika panggilan API berhasil.

Di blok catch (error):

Catat error ke konsol.

Tampilkan errorMessage.

Bersihkan strategyText.

break loop karena ini adalah error yang tidak dapat dipulihkan atau sudah mencapai batas percobaan.

Di blok finally (akan selalu dieksekusi):

Sembunyikan loadingSpinner.

Tampilkan buttonText.

Aktifkan kembali generateStrategyBtn (disabled = false).

Setelah loop selesai, jika retries === maxRetries, tampilkan pesan error bahwa batas percobaan telah tercapai.

Dengan panduan ini, Anda memiliki kerangka kerja yang solid untuk membangun website "IklaninAja" yang responsif dan cerdas. Anda bisa mulai dengan membuat folder dan file sesuai struktur, lalu mengisi konten HTML dan mengembangkan fungsionalitas JavaScript.

Apakah Anda ingin saya memberikan contoh kode untuk halaman HTML terpisah seperti tentang-kami.html atau layanan.html, atau ada bagian lain yang ingin Anda diskusikan lebih lanjut?
