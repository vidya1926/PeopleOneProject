import { test } from "@playwright/test";
import { getUserDetail, updateUser } from "../userAPI";

test(`Creating User and Retriving Data from Learner Site`, async () => {
    // await getUserDetail();
    await updateUser()
});

