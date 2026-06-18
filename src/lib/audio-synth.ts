// 🎹 8-Bit Birthday Synthesizer Utility

const NOTES = {
  G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99
};

const MELODY = [
  [NOTES.G4, 0.4], [NOTES.G4, 0.4], [NOTES.A4, 0.8], [NOTES.G4, 0.8], [NOTES.C5, 0.8], [NOTES.B4, 1.6],
  [NOTES.G4, 0.4], [NOTES.G4, 0.4], [NOTES.A4, 0.8], [NOTES.G4, 0.8], [NOTES.D5, 0.8], [NOTES.C5, 1.6],
  [NOTES.G4, 0.4], [NOTES.G4, 0.4], [NOTES.G5, 0.8], [NOTES.E5, 0.8], [NOTES.C5, 0.8], [NOTES.B4, 0.8], [NOTES.A4, 1.6],
  [NOTES.F5, 0.4], [NOTES.F5, 0.4], [NOTES.E5, 0.8], [NOTES.C5, 0.8], [NOTES.D5, 0.8], [NOTES.C5, 1.6]
];

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let stopRequested = false;

const playNote = (ctx: AudioContext, frequency: number, startTime: number, duration: number) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = "triangle";
  osc.frequency.setValueAtTime(frequency, startTime);
  
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(startTime);
  osc.stop(startTime + duration);
};

export const startBirthdayMelody = async () => {
  if (isPlaying) return;
  
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  
  if (audioCtx.state === "suspended") {
    await audioCtx.resume();
  }

  isPlaying = true;
  stopRequested = false;

  const playLoop = () => {
    if (stopRequested || !audioCtx) {
      isPlaying = false;
      return;
    }
    
    let time = audioCtx.currentTime + 0.1;
    let totalDuration = 0;

    MELODY.forEach(([freq, duration]) => {
      playNote(audioCtx!, freq, time, duration - 0.05);
      time += duration;
      totalDuration += duration;
    });
    
    setTimeout(playLoop, totalDuration * 1000);
  };

  playLoop();
};

export const stopBirthdayMelody = () => {
  stopRequested = true;
  if (audioCtx) {
    audioCtx.suspend();
  }
  isPlaying = false;
};

export const resumeBirthdayMelody = () => {
    if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
    }
}
