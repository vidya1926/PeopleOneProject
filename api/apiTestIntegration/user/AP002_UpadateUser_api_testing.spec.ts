import { test } from "@playwright/test";
import { updateUser } from "../../userAPI";

test('Creating User and Updating User', async () => {
    await updateUser();
});