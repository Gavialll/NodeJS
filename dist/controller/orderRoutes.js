"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderServiceImpl_1 = require("../service/impl/OrderServiceImpl");
const Order_1 = require("../entity/Order");
const UserServiceImpl_1 = require("../service/impl/UserServiceImpl");
const orderRoutes = require("express").Router();
const SAVE_SUCCESSFUL = '💾 Save successful';
const UPDATE_SUCCESSFUL = '🔄 Update successful';
const ORDER_NOT_FOUND = '⛔ Order not found';
const ORDER_DONT_HAVE_CLIENT = '⛔ Order don\'t have client or seller for deal';
const DELETE_SUCCESSFUL = '🗑️ Delete successful';
const DEAL_SUCCESSFUL = '🤝 Deal successful';
const DEAL_IS_CLOSE = '⛔ Deal is close';
const NOT_ENOUGH_BALANCE = '💳 Not enough balance';
/** 💾 Save order */
orderRoutes.post("/", (req, res) => {
    let order = req.body;
    OrderServiceImpl_1.orderService.saveOrder(order);
    res.status(201).json(SAVE_SUCCESSFUL);
});
/** 🔄 Update order */
orderRoutes.put("/", (req, res) => {
    OrderServiceImpl_1.orderService.updateOrder(req.body)
        .then(response => {
        res.status(200).json(UPDATE_SUCCESSFUL);
    }).catch(error => {
        if (error.meta.statusCode === 404) {
            res.status(404).json(ORDER_NOT_FOUND);
        }
        else {
            res.status(400).json(error);
        }
    });
});
/** 📋 Get all orders. Pagination params ?page=1&pageSize=10 */
orderRoutes.get("/", (req, res) => {
    let page = 1;
    let pageSize = 3;
    if (req.query.page)
        page = req.query.page;
    if (req.query.pageSize)
        pageSize = req.query.pageSize;
    OrderServiceImpl_1.orderService.getOrders(page, pageSize)
        .then(orders => {
        res.json(orders);
    });
});
/** 🔍 Get order by ID */
orderRoutes.get("/:id", (req, res) => {
    var _a;
    (_a = OrderServiceImpl_1.orderService.getOrderById(req.params.id)) === null || _a === void 0 ? void 0 : _a.then(order => {
        res.json(order);
    }).catch(error => {
        if (error.meta.statusCode === 404) {
            res.status(404).json(ORDER_NOT_FOUND);
        }
        else {
            res.status(400).json(error);
        }
    });
});
/** 🔍 Search order */
orderRoutes.post("/_search", (req, res) => {
    var _a;
    (_a = OrderServiceImpl_1.orderService.searchUser(req.query.description)) === null || _a === void 0 ? void 0 : _a.then(description => {
        res.json(description);
    }).catch(error => {
        res.status(400).json(error);
    });
});
/** 🗑️ Delete order by ID */
orderRoutes.delete("/:id", (req, res) => {
    OrderServiceImpl_1.orderService.deleteOrderById(req.params.id)
        .then(() => res.status(200).json(DELETE_SUCCESSFUL))
        .catch(error => {
        if (error.meta.statusCode === 404) {
            res.status(404).json(ORDER_NOT_FOUND);
        }
        else {
            res.status(400).json(error);
        }
    });
});
/** 🤝 Deal order by ID */
orderRoutes.post("/deal/:id", (req, res) => {
    OrderServiceImpl_1.orderService.getOrderById(req.params.id)
        .then(el => {
        let order = Order_1.Order.createFromJSON(el);
        if (order.client !== undefined && order.seller !== undefined) {
            // Don't have a money
            if (order.price >= order.client.wallet.money) {
                res.status(400).json(NOT_ENOUGH_BALANCE);
                return;
            }
            if (order.isActive) {
                // Deal is active
                order.deal();
                UserServiceImpl_1.userService.updateUser(order.seller);
                UserServiceImpl_1.userService.updateUser(order.client);
                OrderServiceImpl_1.orderService.updateOrder(order);
                res.status(200).json(DEAL_SUCCESSFUL);
            }
            else {
                // Deal is finished
                res.status(400).json(DEAL_IS_CLOSE);
            }
            return;
        }
        else {
            res.status(404).json(ORDER_DONT_HAVE_CLIENT);
        }
        return;
    }).catch(error => {
        if (error.meta.statusCode === 404) {
            res.status(404).json(ORDER_NOT_FOUND);
        }
        else {
            res.status(400).json(error);
        }
    });
});
module.exports = orderRoutes;
