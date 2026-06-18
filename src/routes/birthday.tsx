import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import toon1 from "../../img/toon1.jpg";
import toon2 from "../../img/toon2.jpg";

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
// Add type: "video" to any item to play an MP4 looping video instead of an image
const PHOTOS = [
  { type: "image", src: toon1, caption: "" },
  { type: "image", src: toon2, caption: "" },
 ];

const WISHES = [
  { 
    from: "P'Reborn", 
    msg: "สุขสันต์วันเกิดเพิ่อนตูน! 🎉 ขอให้ปีนี้เลเวลอัพแบบก้าวกระโดด ได้รับ XP ความสุขเต็มหลอด HP แข็งแกร่งไม่มีลด ขอให้ทุกปัญหา ในชีวิตผ่านฉลุยเหมือนปรับโหมด Easy และขอบคุณที่เป็นเพื่อน ที่ดีที่สุดเสมอมา... GG WP! เลิฟๆ นะ ❤️🎮✨" 
  }
];

function BirthdayPage() {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [musicOn, setMusicOn] = useState(true);
  const [showCongrats, setShowCongrats] = useState(false);
  const audioRef = useRef<HTMLIFrameElement>(null);
  const fireworkSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fireworkSound.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2576/2576-preview.mp3");
  }, []);

  const next = () => setPhotoIdx((i) => (i + 1) % PHOTOS.length);
  const prev = () => setPhotoIdx((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, []);

  const triggerFireworks = () => {
    if (fireworkSound.current) {
      fireworkSound.current.currentTime = 0;
      fireworkSound.current.play().catch(e => console.log("Sound blocked", e));
    }

    setShowCongrats(true);
    setTimeout(() => setShowCongrats(false), 5000);

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
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

      {/* Floating Music Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setMusicOn((v) => !v)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 bg-background/80 backdrop-blur transition-all hover:scale-110 active:scale-95 sm:h-16 sm:w-16"
          style={{ 
            borderColor: "var(--neon-cyan)", 
            color: "var(--neon-cyan)", 
            boxShadow: musicOn ? "var(--shadow-cyan)" : "none",
            fontFamily: "'Press Start 2P', monospace" 
          }}
          title={musicOn ? "Mute Music" : "Play Music"}
        >
          <span className="text-xl sm:text-2xl -translate-y-[2px]">{musicOn ? "♪" : "×"}</span>
          <span className="absolute -top-10 right-0 hidden whitespace-nowrap rounded border-2 bg-background px-2 py-1 text-[8px] group-hover:block" style={{ borderColor: "var(--neon-cyan)" }}>
            {musicOn ? "MUSIC: ON" : "MUSIC: OFF"}
          </span>
        </button>
      </div>

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
        <p className="mx-auto mt-8 max-w-xl text-lg" style={{ color: "var(--neon-yellow)", fontFamily: "'Kanit', sans-serif" }}>
          🎮 +1 YEAR XP GAINED — สุขสันวันเกิดเพื่อนตูน! ขอให้ปีนี้เป็นปีที่สนุกที่สุด 🎂
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <button
            onClick={triggerFireworks}
            className="rounded border-2 px-6 py-3 text-xs transition-all hover:scale-110"
            style={{ borderColor: "var(--neon-pink)", color: "var(--neon-pink)", boxShadow: "var(--shadow-neon)", fontFamily: "'Press Start 2P', monospace" }}
          >
            🎆 LAUNCH FIREWORKS
          </button>
          <Link
            to="/game"
            className="rounded border-2 px-6 py-3 text-xs transition-all hover:scale-110"
            style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)", boxShadow: "var(--shadow-cyan)", fontFamily: "'Press Start 2P', monospace" }}
          >
            ▶ START GAME
          </Link>
        </div>
      </section>

      {/* Photo Carousel */}
      <section id="gallery" className="relative z-10 mx-auto mt-24 max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-lg border-2" style={{ borderColor: "var(--neon-pink)", boxShadow: "var(--shadow-neon)" }}>
          <div className="relative aspect-video bg-muted">
            {PHOTOS.map((p, i) => (
              p.type === "video" ? (
                <video
                  key={i}
                  src={p.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                  style={{ opacity: i === photoIdx ? 1 : 0 }}
                />
              ) : (
                <img
                  key={i}
                  src={p.src}
                  alt={p.caption}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                  style={{ opacity: i === photoIdx ? 1 : 0 }}
                />
              )
            ))}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-sm" style={{ color: "var(--neon-yellow)", fontFamily: "'Kanit', sans-serif" }}>
                {PHOTOS[photoIdx].caption}
              </p>
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded border-2 bg-background/80 text-lg backdrop-blur transition hover:scale-110"
            style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)" }}
          >
            <span className="-translate-y-[2px]">◄</span>
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded border-2 bg-background/80 text-lg backdrop-blur transition hover:scale-110"
            style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)" }}
          >
            <span className="-translate-y-[2px]">►</span>
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

        
      </section>

      {/* Wishes board */}
      <section className="relative z-10 mx-auto mt-24 max-w-4xl px-6">
        <h2 className="mb-8 text-center text-xl neon-text" style={{ color: "var(--neon-cyan)", fontFamily: "'Press Start 2P', monospace" }}>
          {/* <span style={{ fontFamily: "'Press Start 2P', monospace" }}>// QUEST.LOG — </span> */}
          <span style={{ fontFamily: "'Kanit', sans-serif" }}>คำอวยพร</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-1 md:max-w-2xl mx-auto">
          {WISHES.map((w, i) => (
            <article
              key={i}
              className="rounded-lg border-2 p-6 transition-transform hover:scale-[1.02]"
              style={{
                borderColor: "var(--neon-pink)",
                background: "oklch(0.22 0.05 280 / 0.6)",
                boxShadow: "0 0 15px var(--neon-pink)"
              }}
            >
              <div className="mb-4 text-xs" style={{ color: "var(--neon-yellow)", fontFamily: "'Press Start 2P', monospace" }}>
                ► FROM: {w.from}
              </div>
              <p className="text-xl leading-relaxed text-center" style={{ color: "var(--foreground)", fontFamily: "'Kanit', sans-serif" }}>
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
          <p className="mt-4 text-lg" style={{ color: "var(--neon-yellow)", fontFamily: "'Kanit', sans-serif" }}>
            ขอบคุณที่เป็นเพื่อนกันน๊ะเลิฟ ไม่มีเค้กให้ มาเป่าเค้กออนไลน์แทนเนาะ5555 ♥<br />
            CONTINUE? ► YES ◄
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/cake"
              className="rounded border-2 px-6 py-3 text-xs transition-all hover:scale-105"
              style={{ borderColor: "var(--neon-yellow)", color: "var(--neon-yellow)", boxShadow: "0 0 10px var(--neon-yellow)", fontFamily: "'Press Start 2P', monospace" }}
            >
              🎂 LET'S GO
            </Link>
          </div>
        </div>
        <p className="mt-6 text-[10px]" style={{ color: "var(--muted-foreground)", fontFamily: "'Press Start 2P', monospace" }}>
          © BIRTHDAY ♥
        </p>
      </footer>

      {/* Congrats overlay */}
      {showCongrats && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          <div
            className="text-center text-4xl neon-text animate-pulse-neon sm:text-6xl"
            style={{ color: "var(--neon-yellow)", fontFamily: "'Press Start 2P', monospace", textShadow: "0 0 20px var(--neon-yellow), 0 0 40px var(--neon-yellow)" }}
          >
            ★ CONGRATS! ★
          </div>
        </div>
      )}
    </div>
  );
}