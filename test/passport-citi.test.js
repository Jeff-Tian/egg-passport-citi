"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const egg_mock_1 = tslib_1.__importDefault(require("egg-mock"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const nock_1 = tslib_1.__importDefault(require("nock"));
const assert = require("assert");
describe("test/passport-citi.test.ts", () => {
    let app;
    before(async () => {
        app = egg_mock_1.default.app({
            baseDir: "apps/passport-citi-test"
        });
        return app.ready();
    });
    after(() => app.close());
    afterEach(egg_mock_1.default.restore);
    it("should get /", () => {
        return supertest_1.default(app.callback())
            .get("/")
            .expect("hi, passportCiti")
            .expect(200);
    });
    it("should GET /passport/citi redirect to auth url", async () => {
        return app
            .httpRequest()
            .get("/passport/citi")
            .expect(302)
            .expect("Location", /^https:\/\/sandbox\.apihub\.citi\.com\/gcb\/api\/authCode\/oauth2\/authorize\?response_type=code&client_id=/);
    });
    it("should GET /passport/citi/callback redirect to auth url", () => {
        return supertest_1.default(app.callback())
            .get("/passport/citi/callback")
            .expect(302)
            .expect("Location", /^https:\/\/sandbox\.apihub\.citi\.com\/gcb\/api\/authCode\/oauth2\/authorize\?response_type=code&client_id=/);
    });
});
describe("advanced tests", () => {
    let app;
    before(async () => {
        app = egg_mock_1.default.app({
            baseDir: "apps/passport-citi-test"
        });
        return app.ready();
    });
    after(() => app.close());
    afterEach(egg_mock_1.default.restore);
    it("should get user", async () => {
        const ctx = app.mockContext({});
        nock_1.default("https://sandbox.apihub.citi.com")
            .post("/gcb/api/authCode/oauth2/token/sg/gcb")
            .reply(200, {
            scope: "customers_profiles",
            access_token: "123",
            refresh_token: "123",
            expires_in: new Date()
        });
        nock_1.default("https://sandbox.apihub.citi.com")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3BvcnQtY2l0aS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFzc3BvcnQtY2l0aS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdFQUE0QjtBQUM1QixrRUFBZ0M7QUFDaEMsd0RBQXdCO0FBQ3hCLGlDQUFrQztBQUVsQyxRQUFRLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO0lBQzFDLElBQUksR0FBUSxDQUFDO0lBQ2IsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ2hCLEdBQUcsR0FBRyxrQkFBSSxDQUFDLEdBQUcsQ0FBQztZQUNiLE9BQU8sRUFBRSx5QkFBeUI7U0FDbkMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7SUFFSCxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFekIsU0FBUyxDQUFDLGtCQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFeEIsRUFBRSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7UUFDdEIsT0FBTyxtQkFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDO2FBQ1IsTUFBTSxDQUFDLGtCQUFrQixDQUFDO2FBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnREFBZ0QsRUFBRSxLQUFLLElBQUksRUFBRTtRQUM5RCxPQUFPLEdBQUc7YUFDUCxXQUFXLEVBQUU7YUFDYixHQUFHLENBQUMsZ0JBQWdCLENBQUM7YUFDckIsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLE1BQU0sQ0FDTCxVQUFVLEVBQ1YsNkdBQTZHLENBQzlHLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx5REFBeUQsRUFBRSxHQUFHLEVBQUU7UUFDakUsT0FBTyxtQkFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUMzQixHQUFHLENBQUMseUJBQXlCLENBQUM7YUFDOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLE1BQU0sQ0FDTCxVQUFVLEVBQ1YsNkdBQTZHLENBQzlHLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtJQUM5QixJQUFJLEdBQVEsQ0FBQztJQUNiLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNoQixHQUFHLEdBQUcsa0JBQUksQ0FBQyxHQUFHLENBQUM7WUFDYixPQUFPLEVBQUUseUJBQXlCO1NBQ25DLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBRUgsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRXpCLFNBQVMsQ0FBQyxrQkFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXhCLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLElBQUksRUFBRTtRQUMvQixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWhDLGNBQUksQ0FBQyxpQ0FBaUMsQ0FBQzthQUNwQyxJQUFJLENBQUMsdUNBQXVDLENBQUM7YUFDN0MsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNWLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsWUFBWSxFQUFFLEtBQUs7WUFDbkIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsVUFBVSxFQUFFLElBQUksSUFBSSxFQUFFO1NBQ3ZCLENBQUMsQ0FBQztRQUVMLGNBQUksQ0FBQyxpQ0FBaUMsQ0FBQzthQUNwQyxHQUFHLENBQUMsZ0NBQWdDLENBQUM7YUFDckMsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNWLE1BQU0sRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLHNCQUFzQixFQUFFLENBQUM7WUFDbEQsbUJBQW1CLEVBQUU7Z0JBQ25CLEtBQUssRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDO2FBQ2xDO1NBQ0YsQ0FBQyxDQUFDO1FBRUwsTUFBTSxHQUFHO2FBQ04sV0FBVyxFQUFFO2FBQ2IsR0FBRyxDQUFDLG1DQUFtQyxDQUFDO2FBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVmLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=