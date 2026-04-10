import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface CardData {
  id: number;
  emoji: string;
  nameJp: string;
  matched: boolean;
}

const FOOD_PAIRS = [
  { emoji: "🍙", nameJp: "おにぎり" },
  { emoji: "🍗", nameJp: "ファミチキ" },
  { emoji: "🍱", nameJp: "弁当" },
  { emoji: "🥟", nameJp: "肉まん" },
  { emoji: "🍵", nameJp: "お茶" },
  { emoji: "☕", nameJp: "コーヒー" },
  { emoji: "🍦", nameJp: "アイス" },
  { emoji: "🐨", nameJp: "コアラ" },
  { emoji: "🍜", nameJp: "ラーメン" },
  { emoji: "🥚", nameJp: "おでん卵" },
  { emoji: "🍈", nameJp: "メロンパン" },
  { emoji: "🥪", nameJp: "サンド" },
  { emoji: "🧴", nameJp: "ウコン" },
  { emoji: "🥛", nameJp: "ヤクルト" },
  { emoji: "🍡", nameJp: "大福" },
  { emoji: "🍳", nameJp: "卵焼き" },
  { emoji: "🌭", nameJp: "ウインナー" },
  { emoji: "🍓", nameJp: "いちご" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createBoard(): CardData[] {
  const pairs = FOOD_PAIRS.flatMap((food, i) => [
    { id: i * 2, emoji: food.emoji, nameJp: food.nameJp, matched: false },
    { id: i * 2 + 1, emoji: food.emoji, nameJp: food.nameJp, matched: false },
  ]);
  return shuffle(pairs);
}

export default function BentoBuilder() {
  const [cards, setCards] = useState<CardData[]>(createBoard);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const lockRef = useRef(false);

  const matched = cards.filter((c) => c.matched).length;
  const won = matched === cards.length;

  // Timer
  useEffect(() => {
    if (!startTime || won) return;
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 200);
    return () => clearInterval(id);
  }, [startTime, won]);

  const handleFlip = useCallback(
    (index: number) => {
      if (lockRef.current) return;
      if (flipped.includes(index)) return;
      if (cards[index].matched) return;

      if (!startTime) setStartTime(Date.now());

      const next = [...flipped, index];
      setFlipped(next);

      if (next.length === 2) {
        setMoves((m) => m + 1);
        lockRef.current = true;
        const [a, b] = next;

        if (cards[a].emoji === cards[b].emoji) {
          // Match!
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c))
            );
            setFlipped([]);
            lockRef.current = false;
          }, 500);
        } else {
          // No match — flip back
          setTimeout(() => {
            setFlipped([]);
            lockRef.current = false;
          }, 800);
        }
      }
    },
    [flipped, cards, startTime]
  );

  const reset = useCallback(() => {
    setCards(createBoard());
    setFlipped([]);
    setMoves(0);
    setStartTime(null);
    setElapsed(0);
    lockRef.current = false;
  }, []);

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  return (
    <div className="receipt-page">
      <header className="receipt-header">
        <Link to="/" className="receipt-back">Family Mart</Link>
        <h1 className="receipt-title">弁当神経衰弱 — Bento Memory</h1>
      </header>

      <div className="memory-stats">
        <span className="memory-stat">Moves: {moves}</span>
        <span className="memory-stat">
          Time: {mins}:{secs.toString().padStart(2, "0")}
        </span>
        <span className="memory-stat">
          {matched}/{cards.length} matched
        </span>
        <button className="memory-reset" onClick={reset}>New Game</button>
      </div>

      {won && (
        <div className="memory-win">
          Completed in {moves} moves and {mins}:{secs.toString().padStart(2, "0")}!
        </div>
      )}

      <div className="memory-grid">
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || card.matched;
          return (
            <button
              key={card.id + "-" + i}
              className={[
                "memory-card",
                isFlipped ? "memory-card--flipped" : "",
                card.matched ? "memory-card--matched" : "",
              ].join(" ")}
              onClick={() => handleFlip(i)}
            >
              <div className="memory-card-inner">
                <div className="memory-card-front">
                  <span className="memory-card-logo">🏪</span>
                </div>
                <div className="memory-card-back">
                  <span className="memory-card-emoji">{card.emoji}</span>
                  <span className="memory-card-name">{card.nameJp}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
