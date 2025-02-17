import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('orders', (table) => {
        table.uuid('id')
            .primary()
            .defaultTo(knex.raw('gen_random_uuid()'));
        table.integer('price')
            .notNullable();
        table.string('description')
            .notNullable();
        table.uuid('clientId')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.uuid('sellerId')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.boolean('isActive')
            .defaultTo(true);
        table.timestamp('createdAt')
            .defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('orders');
}