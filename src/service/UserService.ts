import { User } from "../entity/User";
import { DeleteResponse, UpdateResponse } from "@elastic/elasticsearch/lib/api/types";

export interface UserService {
    getUsers(): Promise<User[]>

    getUserById(id: string): Promise<User> | undefined

    searchUser(name: string): Promise<User[]>

    updateUser(user: User): Promise<UpdateResponse>

    saveUser(user: User): void

    deleteUserById(id: string): Promise<DeleteResponse>;
}