require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payments");
// const transactionRoutes = require("./routes/transactions");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/payments", paymentRoutes);
// app.use("/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to PayWithParmar API!" });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
