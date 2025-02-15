import { DeleteResponse, UpdateResponse } from "@elastic/elasticsearch/lib/api/types";
import { Order } from "../../entity/Order";
import { OrderRepository } from "../OrderRepository";
import { userService } from "../../service/impl/UserServiceImpl";
import { client } from "../../client/ElasticSearch";
import { User } from "../../entity/User";

class OrderRepositoryImpl implements OrderRepository {

    private ORDERS_INDEX: string = "orders"

    /** 📋 Get all orders */
    getOrders(page: number, pageSize: number | undefined): Promise<void | Order[]> {
        if (pageSize === undefined) pageSize = 3
        const from = (page - 1) * pageSize;
        return client.search<Order>({
                index: this.ORDERS_INDEX,
                from: from,
                size: pageSize,
                track_total_hits: true,
                query: {
                    match_all: {}
                }
            }).then(response => {
                return Promise.all(response.hits.hits.map(async hit => {
                    let order = hit._source as Order;
                    if (typeof hit._id === "string") order.id = hit._id;

                    let clientId = order.client as User;
                    let sellerId = order.seller as User;

                    let [client, seller] = await Promise.all([
                        userService.getUserById(clientId.id),
                        userService.getUserById(sellerId.id)
                    ]);

                    order.client = client;
                    order.seller = seller;
                    return order;
                }));
            });
    }

    /** 🔍 Get order by ID */
    getOrderById(id: string): Promise<Order> {
        return client.get<Order>(
            {
                index: this.ORDERS_INDEX,
                id: id
            }).then(async el => {
                let order = el._source as Order;
                order.id = el._id;
                let [client, seller] = await Promise.all([
                    userService.getUserById((order.client as User).id),
                    userService.getUserById((order.seller as User).id)
                ])
                order.client = client;
                order.seller = seller;
                return order;
            });
    }

    /** 🔍 Search order by description */
    async searchOrder(description: string): Promise<Order[]> {
        const response = await client.search({
            index: this.ORDERS_INDEX,
            query: {
                query_string: {
                    query: `*${description}*`,
                    fields: ["description"],
                    default_operator: "AND"
                }
            }
        });
        return response.hits.hits.map((hit) => hit._source as Order);
    }

    /** 🔄 Update order */
    updateOrder(order: Order): Promise<UpdateResponse> {
        const document =  {
            description: order.description,
            price: order.price,
            isActive: order.isActive,
            client: order.client,
            seller: order.seller
        }
        return client.update({
            index: this.ORDERS_INDEX,
            id: order.id,
            doc: document
        });
    }

    /** 💾 Save order */
    saveOrder(order: Order): void {
        const document =  {
            description: order.description,
            price: order.price,
            isActive: order.isActive,
            client: order.client,
            seller: order.seller
        }
        client.index({
            index: this.ORDERS_INDEX,
            document: document
        })
    }

    /** 🗑️ Delete order by ID */
    deleteOrderById(id: string): Promise<DeleteResponse> {
        return client.delete({
            index: this.ORDERS_INDEX,
            id: id
        });
    }
}

export const orderRepository = new OrderRepositoryImpl();