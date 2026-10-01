import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { marked } from 'marked';

// Read full markdown file and strip BOM
const mdPath = join(process.cwd(), 'Buku_Ajar_Multimedia.md');
let content = readFileSync(mdPath, 'utf-8').replace(/^\uFEFF/, '');

// Ensure output directories exist
const contentDir = join(process.cwd(), 'src', 'content', 'materi');
const dataDir = join(process.cwd(), 'src', 'data');
if (!existsSync(contentDir)) mkdirSync(contentDir, { recursive: true });
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

// Split by top-level `# MATERI` headings
const lines = content.split(/\r?\n/);

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface TopicData {
  id: string;
  slug: string;
  moduleSlug: string;
  letter: string;
  title: string;
  html: string;
  toc: TocItem[];
}

export interface ModuleData {
  id: number;
  displayNumber: string;
  slug: string;
  title: string;
  fullTitle: string;
  subtitle: string;
  category: string;
  description: string;
  tags: string[];
  duration: string;
  sessions: string;
  isProject?: boolean;
  topics: Omit<TopicData, 'html'>[];
}

// Map numbering: original id -> clean sequence (1..9)
const sequenceMap: Record<number, { display: string; slug: string; category: string; isProject?: boolean }> = {
  1: { display: '01', slug: 'materi-1', category: 'Dasar & Konsep' },
  2: { display: '02', slug: 'materi-2', category: 'Desain Grafis' },
  3: { display: '03', slug: 'materi-3', category: 'Fotografi' },
  4: { display: '04', slug: 'materi-4', category: 'Videografi' },
  5: { display: '05', slug: 'materi-5', category: 'Editing Video' },
  6: { display: '06', slug: 'materi-6', category: 'Public Speaking' },
  7: { display: '07', slug: 'materi-7', category: 'Storytelling' },
  8: { display: '08', slug: 'materi-8', category: 'Praktik Digital' },
  10: { display: '09', slug: 'materi-9', category: 'Project Akhir', isProject: true }
};

const conciseDescriptions: Record<number, string> = {
  1: 'Pengantar konsep multimedia terpadu, unsur visual mendasar, prinsip komposisi gambar, dan teori harmoni warna.',
  2: 'Prinsip desain grafis modern, anatomi tipografi, hierarki pesan visual, dan sistem grid tata letak terstruktur.',
  3: 'Teknik pengoperasian kamera, penguasaan segitiga exposure, karakteristik lensa, dan teknik pencahayaan alami/buatan.',
  4: 'Dasar sinematografi, klasifikasi ukuran shot (framing), sudut pengambilan gambar, dan teknik pergerakan kamera dinamis.',
  5: 'Alur kerja pasca-produksi menggunakan CapCut Desktop, teknik cut & trim, penataan B-roll, serta sinkronisasi audio.',
  6: 'Keterampilan olah vokal, artikulasi, bahasa tubuh komunikatif, serta membangun kepercayaan diri di depan kamera.',
  7: 'Seni merancang narasi memikat, struktur cerita tiga babak, formula hook 3 detik, dan penulisan naskah video komersial.',
  8: 'Implementasi desain praktis dengan Canva: pembuatan feed Instagram, poster promosi resmi, hingga ekspor multi-format.',
  10: 'Simulasi agensi kreatif terpadu: memproduksi paket kampanye multimedia menyeluruh dari tahap brief klien hingga showcase final.'
};

const subtitleMap: Record<number, string> = {
  1: 'Pengantar, Unsur Visual, Komposisi, & Harmoni Warna',
  2: 'Prinsip Desain, Tipografi Kontras, & Hierarki Pesan',
  3: 'Teknik Kamera, Exposure, Pencahayaan, & Momentum',
  4: 'Bahasa Visual Sinema, Ukuran Shot, & Pergerakan Kamera',
  5: 'Alur Kerja Pasca-Produksi, Pacing, & Sinkronisasi Audio',
  6: 'Olah Vokal, Bahasa Tubuh, & Kepercayaan Diri di Depan Kamera',
  7: 'Seni Bertutur, Membangun Empati, & Merancang Naskah Kuat',
  8: 'Implementasi Desain Praktis & Pembuatan Aset Digital',
  10: 'Simulasi Agensi Kreatif: Dari Brief Klien hingga Produk Final'
};

const tagMap: Record<number, string[]> = {
  1: ['Fondasi Visual', 'Komposisi', 'Teori Warna', 'Estetika Media'],
  2: ['Desain Grafis', 'Tipografi', 'Hierarki Visual', 'Layout Grid'],
  3: ['Fotografi Digital', 'Segitiga Exposure', 'Komposisi Foto', 'Lensa & Cahaya'],
  4: ['Sinematografi', 'Shot Types', 'Camera Movement', 'Framing Audio'],
  5: ['Editing Video', 'CapCut Desktop', 'Cut & B-Roll', 'Transisi & Efek'],
  6: ['Public Speaking', 'Vokal & Nada', 'Gesture & Tatapan', 'Presenter'],
  7: ['Storytelling', 'Struktur 3 Babak', 'Hook & Emosi', 'Scriptwriting'],
  8: ['Praktik Canva', 'Workshop Grafis', 'Brand Identity', 'Ekspor Multi-Format'],
  10: ['Project Terpadu', 'Creative Agency', 'Kampanye Multimedia', 'Showcase']
};

const durationMap: Record<number, { duration: string; sessions: string }> = {
  1: { duration: '4 JP', sessions: '2 Sesi' },
  2: { duration: '6 JP', sessions: '3 Sesi' },
  3: { duration: '6 JP', sessions: '3 Sesi' },
  4: { duration: '6 JP', sessions: '3 Sesi' },
  5: { duration: '6 JP', sessions: '3 Sesi' },
  6: { duration: '4 JP', sessions: '2 Sesi' },
  7: { duration: '4 JP', sessions: '2 Sesi' },
  8: { duration: '6 JP', sessions: '3 Sesi' },
  10: { duration: '12 JP', sessions: '6 Sesi' }
};

const modules: ModuleData[] = [];
let currentModule: ModuleData | null = null;
let currentTopic: any = null;
let currentTopicLines: string[] = [];

function toTitleCase(str: string): string {
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function finalizeTopic() {
  if (!currentTopic || !currentModule) return;

  let rawMd = currentTopicLines.join('\n');

  // Normalize image paths
  rawMd = rawMd.replace(/!\[(.*?)\]\(assets\/(.*?)\)/g, '![$1](/assets/$2)');
  rawMd = rawMd.replace(/!\[(.*?)\]\((image(?:-\d+)?\.png)\)/g, '![$1]/$2');

  const toc: TocItem[] = [];
  const renderer = new marked.Renderer();
  
  renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
    // Ignore the ## A. TITLE heading as it's the page title
    if (depth === 2 && text.match(/^([A-Z])\.\s*(.*)$/)) {
      return ''; 
    }
    
    // Ignore GAMBAR CONTOH headings as requested by user
    if (text.toUpperCase().includes('GAMBAR CONTOH')) {
      return '';
    }
    
    const plainText = text.replace(/<[^>]+>/g, '').trim();
    // Sub-headings inside a topic are usually ### 1. Title
    const matchH3 = plainText.match(/^(\d+)\.\s*(.*)$/);
    let titleForToc = plainText;
    let id = '';
    
    if (matchH3) {
      titleForToc = `${matchH3[1]}. ${matchH3[2]}`;
      id = slugify(matchH3[2]);
    } else {
      id = slugify(plainText);
    }
    
    if (depth === 3 || depth === 4) {
      toc.push({ id, title: titleForToc, level: depth });
    }

    return `<h${depth} id="${id}" class="heading-${depth}">${text}</h${depth}>\n`;
  };

  renderer.blockquote = ({ text }: { text: string }) => {
    const isPractice = text.includes('Instruksi Praktik') || text.includes('Praktik Sederhana');
    const isObjective = text.includes('Tujuan Pembelajaran') || text.includes('Target Belajar');

    if (isPractice) {
      let cleanText = text.replace(/<p><strong>(.*?)<\/strong>:\s*<\/p>|<p><strong>(.*?)<\/strong>\s*(?:<br>)?/, '<div class="block-practice-title">$1$2</div><p>');
      return `<div class="block-practice">\n${cleanText}\n</div>\n`;
    }
    if (isObjective) {
      let cleanText = text.replace(/<p><strong>(.*?)<\/strong>:\s*<\/p>|<p><strong>(.*?)<\/strong>\s*(?:<br>)?/, '<div class="block-objective-title">$1$2</div><p>');
      return `<div class="block-objective">\n${cleanText}\n</div>\n`;
    }
    
    return `<blockquote>\n${text}\n</blockquote>\n`;
  };

  const html = marked.parse(rawMd, { renderer, async: false }) as string;
  
  const topicSlug = `${currentModule.slug}-${currentTopic.letter.toLowerCase()}`;
  
  const fullTopicData: TopicData = {
    id: topicSlug,
    slug: topicSlug,
    moduleSlug: currentModule.slug,
    letter: currentTopic.letter,
    title: currentTopic.title,
    html,
    toc
  };

  // Write full topic JSON to content/materi
  writeFileSync(join(contentDir, `${topicSlug}.json`), JSON.stringify(fullTopicData, null, 2), 'utf-8');

  // Push metadata to module
  currentModule.topics.push({
    id: fullTopicData.id,
    slug: fullTopicData.slug,
    moduleSlug: fullTopicData.moduleSlug,
    letter: fullTopicData.letter,
    title: fullTopicData.title,
    toc: fullTopicData.toc
  });
}

function finalizeModule() {
  if (!currentModule) return;
  modules.push(currentModule);
}

for (const line of lines) {
  const matchModule = line.match(/^#\s+MATERI\s+(\d+)\.\s*(.*)$/);
  const matchTopic = line.match(/^##\s+([A-Z])\.\s*(.*)$/);

  if (matchModule) {
    if (currentTopic) finalizeTopic();
    if (currentModule) finalizeModule();
    
    const id = parseInt(matchModule[1], 10);
    const title = toTitleCase(matchModule[2].trim());
    
    const seq = sequenceMap[id] || { display: '00', slug: `materi-${id}`, category: 'Umum' };
    const dur = durationMap[id] || { duration: '4 JP', sessions: '2 Sesi' };
    
    currentModule = {
      id,
      displayNumber: seq.display,
      slug: seq.slug,
      title,
      fullTitle: `Modul ${seq.display}. ${title}`,
      subtitle: subtitleMap[id] || title,
      category: seq.category,
      description: conciseDescriptions[id] || 'Modul pembelajaran kurikulum multimedia.',
      tags: tagMap[id] || ['Multimedia'],
      duration: dur.duration,
      sessions: dur.sessions,
      isProject: !!seq.isProject,
      topics: []
    };
    currentTopic = null;
    currentTopicLines = [];
  } else if (matchTopic) {
    if (currentTopic) finalizeTopic();
    currentTopic = { letter: matchTopic[1], title: toTitleCase(matchTopic[2].trim()) };
    currentTopicLines = [line];
  } else {
    if (currentTopic) {
      currentTopicLines.push(line);
    }
  }
}
if (currentTopic) finalizeTopic();
if (currentModule) finalizeModule();

console.log(`Parsed ${modules.length} modules. Writing metadata.`);

// Write metadata list
writeFileSync(join(dataDir, 'materi.json'), JSON.stringify(modules, null, 2), 'utf-8');

// Cleanup old files (like materi-1.json) if any exist to prevent confusion
import { readdirSync, unlinkSync } from 'node:fs';
const oldFiles = readdirSync(contentDir).filter(f => f.match(/^materi-\d+\.json$/));
oldFiles.forEach(f => unlinkSync(join(contentDir, f)));

console.log('All files updated successfully! Old combined JSON files cleaned up.');
