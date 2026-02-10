const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getProfile,
  updateStats,
} = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.post("/stats", protect, updateStats);


module.exports = router;
