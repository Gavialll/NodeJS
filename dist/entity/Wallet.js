"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
class Wallet {
    constructor(money) {
        this._money = money;
    }
    static createFromJSON(JSON) {
        return new Wallet(JSON.money);
    }
    get money() {
        return this._money;
    }
    set money(value) {
        this._money = value;
    }
    pay(paymentSum, receiver) {
        this.spendMoney(paymentSum);
        receiver.wallet.addMoney(paymentSum);
    }
    addMoney(addMoney) {
        this.money += addMoney;
    }
    spendMoney(spendMoney) {
        this.money -= spendMoney;
    }
}
exports.Wallet = Wallet;
