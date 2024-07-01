import { credentialConstants } from "../constants/credentialConstants";

function getCredentials(role: string) {
    return credentialConstants[role];
}

