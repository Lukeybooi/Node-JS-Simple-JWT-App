const httpErrors = require("http-errors");
const router = require("express").Router();
const { FAIL_LOGIN_ERR_MSG } = require("../app-constants");
const { UserModel } = require("../models");
const { authSchema } = require("../validation-schema");
const {
  removeToken,
  signAccesToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../utils");

const sendToken = async (res, id) => {
  const accessToken = await signAccesToken(id);
  const refreshToken = await signRefreshToken(id);

  return res.send({ accessToken, refreshToken });
};

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = await authSchema.validateAsync(req.body);

    const exists = await UserModel.findOne({ email });

    if (exists) {
      throw httpErrors.Conflict();
    }

    const user = new UserModel({ email, password });
    const saved = await user.save();

    await sendToken(res, saved.id);
  } catch (err) {
    if (err.isJoi || err.name === "ValidationError")
      return next(httpErrors.UnprocessableEntity());
    return next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = await authSchema.validateAsync(req.body);

    const user = await UserModel.findOne({ email });

    if (!user) next(httpErrors.Unauthorized(FAIL_LOGIN_ERR_MSG));

    const match = await user.isValidPassword(password);

    if (!match) next(httpErrors.Unauthorized(FAIL_LOGIN_ERR_MSG));

    await sendToken(res, user.id);
  } catch (error) {
    if (error.isJoi) return next(httpErrors.BadRequest(FAIL_LOGIN_ERR_MSG));
    return next(error);
  }
});

router.delete("/logout", verifyAccessToken, async (req, res, next) => {
  try {
    await removeToken(req.payload.aud);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

router.post("/refresh-token", async (req, res, next) => {
  try {
    const { refreshToken: token } = req.body;

    const userId = await verifyRefreshToken(token);

    await sendToken(res, userId);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
