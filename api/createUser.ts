import { userCreationData, getLearnerUser } from "../data/apiData/outhData";
import url from "../data/apiData/url.json"
import { postRequest } from "../utils/requestUtils";
import { assertResponse } from "../utils/verificationUtils";
import { generateOauthToken } from "./accessToken"
let access_token: any
const authorization: any = `Authorization: '${access_token}'`;
async () => {
    access_token = (await generateOauthToken()).accessToken;
}
export async function userCreation() {
    try {
        let un = userCreationData.username
        let response = await postRequest(userCreationData, url.endPointURL, authorization);
        console.log(response);
        await assertResponse(response.status, 200);
        return response.data.user_id
    } catch (error) {
        console.error("Failed to execute", error);
        throw error;
    }
}

export async function getUserDetail() {
    let retrivied_user = await userCreation();
    let response = await postRequest(getLearnerUser(retrivied_user), url.learnerEndPointURL, authorization);
    await assertResponse(response.status, 200);
    console.log("User Data:", response.data.data.user_data);

}