"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const ElasticSearch_1 = require("../../client/ElasticSearch");
class UserRepositoryImpl {
    constructor() {
        this.USERS_INDEX = "users";
    }
    /** 📋 Get all users */
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield ElasticSearch_1.client.search({
                index: this.USERS_INDEX,
                query: {
                    match_all: {}
                }
            });
            return response.hits.hits.map(hit => (Object.assign({ id: hit._id }, hit._source)));
        });
    }
    /** 🔍 Get user by ID */
    getUserById(id) {
        return ElasticSearch_1.client.get({
            index: this.USERS_INDEX,
            id: id
        })
            .then(el => {
            el._source ? el._source.id = el._id : "";
            return el._source;
        });
    }
    /** 🔍 Search user */
    searchUser(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield ElasticSearch_1.client.search({
                index: this.USERS_INDEX,
                query: {
                    query_string: {
                        query: `*${name}*`,
                        fields: ["name"],
                        default_operator: "AND"
                    }
                }
            });
            return response.hits.hits.map((hit) => hit._source);
        });
    }
    /** 🔄 Update user */
    updateUser(user) {
        const document = {
            name: user.name,
            age: user.age,
            wallet: {
                money: user.wallet.money
            }
        };
        return ElasticSearch_1.client.update({
            index: this.USERS_INDEX,
            id: user.id,
            doc: document
        });
    }
    /** 💾 Save user */
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = {
                name: user.name,
                age: user.age,
                wallet: user.wallet
            };
            ElasticSearch_1.client.index({
                index: this.USERS_INDEX,
                document: document
            });
        });
    }
    /** 🗑️ Delete user by ID */
    deleteUserById(id) {
        return ElasticSearch_1.client.delete({
            index: this.USERS_INDEX,
            id: id
        });
    }
}
exports.userRepository = new UserRepositoryImpl();
