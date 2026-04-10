import { Suspense } from "react";
import FamimaScene from "../components/FamimaScene";

export default function Landing() {
  return (
    <div className="landing-3d">
      <header className="landing-header-overlay">
        <h1 className="landing-title">
          <span className="landing-title-jp">ファミリーマート</span>
          <span className="landing-title-en">Family Mart</span>
        </h1>
      </header>

      <Suspense fallback={<div className="scene-loading">Loading store...</div>}>
        <FamimaScene />
      </Suspense>

      <footer className="landing-footer-overlay">
        <p>Fan project. Not affiliated with FamilyMart Co., Ltd.</p>
      </footer>
    </div>
  );
}
