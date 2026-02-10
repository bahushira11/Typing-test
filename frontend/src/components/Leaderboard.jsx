import { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/leaderboard");
        setPlayers(res.data);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-black text-cyan-300 font-[Orbitron] flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-3xl md:text-5xl text-lime-400 mb-10 tracking-widest neon-glow animate-pulse">
        LEADERBOARD
      </h1>
      <div className="w-full max-w-2xl space-y-6">
        {players.map((player, index) => (
          <Rank
            key={index}
            rank={index + 1}
            name={player.username}
            wpm={player.latestWPM}
            acc={player.latestAccuracy}
          />
        ))}
      </div>
    </div>
  );
}

function Rank({ rank, name, wpm, acc }) {
  const medals = ["🥇", "🥈", "🥉"];
  const glow =
    rank === 1
      ? "animate-pulse shadow-[0_0_25px_#00ffcc]"
      : "hover:shadow-[0_0_20px_#00ffff99]";

  return (
    <div
      className={`flex justify-between items-center px-6 py-4 border border-cyan-500 rounded-xl bg-neutral-900 text-lg md:text-xl tracking-wider transition-all duration-300 cursor-pointer ${glow}`}
    >
      <div className="flex items-center gap-3 text-lime-400">
        {rank <= 3 && <span className="text-2xl">{medals[rank - 1]}</span>}
        <span>{name}</span>
      </div>
      <div className="text-cyan-300">
        WPM: <span className="text-lime-400">{wpm}</span>
      </div>
      <div className="text-cyan-300">
        ACC: <span className="text-lime-400">{acc}%</span>
      </div>
    </div>
  );
}

export default Leaderboard;
