import {makeRequest} from "./restClient";

describe('🔍 Інтеграційний тест /api/users', () => {
    let userJson: any;
    beforeAll(async () => {
        // Додати користувача до бази через POST-запит
        let response = await makeRequest('POST', '/api/users',
            {
                "name": "Ivan",
                "age": 24,
                "wallet": {
                    "money": 7000
                }
            });

        if (response.statusCode === 201 && response.data.id) {
            userJson = response.data; // Зберігаємо створеного користувача для подальшого порівняння
        } else {
            throw new Error('Не вдалося створити користувача');
        }
    });

    afterAll(async () => {
        // Видаляємо користувача після тесту
        await makeRequest('DELETE', '/api/users/' + userJson.id);
    });

    it('Повертає користувача по ID', async () => {
        const response = await makeRequest('GET', '/api/users/' + userJson.id);

        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual(userJson);
    });

    it('Пошук користувача по імені', async () => {
        const response = await makeRequest('POST', '/api/users/_search?name=' + userJson.name);

        expect(response.statusCode).toBe(200);
        expect(response.data[0].name).toEqual(userJson.name);
        expect(response.data[0].age).toEqual(userJson.age);
    });

    it('Оновлення користувача', async () => {
        userJson.name = "Name changed"
        userJson.age = 41
        userJson.wallet.money = 8000
        const response = await makeRequest('PUT', '/api/users', userJson);

        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual(userJson);
    });

    it('Оновлення неіснуючого користувача', async () => {
        userJson.id = "27aaa3f6-e6e1-40a9-a65b-8a4345930477"
        const response = await makeRequest('PUT', '/api/users', userJson);

        expect(response.statusCode).toBe(404);
        expect(response.data).toEqual('⛔ User not found');
    });

    it('Помилку для неіснуючого користувача', async () => {
        const response = await makeRequest('GET', '/api/users/27aaa3f6-e6e1-40a9-a65b-8a4345930477');

        expect(response.statusCode).toBe(404);
        expect(response.data).toEqual('⛔ User not found');
    });

    it('Помилка при неправильному форматі ID', async () => {
        const response = await makeRequest('GET', '/api/users/invalid-id');

        expect(response.statusCode).toBe(500);
        expect(response.data).toEqual('Internal server error');
    });
});
