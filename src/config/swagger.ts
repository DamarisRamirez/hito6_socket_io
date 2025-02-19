import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API REST Metropolitalian Clinic",
      version: "1.0.0",
      description: "Documentation for api rest",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1", // URL base de la API
      },
    ],
  },
  apis: ["swagger.yml"],
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;
