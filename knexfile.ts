import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            user: 'postgres',       // Логін для БД
            host: 'postgres',
            database: 'mydatabase', // Назва бази
            password: 'postgres',   // Пароль
            port: 5432,             // Порт PostgreSQL
        },
        migrations: {
            directory: './migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },
};

export default config;
