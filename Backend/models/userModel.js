const mongoose = require("mongoose");
const Note = require("./noteModel"); // Import the Note model

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note", // Reference the Note model
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
