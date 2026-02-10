import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Profile from "./components/Profile";
import TypingTest from "./components/TypingTest";
import Leaderboard from "./components/Leaderboard";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    if (storedName && storedEmail) {
      setUser({ name: storedName, email: storedEmail });
    }
  }, []);

  const handleLogin = (username, email) => {
    setUser({ name: username, email });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setUser(null);
  };

  

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout user={user} onLogout={handleLogout} />}>
          <Route index element={<Home />} />
          <Route path="typingtest" element={<PrivateRoute><TypingTest /></PrivateRoute>} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login onLogin={handleLogin} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
