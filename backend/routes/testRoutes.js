const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const User = require("../models/user");


router.post("/submit",protect, async (req, res) => {
  try {
    const { wpm, accuracy } = req.body;

    if (!wpm || !accuracy) {
      return res.status(400).json({ error: "WPM and Accuracy are required" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.testsTaken += 1;
    user.latestWPM = wpm;
    user.latestAccuracy = accuracy;

    await user.save();
    res.status(200).json({ message: "Test result saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save test result" });
  }
});


router.get("/leaderboard", async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ latestWPM: -1 })
      .limit(10)
      .select("username latestWPM latestAccuracy");

    res.json(topUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

module.exports = router;
