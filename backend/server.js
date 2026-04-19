const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Wisdom = require("./models/Wisdom");
const Message = require("./models/Message");
const User = require('./models/User');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB connection (local)
mongoose.connect('mongodb://127.0.0.1:27017/wisdomgpt')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ================= CHATBOT =================

app.post("/message", async (req, res) => {
  try {
    const { question } = req.body;
    const userQuestion = question.toLowerCase().trim();

    let answer = "I am still learning...";

    const wisdomData = await Wisdom.find();

    console.log("User question:", userQuestion);
    console.log("Wisdom data:", wisdomData);

    for (let item of wisdomData) {
      const keyword = item.keyword.toLowerCase();

      if (
        userQuestion.includes(keyword) ||
        (keyword === "anger" && userQuestion.includes("angry")) ||
        (keyword === "jealous" && userQuestion.includes("jealousy")) ||
        (keyword === "fear" && userQuestion.includes("afraid"))
      ) {
        answer = item.teaching;
        break;
      }
    }

    const newMsg = new Message({
      question,
      answer
    });

    await newMsg.save();

    res.json({ answer });

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

// ================= GET ALL MESSAGES =================

app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching messages");
  }
});

// ================= DELETE MESSAGE =================

app.delete('/message/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Message deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting message");
  }
});

// ================= REGISTER =================

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({ message: "User registered successfully"});

  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

// ================= LOGIN =================

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found"});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ message: "Invalid credentials"});

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

// ================= START SERVER =================

app.listen(3000, () => {
  console.log("Server running on port 3000");
});