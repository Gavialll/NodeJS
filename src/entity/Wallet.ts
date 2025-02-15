import { User } from "./User";

export class Wallet {
    private _money: number;

    constructor(money: number) {
        this._money = money;
    }

    static createFromJSON(JSON: any): Wallet {
        return new Wallet(JSON.money);
    }

    get money(): number {
        return this._money;
    }

    set money(value: number) {
        this._money = value;
    }

    pay(paymentSum: number, receiver: User) {
        this.spendMoney(paymentSum);
        receiver.wallet.addMoney(paymentSum)
    }

    addMoney(addMoney: number) {
        this.money += addMoney;
    }

    spendMoney(spendMoney: number) {
        this.money -= spendMoney
    }
}