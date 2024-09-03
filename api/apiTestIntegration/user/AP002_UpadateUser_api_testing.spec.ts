import { test } from "@playwright/test";
import { getUserDetail, updateUser, userCreation } from "../../userAPI";
import { generateOauthToken } from "../../accessToken";

test('Creating User and Updating User', async () => {
    const access_token = await generateOauthToken();
    console.log(access_token.accessToken);
    let userID = await userCreation(access_token.accessToken);
    console.log(userID);
    let userName = await getUserDetail(userID, access_token);
    console.log(userName);
    let updatedUser = await updateUser(userID, userName, access_token);
    console.log(updatedUser);

});