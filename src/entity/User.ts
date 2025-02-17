import { Model } from 'objection';
import { Wallet } from './Wallet';
import '../../db';

export class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return 'id';
    }

    id!: string;
    name!: string;
    age!: number;
    wallet?: Wallet;

    static createFromJSON(json: any): User {
        return new User().$set({
            id: json.id,
            name: json.name,
            age: parseInt(json.age),
            wallet: json.wallet ? Wallet.createFromJSON(json.wallet) : undefined,
        });
    }

    static relationMappings = {
        wallet: {
            relation: Model.HasOneRelation,
            modelClass: Wallet,
            join: {
                from: 'users.id',
                to: 'wallets.user_id'
            }
        }
    };
}
