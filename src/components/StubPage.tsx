import { Link } from "react-router-dom";

interface Props {
  emoji: string;
  titleJp: string;
  titleEn: string;
  description: string;
}

export default function StubPage({ emoji, titleJp, titleEn, description }: Props) {
  return (
    <div className="stub-page">
      <div className="stub-emoji">{emoji}</div>
      <h1 className="stub-title">{titleJp}</h1>
      <p className="stub-desc">{titleEn} — {description}</p>
      <Link to="/" className="stub-back">Back to Family Mart</Link>
    </div>
  );
}
