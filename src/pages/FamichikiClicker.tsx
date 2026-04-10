import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

const UPGRADES = [
  { id: "tongs", name: "Better Tongs", nameJp: "良いトング", baseCost: 10, cps: 1, emoji: "🥄" },
  { id: "fryer", name: "Extra Fryer", nameJp: "追加フライヤー", baseCost: 50, cps: 5, emoji: "🍳" },
  { id: "staff", name: "Part-timer", nameJp: "バイト", baseCost: 200, cps: 20, emoji: "👨‍🍳" },
  { id: "robot", name: "Fry Robot", nameJp: "揚げロボ", baseCost: 1000, cps: 100, emoji: "🤖" },
  { id: "factory", name: "Famichiki Factory", nameJp: "ファミチキ工場", baseCost: 5000, cps: 500, emoji: "🏭" },
];

function formatNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return Math.floor(n).toString();
}

export default function FamichikiClicker() {
  const [count, setCount] = useState(0);
  const [totalFried, setTotalFried] = useState(0);
  const [owned, setOwned] = useState<Record<string, number>>({});
  const [floats, setFloats] = useState<{ id: number; x: number; y: number }[]>([]);
  const floatId = useRef(0);
  const cpsRef = useRef(0);

  const cps = UPGRADES.reduce((sum, u) => sum + (owned[u.id] ?? 0) * u.cps, 0);
  cpsRef.current = cps;

  // Auto-fry tick
  useEffect(() => {
    const id = setInterval(() => {
      const c = cpsRef.current;
      if (c > 0) {
        setCount((prev) => prev + c * 0.1);
        setTotalFried((prev) => prev + c * 0.1);
      }
    }, 100);
    return () => clearInterval(id);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    setCount((c) => c + 1);
    setTotalFried((t) => t + 1);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = floatId.current++;
    setFloats((f) => [...f, { id, x, y }]);
    setTimeout(() => setFloats((f) => f.filter((fl) => fl.id !== id)), 800);
  }, []);

  const buyCost = (u: (typeof UPGRADES)[0]) =>
    Math.floor(u.baseCost * Math.pow(1.15, owned[u.id] ?? 0));

  const buyUpgrade = (u: (typeof UPGRADES)[0]) => {
    const cost = buyCost(u);
    if (count < cost) return;
    setCount((c) => c - cost);
    setOwned((o) => ({ ...o, [u.id]: (o[u.id] ?? 0) + 1 }));
  };

  const crispLevel =
    totalFried < 10 ? "Raw 🥩"
    : totalFried < 100 ? "Lightly Fried 🍳"
    : totalFried < 1000 ? "Golden Brown 🟡"
    : totalFried < 10000 ? "Extra Crispy 🔥"
    : "Legendary Crisp ⭐";

  return (
    <div className="receipt-page">
      <header className="receipt-header">
        <Link to="/" className="receipt-back">Family Mart</Link>
        <h1 className="receipt-title">ファミチキクリッカー</h1>
      </header>

      <div className="clicker-layout">
        <div className="clicker-main">
          <div className="clicker-stats">
            <div className="clicker-count">{formatNum(count)} 🍗</div>
            <div className="clicker-cps">{formatNum(cps)} per second</div>
            <div className="clicker-level">{crispLevel}</div>
          </div>

          <button className="clicker-btn" onClick={handleClick}>
            <span className="clicker-btn-emoji">🍗</span>
            <span className="clicker-btn-text">FRY!</span>
            {floats.map((f) => (
              <span key={f.id} className="clicker-float" style={{ left: f.x, top: f.y }}>
                +1
              </span>
            ))}
          </button>

          <div className="clicker-total">Total fried: {formatNum(totalFried)}</div>
        </div>

        <div className="clicker-shop">
          <h2 className="clicker-shop-title">Upgrades</h2>
          {UPGRADES.map((u) => {
            const cost = buyCost(u);
            const canBuy = count >= cost;
            return (
              <button
                key={u.id}
                className={`clicker-upgrade ${canBuy ? "" : "clicker-upgrade--locked"}`}
                onClick={() => buyUpgrade(u)}
                disabled={!canBuy}
              >
                <span className="clicker-upgrade-emoji">{u.emoji}</span>
                <div className="clicker-upgrade-info">
                  <span className="clicker-upgrade-name">{u.nameJp}</span>
                  <span className="clicker-upgrade-desc">{u.name} — +{u.cps}/s</span>
                </div>
                <div className="clicker-upgrade-right">
                  <span className="clicker-upgrade-cost">{formatNum(cost)} 🍗</span>
                  <span className="clicker-upgrade-owned">x{owned[u.id] ?? 0}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
