import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',       // Логін для БД
    host: 'localhost',      // Адреса сервера PostgreSQL (або 'postgres', якщо в Docker Compose)
    database: 'mydatabase', // Назва бази даних
    password: 'postgres',   // Пароль
    port: 5432,             // Порт PostgreSQL
});

export async function checkConnectionPostgreSQL() {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT NOW()');
        console.log('✅  Connected to PostgreSQL:", Current time:', res.rows[0].now);
        client.release();
    } catch (err) {
        console.error('❌ PostgreSQL connection failed:', err);
    }
}

export default pool;
