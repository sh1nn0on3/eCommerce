"use strict";

const amqp = require("amqplib");

async function consumer() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queueName = "task_queue";
  await channel.assertQueue(queueName, { durable: true });

  channel.prefetch(1);

  channel.consume(queueName, (msg) => {
    const message = msg.content.toString();
    setTimeout(() => {
      console.log(`Received message: ${message}`);
      channel.ack(msg);
    }, Math.random() * 1000);
  });
}

consumer();
