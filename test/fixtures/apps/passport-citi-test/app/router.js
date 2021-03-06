"use strict";

module.exports = app => {
  const { router } = app;

  router.get("/", ctx => {
    ctx.body = "hi, " + app.plugins.passportCiti.name;
  });

  app.passport.mount("citi");

  app.passport.verify(async (ctx, user) => {
    return user;
  });
};
