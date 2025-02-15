"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes = require("express").Router();
const UserServiceImpl_1 = require("../service/impl/UserServiceImpl");
const SAVE_SUCCESSFUL = '💾 Save successful';
const UPDATE_SUCCESSFUL = '🔄 Update successful';
const USER_NOT_FOUND = '⛔ User not found';
const DELETE_SUCCESSFUL = '🗑️ Delete successful';
/** 💾 Save user */
userRoutes.post("/", (req, res) => {
    let user = req.body;
    UserServiceImpl_1.userService.saveUser(user);
    res.status(201).json(SAVE_SUCCESSFUL);
});
/** 🔄 Update user */
userRoutes.put("/", (req, res) => {
    UserServiceImpl_1.userService.updateUser(req.body)
        .then(response => {
        res.status(200).json(UPDATE_SUCCESSFUL);
    }).catch(error => {
        if (error.meta.statusCode === 404) {
            res.status(404).json(USER_NOT_FOUND);
        }
        else {
            res.status(400).json(error);
        }
    });
});
/** 📋 Get all users */
userRoutes.get("/", (req, res) => {
    UserServiceImpl_1.userService.getUsers()
        .then(users => {
        res.json(users);
    });
});
/** 🔍 Get user by ID */
userRoutes.get("/:id", (req, res) => {
    var _a;
    (_a = UserServiceImpl_1.userService.getUserById(req.params.id)) === null || _a === void 0 ? void 0 : _a.then(user => {
        res.json(user);
    }).catch(error => {
        if (error.meta.statusCode === 404) {
            res.status(404).json(USER_NOT_FOUND);
        }
        else {
            res.status(400).json(error);
        }
    });
});
/** 🔍 Search user */
userRoutes.post("/_search", (req, res) => {
    var _a;
    (_a = UserServiceImpl_1.userService.searchUser(req.query.name)) === null || _a === void 0 ? void 0 : _a.then(user => {
        res.json(user);
    }).catch(error => {
        res.status(400).json(error);
    });
});
/** 🗑️ Delete user by ID */
userRoutes.delete("/:id", (req, res) => {
    UserServiceImpl_1.userService.deleteUserById(req.params.id)
        .then(() => res.status(200).json(DELETE_SUCCESSFUL))
        .catch(error => {
        if (error.meta.statusCode === 404) {
            res.status(404).json(USER_NOT_FOUND);
        }
        else {
            res.status(400).json(error);
        }
    });
});
module.exports = userRoutes;
