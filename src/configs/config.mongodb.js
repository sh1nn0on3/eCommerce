"use strict";

// const config = {
//   app: {
//     port: 3000,
//   },
//   db: {
//     host: "localhost",
//     port: 27018,
//     name: "shopDev",
//   },
// };

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3000,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27018,
    name: process.env.DEV_DB_NAME || "shopDev",
  },
};

const production = {
  app: {
    port: process.env.PRODUCT_APP_PORT || 3000,
  },
  db: {
    host: process.env.PRODUCT_DB_HOST || "localhost",
    port: process.env.PRODUCT_DB_PORT || 27018,
    name: process.env.PRODUCT_DB_NAME || "shopProd",
  },
};

const config = { dev, production };
const env = process.env.NODE_ENV || "dev";
module.exports = config[env];
