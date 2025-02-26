import {messages} from "../Consumer";

const rabbitRoutes = require("express").Router();

/** 📋 Get received messages */
rabbitRoutes.get("/messages", (req: any, res: any) => {
    res.status(200).json(messages)
});

module.exports = rabbitRoutes;