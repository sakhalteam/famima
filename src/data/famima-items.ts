export interface FamimaItem {
  id: string;
  nameJp: string;
  nameEn: string;
  price: number;
  /** Tax category: "food" = 8% reduced, "other" = 10% standard */
  tax: "food" | "other";
  category: string;
  emoji: string;
}

export const famimaItems: FamimaItem[] = [
  // ── Onigiri ──
  { id: "onigiri_shake", nameJp: "手巻おにぎり 鮭", nameEn: "Salmon Onigiri", price: 160, tax: "food", category: "onigiri", emoji: "🍙" },
  { id: "onigiri_ume", nameJp: "手巻おにぎり 梅", nameEn: "Ume Onigiri", price: 140, tax: "food", category: "onigiri", emoji: "🍙" },
  { id: "onigiri_tuna", nameJp: "手巻おにぎり ツナマヨ", nameEn: "Tuna Mayo Onigiri", price: 150, tax: "food", category: "onigiri", emoji: "🍙" },
  { id: "onigiri_mentaiko", nameJp: "手巻おにぎり 明太子", nameEn: "Mentaiko Onigiri", price: 170, tax: "food", category: "onigiri", emoji: "🍙" },

  // ── Hot food ──
  { id: "famichiki", nameJp: "ファミチキ", nameEn: "Famichiki", price: 220, tax: "food", category: "hot", emoji: "🍗" },
  { id: "karaage_kun", nameJp: "からあげクン レギュラー", nameEn: "Karaage-kun Regular", price: 238, tax: "food", category: "hot", emoji: "🍗" },
  { id: "katsu_bento", nameJp: "ロースかつ弁当", nameEn: "Katsu Bento", price: 598, tax: "food", category: "hot", emoji: "🍱" },
  { id: "nikuman", nameJp: "肉まん", nameEn: "Nikuman", price: 180, tax: "food", category: "hot", emoji: "🥟" },

  // ── Sweets ──
  { id: "mochi_ichigo", nameJp: "いちご大福", nameEn: "Strawberry Mochi", price: 180, tax: "food", category: "sweets", emoji: "🍡" },
  { id: "koala_march", nameJp: "コアラのマーチ", nameEn: "Koala's March", price: 118, tax: "food", category: "sweets", emoji: "🐨" },
  { id: "calorie_mate", nameJp: "カロリーメイト チーズ", nameEn: "Calorie Mate Cheese", price: 210, tax: "food", category: "sweets", emoji: "📦" },
  { id: "coolish", nameJp: "クーリッシュ バニラ", nameEn: "Coolish Vanilla", price: 160, tax: "food", category: "sweets", emoji: "🍦" },

  // ── Drinks ──
  { id: "itoen_ooi", nameJp: "お〜いお茶 緑茶 500ml", nameEn: "Oi Ocha Green Tea", price: 160, tax: "food", category: "drinks", emoji: "🍵" },
  { id: "boss_rainbow", nameJp: "BOSS レインボーマウンテン", nameEn: "BOSS Rainbow Mountain", price: 150, tax: "food", category: "drinks", emoji: "☕" },
  { id: "georgia_emerald", nameJp: "ジョージア エメラルドマウンテン", nameEn: "Georgia Emerald Mountain", price: 160, tax: "food", category: "drinks", emoji: "☕" },
  { id: "yakult_1000", nameJp: "Yakult 1000", nameEn: "Yakult 1000", price: 180, tax: "food", category: "drinks", emoji: "🥛" },
  { id: "ukon", nameJp: "ウコンの力", nameEn: "Ukon no Chikara", price: 220, tax: "food", category: "drinks", emoji: "🧴" },
  { id: "vitamin_jelly", nameJp: "inゼリー マルチビタミン", nameEn: "in Jelly Multivitamin", price: 198, tax: "food", category: "drinks", emoji: "🫗" },

  // ── Daily goods ──
  { id: "fm_sunglasses", nameJp: "ファミマ サングラス", nameEn: "Famima Sunglasses", price: 770, tax: "other", category: "goods", emoji: "🕶️" },
  { id: "fm_razor", nameJp: "ファミマ シェーバー", nameEn: "Famima Razor", price: 330, tax: "other", category: "goods", emoji: "🪒" },
  { id: "tombow_glue", nameJp: "トンボ 消えいろPiT", nameEn: "Tombow Glue Stick", price: 118, tax: "other", category: "goods", emoji: "📎" },
  { id: "pilot_pen", nameJp: "パイロット ジュースアップ 0.4", nameEn: "Pilot Juice Up 0.4", price: 220, tax: "other", category: "goods", emoji: "🖊️" },
  { id: "fm_scissors", nameJp: "ファミマ はさみ", nameEn: "Famima Scissors", price: 440, tax: "other", category: "goods", emoji: "✂️" },
];

export const categories = [
  { id: "onigiri", label: "おにぎり", labelEn: "Onigiri" },
  { id: "hot", label: "ホット", labelEn: "Hot Food" },
  { id: "sweets", label: "お菓子", labelEn: "Sweets" },
  { id: "drinks", label: "飲み物", labelEn: "Drinks" },
  { id: "goods", label: "日用品", labelEn: "Daily Goods" },
];
