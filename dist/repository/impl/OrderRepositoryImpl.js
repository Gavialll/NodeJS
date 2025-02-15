"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRepository = void 0;
const UserServiceImpl_1 = require("../../service/impl/UserServiceImpl");
const ElasticSearch_1 = require("../../client/ElasticSearch");
class OrderRepositoryImpl {
    constructor() {
        this.ORDERS_INDEX = "orders";
    }
    /** 📋 Get all orders */
    getOrders(page, pageSize) {
        if (pageSize === undefined)
            pageSize = 3;
        const from = (page - 1) * pageSize;
        return ElasticSearch_1.client.search({
            index: this.ORDERS_INDEX,
            from: from,
            size: pageSize,
            track_total_hits: true,
            query: {
                match_all: {}
            }
        }).then(response => {
            return Promise.all(response.hits.hits.map((hit) => __awaiter(this, void 0, void 0, function* () {
                let order = hit._source;
                if (typeof hit._id === "string")
                    order.id = hit._id;
                let clientId = order.client;
                let sellerId = order.seller;
                let [client, seller] = yield Promise.all([
                    UserServiceImpl_1.userService.getUserById(clientId.id),
                    UserServiceImpl_1.userService.getUserById(sellerId.id)
                ]);
                order.client = client;
                order.seller = seller;
                return order;
            })));
        });
    }
    /** 🔍 Get order by ID */
    getOrderById(id) {
        return ElasticSearch_1.client.get({
            index: this.ORDERS_INDEX,
            id: id
        }).then((el) => __awaiter(this, void 0, void 0, function* () {
            let order = el._source;
            order.id = el._id;
            let [client, seller] = yield Promise.all([
                UserServiceImpl_1.userService.getUserById(order.client.id),
                UserServiceImpl_1.userService.getUserById(order.seller.id)
            ]);
            order.client = client;
            order.seller = seller;
            return order;
        }));
    }
    /** 🔍 Search order by description */
    searchOrder(description) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield ElasticSearch_1.client.search({
                index: this.ORDERS_INDEX,
                query: {
                    query_string: {
                        query: `*${description}*`,
                        fields: ["description"],
                        default_operator: "AND"
                    }
                }
            });
            return response.hits.hits.map((hit) => hit._source);
        });
    }
    /** 🔄 Update order */
    updateOrder(order) {
        const document = {
            description: order.description,
            price: order.price,
            isActive: order.isActive,
            client: order.client,
            seller: order.seller
        };
        return ElasticSearch_1.client.update({
            index: this.ORDERS_INDEX,
            id: order.id,
            doc: document
        });
    }
    /** 💾 Save order */
    saveOrder(order) {
        const document = {
            description: order.description,
            price: order.price,
            isActive: order.isActive,
            client: order.client,
            seller: order.seller
        };
        ElasticSearch_1.client.index({
            index: this.ORDERS_INDEX,
            document: document
        });
    }
    /** 🗑️ Delete order by ID */
    deleteOrderById(id) {
        return ElasticSearch_1.client.delete({
            index: this.ORDERS_INDEX,
            id: id
        });
    }
}
exports.orderRepository = new OrderRepositoryImpl();
