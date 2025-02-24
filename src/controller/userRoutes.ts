import { User } from "../entity/User";
import { userRepository } from "../repository/UserRepository";
import { UserValidator } from "../validator/UserValidator";

const userRoutes = require("express").Router();

const USER_NOT_FOUND = '⛔ User not found'
const ERROR_CREATION = '❌ Error creating user'

/** 💾 Save user */
userRoutes.post("/", async (req: any, res: any) => {
    const errors = UserValidator.validate(req.body);

    if (errors.length === 0) {
        userRepository.saveUser(User.createFromJSON(req.body))
            .then(result => {
                if (result) {
                    res.status(201).json(result.toJSON());
                } else {
                    res.status(400).json(ERROR_CREATION);
                }
            })
    } else {
        res.status(400).json(errors)
    }

});

/** 🔄 Update user */
userRoutes.put("/", (req: any, res: any) => {
    userRepository.updateUser(req.body).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json(USER_NOT_FOUND);
        }
    })
});

/** 📋 Get all users */
userRoutes.get("/", (req: any, res: any) => {
    userRepository.getUsers().then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json(USER_NOT_FOUND);
        }
    })
});

/** 🔍 Get user by ID */
userRoutes.get("/:id", (req: any, res: any) => {
    userRepository.getUserById(req.params.id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json(USER_NOT_FOUND);
        }
    })
});

/** 🔍 Search user */
userRoutes.post("/_search", (req: any, res: any) => {
    userRepository.searchUser(req.query.name).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json(USER_NOT_FOUND);
        }
    })
});

/** 🗑️ Delete user by ID */
userRoutes.delete("/:id", (req: any, res: any) => {
    userRepository.deleteUserById(req.params.id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json(USER_NOT_FOUND);
        }
    })
});

module.exports = userRoutes;