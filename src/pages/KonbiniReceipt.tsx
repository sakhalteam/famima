import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { famimaItems, categories } from "../data/famima-items";
import type { FamimaItem } from "../data/famima-items";

interface CartItem {
  item: FamimaItem;
  qty: number;
}

function formatPrice(yen: number): string {
  return `¥${yen.toLocaleString()}`;
}

function padRight(s: string, len: number): string {
  return s + " ".repeat(Math.max(0, len - s.length));
}

function padLeft(s: string, len: number): string {
  return " ".repeat(Math.max(0, len - s.length)) + s;
}

export default function KonbiniReceipt() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [activeCategory, setActiveCategory] = useState("onigiri");
  const receiptRef = useRef<HTMLPreElement>(null);

  const addToCart = (item: FamimaItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) =>
      prev
        .map((c) => (c.item.id === itemId ? { ...c, qty: c.qty - 1 } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    setShowReceipt(false);
  };

  const checkout = () => {
    if (cart.length === 0) return;
    setShowReceipt(true);
  };

  // Tax calculation (Japan's dual rate)
  const foodItems = cart.filter((c) => c.item.tax === "food");
  const otherItems = cart.filter((c) => c.item.tax === "other");
  const foodSubtotal = foodItems.reduce((s, c) => s + c.item.price * c.qty, 0);
  const otherSubtotal = otherItems.reduce((s, c) => s + c.item.price * c.qty, 0);
  const foodTax = Math.floor(foodSubtotal * 0.08);
  const otherTax = Math.floor(otherSubtotal * 0.1);
  const subtotal = foodSubtotal + otherSubtotal;
  const totalTax = foodTax + otherTax;
  const total = subtotal + totalTax;
  const itemCount = cart.reduce((s, c) => s + c.qty, 0);

  const now = new Date();
  const dateStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;
  const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const receiptText = [
    "================================",
    "     FamilyMart",
    "   ファミリーマート",
    "================================",
    `  ${dateStr}  ${timeStr}`,
    "  レジ#03  担当: クロード",
    "--------------------------------",
    ...cart.map((c) => {
      const name = c.item.nameJp.length > 18
        ? c.item.nameJp.slice(0, 17) + "…"
        : c.item.nameJp;
      const priceStr = formatPrice(c.item.price * c.qty);
      const taxMark = c.item.tax === "food" ? "*" : " ";
      const qtyStr = c.qty > 1 ? ` x${c.qty}` : "";
      return `${taxMark}${padRight(name + qtyStr, 24)}${padLeft(priceStr, 8)}`;
    }),
    "--------------------------------",
    `${padRight("小計", 24)}${padLeft(formatPrice(subtotal), 8)}`,
    `${padRight("  (8%対象)", 24)}${padLeft(formatPrice(foodSubtotal), 8)}`,
    `${padRight("  (10%対象)", 24)}${padLeft(formatPrice(otherSubtotal), 8)}`,
    `${padRight("  消費税(8%)", 24)}${padLeft(formatPrice(foodTax), 8)}`,
    `${padRight("  消費税(10%)", 24)}${padLeft(formatPrice(otherTax), 8)}`,
    "================================",
    `${padRight("合計 (" + itemCount + "点)", 24)}${padLeft(formatPrice(total), 8)}`,
    "================================",
    "",
    "  * は軽減税率(8%)対象です",
    "",
    "  T-POINT: +5pt",
    `  ||||||||||||||||||||||||||||`,
    `  4902520${String(Math.floor(Math.random() * 900000 + 100000))}`,
    "",
    "  ご来店ありがとうございました",
    "    Thank you! またどうぞ!",
    "",
  ].join("\n");

  const downloadReceipt = async () => {
    if (!receiptRef.current) return;
    // Use html-to-image or canvas fallback
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const lines = receiptText.split("\n");
      const lineHeight = 20;
      const fontSize = 14;
      const padding = 24;
      canvas.width = 340;
      canvas.height = lines.length * lineHeight + padding * 2;

      ctx.fillStyle = "#faf8f0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "Courier New", monospace`;
      ctx.fillStyle = "#1a1a1a";
      ctx.textBaseline = "top";

      lines.forEach((line, i) => {
        ctx.fillText(line, padding, padding + i * lineHeight);
      });

      const link = document.createElement("a");
      link.download = `famima-receipt-${dateStr.replace(/\//g, "")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // Fallback: copy text
      navigator.clipboard.writeText(receiptText);
    }
  };

  const filteredItems = famimaItems.filter((i) => i.category === activeCategory);

  return (
    <div className="receipt-page">
      <header className="receipt-header">
        <Link to="/" className="receipt-back">Family Mart</Link>
        <h1 className="receipt-title">Konbini Receipt Generator</h1>
      </header>

      <div className="receipt-layout">
        {/* Shelves */}
        <div className="shelves">
          <div className="shelf-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`shelf-tab ${activeCategory === cat.id ? "shelf-tab--active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="shelf-items">
            {filteredItems.map((item) => (
              <button key={item.id} className="shelf-item" onClick={() => addToCart(item)}>
                <span className="shelf-item-emoji">{item.emoji}</span>
                <span className="shelf-item-name">{item.nameJp}</span>
                <span className="shelf-item-price">{formatPrice(item.price)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cart + Receipt */}
        <div className="cart-panel">
          {!showReceipt ? (
            <>
              <h2 className="cart-title">
                Cart ({itemCount})
              </h2>
              {cart.length === 0 ? (
                <p className="cart-empty">Click items to add them</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map((c) => (
                      <div key={c.item.id} className="cart-item">
                        <span className="cart-item-emoji">{c.item.emoji}</span>
                        <span className="cart-item-name">{c.item.nameJp}</span>
                        <span className="cart-item-qty">x{c.qty}</span>
                        <span className="cart-item-price">
                          {formatPrice(c.item.price * c.qty)}
                        </span>
                        <button
                          className="cart-item-remove"
                          onClick={() => removeFromCart(c.item.id)}
                        >
                          -
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total">
                    <span>Total (tax incl.)</span>
                    <span className="cart-total-price">{formatPrice(total)}</span>
                  </div>
                  <div className="cart-actions">
                    <button className="btn-clear" onClick={clearCart}>Clear</button>
                    <button className="btn-checkout" onClick={checkout}>Checkout</button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="receipt-display">
              <pre ref={receiptRef} className="receipt-paper">
                {receiptText}
              </pre>
              <div className="receipt-actions">
                <button className="btn-download" onClick={downloadReceipt}>
                  Download PNG
                </button>
                <button className="btn-clear" onClick={clearCart}>
                  New Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
