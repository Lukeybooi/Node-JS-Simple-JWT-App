const SWAGGER_OPITONS = require("./swaggeroptions");

const AUTH_URL = "/accounts/auth";
const SWAGGER_URL = "/swagger";

const APP_ACCESS_TOKEN_EXPIRATION = ["15m", 900];
const APP_HEADERS_KEY = "Bearer ";
const APP_HEADERS_NAME = "authorization";
const APP_ISSUER = "Lukeybooi@gmail.com";
const APP_REFRESH_TOKEN_EXPIRATION = ["7d", 604800];

const FAIL_LOGIN_ERR_MSG = "Username/Password is incorrect";
const GENERAL_ERR_MSG = "Internal Server Error";

module.exports = {
  AUTH_URL,
  SWAGGER_URL,
  APP_ACCESS_TOKEN_EXPIRATION,
  APP_HEADERS_KEY,
  APP_HEADERS_NAME,
  APP_ISSUER,
  APP_REFRESH_TOKEN_EXPIRATION,
  FAIL_LOGIN_ERR_MSG,
  GENERAL_ERR_MSG,
  SWAGGER_OPITONS,
};
