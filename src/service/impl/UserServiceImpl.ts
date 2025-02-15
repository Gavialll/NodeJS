import { User } from "../../entity/User";
import { UserService } from "../../service/UserService";
import { userRepository } from "../../repository/impl/UserRepositoryImpl";
import { DeleteResponse, UpdateResponse } from "@elastic/elasticsearch/lib/api/types";

class UserServiceImpl implements UserService {

    /** 📋 Get all users */
    getUsers(): Promise<User[]> {
        return userRepository.getUsers();
    }

    /** 🔍 Get user by ID */
    getUserById(id: string): Promise<User> {
        return userRepository.getUserById(id)
    }

    /** 🔍 Search user by name */
    searchUser(name: string): Promise<User[]> {
        return userRepository.searchUser(name);
    }

    /** 🔄 Update user */
    updateUser(user: User): Promise<UpdateResponse> {
        return userRepository.updateUser(user);
    }

    /** 💾 Save user */
    saveUser(user: User){
        userRepository.saveUser(user)
    }

    /** 🗑️ Delete user by ID */
    deleteUserById(id: string): Promise<DeleteResponse> {
        return userRepository.deleteUserById(id)
    }
}

export const userService = new UserServiceImpl();