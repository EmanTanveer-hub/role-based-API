const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

app.use(express.json());

const connectDB = require("./config/db");
connectDB();

const authRoutes = require("./routes/authRoutes");
app.use("/api/role", authRoutes); 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

