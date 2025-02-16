/** ElasticSearch client */
import { Client } from "@elastic/elasticsearch";

export const client = new Client({
    node: "http://elasticsearch:9200"
});

let USER_INDEX_NAME = "users"
let ORDER_INDEX_NAME = "orders"

/** Checking connection */
export async function checkConnectionElasticSearch() {
    try {
        const health = await client.cluster.health();
        console.log("✅ Connected to ElasticSearch:", health);
    } catch (error) {
        console.error("❌ ElasticSearch connection failed:", error);
    }
}

/** Add user mapping if not exists */
export async function ensureUserIndexExists() {
    try {
        const exists = await client.indices.exists({ index: USER_INDEX_NAME });
        if (!exists) {
            await client.indices.create({
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
        } else {
            console.warn(`⚠️ Index "${USER_INDEX_NAME}" already exists.`);
        }
    } catch (error) {
        console.error(`❌ Error checking / creating index "${USER_INDEX_NAME}":`, error);
    }
}

/** Add order mapping if not exists */
export async function ensureOrderIndexExists() {
    try {
        const exists = await client.indices.exists({ index: ORDER_INDEX_NAME });
        if (!exists) {
            await client.indices.create({
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
        } else {
            console.info(`⚠️ Index "${ORDER_INDEX_NAME}" already exists.`);
        }
    } catch (error) {
        console.error(`❌ Error checking / creating index "${ORDER_INDEX_NAME}":`, error);
    }
}