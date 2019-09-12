"use strict";

module.exports = appInfo => {
  const config = {};

  config.keys = "123456";

  config.passportCiti = {
    key: process.env.EGG_PASSPORT_WECHAT_CLIENT_ID || "xxx",
    secret: process.env.EGG_PASSPORT_WECHAT_CLIENT_SECRET || "yyy",
    state: app => {
      console.log("calculating state... ", app);
      app.logger.info("calculating state...");
      return req => {
        const state = "4321";
        console.log("--------> state = ", state, req.headers, req.url);
        app.logger.info("state = ", {
          state,
          headers: req.headers,
          query: req.query,
          url: req.url
        });

        return state;
      };
    }
  };

  return config;
};
