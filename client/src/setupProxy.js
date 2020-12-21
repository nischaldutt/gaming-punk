const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/auth/*", { target: "http://localhost:3001" })
  );
};
