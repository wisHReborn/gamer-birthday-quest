import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import toon3 from "../../img/toon3.png";

export const Route = createFileRoute("/game")({
  head: () => ({
    meta: [
      { title: "🐍 CAKE SNAKE — Birthday Quest" },
      { name: "description", content: "Play the Cake Snake mini-game." },
    ],
  }),
  component: SnakeGame,
});

const GRID_SIZE = 15;
const INITIAL_SNAKE = [
  { x: 7, y: 7 },
  { x: 7, y: 8 },
  { x: 7, y: 9 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

// 🎵 Same YouTube video ID as birthday page
const YT_VIDEO_ID = "ru0K8uYEZWw"; // Happy Birthday EDM

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 3 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [musicOn, setMusicOn] = useState(true);

  const directionRef = useRef(INITIAL_DIRECTION);
  const audioRef = useRef<HTMLIFrameElement>(null);

  const changeDirection = useCallback((newDir: { x: number; y: number }) => {
    const current = directionRef.current;
    // Prevent 180-degree turns
    if (newDir.x !== 0 && current.x !== 0) return;
    if (newDir.y !== 0 && current.y !== 0) return;
    directionRef.current = newDir;
    setDirection(newDir);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling behavior for arrow keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
      
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          changeDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
        case "S":
          changeDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          changeDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
        case "D":
          changeDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection]);

  const moveSnake = useCallback(() => {
    if (gameOver || !hasStarted) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + directionRef.current.x,
        y: head.y + directionRef.current.y,
      };

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food (eating the cake)
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        let nextFood: { x: number; y: number };
        while (true) {
          nextFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          };
          // Make sure food doesn't spawn on the snake
          // eslint-disable-next-line no-loop-func
          if (!newSnake.some((s) => s.x === nextFood.x && s.y === nextFood.y)) {
            break;
          }
        }
        setFood(nextFood);
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      return newSnake;
    });
  }, [food, gameOver, hasStarted]);

  useEffect(() => {
    // Speed increases slightly as score goes up, cap at 70ms
    const speed = Math.max(70, 200 - score * 1.2);
    const id = setInterval(moveSnake, speed);
    return () => clearInterval(id);
  }, [moveSnake, score]);

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood({ x: 5, y: 3 });
    setGameOver(false);
    setScore(0);
    setHasStarted(true);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-10 bg-background scanlines px-4">
      {/* Grid background effect */}
      <div
        className="pointer-events-none fixed inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--neon-green) 1px, transparent 1px), linear-gradient(90deg, var(--neon-green) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
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

      <header className="relative z-10 w-full max-w-md flex items-center justify-between mb-6" style={{ fontFamily: "'Press Start 2P', monospace" }}>
        <Link
          to="/birthday"
          className="text-[10px] sm:text-xs rounded border-2 px-3 py-2 transition hover:scale-105 backdrop-blur-sm bg-background/50"
          style={{ borderColor: "var(--neon-pink)", color: "var(--neon-pink)", boxShadow: "0 0 5px var(--neon-pink)" }}
        >
          ◄ BACK
        </Link>
        <div className="text-sm sm:text-base neon-text" style={{ color: "var(--neon-yellow)" }}>
          SCORE: <span style={{ color: "var(--neon-cyan)" }}>{score}</span>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-md">
        <div
          className="relative bg-black/80 backdrop-blur-sm border-4 rounded-lg overflow-hidden"
          style={{
            borderColor: gameOver ? "var(--destructive)" : "var(--neon-cyan)",
            boxShadow: gameOver ? "0 0 20px var(--destructive)" : "var(--shadow-cyan)",
            aspectRatio: "1 / 1",
          }}
        >
          {/* Game Grid Render */}
          <div
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
              const x = i % GRID_SIZE;
              const y = Math.floor(i / GRID_SIZE);
              const isSnake = snake.some((s) => s.x === x && s.y === y);
              const isHead = snake[0].x === x && snake[0].y === y;
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={i}
                  className="flex items-center justify-center border border-white/5"
                >
                  {isFood && <span className="text-xl sm:text-2xl leading-none" style={{ filter: "drop-shadow(0 0 5px var(--neon-pink))" }}>🎂</span>}
                  {isSnake && (
                    isHead ? (
                      <img 
                        src={toon3} 
                        alt="Snake Head" 
                        className="w-full h-full object-cover rounded-full"
                        style={{
                          transform: "scale(1.2)",
                          boxShadow: "0 0 10px var(--neon-yellow)",
                          zIndex: 10
                        }}
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundColor: "var(--neon-green)",
                          borderRadius: "2px",
                          transform: "scale(0.9)",
                          boxShadow: "0 0 5px var(--neon-green)",
                        }}
                      />
                    )
                  )}
                </div>
              );
            })}
          </div>

          {/* Start Screen Overlay */}
          {!hasStarted && !gameOver && (
            <div className="absolute inset-0 bg-background/90 backdrop-blur flex flex-col items-center justify-center">
              <h2 className="text-2xl sm:text-3xl text-center mb-6 neon-text animate-pulse-neon" style={{ color: "var(--neon-green)", fontFamily: "'Press Start 2P', monospace" }}>
                CAKE SNAKE
              </h2>
              <button
                onClick={() => setHasStarted(true)}
                className="rounded border-2 px-6 py-3 text-xs transition-all hover:scale-110"
                style={{ borderColor: "var(--neon-pink)", color: "var(--neon-pink)", boxShadow: "var(--shadow-neon)", fontFamily: "'Press Start 2P', monospace" }}
              >
                ▶ START
              </button>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-background/90 backdrop-blur flex flex-col items-center justify-center">
              <h2 className="text-3xl text-center mb-2 animate-glitch" style={{ color: "var(--destructive)", fontFamily: "'Press Start 2P', monospace" }}>
                GAME OVER
              </h2>
              <p className="mb-6 text-sm" style={{ color: "var(--neon-yellow)", fontFamily: "'Press Start 2P', monospace" }}>
                FINAL SCORE: {score}
              </p>
              <button
                onClick={restartGame}
                className="rounded border-2 px-6 py-3 text-xs transition-all hover:scale-110"
                style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)", boxShadow: "var(--shadow-cyan)", fontFamily: "'Press Start 2P', monospace" }}
              >
                ⟲ TRY AGAIN
              </button>
            </div>
          )}
        </div>

        {/* Mobile Controls (D-Pad) */}
        <div className="mt-8 grid grid-cols-3 gap-3 max-w-[200px] mx-auto">
          <div />
          <button
            onClick={() => changeDirection({ x: 0, y: -1 })}
            className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-lg border-2 bg-background/50 active:bg-white/20 transition-all active:scale-90 backdrop-blur-sm"
            style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)", boxShadow: "var(--shadow-cyan)" }}
          >
            <span className="-translate-y-[2px] text-xl">▲</span>
          </button>
          <div />
          <button
            onClick={() => changeDirection({ x: -1, y: 0 })}
            className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-lg border-2 bg-background/50 active:bg-white/20 transition-all active:scale-90 backdrop-blur-sm"
            style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)", boxShadow: "var(--shadow-cyan)" }}
          >
            <span className="-translate-y-[2px] text-xl">◄</span>
          </button>
          <button
            onClick={() => changeDirection({ x: 0, y: 1 })}
            className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-lg border-2 bg-background/50 active:bg-white/20 transition-all active:scale-90 backdrop-blur-sm"
            style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)", boxShadow: "var(--shadow-cyan)" }}
          >
            <span className="-translate-y-[2px] text-xl">▼</span>
          </button>
          <button
            onClick={() => changeDirection({ x: 1, y: 0 })}
            className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-lg border-2 bg-background/50 active:bg-white/20 transition-all active:scale-90 backdrop-blur-sm"
            style={{ borderColor: "var(--neon-cyan)", color: "var(--neon-cyan)", boxShadow: "var(--shadow-cyan)" }}
          >
            <span className="-translate-y-[2px] text-xl">►</span>
          </button>
        </div>
        
        <p className="mt-8 text-center text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "'Kanit', sans-serif" }}>
          ใช้ปุ่มลูกศร (W A S D) หรือปุ่มบนจอเพื่อบังคับงูไปกินเค้ก 🎂
        </p>
      </main>
    </div>
  );
}
