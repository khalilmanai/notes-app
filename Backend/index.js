const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/userModel");
const bodyparser = require("body-parser");
const Note = require("./models/noteModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const app = express();

const PORT = 3000;
const secretKey = crypto.randomBytes(32).toString("hex");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.listen(PORT, () => {
  //www.mongodb.com/docs/atlas/security/ip-access-list/#view-ip-access-list-entries
  https: console.log(` connected to port ${PORT}`);
});
// Defining connection to database method
const connectToDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://medkhalilmannai:medkhalil20@chat-app-db.efr060t.mongodb.net/test?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connection to database : success");
  } catch (error) {
    console.error("Connection to the database: failed", error);
  }
};

// calling connection to db method
connectToDb();

// endpoint to register  a user

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Generate a salt
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        res.status(500).json({ error: "A server error occurred" });
        return;
      }

      // Hashed password is ready, proceed with saving to the database
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "A server error occurred" });
  }
});

// endpoint for user login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ email: email }, secretKey, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (error) {
    console.error("Logging user failed:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

// endpoint to save a note

app.post("/save-note", async (req, res) => {
  try {
    const { email, title, content } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.error("not a registred user");
      res.status(401).json({ message: "error" });
    }

    const newNote = new Note({
      title,
      content,
    });
    await newNote.save();

    user.notes.push(newNote._id);
    await user.save();
    res.json({ message: "Note saved successfully" });
  } catch (error) {
    console.error("a problem happened while saving note", error);
    res.status(500).json({ message: "we had a problem saving a note" });
  }
});

// Endpoint to fetch user notes
app.get("/fetch-notes", async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });

    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Find the user's notes based on the user's notes array
    const userNotes = await Note.find({ _id: { $in: user.notes } });

    res.json({ notes: userNotes });
  } catch (error) {
    console.error("Error fetching user notes:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user notes" });
  }
});
