const swaggerJSDoc = require('swagger-jsdoc'); //Para generar un documento de Swagger

//Swagger
const options = {
    swaggerDefinition : { 
      openapi: '3.0.0',
      info: {
        title: 'TFG Blockchain Swagger',
        version: '1.0.0',
        description: 'Este documento contiene los endpoints de la API del Servidor de forma que queden explicados y registrados.',
        license: {
          name: 'Licencia GPL',
          url: 'https://www.gnu.org/licenses/gpl-3.0.html',
        },
        termsOfService: 'https://localhost/3000/tos',
        contact: {
          name: 'Soporte Proyecto',
          email: 'tfg.blockchain@gmail.com'
        },
      },
      servers: [
        {
          url: 'http://localhost:' +`${process.env.PORT}`,
          description: 'Servidor de la app',
        },
      ],
      components: {
        securitySchemes: {
          ApiKeyAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid'
          }
        }
      },
    },
    // Paths to files containing OpenAPI definitions
    apis: ['./index.js'],
  };
  
  const swaggerSpecification = swaggerJSDoc(options);
  module.exports = swaggerSpecification;
