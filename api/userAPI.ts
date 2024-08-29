import { userCreationData, getLearnerUser, updateUserData } from "../data/apiData/outhData";
import url from "../data/apiData/url.json"
import { postRequest } from "../utils/requestUtils";
import { assertStatus, assertResponse } from "../utils/verificationUtils";
import { generateOauthToken } from "./accessToken"
let access_token: any
const authorization: any = `Authorization: '${access_token}'`;
async () => {
    access_token = (await generateOauthToken()).accessToken;
}
export async function userCreation() {
    try {
        //let un = userCreationData.username
        let response = await postRequest(userCreationData, url.endPointURL, authorization);
        console.log(response);
        await assertStatus(response.status, 200);
        await assertResponse(response.data.result, "success")
        return response.data.user_id
    } catch (error) {
        console.error("Failed to execute", error);
        throw error;
    }
}

export async function getUserDetail() {
    let retrivied_user = await userCreation();
    let response = await postRequest(getLearnerUser(retrivied_user), url.learnerEndPointURL, authorization);
    await assertStatus(response.status, 200);
    console.log("User Data:", response.data.data.user_data);
    return response.data.data.user_data.Username

}

export async function updateUser() {
    let response = await postRequest(updateUserData(getUserDetail), url.endPointURL, authorization);
    console.log(response);
    await assertStatus(response.status, 200);

}