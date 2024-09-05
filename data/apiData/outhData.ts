import { FakerData } from "../../utils/fakerUtils";
import userId from "./outh_UserId.json"
import apiName from "./api_Name.json"
import { faker } from "@faker-js/faker";



export const customAdminOuthData = {
    user_id: userId.customAdminUserID.id,
    client_id: userId.customAdminUserID.credentials.client_id,
    client_secret: userId.customAdminUserID.credentials.client_secret,
    scope: "LMS.API",
    grant_type: "client_credentials",
    api_name: "GenerateOauthToken",
    response_fields: "result"
};


export let userCreationData = (username: string) => ({
    user_id: userId.customAdminUserID.id,
    first_name: FakerData.getFirstName(),
    last_name: FakerData.getLastName(),
    username: username,
    password: "Welcome1@",
    api_name: apiName.createUser,
    response_fields: ["result", "UserId"]
});

export const getLearnerUser = (userId?: any) => ({
    user_id: userId,
    api_name: apiName.getUserDetail,
    status: "Active",
    response_fields: ["Status", "Company", "FirstName", "LastName", "Username", "Password", "PhoneNumber", "MobileNumber", "Picture"]
});

export const updateUserData = (userID: any, userName: any) => ({
    api_name: apiName.updateUser,
    user_id: userID,
    first_name: FakerData.getFirstName(),
    last_name: FakerData.getLastName(),
    username: userName,
    email: FakerData.getEmail(),
    response_fields: ["result", "UserId"]
});

export function generateCode() {
    const currentMilliseconds = Date.now();
    const randomNumber = Math.floor(Math.random() * 3);
    const code = Number(currentMilliseconds.toString().slice(7)) + randomNumber;
    return code.toString();
};


export const ceuTypeCreationData = (code: any) => ({
    user_id: userId.customAdminUserID.id,
    name: FakerData.getTagNames(),
    code: code,
    rows: "30",
    description: FakerData.getDescription(),
    api_name: apiName.createCEUType,
    response_fields: "ceu_Type_id"
})

export const ceuGetListOfData = {
    user_id: userId.customAdminUserID.id,
    api_name: apiName.getCeuTypeLists,
    response_fields: ["id", "name", "code", "description"]
}

export const ceuTypeDelete = (createdCode: string) => ({
    user_id: userId.customAdminUserID.id,
    code: createdCode,
    api_name: apiName.deleteCEUType,
    response_fields: "ceu_Type_id"
})
