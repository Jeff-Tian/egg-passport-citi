import mock from "egg-mock";
import request from "supertest";
import nock from "nock";
import assert = require("assert");

describe("test/passport-citi.test.ts", () => {
  let app: any;
  before(async () => {
    app = mock.app({
      baseDir: "apps/passport-citi-test"
    });

    return app.ready();
  });

  after(() => app.close());

  afterEach(mock.restore);

  it("should get /", () => {
    return request(app.callback())
      .get("/")
      .expect("hi, passportCiti")
      .expect(200);
  });

  it("should GET /passport/citi redirect to auth url", async () => {
    return app
      .httpRequest()
      .get("/passport/citi")
      .expect(302)
      .expect(
        "Location",
        /^https:\/\/sandbox\.apihub\.citi\.com\/gcb\/api\/authCode\/oauth2\/authorize\?response_type=code&client_id=/
      );
  });

  it("should GET /passport/citi/callback redirect to auth url", () => {
    return request(app.callback())
      .get("/passport/citi/callback")
      .expect(302)
      .expect(
        "Location",
        /^https:\/\/sandbox\.apihub\.citi\.com\/gcb\/api\/authCode\/oauth2\/authorize\?response_type=code&client_id=/
      );
  });
});

describe("advanced tests", () => {
  let app: any;
  before(async () => {
    app = mock.app({
      baseDir: "apps/passport-citi-test"
    });

    return app.ready();
  });

  after(() => app.close());

  afterEach(mock.restore);

  it("should get user", async () => {
    const ctx = app.mockContext({});

    nock("https://sandbox.apihub.citi.com")
      .post("/gcb/api/authCode/oauth2/token/sg/gcb")
      .reply(200, {
        scope: "customers_profiles",
        access_token: "123",
        refresh_token: "123",
        expires_in: new Date()
      });

    nock("https://sandbox.apihub.citi.com")
      .get("/gcb/api/v1/customers/profiles")
      .reply(200, {
        emails: [{ emailAddress: "jie.tian@hotmail.com" }],
        customerParticulars: {
          names: [{ fullName: "jie.tian" }]
        }
      });

    await app
      .httpRequest()
      .get("/passport/citi/callback?code=1234")
      .expect(302);

    assert(ctx.isAuthenticated());
  });
});
