import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

// FamilyMart door chime: E5 - D#5 - E5 - B4 - G#4 - A4 - B4 - E5
// Frequencies in Hz
const CHIME_NOTES = [
  { note: "E5", freq: 659.25, label: "ファ" },
  { note: "D#5", freq: 622.25, label: "ミ" },
  { note: "E5b", freq: 659.25, label: "ファ" },
  { note: "B4", freq: 493.88, label: "シ" },
  { note: "G#4", freq: 415.30, label: "ソ#" },
  { note: "A4", freq: 440.00, label: "ラ" },
  { note: "B4b", freq: 493.88, label: "シ" },
  { note: "E5c", freq: 659.25, label: "ファ" },
];

const STEPS = 16;
const BPM_OPTIONS = [80, 100, 120, 140, 160];

let audioCtx: AudioContext | null = null;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function playTone(freq: number, duration = 0.2) {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export default function IriguchiChime() {
  const [grid, setGrid] = useState<boolean[][]>(() =>
    CHIME_NOTES.map(() => Array(STEPS).fill(false))
  );
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [bpm, setBpm] = useState(120);
  const playingRef = useRef(false);
  const gridRef = useRef(grid);
  gridRef.current = grid;

  const toggleCell = (row: number, col: number) => {
    setGrid((g) => {
      const next = g.map((r) => [...r]);
      next[row][col] = !next[row][col];
      return next;
    });
  };

  const loadPreset = useCallback(() => {
    // Load the actual FamilyMart chime pattern
    const preset = CHIME_NOTES.map(() => Array(STEPS).fill(false));
    // Original chime: notes 0-7 play sequentially on steps 0-7
    const chimeSequence = [0, 1, 0, 3, 4, 5, 3, 0]; // row indices
    chimeSequence.forEach((row, step) => {
      if (step < STEPS) preset[row][step] = true;
    });
    setGrid(preset);
  }, []);

  const clearGrid = useCallback(() => {
    setGrid(CHIME_NOTES.map(() => Array(STEPS).fill(false)));
  }, []);

  // Sequencer loop
  useEffect(() => {
    if (!playing) {
      playingRef.current = false;
      setCurrentStep(-1);
      return;
    }
    playingRef.current = true;
    let step = 0;
    const interval = (60 / bpm) * 1000 / 2; // 8th notes

    const tick = () => {
      if (!playingRef.current) return;
      setCurrentStep(step);
      const g = gridRef.current;
      for (let row = 0; row < g.length; row++) {
        if (g[row][step]) playTone(CHIME_NOTES[row].freq);
      }
      step = (step + 1) % STEPS;
    };

    tick();
    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [playing, bpm]);

  return (
    <div className="receipt-page">
      <header className="receipt-header">
        <Link to="/" className="receipt-back">Family Mart</Link>
        <h1 className="receipt-title">入口チャイム — Iriguchi Chime</h1>
      </header>

      <div className="chime-controls">
        <button className={`chime-play ${playing ? "chime-play--active" : ""}`} onClick={() => setPlaying(!playing)}>
          {playing ? "⏹ Stop" : "▶ Play"}
        </button>
        <button className="chime-preset" onClick={loadPreset}>🔔 Load Chime</button>
        <button className="chime-clear" onClick={clearGrid}>✕ Clear</button>
        <div className="chime-bpm">
          <span className="chime-bpm-label">BPM</span>
          {BPM_OPTIONS.map((b) => (
            <button
              key={b}
              className={`chime-bpm-btn ${bpm === b ? "chime-bpm-btn--active" : ""}`}
              onClick={() => setBpm(b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="chime-grid">
        {CHIME_NOTES.map((note, row) => (
          <div key={note.note + row} className="chime-row">
            <div className="chime-note-label">
              <span className="chime-note-name">{note.note.replace(/[a-c]$/, "")}</span>
              <span className="chime-note-jp">{note.label}</span>
            </div>
            {grid[row].map((on, col) => (
              <button
                key={col}
                className={[
                  "chime-cell",
                  on ? "chime-cell--on" : "",
                  col === currentStep ? "chime-cell--active" : "",
                  col % 4 === 0 ? "chime-cell--bar" : "",
                ].join(" ")}
                onClick={() => toggleCell(row, col)}
              />
            ))}
          </div>
        ))}
      </div>

      <p className="chime-hint">
        Click cells to compose your own door chime, or hit "Load Chime" for the classic FamilyMart melody!
      </p>
    </div>
  );
}
