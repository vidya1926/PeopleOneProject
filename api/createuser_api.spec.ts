import { test } from "@playwright/test";
import { getUserDetail } from "./createUser";

test(`Creating User and Retriving Data from Learner Site`, async () => {
    await getUserDetail();
});

