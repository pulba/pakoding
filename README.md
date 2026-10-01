# PaKoding - Platform Belajar Multimedia Digital

PaKoding adalah sebuah *platform* *Website Belajar* (Buku Ajar Digital) modern yang didesain secara khusus untuk menyajikan materi-materi pembelajaran seputar **Multimedia Kreatif**. Platform ini dibangun menggunakan arsitektur SSG (Static Site Generation) untuk kecepatan maksimal, dengan gaya desain bernuansa *Dark Editorial Technical*.

## ✨ Fitur Utama

- **Desain Editorial Mode Gelap**: Dibangun menggunakan palet warna khusus berarsitektur elevasi (bukan warna dasar biasa) untuk pengalaman membaca *distraction-free* yang profesional.
- **Sistem Modul Terstruktur**: Lebih dari 70+ topik pembelajaran telah dipecah secara sistematis dari dokumen besar ke dalam bentuk modul-modul JSON/Markdown.
- **Filter & Pencarian Dinamis**: Katalog materi di halaman utama dilengkapi dengan fitur filter kategori berbasis *tab* dan pencarian teks secara *real-time* menggunakan *Vanilla JavaScript* (tanpa membebani *server*).
- **Pembaca Bebas Gangguan (Reader View)**: Halaman membaca (baca materi) didesain sangat minimalis tanpa *sidebar* rumit atau elemen tambahan agar siswa dapat fokus 100% ke konten.
- **Astro SSG**: Dibuat menggunakan kerangka kerja Astro untuk menjamin generasi halaman statis yang sangat cepat dan ramah SEO.
- **Responsif Penuh**: Tata letak sempurna untuk digunakan di PC, tablet, maupun *smartphone*.

## 🚀 Teknologi yang Digunakan

- **Framework**: [Astro](https://astro.build/)
- **Styling**: Tailwind CSS + Vanilla CSS (Variables & Tokens System)
- **Runtime**: [Bun](https://bun.sh/)
- **Content System**: Markdown/HTML dalam objek JSON (`src/content/materi/`)

## 📂 Struktur Proyek

```text
/
├── public/                 # Aset publik seperti logo, favicon, dan file gambar
├── src/
│   ├── content/materi/     # Data materi hasil ekstraksi (.json)
│   ├── data/
│   │   └── materi.json     # Indeks dan meta data seluruh katalog modul
│   ├── layouts/
│   │   └── Layout.astro    # Master template website (Header, Footer, Dark Mode toggle)
│   ├── pages/
│   │   ├── index.astro     # Halaman utama dengan Filter & Pencarian
│   │   ├── tentang.astro   # Halaman visi dan kurikulum
│   │   └── materi/
│   │       └── [slug].astro # Template pembaca konten dinamis (Reader UI)
│   └── styles/
│       └── global.css      # Design System, CSS Variables, dan pengaturan tipografi
└── scripts/
    └── split_materi.ts     # Skrip pengolah/pemecah data materi master
```

## 💻 Cara Menjalankan Proyek

1. **Instalasi Dependencies**
   Pastikan Anda telah menginstal `bun` di komputer Anda, lalu jalankan:
   ```bash
   bun install
   ```

2. **Mode Pengembangan (Development)**
   Jalankan server pengembangan lokal (tersedia secara instan di `localhost:4321`):
   ```bash
   bun run dev
   ```

3. **Membangun Proyek (Build)**
   Untuk memproduksi halaman statis yang siap dipublikasikan ke *hosting*:
   ```bash
   bun run build
   ```

4. **Pratinjau Hasil Build (Preview)**
   Untuk melihat pratinjau hasil *build* final lokal:
   ```bash
   bun run preview
   ```

---
*Dikembangkan dengan fokus pada eksekusi teknis dan estetika visual tingkat tinggi.*
