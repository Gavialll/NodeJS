import { Wallet } from "./Wallet";
export class User {
    private _id: string
    private _name: string;
    private _age: number;
    private _wallet: Wallet;

    constructor(id: string, name: string, age: number, wallet: Wallet) {
        this._name = name;
        this._age = age;
        this._wallet = wallet;
        this._id = id;
    }

    static createFromJSON(JSON: any): User {
        return new User(JSON.id, JSON.name, JSON.age, Wallet.createFromJSON(JSON.wallet))
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    get wallet(): Wallet {
        return this._wallet;
    }

    set wallet(value: Wallet) {
        this._wallet = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }
}