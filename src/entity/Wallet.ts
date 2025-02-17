import { Model } from 'objection';
import '../../db';

export class Wallet extends Model {
    static get tableName() {
        return 'wallets';
    }

    static get idColumn() {
        return 'id';
    }

    money!: number; // Поле для збереження балансу

    static createFromJSON(json: any): Wallet {
        return new Wallet().$set(json);
    }
}
