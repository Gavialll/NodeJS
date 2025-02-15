"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Wallet_1 = require("./Wallet");
class User {
    constructor(id, name, age, wallet) {
        this._name = name;
        this._age = age;
        this._wallet = wallet;
        this._id = id;
    }
    static createFromJSON(JSON) {
        return new User(JSON.id, JSON.name, JSON.age, Wallet_1.Wallet.createFromJSON(JSON.wallet));
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        this._age = value;
    }
    get wallet() {
        return this._wallet;
    }
    set wallet(value) {
        this._wallet = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
}
exports.User = User;
