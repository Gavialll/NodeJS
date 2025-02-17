import { Knex } from 'knex';
import {fa, faker} from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
    // Видаляємо всі старі записи
    await knex('orders').del();
    await knex('users').del();

    // 🟢 Створюємо 30 користувачів
    const users = [];
    const wallets = [];
    for (let i = 0; i < 30; i++) {
        const userId = faker.string.uuid();

        users.push({
            id: userId,
            name: faker.person.fullName(),
            age: faker.number.int({ min: 18, max: 60 }),
        });

        wallets.push({
            id: faker.string.uuid(),
            user_id: userId, // Зв’язок `wallet` з користувачем
            money: faker.number.int({ min: 100, max: 10000 }), // Випадкова сума
        });
    }

    // Додаємо користувачів у БД
    await knex('users').insert(users);

    // Додаємо гаманці в БД
    await knex('wallets').insert(wallets);

    // 🟢 Створюємо 30 замовлень, випадково вибираючи `client` та `seller`
    const orders = [];
    for (let i = 0; i < 30; i++) {
        const client = faker.helpers.arrayElement(users);
        let seller = faker.helpers.arrayElement(users);

        // Переконуємось, що `client` і `seller` — різні користувачі
        while (client.id === seller.id) {
            seller = faker.helpers.arrayElement(users);
        }

        orders.push({
            id: faker.string.uuid(),
            price: faker.number.int({ min: 100, max: 5000 }),
            description: faker.commerce.productDescription(),
            isActive: faker.datatype.boolean(),
            clientId: client.id,
            sellerId: seller.id,
        });
    }

    // Додаємо замовлення у БД
    await knex('orders').insert(orders);

    console.log('✅ Seed completed: 30 users, 30 wallets, and 30 orders added.');
}
