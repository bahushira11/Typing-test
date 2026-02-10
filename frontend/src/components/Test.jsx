import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-cyan-300 font-[Poppins] flex items-center justify-center px-6">
      <div className="bg-neutral-900 p-8 rounded-lg border border-cyan-500 shadow-[0_0_20px_#00ffff90] w-full max-w-3xl">
        <h1 className="text-4xl md:text-5xl text-lime-400 tracking-widest uppercase mb-8 text-center animate-pulse">
          Welcome to Typecast
        </h1>

        <p className="text-lg leading-loose mb-6 text-cyan-200">
          <span className="text-lime-400">Typecast</span> is a typing test that tracks both your{" "}
          <span className="text-lime-400">Words Per Minute (WPM)</span> and your{" "}
          <span className="text-lime-400">Accuracy</span>. Unlike traditional tests, we combine visual feedback and real-time tracking
          to deliver a sleek, responsive typing experience.
        </p>

        <ul className="list-disc list-inside space-y-3 text-cyan-100">
          <li>
            <span className="text-cyan-400">WPM</span> is the number of correct characters typed,
            adjusted for the time taken.
          </li>
          <li>
            <span className="text-cyan-400">Accuracy</span> shows how many characters you got right compared to the total text.
          </li>
          <li>
            In <span className="text-cyan-400">Timed Mode</span>, your accuracy also reflects how much of the given text you typed — so speed and completion matter!
          </li>
        </ul>

        <p className="mt-6 text-center text-lime-400 text-xl tracking-widest">
          Are you ready to beat your best score?
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/typingtest")}
            className="px-6 py-3 bg-cyan-700 hover:bg-cyan-500 text-black font-bold rounded-xl shadow-[0_0_15px_#00ffff] transition-all duration-300 uppercase tracking-wider"
          >
            Take Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
