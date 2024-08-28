import { userCreationData, getLearnerUser } from "../data/apiData/outhData";
import url from "../data/apiData/url.json"
import { postRequest } from "../utils/requestUtils";
import { assertResponse } from "../utils/verificationUtils";
import { generateOauthToken } from "./accessToken"

let access_token = generateOauthToken()
let authorization: any = `Authorization: '${access_token}'`;
async function userCreation() {

    try {
        // let un = userCreationData.username
        let response = await postRequest(userCreationData, url.endPointURL, authorization);
        console.log(response.status);
        await assertResponse(response.status, 200, "success")
        return response.user_id
    } catch (error) {
        console.error("Failed to generate OAuth token:", error);
        throw error;
    }
}


async function getUserDetail() {
    const response = await userCreation();
    await postRequest(getLearnerUser(response), url.learnerEndPointURL, authorization)
}

getUserDetail()
    .then(response => {
        console.log("Received response:", response);
    })
    .catch(error => {
        console.error("Error occurred:", error);
    });
