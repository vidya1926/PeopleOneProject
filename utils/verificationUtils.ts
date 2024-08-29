import { AxiosResponse } from 'axios';


export async function assertResponse(receivedStatus: number, expectedStatus?: number) {
    if (receivedStatus !== expectedStatus) {
        throw new Error(`Expected status ${expectedStatus} but received ${receivedStatus}`);
    }
}

export async function name() {

}
/* if (expectedField && !response.data[expectedField]) {
    throw new Error(`Expected field "${expectedField}" not found in response`);

} */