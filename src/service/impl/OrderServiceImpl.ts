import { Order } from "../../entity/Order";
import { OrderService } from "../OrderService";
import { orderRepository } from "../../repository/impl/OrderRepositoryImpl";
import { DeleteResponse, UpdateResponse } from "@elastic/elasticsearch/lib/api/types";

class OrderServiceImpl implements OrderService {

    /** 📋 Get all orders */
    getOrders(page: number, pageSize: number | undefined): Promise<void | Order[]> {
        return orderRepository.getOrders(page, pageSize);
    }

    /** 🔍 Get order by ID */
    getOrderById(id: string): Promise<Order> {
        return orderRepository.getOrderById(id)
    }

    /** 🔍 Search user by name */
    searchUser(description: string): Promise<Order[]> {
        return orderRepository.searchOrder(description);
    }

    /** 🔄 Update order */
    updateOrder(order: Order): Promise<UpdateResponse> {
        return orderRepository.updateOrder(order);
    }

    /** 💾 Save order */
    saveOrder(order: Order) {
        return orderRepository.saveOrder(order);
    }

    /** 🗑️ Delete order by ID */
    deleteOrderById(id: string): Promise<DeleteResponse> {
        return orderRepository.deleteOrderById(id)
    }
}

export const orderService = new OrderServiceImpl();