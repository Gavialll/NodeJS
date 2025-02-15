"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const OrderRepositoryImpl_1 = require("../../repository/impl/OrderRepositoryImpl");
class OrderServiceImpl {
    /** 📋 Get all orders */
    getOrders(page, pageSize) {
        return OrderRepositoryImpl_1.orderRepository.getOrders(page, pageSize);
    }
    /** 🔍 Get order by ID */
    getOrderById(id) {
        return OrderRepositoryImpl_1.orderRepository.getOrderById(id);
    }
    /** 🔍 Search user by name */
    searchUser(description) {
        return OrderRepositoryImpl_1.orderRepository.searchOrder(description);
    }
    /** 🔄 Update order */
    updateOrder(order) {
        return OrderRepositoryImpl_1.orderRepository.updateOrder(order);
    }
    /** 💾 Save order */
    saveOrder(order) {
        return OrderRepositoryImpl_1.orderRepository.saveOrder(order);
    }
    /** 🗑️ Delete order by ID */
    deleteOrderById(id) {
        return OrderRepositoryImpl_1.orderRepository.deleteOrderById(id);
    }
}
exports.orderService = new OrderServiceImpl();
