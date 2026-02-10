import Test from "../models/Test.js";
import User from "../models/user.js";

// @desc   Add a new typing test result
// @route  POST /api/tests
// @access Private
export const addTestResult = async (req, res) => {
  const { wpm, accuracy } = req.body;

  try {
    const test = new Test({
      user: req.user._id,
      wpm,
      accuracy,
    });

    await test.save();

    // Optionally update user's test count or cache if needed

    res.status(201).json({ message: "Test result saved", test });
  } catch (error) {
    res.status(500).json({ message: "Failed to save test", error });
  }
};

// @desc   Get user's test history and stats
// @route  GET /api/tests/my
// @access Private
export const getMyTests = async (req, res) => {
  try {
    const tests = await Test.find({ user: req.user._id }).sort({ createdAt: -1 });

    const totalTests = tests.length;
    const avgWpm = totalTests ? (tests.reduce((sum, t) => sum + t.wpm, 0) / totalTests).toFixed(2) : 0;
    const avgAccuracy = totalTests ? (tests.reduce((sum, t) => sum + t.accuracy, 0) / totalTests).toFixed(2) : 0;

    res.json({
      totalTests,
      averageWpm: avgWpm,
      averageAccuracy: avgAccuracy,
      tests,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch test history", error });
  }
};
