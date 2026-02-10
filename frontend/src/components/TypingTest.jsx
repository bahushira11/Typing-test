import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { signupUser, loginUser, getProfile , updateStats } from "../utils/api.js";


const dialogues={
    0:"There's a point at 7,000 RPM... where everything fades. The machine becomes weightless. Just disappears. And all that's left is a body moving through space and time. 7,000 RPM. That's where you meet it. You feel it coming. It creeps up on you, close in your ear. Asks you a question. The only question that matters. Who are you?",
    1:"I know. It's all wrong. By rights we shouldn't even be here. But we are. It's like in the great stories, Mr. Frodo. The ones that really mattered. Full of darkness and danger they were. And sometimes you didn't want to know the end. Because how could the end be happy? How could the world go back to the way it was when so much bad had happened?",
    2:"I can't learn anything from you that I can't read in some fuckin' book. Unless you want to talk about you. Who you are. And I'm fascinated. I'm in. But you don't want to do that, do you, sport? You're terrified of what you might say.",
    3:"Let me tell you the story of Right Hand, Left Hand. It's a tale of good and evil. Hate: It was with this hand that Cain iced his brother. Love: These five fingers, they go straight to the soul of man. The right hand: The hand of love. The story of life is this: Static.",
    4:"However, that blue [sweater] represents millions of dollars and countless jobs and so it's sort of comical how you think that you've made a choice that exempts you from the fashion industry when, in fact, you're wearing the sweater that was selected for you by the people in this room. From a pile of 'stuff.'",
    5:"I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhauser Gate. All those moments will be lost in time, like tears in rain.",
}

function TypingTest() {
  const WORDS = dialogues[Math.floor(Math.random() * Object.keys(dialogues).length)];
  const [TEXT, setTEXT] = useState(WORDS);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [finished, setFinished] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [endtext, setEndtext] = useState("Start typing...");
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const intervalRef = useRef(null);
  const inputRef = useRef();

  useEffect(() => {
    if (startTime && timerEnabled && !finished) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0; 
          }

          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [startTime, timerEnabled, finished]);

  useEffect(() => {
  if (timeLeft === 0 && !finished) {
    finishTest();
  }
}, [timeLeft, finished]);

  useEffect(() => {
    if (input.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    setActiveIndex(input.length);

    if (input.length > 0) {
      setEndtext("");
    }

    if (input.length >= TEXT.length && !finished) {
      finishTest();
    }
  }, [input]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function finishTest() {
  setFinished(true);
  clearInterval(intervalRef.current);

  const timeInMinutes = (Date.now() - startTime) / 1000 / 60;
  const correctChars = countCorrectCharacters(input, TEXT);
  const words = correctChars / 5;
  const calculatedWPM = Math.round(words / timeInMinutes);
  const calculatedAccuracy = Math.round((correctChars / TEXT.length) * 100);

  setWpm(calculatedWPM);
  setAccuracy(calculatedAccuracy);

  try {
    await updateStats({ wpm: calculatedWPM, accuracy: calculatedAccuracy });
    console.log("Stats updated in DB");
  } catch (err) {
    console.error("Failed to update stats:", err);
  }
}


  function calculateWPM() {
    const endTime = Date.now();
    const timeInMinutes = (endTime - startTime) / 1000 / 60;
    const correctChars = countCorrectCharacters(input, TEXT);
    const words = correctChars / 6;
    setWpm(Math.round(words / timeInMinutes));
    setAccuracy(Math.round((correctChars / TEXT.length) * 100));
    return [timeInMinutes,correctChars,words,TEXT.length];
  }

  function countCorrectCharacters(userInput, referenceText) {
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === referenceText[i]) {
        correct++;
      }
    }
    return correct;
  }

  function resetTest() {
    const newText = dialogues[Math.floor(Math.random() * Object.keys(dialogues).length)];
    setTEXT(newText);
    setInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(0);
    setFinished(false);
    setActiveIndex(0);
    setEndtext("Start typing...");
    setTimeLeft(30);
    inputRef.current.focus();
  }

  return (
    <div
      className="min-h-screen bg-black text-cyan-300 font-[Orbitron] flex flex-col items-center justify-center px-4"
      onClick={(e) => {
        if (!e.target.closest("select") && !e.target.closest("button")) {
          inputRef.current.focus();
        }
      }}
    >
      <div className="flex flex-wrap md:flex-nowrap gap-6 items-center justify-center mb-6 w-full max-w-4xl text-sm md:text-base">
        <div className="flex items-center gap-2 text-cyan-400">
          <label className="text-lime-400 tracking-widest uppercase">Timer:</label>
          <span className="text-cyan-200">{timerEnabled ? `${timeLeft}s` : "OFF"}</span>
        </div>

        <div className="flex items-center gap-3 text-cyan-400 bg-neutral-800 px-4 py-3 rounded-lg border border-cyan-500 shadow-[0_0_10px_#00ffff60]">
          <div className="flex items-center gap-2">
            <label htmlFor="timeSelect" className="text-sm uppercase tracking-widest">Set Time:</label>
            <select
              id="timeSelect"
              disabled={startTime}
              value={timeLeft}
              onChange={(e) => setTimeLeft(Number(e.target.value))}
              className="bg-black text-cyan-300 border border-cyan-500 rounded px-3 py-1 focus:outline-none hover:border-lime-400 transition-all shadow-[0_0_6px_#00ffff60] cursor-pointer"
            >
              <option value={15}>15s</option>
              <option value={30}>30s</option>
              <option value={60}>60s</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="timerToggle" className="text-sm uppercase tracking-widest">Timer</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                id="timerToggle"
                type="checkbox"
                checked={timerEnabled}
                disabled={startTime}
                onChange={() => setTimerEnabled(!timerEnabled)}
                className="sr-only"
              />
              <div className="w-12 h-6 rounded-full border border-cyan-400 shadow-[0_0_10px_#00ffff50] bg-neutral-700 relative transition-colors duration-200">
                <div
                  className={`absolute top-1 h-4 w-4 rounded-full bg-black transition-all duration-200 ${
                    timerEnabled ? "left-7" : "left-1"
                  }`}
                />
              </div>
            </label>
          </div>
        </div>
      </div>

      <div
        className="max-w-4xl w-full text-xl md:text-2xl leading-loose tracking-wide font-mono break-words p-6 bg-neutral-900 border border-cyan-700 rounded-lg shadow-[0_0_15px_#00ffff80] backdrop-blur-md mb-6 cursor-text select-none"
        onClick={() => inputRef.current.focus()}
      >
        {TEXT.split("").map((char, index) => {
          let className = "text-cyan-600";
          if (index < input.length) {
            className = input[index] === char ? "text-lime-400" : "text-rose-500";
          } else if (index === activeIndex) {
            className += " underline";
          }

          return (
            <span key={index} className={className} style={{ position: "relative" }}>
              {char}
              {index === activeIndex && !finished && (
                <motion.span
                  className="inline-block w-[2px] h-6 bg-cyan-400 absolute top-0 left-0 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </span>
          );
        })}
      </div>

      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={finished}
        className="absolute top-0 left-0 w-[1px] h-[1px] opacity-0 pointer-events-none select-none"
        spellCheck={false}
        aria-label="Typing input"
      />

      <div className="mt-6 text-xl text-center font-semibold">
        {finished ? (
          <>
            <p className="mb-2">
              WPM: <span className="text-lime-400 text-3xl animate-pulse">{wpm}</span>
            </p>
            <p className="mb-4">
              Accuracy: <span className="text-lime-400 text-3xl animate-pulse">{accuracy}%</span>
            </p>
            <button
              onClick={resetTest}
              className="px-6 py-3 bg-cyan-700 hover:bg-cyan-500 text-black font-bold rounded-xl shadow-[0_0_15px_#00ffff] transition-all duration-300"
            >
              Restart
            </button>
          </>
        ) : (
          <p className="text-cyan-500 italic tracking-wide">{endtext}</p>
        )}
      </div>
    </div>
  );
}

export default TypingTest;
