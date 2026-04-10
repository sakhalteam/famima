import { useNavigate } from "react-router-dom";
import { experiences } from "../data/experiences";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <header className="landing-header">
        <h1 className="landing-title">
          <span className="landing-title-jp">ファミリーマート</span>
          <span className="landing-title-en">Family Mart</span>
        </h1>
        <p className="landing-subtitle">
          A collection of konbini mini-experiences
        </p>
      </header>

      <div className="experience-grid">
        {experiences.map((exp) => (
          <button
            key={exp.id}
            className={`exp-card ${exp.ready ? "exp-card--ready" : "exp-card--coming"}`}
            onClick={() => exp.ready && navigate(exp.path)}
            disabled={!exp.ready}
          >
            <span className="exp-card-emoji">{exp.emoji}</span>
            <span className="exp-card-title-jp">{exp.titleJp}</span>
            <span className="exp-card-title-en">{exp.titleEn}</span>
            <span className="exp-card-desc">{exp.description}</span>
            {!exp.ready && <span className="exp-card-badge">Coming Soon</span>}
          </button>
        ))}
      </div>

      <footer className="landing-footer">
        <p>Fan project. Not affiliated with FamilyMart Co., Ltd.</p>
      </footer>
    </div>
  );
}
