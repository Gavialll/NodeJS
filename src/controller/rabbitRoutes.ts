
const rabbitRoutes = require("express").Router();

/** 📋 Get received messages */
rabbitRoutes.get("/messages", (req: any, res: any) => {
    // console.log(JSON.stringify(processedMessages.values()))
    // res.status(200).json(JSON.stringify(processedMessages))
});

module.exports = rabbitRoutes;