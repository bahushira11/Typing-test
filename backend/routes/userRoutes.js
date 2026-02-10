const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/user");

router.get("/leaderboard", async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ latestWPM: -1 })
      .limit(5)
      .select("username latestWPM latestAccuracy");
    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

router.patch("/updatestats",protect, async (req, res) => {
  try {
    const { wpm, accuracy } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.latestWPM = wpm;
    user.latestAccuracy = accuracy;
    user.testsTaken += 1;

    await user.save();
    res.json({ message: "Stats updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update stats" });
  }
});

module.exports = router;


router.post("/login", loginUser);


router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
