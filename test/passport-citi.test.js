"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const egg_mock_1 = tslib_1.__importDefault(require("egg-mock"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const nock_1 = tslib_1.__importDefault(require("nock"));
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
            .expect("Location", /^https:\/\/sandbox\.apihub\.citi\.com\/gcb\/api\/authCode\/oauth2\/authorize\?response_type=code&client_id=xxx&scope=customers_profiles&countryCode=SG&businessCode=GCB&locale=en_US&state=4321/);
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
        // assert(ctx.isAuthenticated());
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3BvcnQtY2l0aS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFzc3BvcnQtY2l0aS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdFQUE0QjtBQUM1QixrRUFBZ0M7QUFDaEMsd0RBQXdCO0FBRXhCLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFDMUMsSUFBSSxHQUFRLENBQUM7SUFDYixNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDaEIsR0FBRyxHQUFHLGtCQUFJLENBQUMsR0FBRyxDQUFDO1lBQ2IsT0FBTyxFQUFFLHlCQUF5QjtTQUNuQyxDQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztJQUVILEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUV6QixTQUFTLENBQUMsa0JBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV4QixFQUFFLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRTtRQUN0QixPQUFPLG1CQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUM7YUFDUixNQUFNLENBQUMsa0JBQWtCLENBQUM7YUFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdEQUFnRCxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQzlELE9BQU8sR0FBRzthQUNQLFdBQVcsRUFBRTthQUNiLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQzthQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsTUFBTSxDQUNMLFVBQVUsRUFDViw2R0FBNkcsQ0FDOUcsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHlEQUF5RCxFQUFFLEdBQUcsRUFBRTtRQUNqRSxPQUFPLG1CQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzNCLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQzthQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsTUFBTSxDQUNMLFVBQVUsRUFDVixpTUFBaU0sQ0FDbE0sQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO0lBQzlCLElBQUksR0FBUSxDQUFDO0lBQ2IsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ2hCLEdBQUcsR0FBRyxrQkFBSSxDQUFDLEdBQUcsQ0FBQztZQUNiLE9BQU8sRUFBRSx5QkFBeUI7U0FDbkMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7SUFFSCxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFekIsU0FBUyxDQUFDLGtCQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFeEIsRUFBRSxDQUFDLGlCQUFpQixFQUFFLEtBQUssSUFBSSxFQUFFO1FBQy9CLGNBQUksQ0FBQyxpQ0FBaUMsQ0FBQzthQUNwQyxJQUFJLENBQUMsdUNBQXVDLENBQUM7YUFDN0MsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNWLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsWUFBWSxFQUFFLEtBQUs7WUFDbkIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsVUFBVSxFQUFFLElBQUksSUFBSSxFQUFFO1NBQ3ZCLENBQUMsQ0FBQztRQUVMLGNBQUksQ0FBQyxpQ0FBaUMsQ0FBQzthQUNwQyxHQUFHLENBQUMsZ0NBQWdDLENBQUM7YUFDckMsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNWLE1BQU0sRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLHNCQUFzQixFQUFFLENBQUM7WUFDbEQsbUJBQW1CLEVBQUU7Z0JBQ25CLEtBQUssRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDO2FBQ2xDO1NBQ0YsQ0FBQyxDQUFDO1FBRUwsTUFBTSxHQUFHO2FBQ04sV0FBVyxFQUFFO2FBQ2IsR0FBRyxDQUFDLG1DQUFtQyxDQUFDO2FBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVmLGlDQUFpQztJQUNuQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=