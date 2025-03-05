import {consumeMessages} from "../Consumer";

const express = require("express");
const cors = require("cors");
require("dotenv").config();
export const app = express();
const PORT: number = 3000;

import '../../db';
import {initPublisherConnection} from "../Publisher";

app.use(cors());
app.use(express.json());

// Add routes
const userApi = require("./userRoutes");
const orderApi = require("./orderRoutes");
const rabbitApi = require("./rabbitRoutes");
app.use("/api/users", userApi);
app.use("/api/orders", orderApi);
app.use("/api/rabbit", rabbitApi);

initPublisherConnection()
consumeMessages()

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}/api/users`);
});

module.exports = app;

