import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
     await addUsers(knex);
     await addOrders(knex);
}

async function addUsers(knex: Knex): Promise<void> {
    console.log('🔄 Inserting test users');

    // Видаляємо старі записи.
    await knex('users').del();
    await knex('wallets').del();

    // Додаємо користувачів
    const users = await knex('users')
        .insert([
            { name: 'Andrii', age: 24 },
            { name: 'Oksana', age: 30 },
            { name: 'Ivan', age: 28 }
        ])
        .returning('*'); // Повертає всі додані записи (з їх id)

    console.log('🔄 Inserting wallets for users...');
    // Додаємо гаманці для кожного користувача
    await knex('wallets').insert([
        { user_id: users[0].id, money: 7000 },
        { user_id: users[1].id, money: 15000 },
        { user_id: users[2].id, money: 5000 }
    ]);

    console.log('✅ Wallets added!');
    console.log('✅ Users added:', users);
}

async function addOrders(knex: Knex): Promise<void> {
    console.log('🔄 Deleting existing orders...');
    // Видаляємо старі записи.
    await knex('products').del();

    // Отримуємо двох випадкових користувачів
    const users = await knex('users').select('id').limit(2);

    if (users.length < 2) {
        console.error('❌ Not enough users in database!');
        return;
    }

    console.log('🔄 Inserting test orders');
    const orders = await knex('products').insert([
        {
            price: 1000,
            description: '💻 Ноутбук Dell XPS 123456',
            client_id: users[0].id,
            seller_id: users[1].id,
            is_active: true,
        },
        {
            price: 1500,
            description: '📱 iPhone 13 Pro',
            client_id: users[1].id,
            seller_id: users[0].id,
            is_active: true,
        },
        {
            price: 800,
            description: '🎧 AirPods Pro',
            client_id: users[0].id,
            seller_id: users[1].id,
            is_active: false,
        }
    ]).returning('*'); // Повертає всі додані записи (з їх id)

    console.log('✅ Orders added successfully!', orders);
}