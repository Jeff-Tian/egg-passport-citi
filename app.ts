import { Application } from "egg";

const debug = require("debug")("egg-passport-citi");
const assert = require("assert");
const Strategy = require("passport-citi").Strategy;
const uuid = require("uuid/v4");

export default (app: Application) => {
  const config = app.config.passportCiti;
  config.passReqToCallback = true;

  assert(config.key, "[egg-passport-citi] config.passportCiti.key required");
  assert(
    config.secret,
    "[egg-passport-citi] config.passportCiti.secret required"
  );

  debug("initiating passport citi: ", config);

  const state = typeof config.state === "function" ? config.state(app) : uuid();

  app.passport.use(
    "citi",
    new Strategy(
      {
        ...config,
        appId: config.key,
        appSecret: config.secret,
        redirectUri: config.callbackURL,
        state: state,

        logger: config.logger || app.logger
      },
      (
        req: any,
        accessToken: string,
        refreshToken: string,
        profile: any,
        expires_in: number,
        verified: any
      ) => {
        debug("arguments = %j", {
          accessToken,
          refreshToken,
          profile,
          expires_in,
          verified
        });
        const user = {
          provider: "citi",
          id:
            profile.emails && profile.emails
              ? profile.emails[0].emailAddress
              : "",
          name:
            profile.customerParticulars && profile.customerParticulars.names
              ? profile.customerParticulars.names[0].fullName
              : "",
          displayName:
            profile.customerParticulars && profile.customerParticulars.names
              ? profile.customerParticulars.names[0].fullName
              : "",
          photo:
            "https://sandbox.apihub.citi.com/gcb/authCode/resources/images/Citi-Enterprise-White.png",
          gender: profile.gender === "FEMALE" ? "female" : "male",
          accessToken,
          refreshToken,
          profile
        };

        debug("%s %s get user: %j", req.method, req.url, user);

        debug("do verifying... %j", app.passport.doVerify);
        app.passport.doVerify(req, user, verified);
      }
    )
  );
};
