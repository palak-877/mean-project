const Message = require("./models/Message");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/wisdomgpt')
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send("Server running");
});

app.post("/message", async (req, res) => {
  try {
    const { question } = req.body;

    // simple logic (your "AI" for now)
    let answer = "I am still learning...";

    if (question.toLowerCase().includes("jealous")) {
      answer = "Jealousy comes from comparison. Focus on your growth.";
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

app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching messages");
  }
});

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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});