import { User } from "../../entity/User";
import { UserRepository } from "../UserRepository";
import { client } from "../../client/ElasticSearch";
import { DeleteResponse, UpdateResponse } from "@elastic/elasticsearch/lib/api/types";

class UserRepositoryImpl implements UserRepository {
    private USERS_INDEX: string = "users"

    /** 📋 Get all users */
    async getUsers(): Promise<User[]> {
        const response = await client.search<User>(
            {
                    index: this.USERS_INDEX,
                    query: {
                        match_all: {}
                    }
            });
            return response.hits.hits.map(hit => ({id: hit._id, ...hit._source}) as User);
    }

    /** 🔍 Get user by ID */
    getUserById(id: string): Promise<User> {
        return client.get<User>({
            index: this.USERS_INDEX,
            id: id})
            .then(el => {
                el._source ? el._source.id = el._id : "";
                return el._source as User
            });
    }

    /** 🔍 Search user */
    async searchUser(name: string): Promise<User[]> {
        const response = await client.search({
            index: this.USERS_INDEX,
            query: {
                query_string: {
                    query: `*${name}*`,
                    fields: ["name"],
                    default_operator: "AND"
                }
            }
        });
        return response.hits.hits.map((hit) => hit._source as User);
    }

    /** 🔄 Update user */
    updateUser(user: User): Promise<UpdateResponse> {
        const document =  {
            name: user.name,
            age: user.age,
            wallet: {
                money: user.wallet.money
            }
        }
        return client.update({
            index: this.USERS_INDEX,
            id: user.id,
            doc: document
        });
    }

    /** 💾 Save user */
    async saveUser(user: User): Promise<void> {
        const document =  {
            name: user.name,
            age: user.age,
            wallet: user.wallet
        }
        client.index({
            index: this.USERS_INDEX,
            document: document
        });
    }

    /** 🗑️ Delete user by ID */
    deleteUserById(id: string): Promise<DeleteResponse> {
        return client.delete({
                index: this.USERS_INDEX,
                id: id
            });
    }
}

export const userRepository = new UserRepositoryImpl();