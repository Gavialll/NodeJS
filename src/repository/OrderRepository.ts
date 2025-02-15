import {DeleteResponse, UpdateResponse} from "@elastic/elasticsearch/lib/api/types";
import {Order} from "../entity/Order";

export interface OrderRepository {
    getOrders(page: number, pageSize: number | undefined): Promise<void | Order[]>

    getOrderById(id: string): Promise<Order>

    searchOrder(description: string): Promise<Order[]>

    updateOrder(order: Order): Promise<UpdateResponse>

    saveOrder(order: Order): void

    deleteOrderById(id: string): Promise<DeleteResponse>;
}