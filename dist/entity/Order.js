"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const User_1 = require("./User");
class Order {
    constructor(id, price, isActive, description, client, seller) {
        this._price = price;
        this._description = description;
        this._client = client;
        this._seller = seller;
        this._isActive = isActive;
        this._id = id;
    }
    static createFromJSON(JSON) {
        return new Order(JSON.id, JSON.price, JSON.isActive, JSON.description, User_1.User.createFromJSON(JSON.client), User_1.User.createFromJSON(JSON.seller));
    }
    deal() {
        var _a, _b;
        if (this.isActive && this.seller && this.client && ((_a = this.client) === null || _a === void 0 ? void 0 : _a.wallet.money) > this.price) {
            (_b = this.client) === null || _b === void 0 ? void 0 : _b.wallet.pay(this.price, this.seller);
            this._isActive = false;
            console.info("Deal complete successfully");
        }
        else {
            console.info("Deal is finished");
        }
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get isActive() {
        return this._isActive;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get client() {
        return this._client;
    }
    set client(value) {
        this._client = value;
    }
    get seller() {
        return this._seller;
    }
    set seller(value) {
        this._seller = value;
    }
}
exports.Order = Order;
