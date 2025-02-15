import {User} from "../entity/User";

const userRoutes = require("express").Router();

import { userService } from "../service/impl/UserServiceImpl";

const SAVE_SUCCESSFUL = '💾 Save successful'
const UPDATE_SUCCESSFUL = '🔄 Update successful'
const USER_NOT_FOUND = '⛔ User not found'
const DELETE_SUCCESSFUL = '🗑️ Delete successful'

/** 💾 Save user */
userRoutes.post("/", (req: any, res: any) => {
    let user = req.body as User
    userService.saveUser(user);
    res.status(201).json(SAVE_SUCCESSFUL);
});

/** 🔄 Update user */
userRoutes.put("/", (req: any, res: any) => {
    userService.updateUser(req.body as User)
        .then(response => {
            res.status(200).json(UPDATE_SUCCESSFUL);
        }).catch(error => {
            if (error.meta.statusCode === 404) {
                res.status(404).json(USER_NOT_FOUND);
            } else {
                res.status(400).json(error);
            }
        });
});

/** 📋 Get all users */
userRoutes.get("/", (req: any, res: any) => {
    userService.getUsers()
        .then(users => {
            res.json(users);
        })
});

/** 🔍 Get user by ID */
userRoutes.get("/:id", (req: any, res: any) => {
    userService.getUserById(req.params.id)?.then(user => {
        res.json(user)
    }).catch(error => {
        if (error.meta.statusCode === 404) {
            res.status(404).json(USER_NOT_FOUND);
        } else {
            res.status(400).json(error);
        }
    });
});

/** 🔍 Search user */
userRoutes.post("/_search", (req: any, res: any) => {
    userService.searchUser(req.query.name)?.then(user => {
        res.json(user);
    }).catch(error => {
        res.status(400).json(error);
    });
});

/** 🗑️ Delete user by ID */
userRoutes.delete("/:id", (req: any, res: any) => {
    userService.deleteUserById(req.params.id)
        .then(() => res.status(200).json(DELETE_SUCCESSFUL))
        .catch(error => {
            if (error.meta.statusCode === 404) {
                res.status(404).json(USER_NOT_FOUND);
            } else {
                res.status(400).json(error);
            }
        });
});

module.exports = userRoutes;