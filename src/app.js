require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payments");
const transactionRoutes = require("./routes/transactions");
const connectDB = require("./config/db");
const User = require("./models/userModel");

// Connect to MongoDB
connectDB();

const app = express();

const corsOptions = {
  origin: ["https://payment-frontent-app.vercel.app"], // Add your frontend's domain
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow cookies and credentials
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/payments", paymentRoutes);
app.use("/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to PayWithParmar API!" });
});



app.get("/test-mongo", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "MongoDB query failed", error });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
