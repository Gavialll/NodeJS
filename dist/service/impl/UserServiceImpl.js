"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const UserRepositoryImpl_1 = require("../../repository/impl/UserRepositoryImpl");
class UserServiceImpl {
    /** 📋 Get all users */
    getUsers() {
        return UserRepositoryImpl_1.userRepository.getUsers();
    }
    /** 🔍 Get user by ID */
    getUserById(id) {
        return UserRepositoryImpl_1.userRepository.getUserById(id);
    }
    /** 🔍 Search user by name */
    searchUser(name) {
        return UserRepositoryImpl_1.userRepository.searchUser(name);
    }
    /** 🔄 Update user */
    updateUser(user) {
        return UserRepositoryImpl_1.userRepository.updateUser(user);
    }
    /** 💾 Save user */
    saveUser(user) {
        UserRepositoryImpl_1.userRepository.saveUser(user);
    }
    /** 🗑️ Delete user by ID */
    deleteUserById(id) {
        return UserRepositoryImpl_1.userRepository.deleteUserById(id);
    }
}
exports.userService = new UserServiceImpl();
