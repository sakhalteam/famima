export interface Experience {
  id: string;
  titleJp: string;
  titleEn: string;
  description: string;
  emoji: string;
  path: string;
  ready: boolean;
  /** GLB object name this card floats above */
  portalMesh: string;
}

export const experiences: Experience[] = [
  {
    id: "konbini-receipt-generator",
    titleJp: "レシート",
    titleEn: "Konbini Receipt",
    description: "Shop from the shelves and generate a pixel-perfect Famima receipt",
    emoji: "🧾",
    path: "/konbini-receipt-generator",
    ready: true,
    portalMesh: "portal_konbini_receipt_generator",
  },
  {
    id: "onigiri-zukan",
    titleJp: "おにぎり図鑑",
    titleEn: "Onigiri Zukan",
    description: "An illustrated encyclopedia of konbini onigiri",
    emoji: "🍙",
    path: "/onigiri-zukan",
    ready: false,
    portalMesh: "portal_page_03",
  },
  {
    id: "famichiki-clicker",
    titleJp: "ファミチキ",
    titleEn: "Famichiki Clicker",
    description: "An incremental frying game. How crispy can you get?",
    emoji: "🍗",
    path: "/famichiki-clicker",
    ready: false,
    portalMesh: "portal_page_04",
  },
  {
    id: "nakami-toggle",
    titleJp: "中身トグル",
    titleEn: "Nakami Toggle",
    description: "Cross-section viewer for konbini food items",
    emoji: "🔍",
    path: "/nakami-toggle",
    ready: false,
    portalMesh: "portal_page_05",
  },
  {
    id: "iriguchi-chime",
    titleJp: "入口チャイム",
    titleEn: "Iriguchi Chime",
    description: "A step sequencer for the iconic door chime",
    emoji: "🔔",
    path: "/iriguchi-chime",
    ready: false,
    portalMesh: "portal_page_06",
  },
  {
    id: "bento-builder",
    titleJp: "弁当ビルダー",
    titleEn: "Bento Builder",
    description: "Drag-and-drop bento box composer",
    emoji: "🍱",
    path: "/bento-builder",
    ready: false,
    portalMesh: "portal_nothing",
  },
];
