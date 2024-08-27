import { customAdminOuthData } from "../data/apiData/outhData";
import url from "../data/apiData/url.json"
import {postRequest} from "../utils/requestUtils";


async function generateOauthToken() {
    try {
        const response = await postRequest(customAdminOuthData, url.endPointURL);
        return "Bearer " + response.access_token;
    } catch (error) {
        console.error("Failed to generate OAuth token:", error);
        throw error;
    }
}

/* generateOauthToken()
    .then(response => {
        console.log("Received response:", response);
    })
    .catch(error => {
        console.error("Error occurred:", error);
    });
 */

export { generateOauthToken }