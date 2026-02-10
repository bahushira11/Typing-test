const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ error: `${field} already exists` });
    }
    if (err.errors?.email?.message) {
      return res.status(400).json({ error: err.errors.email.message });
    }
    return res.status(500).json({ error: "Signup failed" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, username: user.username });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};




exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({
    username: user.username,
    testsTaken: user.testsTaken,
    latestWPM: user.latestWPM,
    latestAccuracy: user.latestAccuracy,
  });
};

exports.updateStats = async (req, res) => {
  const userId = req.user.id; // middleware must set req.user
  const { wpm, accuracy } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.latestWPM = wpm;
    user.latestAccuracy = accuracy;
    user.testsTaken += 1;

    await user.save();

    res.json({ message: "Stats updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update stats" });
  }
};
