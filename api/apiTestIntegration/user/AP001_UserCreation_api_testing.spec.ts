import { test } from "@playwright/test";
import { userCreation} from "../../userAPI";
process.env.PLAYWRIGHT_WORKERS = '3';
test.describe('Testing UserAPI Functionality', () => {
    test('Creating User', async () => {
        await userCreation();
    });
});



