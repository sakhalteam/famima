import { useState } from "react";
import { Link } from "react-router-dom";

interface OnigiriEntry {
  id: string;
  nameJp: string;
  nameEn: string;
  filling: string;
  emoji: string;
  description: string;
  funFact: string;
  calories: number;
  price: number;
}

const onigiri: OnigiriEntry[] = [
  {
    id: "shake",
    nameJp: "鮭",
    nameEn: "Salmon",
    filling: "Grilled salted salmon flakes",
    emoji: "🍙",
    description: "The undisputed champion of konbini onigiri. Pink salmon flakes nestled in fluffy white rice, wrapped in crispy nori.",
    funFact: "Shake onigiri accounts for ~30% of all konbini onigiri sales in Japan.",
    calories: 183,
    price: 160,
  },
  {
    id: "ume",
    nameJp: "梅",
    nameEn: "Pickled Plum",
    filling: "Sour pickled plum (umeboshi)",
    emoji: "🍙",
    description: "A single, intensely sour umeboshi sits at the heart. The original rice ball filling — it's been in bento boxes for centuries.",
    funFact: "Umeboshi was used by samurai to fight fatigue. The citric acid helps prevent food spoilage.",
    calories: 168,
    price: 140,
  },
  {
    id: "tuna_mayo",
    nameJp: "ツナマヨ",
    nameEn: "Tuna Mayo",
    filling: "Tuna mixed with Japanese mayo",
    emoji: "🍙",
    description: "Creamy tuna salad filling made with Japanese Kewpie mayo. Invented in 1983 by a Lawson store — now a konbini icon.",
    funFact: "Tuna mayo consistently battles salmon for the #1 spot. It's the most popular filling among young people.",
    calories: 232,
    price: 150,
  },
  {
    id: "mentaiko",
    nameJp: "明太子",
    nameEn: "Spicy Cod Roe",
    filling: "Marinated pollock roe (mentaiko)",
    emoji: "🍙",
    description: "Spicy, briny, umami-rich cod roe from Hakata. Each tiny egg pops with flavor. A Kyushu specialty gone nationwide.",
    funFact: "Mentaiko was inspired by Korean myeongnan-jeot. It was first sold in Fukuoka in 1949.",
    calories: 175,
    price: 170,
  },
  {
    id: "kombu",
    nameJp: "昆布",
    nameEn: "Simmered Kelp",
    filling: "Sweet soy-simmered kombu strips",
    emoji: "🍙",
    description: "Strips of kombu kelp simmered in soy sauce and mirin until tender and deeply savory. Pure umami comfort.",
    funFact: "Kombu is one of the key ingredients in dashi, the foundation of Japanese cuisine.",
    calories: 172,
    price: 130,
  },
  {
    id: "okaka",
    nameJp: "おかか",
    nameEn: "Bonito Flakes",
    filling: "Soy-seasoned bonito flakes (katsuobushi)",
    emoji: "🍙",
    description: "Dried bonito flakes moistened with soy sauce. Simple, old-school, and deeply satisfying. A taste of grandma's kitchen.",
    funFact: "Katsuobushi is one of the hardest foods in the world — it's shaved with a special plane.",
    calories: 176,
    price: 130,
  },
  {
    id: "tenmusu",
    nameJp: "天むす",
    nameEn: "Tempura Shrimp",
    filling: "Crispy shrimp tempura",
    emoji: "🍙",
    description: "A whole tempura shrimp tucked into rice. Born in Nagoya, this is the ultimate crossover — crunchy meets fluffy.",
    funFact: "Tenmusu was accidentally invented in the 1950s when a Nagoya restaurant owner ran out of tempura rice bowls.",
    calories: 215,
    price: 180,
  },
  {
    id: "niku_miso",
    nameJp: "肉味噌",
    nameEn: "Meat Miso",
    filling: "Seasoned ground pork with red miso",
    emoji: "🍙",
    description: "Rich, sweet-savory ground pork cooked down with miso paste. Hearty and warming — a meal in your hand.",
    funFact: "Miso-based fillings are especially popular in the Chubu (central) region of Japan.",
    calories: 210,
    price: 160,
  },
];

export default function OnigiriZukan() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = onigiri[selectedIndex];

  return (
    <div className="receipt-page">
      <header className="receipt-header">
        <Link to="/" className="receipt-back">Family Mart</Link>
        <h1 className="receipt-title">おにぎり図鑑 — Onigiri Zukan</h1>
      </header>

      <div className="zukan-layout">
        {/* Onigiri list */}
        <div className="zukan-list">
          {onigiri.map((o, i) => (
            <button
              key={o.id}
              className={`zukan-item ${i === selectedIndex ? "zukan-item--active" : ""}`}
              onClick={() => setSelectedIndex(i)}
            >
              <span className="zukan-item-emoji">{o.emoji}</span>
              <span className="zukan-item-name">{o.nameJp}</span>
              <span className="zukan-item-name-en">{o.nameEn}</span>
            </button>
          ))}
        </div>

        {/* Detail card */}
        <div className="zukan-detail">
          <div className="zukan-detail-hero">{selected.emoji}</div>
          <h2 className="zukan-detail-title">{selected.nameJp}</h2>
          <p className="zukan-detail-subtitle">{selected.nameEn} — {selected.filling}</p>
          <p className="zukan-detail-desc">{selected.description}</p>

          <div className="zukan-detail-stats">
            <div className="zukan-stat">
              <span className="zukan-stat-label">Calories</span>
              <span className="zukan-stat-value">{selected.calories} kcal</span>
            </div>
            <div className="zukan-stat">
              <span className="zukan-stat-label">Price</span>
              <span className="zukan-stat-value">¥{selected.price}</span>
            </div>
          </div>

          <div className="zukan-funfact">
            <span className="zukan-funfact-label">Fun Fact</span>
            <p>{selected.funFact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
