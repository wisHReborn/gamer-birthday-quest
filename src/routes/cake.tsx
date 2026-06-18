import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";

export const Route = createFileRoute("/cake")({
  head: () => ({
    meta: [
      { title: "🎂 MAKE A WISH — Birthday Quest" },
      { name: "description", content: "Make a wish and blow out the candles!" },
    ],
  }),
  component: CakePage,
});

// 🎵 Same YouTube video ID to keep the music seamless
const YT_VIDEO_ID = "ru0K8uYEZWw"; 

function CakePage() {
  const [isBlown, setIsBlown] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const audioRef = useRef<HTMLIFrameElement>(null);

  const handleBlow = () => {
    setIsBlown(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff007f', '#00ffff', '#00ff00', '#ffff00']
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background scanlines px-4 pb-20">
      {/* Grid background effect */}
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

      <header className="relative z-10 w-full max-w-md mx-auto pt-6 flex items-center justify-between mb-6" style={{ fontFamily: "'Press Start 2P', monospace" }}>
        <Link
          to="/birthday"
          className="text-[10px] sm:text-xs rounded border-2 px-3 py-2 transition hover:scale-105 backdrop-blur-sm bg-background/50"
          style={{ borderColor: "var(--neon-pink)", color: "var(--neon-pink)", boxShadow: "0 0 5px var(--neon-pink)" }}
        >
          ◄ BACK
        </Link>
      </header>

      <main className="relative z-10 max-w-2xl mx-auto flex flex-col items-center pt-4 sm:pt-10">
        <h1
          className="text-3xl sm:text-5xl mb-4 text-center neon-text animate-pulse-neon"
          style={{ color: "var(--neon-yellow)", fontFamily: "'Press Start 2P', monospace" }}
        >
          {isBlown ? "WISH GRANTED!" : "MAKE A WISH"}
        </h1>

        <p className="text-center text-base sm:text-lg mb-20" style={{ color: "var(--neon-cyan)", fontFamily: "'Kanit', sans-serif" }}>
          {isBlown ? "ขอให้คำอธิษฐานเป็นจริงนะ! 🎉" : "หลับตาอธิษฐาน แล้วกดปุ่มเป่าเทียนเลย!"}
        </p>

        {/* Cake Container */}
        <div className="relative flex flex-col items-center mt-10">
          
          {/* Candles & Flames */}
          <div className="flex gap-6 sm:gap-10 mb-[-12px] z-20">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative flex flex-col items-center">
                {/* Flame Container */}
                <div className="relative w-8 h-12 flex justify-center mb-1">
                  {/* Glowing Flame */}
                  <div
                    className={`absolute bottom-0 w-6 h-10 bg-yellow-400 rounded-full blur-[1px] transition-all duration-700 ease-out origin-bottom
                      ${isBlown ? "opacity-0 scale-0 -translate-y-4" : "animate-pulse opacity-100 scale-100"}`}
                    style={{ boxShadow: isBlown ? "none" : "0 0 20px var(--neon-yellow), 0 0 40px var(--neon-yellow)" }}
                  >
                    <div className="absolute bottom-1 left-1 w-4 h-5 bg-orange-500 rounded-full blur-[1px]" />
                  </div>
                  {/* Smoke Trail (appears after blown) */}
                  <div
                    className={`absolute bottom-0 w-3 h-16 bg-gray-300 rounded-full blur-md transition-all duration-1000 ease-out origin-bottom
                      ${isBlown ? "opacity-40 -translate-y-20 scale-y-150 scale-x-150" : "opacity-0 scale-0"}`}
                  />
                </div>
                {/* Candle Stick */}
                <div className="w-5 h-16 bg-white border-2 border-black rounded-t-sm overflow-hidden relative shadow-lg">
                   {/* Diagonal Stripes */}
                   <div className="w-full h-3 bg-red-500 absolute top-2 rotate-45 scale-150" />
                   <div className="w-full h-3 bg-red-500 absolute top-8 rotate-45 scale-150" />
                   <div className="w-full h-3 bg-red-500 absolute top-14 rotate-45 scale-150" />
                </div>
              </div>
            ))}
          </div>

          {/* Cake Body */}
          <div className="relative z-10 drop-shadow-2xl flex flex-col items-center">
            {/* Top Frosting Layer */}
            <div className="w-64 sm:w-80 h-20 sm:h-24 bg-pink-200 border-4 border-black rounded-[50%] absolute -top-8 sm:-top-10 z-20" style={{ boxShadow: "inset 0 -8px 0 rgba(0,0,0,0.1)" }}>
              {/* Sprinkles */}
              <div className="absolute top-6 left-12 w-3 h-1.5 bg-red-500 rounded-full rotate-45" />
              <div className="absolute top-10 left-36 w-3 h-1.5 bg-blue-500 rounded-full -rotate-12" />
              <div className="absolute top-8 right-16 w-3 h-1.5 bg-green-500 rounded-full rotate-90" />
              <div className="absolute top-14 left-24 w-3 h-1.5 bg-yellow-400 rounded-full rotate-12" />
              <div className="absolute top-12 right-28 w-3 h-1.5 bg-purple-500 rounded-full rotate-45" />
            </div>
            
            {/* Main Cake Base */}
            <div className="w-56 sm:w-72 h-32 sm:h-40 bg-pink-500 border-4 border-black rounded-b-[40px] relative overflow-hidden flex flex-col justify-between py-6">
              {/* Cake Fillings / Layers */}
              <div className="w-full h-6 sm:h-8 bg-pink-700 border-y-4 border-black/20" />
              <div className="w-full h-6 sm:h-8 bg-pink-700 border-y-4 border-black/20" />
            </div>
            
            {/* Plate */}
            <div className="w-72 sm:w-96 h-8 sm:h-12 bg-gray-300 border-4 border-black rounded-[50%] absolute -bottom-4 sm:-bottom-6 -z-10 shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
          </div>

        </div>

        <div className="mt-20">
          {!isBlown ? (
            <button
              onClick={handleBlow}
              className="rounded-lg border-2 px-8 py-4 text-base sm:text-xl transition-all hover:scale-110 active:scale-95 bg-background/50 backdrop-blur"
              style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)", boxShadow: "var(--shadow-cyan)", fontFamily: "'Kanit', sans-serif", fontWeight: "bold" }}
            >
              🌬️ เป่าเค้กเลย!
            </button>
          ) : (
            <Link
              to="/birthday"
              className="rounded border-2 px-8 py-4 text-xs sm:text-sm transition-all hover:scale-110 inline-block bg-background/50 backdrop-blur"
              style={{ borderColor: "var(--neon-green)", color: "var(--neon-green)", boxShadow: "0 0 15px var(--neon-green)", fontFamily: "'Press Start 2P', monospace" }}
            >
              ⟲ RETURN TO QUEST
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
