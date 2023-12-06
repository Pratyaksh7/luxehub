const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const proxy = httpProxy.createProxyServer();

// routes for targeted services

const routes = {
  "/auth": "http://localhost:3001",
};

// api gateway routing logic
app.use((req, res) => {
  const path = req.path;
  const target = routes[path];
  if (!target) {
    res.status(404).send("Not Found");
  } else {
    // Proxy the request to the target service
    proxy.web(req, res, { target });
  }
});

// Error handling for the proxy
proxy.on('error', (err, req, res) => {
    console.log(err);
    res.status(500).send('Proxy error');
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Api Gateway running at PORT ${PORT}`);
});
