"use strict";

const redis = require("redis");

class RedisPubSub {
  constructor() {
    this.pub = redis.createClient();
    this.sub = redis.createClient();
  }

  publish(channel, message) {
    return this.pub.publish(channel, message);
  }

  subscribe(channel, callback) {
    this.sub.subscribe(channel);
    this.sub.on("message", callback);
  }
}

module.exports = { RedisPubSub };
