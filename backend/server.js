require("dotenv").config();

const dashboardRoutes = require("./routes/dashboardRoutes");
const authroutes = require("./routes/authroutes");
const loanroutes = require("./routes/loanRoutes");
const memberroutes = require("./routes/memberRoutes");
const bookroutes = require("./routes/bookRoutes");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authroutes");



const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/books", bookroutes);
app.use("/api/members", memberroutes);
app.use("/api/loans", loanroutes);
app.use("/api/users", userRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "Server berjalan dengan baik"
    });
});
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});