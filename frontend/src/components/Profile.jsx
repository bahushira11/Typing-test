import { useEffect, useState } from "react";
import { getProfile } from "../utils/api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <div className="text-cyan-300 text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-cyan-300 font-[Orbitron] flex items-center justify-center px-6">
      <div className="bg-neutral-900 p-8 rounded-lg border border-cyan-500 shadow-[0_0_20px_#00ffff90] w-full max-w-lg">
        <h2 className="text-3xl text-lime-400 tracking-widest uppercase mb-6">Profile</h2>
        <div className="space-y-4 text-lg">
          <p><span className="text-cyan-500">Username:</span> {user.username}</p>
          <p><span className="text-cyan-500">Best WPM:</span> {user.latestWPM}</p>
          <p><span className="text-cyan-500">Best Accuracy:</span> {user.latestAccuracy}%</p>
          <p><span className="text-cyan-500">Tests Taken:</span> {user.testsTaken}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
