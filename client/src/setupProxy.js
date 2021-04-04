const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/auth/*", { target: process.env.REACT_APP_PROXY })
  );
};
