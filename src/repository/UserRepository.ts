import { User } from "../entity/User";
import {DeleteResponse, UpdateResponse} from "@elastic/elasticsearch/lib/api/types";

export interface UserRepository {
    getUsers(): Promise<User[]>

    getUserById(id: string): Promise<User>

    searchUser(name: string): Promise<User[]>

    updateUser(user: User): Promise<UpdateResponse>

    saveUser(user: User): void

    deleteUserById(id: string): Promise<DeleteResponse>;
}