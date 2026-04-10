import { Link } from "react-router-dom";

export default function KonbiniReceipt() {
  return (
    <div className="stub-page">
      <div className="stub-emoji">🧾</div>
      <h1 className="stub-title">レシート</h1>
      <p className="stub-desc">Konbini Receipt Generator — Coming next!</p>
      <Link to="/" className="stub-back">Back to Family Mart</Link>
    </div>
  );
}
