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
exports.client = void 0;
exports.checkConnection = checkConnection;
exports.ensureUserIndexExists = ensureUserIndexExists;
exports.ensureOrderIndexExists = ensureOrderIndexExists;
/** ElasticSearch client */
const elasticsearch_1 = require("@elastic/elasticsearch");
exports.client = new elasticsearch_1.Client({
    node: "http://localhost:9200"
});
let USER_INDEX_NAME = "users";
let ORDER_INDEX_NAME = "orders";
/** Checking connection */
function checkConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const health = yield exports.client.cluster.health();
            console.log("✅ Connected to ElasticSearch:", health);
        }
        catch (error) {
            console.error("❌ ElasticSearch connection failed:", error);
        }
    });
}
/** Add user mapping if not exists */
function ensureUserIndexExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const exists = yield exports.client.indices.exists({ index: USER_INDEX_NAME });
            if (!exists) {
                yield exports.client.indices.create({
                    index: USER_INDEX_NAME,
                    body: {
                        settings: {
                            number_of_shards: 1,
                            number_of_replicas: 1
                        },
                        mappings: {
                            properties: {
                                name: { type: "text" },
                                age: { type: "integer" },
                                wallet: {
                                    properties: {
                                        money: { type: "double" }
                                    }
                                }
                            }
                        }
                    }
                });
                console.info(`✅ Index "${USER_INDEX_NAME}" created successfully.`);
            }
            else {
                console.warn(`⚠️ Index "${USER_INDEX_NAME}" already exists.`);
            }
        }
        catch (error) {
            console.error(`❌ Error checking / creating index "${USER_INDEX_NAME}":`, error);
        }
    });
}
/** Add order mapping if not exists */
function ensureOrderIndexExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const exists = yield exports.client.indices.exists({ index: ORDER_INDEX_NAME });
            if (!exists) {
                yield exports.client.indices.create({
                    index: ORDER_INDEX_NAME,
                    body: {
                        settings: {
                            number_of_shards: 1,
                            number_of_replicas: 1
                        },
                        mappings: {
                            properties: {
                                id: { type: "integer" },
                                isActive: { type: "boolean" },
                                price: { type: "double" },
                                description: { type: "text" },
                                client: {
                                    properties: {
                                        id: { type: "text" }
                                    }
                                },
                                seller: {
                                    properties: {
                                        id: { type: "text" }
                                    }
                                }
                            }
                        }
                    }
                });
                console.info(`✅ Index "${ORDER_INDEX_NAME}" created successfully.`);
            }
            else {
                console.info(`⚠️ Index "${ORDER_INDEX_NAME}" already exists.`);
            }
        }
        catch (error) {
            console.error(`❌ Error checking / creating index "${ORDER_INDEX_NAME}":`, error);
        }
    });
}
