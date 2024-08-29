import { test } from "@playwright/test";
import { updateUser, userCreation, getUserDetail } from "../userAPI";

test.describe('Testing UserAPI Functionality', () => {
    test('Creating User', async () => {
        await userCreation();
    });

    test('Creating User from Admin site and retrieving data from Learner site', async () => {
        await getUserDetail();
    });

    test('Creating User and Updating User', async () => {
        await updateUser();
    });
});
