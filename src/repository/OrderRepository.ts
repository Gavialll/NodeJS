import { Order } from "../entity/Order";

class OrderRepository {

    /** 📋 Get all orders */
    async getOrders(page: number = 1, pageSize: number = 10): Promise<Order[]> {
        const offset = (page - 1) * pageSize;
        return Order.query()
            .limit(pageSize)
            .offset(offset);
    }

    /** 🔍 Get order by ID */
    async getOrderById(id: string): Promise<Order | unknown> {
        return await Order.query().findById(id).withGraphFetched('[seller.wallet, client.wallet,]')
    }

    /** 🔍 Search order */
    async searchOrder(description: string): Promise<Order[]> {
        return await Order.query()
            .where('description', 'ILIKE', `%${description}%`)
            .withGraphFetched('[seller, client]');
    }

    /** 🔄 Update order */
    async updateOrder(order: Order): Promise<Order> {
        return Order.query().upsertGraph(order, {
            relate: true,  // Якщо зв’язок існує, оновлюємо, а не створюємо новий
            noDelete: true // Забороняє видалення існуючих записів
        })
    }

    /** 💾 Save order */
    async saveOrder(order: Order): Promise<Order> {
        const newOrder = await Order.query()
            .insertGraph(order)
            .returning('*');

        return newOrder;
    }

    /** 🗑️ Delete order by ID */
    async deleteOrderById(id: string): Promise<boolean> {
        return await Order.query().deleteById(id) > 0;
    }
}

export const orderRepository = new OrderRepository();
