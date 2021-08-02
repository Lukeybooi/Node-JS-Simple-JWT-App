const app = require("express")();
const { AUTH_URL } = require("./app-constants");
const { init, middleware, swaggerInit } = require("./middleware");
const { AuthRoute } = require("./routes");

init(app);

const PORT = process.env.PORT || 3142;

app.use(AUTH_URL, AuthRoute);

swaggerInit(app);

middleware(app);

app.listen(PORT);
