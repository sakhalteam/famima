import { Routes, Route } from "react-router-dom";
import HomeBtn from "./components/HomeBtn";
import Landing from "./pages/Landing";
import KonbiniReceipt from "./pages/KonbiniReceipt";
import OnigiriZukan from "./pages/OnigiriZukan";
import FamichikiClicker from "./pages/FamichikiClicker";
import NakamiToggle from "./pages/NakamiToggle";
import IriguchiChime from "./pages/IriguchiChime";
import BentoBuilder from "./pages/BentoBuilder";

export default function App() {
  return (
    <>
      <HomeBtn />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/konbini-receipt-generator" element={<KonbiniReceipt />} />
        <Route path="/onigiri-zukan" element={<OnigiriZukan />} />
        <Route path="/famichiki-clicker" element={<FamichikiClicker />} />
        <Route path="/nakami-toggle" element={<NakamiToggle />} />
        <Route path="/iriguchi-chime" element={<IriguchiChime />} />
        <Route path="/bento-builder" element={<BentoBuilder />} />
      </Routes>
    </>
  );
}
