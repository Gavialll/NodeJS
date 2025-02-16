import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('products', (table) => {
        table.uuid('id')
            .primary()
            .defaultTo(knex.raw('gen_random_uuid()'));
        table.decimal('price', 10, 2)
            .notNullable();
        table.string('description')
            .notNullable();
        table.uuid('client_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.uuid('seller_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.boolean('is_active')
            .defaultTo(true);
        table.timestamp('created_at')
            .defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('products');
}