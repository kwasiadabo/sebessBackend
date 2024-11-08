const swaggerJSDoc = require('swagger-jsdoc');


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EASS SMS API',
      version: '1.0.0',
      description: 'API documentation for School SMS',
    },
  },
  apis: ['./startup/routes/smsFetch.js'], // Path to the API routes
  //apis: ['./api/*.js']
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;