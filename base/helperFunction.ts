import { credentialConstants } from "../constants/credentialConstants";

export function getCredentials(role: string) {
    return credentialConstants[role];
}

