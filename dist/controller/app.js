"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = 3000;
const ElasticSearch_1 = require("../client/ElasticSearch");
// ElasticSearch connect
(0, ElasticSearch_1.checkConnection)();
(0, ElasticSearch_1.ensureUserIndexExists)();
(0, ElasticSearch_1.ensureOrderIndexExists)();
// Middleware
app.use(cors());
app.use(express.json());
// Add routes
const userApi = require("./userRoutes");
const orderApi = require("./orderRoutes");
const userUploadApi = require("./userUploadRoutes");
app.use("/api/users", userApi);
app.use("/api/orders", orderApi);
app.use("/api/upload", userUploadApi);
// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}/api/users`);
});
module.exports = app;
