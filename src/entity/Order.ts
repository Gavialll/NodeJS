import { Model } from 'objection';
import { User } from './User';
import '../../db';

export class Order extends Model {
    static get tableName() {
        return 'orders';
    }

    static get idColumn() {
        return 'id';
    }

    id!: string;
    price!: number;
    isActive!: boolean;
    description!: string;
    client?: User;
    seller?: User;

    static relationMappings = {
        client: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'orders.clientId',
                to: 'users.id'
            }
        },
        seller: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'orders.sellerId',
                to: 'users.id'
            }
        }
    };

    static createFromJSON(json: any): Order {
        return new Order().$set({
            id: json.id,
            price: parseInt(json.price),
            isActive: json.isActive,
            description: json.description,
            clientId: json.client?.id,
            sellerId: json.seller?.id,
        });
    }

    async deal(): Promise<void> {
        if (this.isActive && this.client && this.seller && this.client.wallet && this.client.wallet.money > this.price) {
            await this.client.wallet.$query().patch({
                money: this.client.wallet.money - this.price
            });

            await this.seller.wallet?.$query().patch({
                money: this.seller.wallet.money + this.price
            });

            await this.$query().patch({ isActive: false });

            console.info("✅ Deal completed successfully");
        } else {
            console.info("❌ Deal could not be completed");
        }
    }
}
