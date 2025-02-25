import amqp from 'amqplib';

export async function consumeMessages(): Promise<void> {
    try {
        // Підключення до RabbitMQ
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        // Створення черги
        const queue = 'test_queue';
        await channel.assertQueue(queue, { durable: true });

        console.log('🔔 Очікування повідомлень...');

        // Обробка повідомлень
        channel.consume(queue, (message) => {
            if (message !== null) {
                const receivedMessage = JSON.parse(message.content.toString());
                console.log('📥 Отримано повідомлення:', receivedMessage);

                // Підтвердження обробки
                channel.ack(message);
            }
        });
    } catch (error) {
        console.error('❌ Помилка отримання повідомлень:', error);
    }
}
