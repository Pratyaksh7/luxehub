const express = require("express");
const { setupLogging } = require("./logging");
const { ROUTES } = require("./routes");
const { setupProxies } = require("./proxy");
const { setupRateLimit } = require("./ratelimit");

const app = express()

const PORT = 3000;

setupLogging(app);
setupRateLimit(app, ROUTES);
setupProxies(app, ROUTES);

app.listen(PORT, () => {
  console.log(`Api Gateway listening at PORT ${PORT}`)
})