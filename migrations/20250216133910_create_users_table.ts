import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('users', (table) => {
            table.uuid('id')
                .primary()
                .defaultTo(knex.raw('gen_random_uuid()'));
            table.string('name')
                .notNullable();
            table.integer('age')
                .notNullable();
            table.timestamp('created_at')
                .defaultTo(knex.fn.now());
        })
        .createTable('wallets', (table) => {
            table.uuid('id')
                .primary()
                .defaultTo(knex.raw('gen_random_uuid()'));
            table.uuid('user_id')
                .notNullable()
                .unique()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');
            table.integer('money')
                .notNullable()
                .defaultTo(0)
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
}

export async function down(knex: Knex): Promise<void> {
    // Відкочує зміни зроблені в останній міграції
    return knex.schema
        .dropTableIfExists('wallets')
        .dropTableIfExists('users');
}
