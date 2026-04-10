import { useState } from "react";
import { Link } from "react-router-dom";

interface FoodItem {
  id: string;
  nameJp: string;
  nameEn: string;
  outsideEmoji: string;
  insideEmoji: string;
  outsideDesc: string;
  insideDesc: string;
  layers: string[];
}

const foods: FoodItem[] = [
  {
    id: "onigiri",
    nameJp: "おにぎり",
    nameEn: "Onigiri",
    outsideEmoji: "🍙",
    insideEmoji: "🔴",
    outsideDesc: "Triangular rice ball wrapped in crispy seaweed",
    insideDesc: "Fluffy rice surrounding a core of seasoned salmon flakes",
    layers: ["Nori seaweed (outer)", "Compressed rice", "Salmon filling (center)", "Salt crystals (surface)"],
  },
  {
    id: "nikuman",
    nameJp: "肉まん",
    nameEn: "Nikuman",
    outsideEmoji: "🥟",
    insideEmoji: "🟤",
    outsideDesc: "Fluffy white steamed bun, slightly sticky to the touch",
    insideDesc: "Juicy pork mince with ginger, soy, and sesame oil",
    layers: ["Steamed dough (outer)", "Thin gelatin layer", "Pork + onion filling", "Rendered pork fat (juice)"],
  },
  {
    id: "famichiki",
    nameJp: "ファミチキ",
    nameEn: "Famichiki",
    outsideEmoji: "🍗",
    insideEmoji: "⬜",
    outsideDesc: "Crispy golden-brown battered chicken cutlet",
    insideDesc: "Tender, juicy chicken thigh meat with pepper seasoning",
    layers: ["Crispy batter crust", "Seasoned flour coating", "Marinated chicken thigh", "Natural juices (center)"],
  },
  {
    id: "egg_sandwich",
    nameJp: "たまごサンド",
    nameEn: "Egg Sandwich",
    outsideEmoji: "🥪",
    insideEmoji: "🟡",
    outsideDesc: "Soft white bread with the crusts trimmed off",
    insideDesc: "Creamy egg salad made with Kewpie mayo and a touch of mustard",
    layers: ["Soft shokupan bread", "Thin mayo layer", "Mashed egg salad", "Whole egg chunks"],
  },
  {
    id: "melon_pan",
    nameJp: "メロンパン",
    nameEn: "Melon Pan",
    outsideEmoji: "🍈",
    insideEmoji: "🫧",
    outsideDesc: "Crunchy cookie crust scored in a grid pattern",
    insideDesc: "Soft, airy bread interior — surprisingly light",
    layers: ["Sugar-cookie crust (crunchy)", "Thin crispy boundary", "Fluffy bread dough", "Air pockets throughout"],
  },
  {
    id: "oden_egg",
    nameJp: "おでんの卵",
    nameEn: "Oden Egg",
    outsideEmoji: "🥚",
    insideEmoji: "🟠",
    outsideDesc: "A whole boiled egg steeped in savory dashi broth",
    insideDesc: "Deeply flavored white with a rich, slightly soft golden yolk",
    layers: ["Dashi-infused white (outer)", "Firm white (inner)", "Creamy yolk (golden)", "Soft center"],
  },
];

export default function NakamiToggle() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showInside, setShowInside] = useState(false);
  const selected = foods[selectedIndex];

  return (
    <div className="receipt-page">
      <header className="receipt-header">
        <Link to="/" className="receipt-back">Family Mart</Link>
        <h1 className="receipt-title">中身トグル — Nakami Toggle</h1>
      </header>

      <div className="nakami-layout">
        <div className="nakami-list">
          {foods.map((f, i) => (
            <button
              key={f.id}
              className={`nakami-item ${i === selectedIndex ? "nakami-item--active" : ""}`}
              onClick={() => { setSelectedIndex(i); setShowInside(false); }}
            >
              <span className="nakami-item-emoji">{f.outsideEmoji}</span>
              <span className="nakami-item-name">{f.nameJp}</span>
            </button>
          ))}
        </div>

        <div className="nakami-viewer">
          <button
            className={`nakami-toggle-btn ${showInside ? "nakami-toggle-btn--inside" : ""}`}
            onClick={() => setShowInside(!showInside)}
          >
            <span className="nakami-big-emoji">
              {showInside ? selected.insideEmoji : selected.outsideEmoji}
            </span>
          </button>

          <div className="nakami-label">
            {showInside ? "Inside" : "Outside"} — tap to flip
          </div>

          <h2 className="nakami-food-title">{selected.nameJp} <span className="nakami-food-en">{selected.nameEn}</span></h2>
          <p className="nakami-food-desc">
            {showInside ? selected.insideDesc : selected.outsideDesc}
          </p>

          <div className="nakami-layers">
            <h3 className="nakami-layers-title">Cross-section layers</h3>
            {selected.layers.map((layer, i) => (
              <div key={i} className={`nakami-layer ${showInside && i >= selected.layers.length / 2 ? "nakami-layer--highlight" : ""}`}>
                <span className="nakami-layer-num">{i + 1}</span>
                <span>{layer}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
