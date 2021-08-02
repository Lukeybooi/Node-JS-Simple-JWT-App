const {
  GENERAL_ERR_MSG,
  SWAGGER_OPITONS,
  SWAGGER_URL,
} = require("../app-constants");
const { initMongoose } = require("../utils");
const express = require("express");
const httpErrors = require("http-errors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const init = (app) => {
  require("dotenv").config();
  initMongoose();

  app.use(express.json());
};

const middleware = (app) => {
  app.use(async (req, res, next) => next(httpErrors.NotFound()));

  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      error: {
        status: err.status || 500,
        message: err.message || GENERAL_ERR_MSG,
      },
    });
  });
};

const swaggerInit = (app) => {
  const specs = swaggerJsDoc(SWAGGER_OPITONS);

  app.use(SWAGGER_URL, swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = { init, middleware, swaggerInit };
