import { makeRequest } from "./restClient";

describe('🔍 Інтеграційний тест /api/orders', () => {
    let orderJson: any;
    beforeAll(async () => {
        // Додати користувача до бази через POST-запит
        let client = await makeRequest('POST', '/api/users',
            {
                "name": "Client",
                "age": 24,
                "wallet": {
                    "money": 7500
                }
            });
        let seller = await makeRequest('POST', '/api/users',
            {
                "name": "Seller",
                "age": 25,
                "wallet": {
                    "money": 0
                }
            });

        let response = await makeRequest('POST', '/api/orders',
            {
                "price": 7000,
                "description": "Ноутбук",
                "client": {
                    "id": client.data.id
                },
                "seller": {
                    "id": seller.data.id
                },
                "is_active": true
            });


        if (response.statusCode === 201 && response.data.id) {
            orderJson = response.data; // Зберігаємо створене замовлення для подальшого порівняння
        } else {
            throw new Error('Не вдалося створити замовлення');
        }
    });

    afterAll(async () => {
        // Видаляємо користувача після тесту
        await makeRequest('DELETE', '/api/orders/' + orderJson.id);
        await makeRequest('DELETE', '/api/users/' + orderJson.clientId);
        await makeRequest('DELETE', '/api/users/' + orderJson.sellerId);
    });

    it('Повертає замовлення по ID', async () => {
        const response = await makeRequest('GET', '/api/orders/' + orderJson.id);

        expect(response.statusCode).toBe(200);
        expect(response.data.id).toEqual(orderJson.id);
        expect(response.data.clientId).toEqual(orderJson.clientId);
        expect(response.data.sellerId).toEqual(orderJson.sellerId);
        expect(response.data.description).toEqual(orderJson.description);
        expect(response.data.price).toEqual(orderJson.price);
        expect(response.data.isActive).toEqual(orderJson.isActive);
    });

    it('Виконуємо покупку по ID замовлення', async () => {
        let response = await makeRequest('POST', '/api/orders/deal/' + orderJson.id);
        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual("🤝 Deal successful");

        console.log(response)
        response = await makeRequest('POST', '/api/orders/deal/' + orderJson.id);
        expect(response.statusCode).toBe(400);
        expect(response.data).toEqual("💳 Not enough balance");
        console.log(response)
    });

    it('Оновлення замовлення', async () => {
        orderJson.description = "Description changed"
        orderJson.price = 111
        orderJson.isActive = true
        const response = await makeRequest('PUT', '/api/orders', orderJson);

        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual(orderJson);
    });

    it('Оновлення неіснуючого замовлення', async () => {
        orderJson.id = "27aaa3f6-e6e1-40a9-a65b-8a4345930477"
        const response = await makeRequest('PUT', '/api/orders', orderJson);

        expect(response.statusCode).toBe(404);
        expect(response.data).toEqual('⛔ Order not found');
    });

    it('Помилка для неіснуючого замовлення', async () => {
        const response = await makeRequest('GET', '/api/orders/27aaa3f6-e6e1-40a9-a65b-8a4345930477');

        expect(response.statusCode).toBe(404);
        expect(response.data).toEqual('⛔ Order not found');
    });

    it('Помилка при неправильному форматі ID', async () => {
        const response = await makeRequest('GET', '/api/orders/invalid-id');

        expect(response.statusCode).toBe(500);
        expect(response.data).toEqual('Internal server error');
    });
});
