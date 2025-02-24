const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT: number = 3000;

import '../../db';

// Middleware
app.use(cors());
app.use(express.json());

// Add routes
const userApi = require("./userRoutes");
const orderApi = require("./orderRoutes");
app.use("/api/users", userApi);
app.use("/api/orders", orderApi);

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}/api/users`);
});

module.exports = app;

