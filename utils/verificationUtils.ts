import { AxiosResponse } from 'axios';


export async function assertResponse(response: AxiosResponse<any>, expectedStatus: number, expectedField?: string) {
    let status = response.status
    if (status !== expectedStatus) {
        throw new Error(`Expected status ${expectedStatus} but received ${response.status}`);
    }

    if (expectedField && !response.data[expectedField]) {
        throw new Error(`Expected field "${expectedField}" not found in response`);

    }
}