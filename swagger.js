const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'A simple Express API with Swagger integration for documentation.',
  },
  servers: [
    {
      url: 'http://localhost:3000', 
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', 
        description: 'Provide your Bearer token in the format: Bearer <your_token>',
      },
    },
    schemas: {
      Task: {
        type: 'object',
        properties: {
          task: {
            type: 'string',
            description: 'The name of the task',
          },
          description: {
            type: 'string',
            description: 'The description of the task',
          },
          completed: {
            type: 'boolean',
            default: false,
            description: 'Whether the task is completed or not',
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            description: 'The user\'s username',
          },
          email: {
            type: 'string',
            description: 'The user\'s email',
          },
          password: {
            type: 'string',
            description: 'The user\'s password',
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [], 
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], 
};


const swaggerSpec = swaggerJSDoc(options);


const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;