import amqp from 'amqplib';

// Зберігає ID оброблених повідомлень
const processedMessages = new Set<string>();
// Зберігає оброблені повідомлення
export const messages:string[] = [];

export async function consumeMessages(): Promise<void> {
    try {
        const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();
        const queue = 'deal_queue';

        await channel.assertQueue(queue, { durable: true });
        console.log('🔔 Очікування повідомлень...');

        channel.consume(queue, (message) => {
            if (message !== null) {
                const receivedMessage = JSON.parse(message.content.toString());

                // Перевірка на idempotency
                if (processedMessages.has(receivedMessage.id)) {
                    console.log('⚠️ Повідомлення вже оброблено:', receivedMessage.id);
                    channel.ack(message);
                    return;
                }

                // Обробка нового повідомлення
                console.log('📥 Отримано повідомлення:', receivedMessage);

                // Додати ID повідомлення до списку оброблених
                processedMessages.add(receivedMessage.id);
                messages.push(receivedMessage.text);

                // Підтвердження обробки
                channel.ack(message);
            }
        });
    } catch (error) {
        console.error('❌ Помилка отримання повідомлень:', error);
    }
}