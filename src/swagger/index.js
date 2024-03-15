const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
      description: "Ecommerce API Information",
      contact: {
        name: "Amazing Developer",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["../routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = {
    swaggerSpec,
    swaggerUi
}