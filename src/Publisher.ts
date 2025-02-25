import amqp from 'amqplib';

export async function publishMessage(): Promise<void> {
    try {
        // Підключення до RabbitMQ
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        // Створення черги
        const queue = 'test_queue';
        await channel.assertQueue(queue, { durable: true });

        // Повідомлення
        const message = { text: 'Hello from RabbitMQ with TypeScript!' };

        // Відправлення повідомлення
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
            persistent: true,
        });

        console.log('📤 Повідомлення відправлено:', message);

        // Закриття з'єднання через 0.5 секунди
        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
    } catch (error) {
        console.error('❌ Помилка підключення до RabbitMQ:', error);
    }
}

publishMessage()