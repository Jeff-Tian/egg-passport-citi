import { Application } from "egg";

const debug = require("debug")("egg-passport-citi");
const assert = require("assert");
const Strategy = require("passport-citi").Strategy;

export default (app: Application) => {
  const config = app.config.passportCiti;
  config.passReqToCallback = true;

  assert(
    config.key,
    "[egg-passport-wechat] config.passportWechat.key required"
  );
  assert(
    config.secret,
    "[egg-passport-wechat] config.passportWechat.secret required"
  );

  app.passport.use(
    "citi",
    new Strategy(
      {
        ...config,
        appId: config.key,
        appSecret: config.secret,
        redirectUri: config.callbackURL
      },
      (
        req: any,
        accessToken: string,
        refreshToken: string,
        profile: any,
        expires_in: number,
        verified: any
      ) => {
        console.log("arguments = ", {
          accessToken,
          refreshToken,
          profile,
          expires_in,
          verified
        });
        const user = {
          provider: "citi",
          id: profile.emails.emailAddress,
          name: profile.customerParticulars.names.fullName,
          displayName: profile.customerParticulars.names.fullName,
          photo: "",
          gender:
            profile.customerParticulars.prefix === "Mr." ? "male" : "female",
          accessToken,
          refreshToken,
          profile
        };

        debug("%s %s get user: %j", req.method, req.url, user);

        console.log("do verifying...", app.passport.doVerify);
        app.passport.doVerify(req, user, verified);
      }
    )
  );
};
