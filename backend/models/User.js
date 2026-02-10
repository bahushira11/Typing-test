const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email:{type: String,required:true, unique:true , match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  testsTaken: { type: Number, default: 0 },
  latestWPM: { type: Number, default: 0 },
  latestAccuracy: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
