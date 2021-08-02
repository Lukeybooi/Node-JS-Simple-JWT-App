const JWT = require("jsonwebtoken");
const httpErrors = require("http-errors");
const {
  APP_ACCESS_TOKEN_EXPIRATION,
  APP_HEADERS_KEY,
  APP_HEADERS_NAME,
  APP_ISSUER,
  APP_REFRESH_TOKEN_EXPIRATION,
} = require("../app-constants");
const redisClient = require("./redis");

const isValidateHeaders = (req) => {
  try {
    if (
      req.headers[APP_HEADERS_NAME] &&
      req.headers[APP_HEADERS_NAME].startsWith(APP_HEADERS_KEY)
    ) {
      const token = req.headers[APP_HEADERS_NAME].split(
        APP_HEADERS_KEY.charAt(APP_HEADERS_KEY.length - 1)
      );
      return token[1];
    }

    return false;
  } catch (error) {
    return false;
  }
};

const removeToken = (userId) => {
  return new Promise((resolve, reject) => {
    redisClient.DEL(userId, (err, value) => {
      if (err || !value) return reject(value);

      return resolve(value);
    });
  });
};

const signAccesToken = (userId) => {
  return new Promise((resolve, reject) => {
    const PAYLOAD = {};
    const SECRET = process.env.ACCESS_TOKEN_SECRET;
    const OPTIONS = {
      audience: userId,
      issuer: APP_ISSUER,
      expiresIn: APP_ACCESS_TOKEN_EXPIRATION[0],
    };

    JWT.sign(PAYLOAD, SECRET, OPTIONS, (err, payload) => {
      if (err) return reject(httpErrors.InternalServerError());

      return resolve(payload);
    });
  });
};

const signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const PAYLOAD = {};
    const SECRET = process.env.REFRESH_TOKEN_SECRET;
    const OPTIONS = {
      audience: userId,
      issuer: APP_ISSUER,
      expiresIn: APP_REFRESH_TOKEN_EXPIRATION[0],
    };

    JWT.sign(PAYLOAD, SECRET, OPTIONS, (err, payload) => {
      if (err) return reject(httpErrors.InternalServerError());

      redisClient.SET(
        userId,
        payload,
        "EX",
        APP_REFRESH_TOKEN_EXPIRATION[1],
        (error, reply) => {
          if (error) return reject(httpErrors.InternalServerError());
          return resolve(payload);
        }
      );
    });
  });
};

const verifyAccessToken = (req, res, next) => {
  const token = isValidateHeaders(req);

  if (token) {
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message = err.name === "JsonWebTokenError" ? null : err.message;
        return next(httpErrors.Unauthorized(message));
      }

      req.payload = payload;
      next();
    });
  } else {
    return next(httpErrors.Unauthorized());
  }
};

const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      JWT.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) return next(httpErrors.Unauthorized());

        const userId = payload.aud;

        redisClient.GET(userId, (error, result) => {
          if (error) return next(httpErrors.InternalServerError());

          if (result === token) return resolve(userId);

          reject(httpErrors.Unauthorized());
        });
      });
    } else {
      return next(httpErrors.Unauthorized());
    }
  });
};

module.exports = {
  removeToken,
  signAccesToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
