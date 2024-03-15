"use strict";

const amqp = require("amqplib");

async function consumer() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queueName = "task_queue";
  await channel.assertQueue(queueName, { durable: true });

  for (let i = 0; i < 10; i++) {
    console.log(`Sending message ${i}`);
    await channel.sendToQueue(queueName, Buffer.from(`Message ${i}`), {
      persistent: true,
    });
  }

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 1000);
}

consumer();
