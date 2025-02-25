import { Order } from "../entity/Order";
import { orderRepository } from "../repository/OrderRepository";

const orderRoutes = require("express").Router();
const ORDER_NOT_FOUND = '⛔ Order not found'
const DEAL_SUCCESSFUL = '🤝 Deal successful'
const DEAL_IS_CLOSE = '⛔ Deal is close'
const NOT_ENOUGH_BALANCE = '💳 Not enough balance'
const ERROR_CREATION = '❌ Error creating user'

/** 💾 Save order */
orderRoutes.post("/", (req: any, res: any) => {
    orderRepository.saveOrder(Order.createFromJSON(req.body))
        .then(result => {
            if (result) {
                res.status(201).json(result.toJSON());
            } else {
                res.status(400).json(ERROR_CREATION);
            }
        })
});

/** 🔄 Update order */
orderRoutes.put("/", (req: any, res: any) => {
    orderRepository.updateOrder(req.body).then(result => {
        if (result) {
            res.status(200).json(result);
        }
    }).catch((error) => {
        if (error.type === 'NotFound') {
            res.status(404).json(ORDER_NOT_FOUND);
        } else {
            res.status(400).json(error)
        }
    });
});

/** 📋 Get all orders */
orderRoutes.get("/", (req: any, res: any) => {
    orderRepository.getOrders(req.query.page, req.query.pageSize).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json(ORDER_NOT_FOUND);
        }
    })
});

/** 🔍 Get order by ID */
orderRoutes.get("/:id", (req: any, res: any) => {
    orderRepository.getOrderById(req.params.id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json(ORDER_NOT_FOUND);
        }
    }).catch((error) => {
        res.status(500).json("Internal server error");
    });
});

/** 🔍 Search order */
orderRoutes.post("/_search", (req: any, res: any) => {
    orderRepository.searchOrder(req.query.description).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json(ORDER_NOT_FOUND);
        }
    })
});

/** 🗑️ Delete order by ID */
orderRoutes.delete("/:id", (req: any, res: any) => {
    orderRepository.deleteOrderById(req.params.id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json(ORDER_NOT_FOUND);
        }
    })
});

/** 🤝 Deal order by ID */
orderRoutes.post("/deal/:id", (req: any, res: any) => {
    orderRepository.getOrderById(req.params.id).then(result => {
            const order = result as Order;
            if (order && order.seller && order.client?.wallet) {
                // Don't have a money
                if (order.price >= order.client?.wallet?.money) {
                    res.status(400).json(NOT_ENOUGH_BALANCE);
                    return;
                }

                if (order.isActive) {
                    order.deal()
                    res.status(200).json(DEAL_SUCCESSFUL);
                } else {
                    res.status(400).json(DEAL_IS_CLOSE);
                }
            }
            return;
        }).catch(error => {
                res.status(400).json(error);
        })
});

module.exports = orderRoutes;