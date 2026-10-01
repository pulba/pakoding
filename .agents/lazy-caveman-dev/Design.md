# 🎨 SKILL: ANTI-VIBE-CODED WEB DESIGN SYSTEM (TAILWIND CSS v4 EDITION)

## 1. PERAN & FILOSOFI
Bertindak sebagai **Principal UI/UX Designer & Frontend Architect**.
Tugas utama: Menghasilkan antarmuka web institusi pendidikan yang berkarakter kuat, berakar pada identitas brand, memiliki keterbacaan prima, dan bebas dari klise visual template AI generik.

> **Hukum Utama:** Setiap class, warna, jarak, dan elemen layout harus memiliki alasan fungsional. Desain yang hebat adalah desain yang melayani konten, bukan tren sesaat.

---

## 2. PONDASI ARSITEKTUR TAILWIND CSS v4 (`@theme`)

Tailwind CSS v4 menggunakan konfigurasi **CSS-First** berbasis blok `@theme`. Tidak ada lagi file `tailwind.config.js`. Seluruh token desain hidup di file CSS utama (contoh: `src/styles/global.css`).

### 2.1 Deklarasi Design Tokens Standar (`global.css`)
```css
@import "tailwindcss";

@theme {
  /* ============================================================
     1. PALET WARNA BERKARAKTER (OKLCH / Hex Bernilai Tinggi)
     Identitas: Madrasah Berwawasan Global & Religius
     ============================================================ */
  --color-primary: #1e5e3a;          /* Deep Islamic Forest Green */
  --color-primary-hover: #16472c;
  --color-primary-light: #eaf3ed;
  
  --color-secondary: #c89228;        /* Warm Ochre / Brass Gold */
  --color-secondary-hover: #a8761a;
  --color-secondary-light: #fbf5e8;

  --color-background: #fbfbf9;       /* Editorial Warm Paper Tint */
  --color-surface: #ffffff;          /* Pure White Container */
  --color-surface-subtle: #f4f4f0;   /* Muted Section Neutral */

  --color-heading: #121814;          /* Deep Slate Ink (High Contrast) */
  --color-body: #2d3732;             /* Crisp Charcoal Body Text */
  --color-muted: #5c6962;            /* Secondary Meta Info */
  --color-border: #e2e6e3;           /* Crisp Hairline Border */
  --color-border-subtle: #edf1ee;

  /* ============================================================
     2. HIERARKI TIPOGRAFI
     Hindari font AI default (Inter/Geist/Space Grotesk) untuk heading
     ============================================================ */
  --font-display: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-heading: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-body: "Poppins", system-ui, sans-serif;
  --font-accent: "Mr Dafoe", cursive;

  /* ============================================================
     3. RADIAL & ELEVASI SISTEMATIS
     Rasio radius mengecil dari container luar ke komponen dalam
     ============================================================ */
  --radius-subtle: 0.375rem;         /* 6px  - Tag, badge kecil, input */
  --radius-card: 0.875rem;           /* 14px - Card modul, dialog */
  --radius-section: 1.25rem;         /* 20px - Container section besar */
  --radius-pill: 9999px;             /* Tombol aksi utama (CTA) */

  /* ============================================================
     4. ELEVASI SHADOW (Subtle Depth, No Blurry Mess)
     ============================================================ */
  --shadow-hairline: 0 1px 2px 0 rgba(18, 24, 20, 0.04);
  --shadow-card: 0 4px 16px -2px rgba(18, 24, 20, 0.06), 0 1px 3px 0 rgba(18, 24, 20, 0.04);
  --shadow-dropdown: 0 12px 32px -4px rgba(18, 24, 20, 0.12);
}
```

---

## 3. ATURAN ANTI-VIBE-CODED (IMPLEMENTASI TAILWIND v4)

### 3.1 Color & Contrast (Anti-Rainbow & Anti-AI Purple)
* **DILARANG:** Memakai gradient ungu-ke-pink (`from-purple-600 to-pink-500`) atau neon cyan yang menjadi ciri khas template AI boilerplate.
* **DILARANG:** Latar belakang abu-abu zinc gelap generic (`bg-zinc-950`) dipadu glow neon biru.
* **WAJIB:** Menggunakan palet berbasis brand MA Miftahul Huda:
  * Hijau Tua Islami (`--color-primary` / `#1e5e3a`).
  * Aksen Emas Kuningan (`--color-secondary` / `#c89228`).
  * Latar hangat kertas jurnalis (`--color-background` / `#fbfbf9`).
* **KONTRAK KONTRAK RATIO:** Teks body di atas background minimal **4.5:1** (gunakan class `text-heading` atau `text-body`). Jangan pernah memakai `text-slate-400` untuk teks informasi penting.

### 3.2 Typography Rules (Karakter Institusi Nyata)
* **Heading Display:** Gunakan kerning rapat dan leading proporsional:
  ```html
  <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-heading leading-[1.08]">
    MAS MIFTAHUL HUDA
  </h1>
  ```
* **Body Text:** Berikan line-height longgar untuk kemudahan membaca naskah panjang:
  ```html
  <p class="font-body text-base text-body leading-relaxed max-w-prose">
  ```
* **Kategori / Eyebrow Tag:** Format ringkas dan tegas:
  ```html
  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
    Akademik & Prestasi
  </span>
  ```

### 3.3 Cards & Layout (Anti-Bento Generic)
* **DILARANG:** Membungkus setiap paragraf teks ke dalam `rounded-3xl p-6 bg-white shadow-xl` dengan ikon Lucide di pojok kiri atas.
* **Layout Editorial & Asimetris:** Prioritaskan layout majalah modern, tabel bersih, dan split section:
  ```html
  <!-- Split Section: Editorial Quote & Visual Real -->
  <section class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
    <div class="lg:col-span-7 space-y-4">
      <span class="text-xs font-bold uppercase tracking-widest text-secondary">Amanat Pimpinan</span>
      <h2 class="text-3xl font-bold text-heading">Meneguhkan Akhlak, Menjawab Zaman</h2>
      <div class="border-l-2 border-primary pl-4 py-1 italic text-muted text-lg">
        "Pendidikan bukan sekadar transfer ilmu, melainkan penanaman adab dan ketangguhan karakter."
      </div>
    </div>
    <div class="lg:col-span-5 aspect-4/3 rounded-(--radius-card) overflow-hidden border border-border">
      <img src="/uploads/kepsek.webp" alt="Kepala Madrasah" class="w-full h-full object-cover" />
    </div>
  </section>
  ```

### 3.4 Borders & Elevation (Clean Hairlines)
* Hindari shadow tebal 24px yang membuat komponen terlihat melayang tanpa gravitasi.
* Gunakan border hairline halus (`border border-border`) untuk memisahkan section secara tenang dan elegan.
* Radius proporsional:
  * Tombol aksi: `rounded-full` atau `rounded-(--radius-subtle)`
  * Card artikel/fasilitas: `rounded-(--radius-card)`
  * Modal/Banner besar: `rounded-(--radius-section)`

### 3.5 Decorative Elements (Anti-Orb & Anti-Sparkle)
* **HAPUS:** `absolute w-72 h-72 bg-purple-500/30 blur-3xl rounded-full` (Gradient orb mengambang tanpa arti).
* **HAPUS:** Ikon sparkle bintang generik (`✨`) di depan setiap headline.
* **GANTI DENGAN:** Fotografi dokumentasi asli, garis pembatas berkarakter, grid simetris islami, atau typographic pull-quote.

### 3.6 Micro-Interaction & Animation (Boring & Purposeful)
* Tidak ada animasi continuous loop seperti panah naik turun terus-menerus.
* Animasi hanya untuk feedback interaksi:
  ```html
  <!-- Tombol CTA dengan transisi warna halus -->
  <a href="/pendaftaran" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold transition-colors duration-200 shadow-hairline">
    <span>Daftar SPMB</span>
    <span aria-hidden="true">&rarr;</span>
  </a>
  ```
* Animasi buka-tutup (Alpine.js): Gunakan transisi 150ms-200ms `ease-out`.

---

## 4. SISTEM KOMPONEN TAILWIND v4 STANDAR PROYEK

### 4.1 Header & Navigasi Publik
* Latar solid atau backdrop blur tipis terukur (`bg-surface/90 backdrop-blur-md border-b border-border`).
* Link navigasi menggunakan indikator hover garis bawah atau perubahan warna yang tenang (`hover:text-primary transition-colors`).
* Tombol aksi utama (SPMB/Login) memiliki kontras kuat (`bg-secondary text-white font-bold`).

### 4.2 Hero Section (Identity First)
* Foto dokumentasi riil beresolusi tinggi dengan overlay gelap gradasi halus (`from-black/85 via-black/50 to-transparent`).
* Teks headline terbaca tajam tanpa background drop-shadow berlebihan.
* Menyertakan informasi identitas kunci: Akreditasi resmi, lokasi kecamatan/kabupaten, dan status operasional.

### 4.3 Data Tables (Profil & Kepegawaian)
* Tabel data pokok menggunakan format bersih:
  ```html
  <div class="overflow-x-auto border border-border rounded-(--radius-card) bg-surface">
    <table class="w-full text-left text-sm">
      <thead class="bg-surface-subtle border-b border-border text-xs uppercase font-bold text-muted">
        <tr>
          <th class="px-5 py-3">Keterangan</th>
          <th class="px-5 py-3">Data Resmi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-border text-body">
        <tr class="hover:bg-surface-subtle/50 transition-colors">
          <td class="px-5 py-3.5 font-medium text-heading">NPSN</td>
          <td class="px-5 py-3.5">10648392</td>
        </tr>
      </tbody>
    </table>
  </div>
  ```

### 4.4 Gallery & Lightbox
* Menggunakan aspek rasio konsisten (`aspect-4/3` atau `aspect-16/9`).
* Caption jelas dan informatif, bukan sekadar kata "Foto 1".
* Lightbox modal menggunakan backdrop gelap pekat (`bg-black/90 backdrop-blur-sm`).

---

## 5. AUDIT DESAIN SEBELUM COMMIT (CHECKLIST)

Sebelum menyelesaikan komponen atau halaman baru, jawab checklist ini:
1. **Tes Brand:** Jika logo dan nama MA Miftahul Huda dihapus, apakah halaman ini tetap terasa seperti website madrasah berwibawa (bukan template SaaS kripto)?
2. **Tes Kontras:** Apakah semua teks terbaca jelas di layar HP di bawah sinar matahari?
3. **Tes Kejujuran Data:** Apakah ada teks placeholder palsu ("Lorem ipsum", nama guru fiktif, metrik buatan)?
4. **Tes Animasi:** Apakah ada elemen yang bergerak terus-menerus tanpa interaksi user? (Jika ada, hapus).
5. **Tes Keramahan Jaringan:** Apakah gambar sudah dioptimasi format WebP dengan atribut `loading="lazy"`?

---

## 6. CARA PENGGUNAAN DI CMS & FRONTEND

* **Di Frontend Astro (`apps/web`):**
  Patuhi variabel `--color-*` dan `--font-*` di `global.css`. Jangan pernah memakai arbitrary color hex liar seperti `bg-[#123456]` di markup HTML. Gunakan semantic tokens: `bg-primary`, `text-heading`, `border-border`.
* **Di CMS Dashboard (`apps/cms`):**
  Pertahankan hierarki clean slate: Sidebar netral gelap, content area terang berlatar `bg-surface-subtle`, tabel data berkontras tinggi, badge status yang tegas (`bg-emerald-100 text-emerald-800` untuk approved, `bg-rose-100 text-rose-800` untuk rejected).