require("dotenv").config();

const OPTIONS = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "JWT API",
      version: "1.0.0",
      description: "A simple JWT login system",
    },
    servers: [{ url: process.env.URL }],
  },
  apis: ["./swagger-schemas/*.js"],
};

module.exports = OPTIONS;
