import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute("/birthday")({
  head: () => ({
    meta: [
      { title: "🎂 HAPPY BIRTHDAY — Player 1" },
      { name: "description", content: "A gamer-themed birthday surprise." },
      { property: "og:title", content: "🎂 HAPPY BIRTHDAY — Player 1" },
      { property: "og:description", content: "A gamer-themed birthday surprise." },
    ],
  }),
  component: BirthdayPage,
});

// 🎵 Change this to any YouTube video ID
const YT_VIDEO_ID = "ru0K8uYEZWw"; // Happy Birthday EDM

// 📸 Placeholder photos — replace src with your friend's photos
const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900", caption: "LEVEL 1: ความทรงจำสุดเจ๋ง" },
  { src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=900", caption: "LEVEL 2: ผจญภัยด้วยกัน" },
  { src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=900", caption: "LEVEL 3: ปาร์ตี้ตลอดกาล" },
  { src: "https://images.unsplash.com/photo-1559655980-9a0bf0b9c25e?w=900", caption: "BOSS FIGHT: เป่าเทียน!" },
];

const WISHES = [
  { from: "Player 2", msg: "สุขสันต์วันเกิดนะเพื่อน! ขอให้ปีนี้ได้ XP เยอะๆ เลเวลอัพรัวๆ 🎮" },
  { from: "Squad", msg: "อายุยืนยาวเหมือน HP bar ที่เต็มตลอด ขอให้ทุก quest ผ่านฉลุย ❤️" },
  { from: "Co-op Bestie", msg: "ขอบคุณที่เป็นเพื่อนร่วมทีมที่ดีที่สุด GG WP!" },
  { from: "Guild Master", msg: "ปีใหม่นี้ unlock achievement ใหม่ๆ ให้เพียบเลย ✨" },
];

function BirthdayPage() {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const audioRef = useRef<HTMLIFrameElement>(null);

  const next = () => setPhotoIdx((i) => (i + 1) % PHOTOS.length);
  const prev = () => setPhotoIdx((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, []);

  const triggerFireworks = () => {
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 4000);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background scanlines">
      {/* grid bg */}
      <div
        className="pointer-events-none fixed inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--neon-pink) 1px, transparent 1px), linear-gradient(90deg, var(--neon-pink) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Hidden YouTube audio player */}
      {musicOn && (
        <iframe
          ref={audioRef}
          className="pointer-events-none absolute h-0 w-0 opacity-0"
          src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&loop=1&playlist=${YT_VIDEO_ID}`}
          allow="autoplay"
          title="bgm"
        />
      )}

      {/* HUD top bar */}
      <header className="relative z-10 flex items-center justify-between border-b-2 px-6 py-4" style={{ borderColor: "var(--neon-pink)", background: "oklch(0.16 0.04 280 / 0.8)", fontFamily: "'Press Start 2P', monospace" }}>
        <div className="text-xs" style={{ color: "var(--neon-cyan)" }}>
          ► PLAYER 1 // HP: <span style={{ color: "var(--neon-green)" }}>∞</span>
        </div>
        <div className="hidden text-xs sm:block" style={{ color: "var(--neon-yellow)" }}>
          STAGE: BIRTHDAY-2026
        </div>
        <button
          onClick={() => setMusicOn((v) => !v)}
          className="rounded border-2 px-3 py-2 text-[10px] transition-all hover:scale-105"
          style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)", boxShadow: musicOn ? "var(--shadow-cyan)" : "none" }}
        >
          {musicOn ? "♪ MUSIC: ON" : "♪ MUSIC: OFF"}
        </button>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-6 pt-16 text-center">
        <p className="mb-4 text-xs" style={{ color: "var(--neon-cyan)", fontFamily: "'Press Start 2P', monospace" }}>
          ★ ACHIEVEMENT UNLOCKED ★
        </p>
        <h1
          className="mx-auto max-w-4xl text-5xl leading-tight neon-text animate-pulse-neon sm:text-7xl md:text-8xl"
          style={{ color: "var(--neon-pink)", fontFamily: "'Press Start 2P', monospace" }}
        >
          HAPPY<br />BIRTHDAY!
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg" style={{ color: "var(--neon-yellow)", fontFamily: "'VT323', monospace" }}>
          🎮 +1 YEAR XP GAINED — เลเวลอัพแล้วจ้า! ขอให้ปีนี้เป็นปีที่สนุกที่สุดในเกมชีวิต 🎂
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={triggerFireworks}
            className="rounded border-2 px-6 py-3 text-xs transition-all hover:scale-110"
            style={{ borderColor: "var(--neon-pink)", color: "var(--neon-pink)", boxShadow: "var(--shadow-neon)", fontFamily: "'Press Start 2P', monospace" }}
          >
            🎆 LAUNCH FIREWORKS
          </button>
          <a
            href="#gallery"
            className="rounded border-2 px-6 py-3 text-xs transition-all hover:scale-110"
            style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)", boxShadow: "var(--shadow-cyan)", fontFamily: "'Press Start 2P', monospace" }}
          >
            ▶ START GAME
          </a>
        </div>
      </section>

      {/* Photo Carousel */}
      <section id="gallery" className="relative z-10 mx-auto mt-24 max-w-4xl px-6">
        <h2 className="mb-6 text-center text-xl neon-text" style={{ color: "var(--neon-green)", fontFamily: "'Press Start 2P', monospace" }}>
          // MEMORY.GALLERY
        </h2>

        <div className="relative overflow-hidden rounded-lg border-2" style={{ borderColor: "var(--neon-pink)", boxShadow: "var(--shadow-neon)" }}>
          <div className="relative aspect-video bg-muted">
            {PHOTOS.map((p, i) => (
              <img
                key={i}
                src={p.src}
                alt={p.caption}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                style={{ opacity: i === photoIdx ? 1 : 0 }}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-sm" style={{ color: "var(--neon-yellow)", fontFamily: "'Press Start 2P', monospace" }}>
                {PHOTOS[photoIdx].caption}
              </p>
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded border-2 bg-background/80 px-3 py-2 text-lg backdrop-blur transition hover:scale-110"
            style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)" }}
          >
            ◄
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded border-2 bg-background/80 px-3 py-2 text-lg backdrop-blur transition hover:scale-110"
            style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)" }}
          >
            ►
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setPhotoIdx(i)}
              className="h-3 w-3 rounded-full border transition-all"
              style={{
                borderColor: "var(--neon-pink)",
                background: i === photoIdx ? "var(--neon-pink)" : "transparent",
                boxShadow: i === photoIdx ? "0 0 10px var(--neon-pink)" : "none",
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <p className="mt-4 text-center text-[10px]" style={{ color: "var(--muted-foreground)", fontFamily: "'Press Start 2P', monospace" }}>
          // TIP: เปลี่ยน src ใน PHOTOS[] เพื่อใส่รูปจริง
        </p>
      </section>

      {/* Wishes board */}
      <section className="relative z-10 mx-auto mt-24 max-w-4xl px-6">
        <h2 className="mb-8 text-center text-xl neon-text" style={{ color: "var(--neon-cyan)", fontFamily: "'Press Start 2P', monospace" }}>
          // QUEST.LOG — คำอวยพร
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {WISHES.map((w, i) => (
            <article
              key={i}
              className="rounded-lg border-2 p-5 transition-transform hover:scale-[1.02]"
              style={{
                borderColor: i % 2 === 0 ? "var(--neon-pink)" : "var(--neon-cyan)",
                background: "oklch(0.22 0.05 280 / 0.6)",
              }}
            >
              <div className="mb-2 text-[10px]" style={{ color: "var(--neon-yellow)", fontFamily: "'Press Start 2P', monospace" }}>
                ► FROM: {w.from}
              </div>
              <p className="text-lg leading-snug" style={{ color: "var(--foreground)", fontFamily: "'VT323', monospace" }}>
                {w.msg}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Footer / Finale */}
      <footer className="relative z-10 mx-auto mt-24 max-w-4xl px-6 pb-16 text-center">
        <div className="rounded-lg border-2 p-8" style={{ borderColor: "var(--neon-green)", background: "oklch(0.22 0.05 280 / 0.6)", boxShadow: "0 0 20px var(--neon-green)" }}>
          <p className="text-2xl neon-text" style={{ color: "var(--neon-green)", fontFamily: "'Press Start 2P', monospace" }}>
            GAME · CLEARED
          </p>
          <p className="mt-4 text-lg" style={{ color: "var(--neon-yellow)", fontFamily: "'VT323', monospace" }}>
            ขอบคุณที่เป็นเพื่อนที่ดีที่สุด ♥<br />
            CONTINUE? ► YES ◄
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={triggerFireworks}
              className="rounded border-2 px-5 py-3 text-[10px] transition hover:scale-105"
              style={{ borderColor: "var(--neon-pink)", color: "var(--neon-pink)", fontFamily: "'Press Start 2P', monospace" }}
            >
              🎆 REPLAY FX
            </button>
            <Link
              to="/"
              className="rounded border-2 px-5 py-3 text-[10px] transition hover:scale-105"
              style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)", fontFamily: "'Press Start 2P', monospace" }}
            >
              ⟲ MAIN MENU
            </Link>
          </div>
        </div>
        <p className="mt-6 text-[10px]" style={{ color: "var(--muted-foreground)", fontFamily: "'Press Start 2P', monospace" }}>
          © BIRTHDAY QUEST v1.0 — MADE WITH ♥
        </p>
      </footer>

      {/* Fireworks overlay */}
      {showFireworks && <Fireworks />}
    </div>
  );
}

function Fireworks() {
  const colors = ["var(--neon-pink)", "var(--neon-cyan)", "var(--neon-green)", "var(--neon-yellow)"];
  const particles = Array.from({ length: 60 });
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const size = 6 + Math.random() * 10;
        const color = colors[i % colors.length];
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              bottom: 0,
              width: size,
              height: size,
              background: color,
              boxShadow: `0 0 ${size * 2}px ${color}`,
              animation: `float-up ${2 + Math.random() * 1.5}s ease-out ${delay}s forwards`,
            }}
          />
        );
      })}
      <div
        className="absolute inset-x-0 top-1/3 text-center text-4xl neon-text animate-pulse-neon sm:text-6xl"
        style={{ color: "var(--neon-yellow)", fontFamily: "'Press Start 2P', monospace" }}
      >
        ★ CONGRATS! ★
      </div>
    </div>
  );
}