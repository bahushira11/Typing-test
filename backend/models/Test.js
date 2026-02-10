import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    wpm: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model("Test", testSchema);
export default Test;
