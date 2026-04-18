// Import required modules
const express = require("express"); // framework to create server
const mongoose = require("mongoose"); // to connect MongoDB
const cors = require("cors"); // allows frontend to communicate

require("dotenv").config(); // to use environment variables

const app = express();

// Middleware
app.use(express.json()); // parses incoming JSON data
app.use(cors()); // enables cross-origin requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const User = require("./models/User");
const bcrypt = require("bcrypt");

// Signup route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  await user.save();

  res.send("User registered successfully");
});

const jwt = require("jsonwebtoken");

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.send("User not found");

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.send("Invalid credentials");

  // Generate token
  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({ token });
});
// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});// Import required modules
const express = require("express"); // framework to create server
const mongoose = require("mongoose"); // to connect MongoDB
const cors = require("cors"); // allows frontend to communicate

require("dotenv").config(); // to use environment variables

const app = express();

// Middleware
app.use(express.json()); // parses incoming JSON data
app.use(cors()); // enables cross-origin requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const User = require("./models/User");
const bcrypt = require("bcrypt");

// Signup route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  await user.save();

  res.send("User registered successfully");
});

const jwt = require("jsonwebtoken");

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.send("User not found");

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.send("Invalid credentials");

  // Generate token
  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({ token });
});
// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});