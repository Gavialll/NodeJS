import amqp from 'amqplib';
import { v4 as uuidv4 } from 'uuid';

let dealChannel:amqp.Channel;

/** Ініціалізує підключення до rabbit */
export async function initPublisherConnection(): Promise<void> {
    try {
        const connection = await amqp.connect('amqp://rabbitmq');
        dealChannel = await connection.createChannel();
        const queue = 'deal_queue';

        await dealChannel.assertQueue(queue, { durable: true });
        console.log('Зєднання встановлено успішно');
    } catch (error) {
        console.error('❌ Помилка підключення до RabbitMQ:', error);
    }
}

/** Відправляє повідомлення в rabbit приймає на вхід повідомлення та чергу в яку потрібно відправити повідомлення */
export function sendMessage(text: string, queue: string) {
    const message = {
        id: uuidv4(),
        text: text,
    };

    dealChannel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
        persistent: true,
    });
}