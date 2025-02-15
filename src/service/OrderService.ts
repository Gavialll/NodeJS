import { Order } from "../entity/Order";
import {DeleteResponse, UpdateResponse} from "@elastic/elasticsearch/lib/api/types";

export interface OrderService {
    getOrders(page: number, pageSize: number | undefined): Promise<void | Order[]>

    getOrderById(id: string): Promise<Order> | undefined

    searchUser(description: string): Promise<Order[]>

    updateOrder(order: Order): Promise<UpdateResponse>

    saveOrder(order: Order): void

    deleteOrderById(id: string): Promise<DeleteResponse>
}