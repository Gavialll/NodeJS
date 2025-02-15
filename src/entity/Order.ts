import { User } from "./User";
export class Order {
    private _id: string
    private _isActive: boolean;
    private _price: number;
    private _description: string;
    private _client: User | undefined;
    private _seller: User | undefined;

    constructor(id: string,
                price: number,
                isActive: boolean,
                description: string,
                client?: User,
                seller?: User) {
        this._price = price;
        this._description = description;
        this._client = client;
        this._seller = seller;
        this._isActive = isActive;
        this._id = id;
    }

    static createFromJSON(JSON: any): Order {
        return new Order(JSON.id,
            JSON.price,
            JSON.isActive,
            JSON.description,
            User.createFromJSON(JSON.client),
            User.createFromJSON(JSON.seller))
    }

    deal(): void {
        if (this.isActive && this.seller && this.client && this.client?.wallet.money > this.price) {
            this.client?.wallet.pay(this.price, this.seller)
            this._isActive = false;
            console.info("Deal complete successfully")
        } else {
            console.info("Deal is finished")
        }
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get client(): User | undefined {
        return this._client;
    }

    set client(value: User | undefined) {
        this._client = value;
    }

    get seller(): User | undefined {
        return this._seller;
    }

    set seller(value: User | undefined) {
        this._seller = value;
    }
}