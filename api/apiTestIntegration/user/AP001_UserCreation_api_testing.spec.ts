import { test } from "@playwright/test";
import { userCreation } from "../../userAPI";
import { generateOauthToken } from "../../accessToken";
process.env.PLAYWRIGHT_WORKERS = '3';
test.describe('Testing UserAPI Functionality', () => {
    test('Creating User', async () => {
        const access_token = await generateOauthToken();
        console.log(access_token.accessToken);
        let username = await userCreation(access_token.accessToken);
        console.log(username);

    });
});



