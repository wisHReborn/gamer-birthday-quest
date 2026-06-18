import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "🎮 ENTER PASSCODE — Birthday Quest" },
      { name: "description", content: "Insert the secret birthday code to unlock the surprise." },
      { property: "og:title", content: "🎮 ENTER PASSCODE — Birthday Quest" },
      { property: "og:description", content: "Insert the secret birthday code to unlock the surprise." },
    ],
  }),
  component: Index,
});

// Sound URLs
const SOUNDS = {
  TYPE: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
  SUCCESS: "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3", // More 'win/level up' sound
  ERROR: "https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3",
};

function Index() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  
  // Audio instances
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    // Preload sounds
    audioRefs.current = {
      type: new Audio(SOUNDS.TYPE),
      success: new Audio(SOUNDS.SUCCESS),
      error: new Audio(SOUNDS.ERROR),
    };
    
    inputsRef.current[0]?.focus();
  }, []);

  const playSound = (type: "type" | "success" | "error") => {
    const sound = audioRefs.current[type];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(e => console.log("Audio play blocked:", e));
    }
  };

  const handleChange = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = d;
    setDigits(next);
    setError(false);

    if (d) {
      playSound("type");
      if (i < 3) inputsRef.current[i + 1]?.focus();
    }

    if (next.every((x) => x !== "")) {
      const code = next.join("");
      if (code === "1806") {
        setSuccess(true);
        playSound("success");
        setTimeout(() => navigate({ to: "/birthday" }), 1500);
      } else {
        setError(true);
        playSound("error");
        setTimeout(() => {
          setDigits(["", "", "", ""]);
          inputsRef.current[0]?.focus();
        }, 600);
      }
    }
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background scanlines px-4">
      {/* animated grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(var(--neon-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, oklch(0.78 0.22 330 / 0.25), transparent 60%)" }} />

      <main className={`relative z-10 w-full max-w-lg ${success ? "animate-pulse-neon" : ""} ${error ? "animate-glitch" : ""}`}>
        <div className="rounded-lg border-2 p-8 backdrop-blur-sm" style={{ borderColor: "var(--neon-pink)", background: "oklch(0.16 0.04 280 / 0.7)", boxShadow: "var(--shadow-neon)" }}>
          <div className="mb-6 text-center" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            <div className="mb-2 text-xs" style={{ color: "var(--neon-cyan)" }}>► SYSTEM LOCKED ◄</div>
            <h1 className="text-2xl leading-tight neon-text animate-pulse-neon" style={{ color: "var(--neon-pink)" }}>
              BIRTHDAY<br />QUEST
            </h1>
            <p className="mt-4 text-[10px] leading-relaxed" style={{ color: "var(--neon-yellow)" }}>
              ENTER 4 PASSCODE<br />
              <span className="text-muted-foreground" style={{ fontFamily: "'Kanit', sans-serif", fontSize: "12px", verticalAlign: "middle" }}>(วัน + เดือนเกิด)</span>
            </p>
          </div>

          <div className="flex justify-center gap-3" onPaste={(e) => {
            const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
            if (t.length === 4) {
              e.preventDefault();
              t.split("").forEach((d, i) => handleChange(i, d));
            }
          }}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { inputsRef.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKey(i, e)}
                className="h-16 w-14 rounded border-2 bg-transparent text-center text-3xl font-bold outline-none transition-all focus:scale-110"
                style={{
                  borderColor: error ? "var(--destructive)" : success ? "var(--neon-green)" : "var(--neon-cyan)",
                  color: error ? "var(--destructive)" : success ? "var(--neon-green)" : "var(--neon-cyan)",
                  boxShadow: `0 0 15px ${error ? "var(--destructive)" : success ? "var(--neon-green)" : "var(--neon-cyan)"}`,
                  fontFamily: "'Orbitron', monospace",
                }}
              />
            ))}
          </div>

          <p className="mt-6 text-center text-[10px]" style={{ color: error ? "var(--destructive)" : "var(--muted-foreground)", fontFamily: "'Press Start 2P', monospace" }}>
            {error ? "✗ ACCESS DENIED" : success ? "✓ ACCESS GRANTED..." : ""}
          </p>
        </div>

        <p className="mt-6 text-center text-[10px]" style={{ color: "var(--muted-foreground)", fontFamily: "'Press Start 2P', monospace" }}>
          PRESS START TO CONTINUE
        </p>
      </main>
    </div>
  );
}
