import { FakerData } from "../../utils/fakerUtils";
import userId from "./outh_UserId.json"
import apiName from "./api_Name.json"



export const customAdminOuthData = {
    user_id: userId.customAdminUserID.id,
    client_id: userId.customAdminUserID.credentials.client_id,
    client_secret: userId.customAdminUserID.credentials.client_secret,
    scope: "LMS.API",
    grant_type: "client_credentials",
    api_name: "GenerateOauthToken",
    response_fields: "result"
};


export let userCreationData = {
    user_id: userId.customAdminUserID.id,
    first_name: FakerData.getFirstName(),
    last_name: FakerData.getLastName(),
    username: FakerData.getUserId(),
    password: "Welcome1@",
    api_name: apiName.createUser,
    response_fields: ["result", "UserId"]
};

export const getLearnerUser = (userId?: any) => ({
    user_id: userId,
    api_name: apiName.getUserDetail,
    status: "Active",
    response_fields: ["Status", "Company", "FirstName", "LastName", "Username", "Password", "PhoneNumber", "MobileNumber", "Picture"]
});

export const updateUserData = (userName?: any) => ({
    api_name: apiName.updateUser,
    alias: "cuser",
    type: "user",
    graphql_type: "mutation",
    category: "AdminAPI",
    description: "User Updation",
    title: "User Updation",
    user_id: userId.customAdminUserID.id,
    first_name: FakerData.getFirstName(),
    last_name: FakerData.getLastName(),
    username: userName,
    email: FakerData.getEmail()
});