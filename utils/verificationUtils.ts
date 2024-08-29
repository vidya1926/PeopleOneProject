

export async function assertStatus(receivedStatus: number, expectedStatus?: number) {
    if (receivedStatus !== expectedStatus) {
        throw new Error(`Expected status ${expectedStatus} but received ${receivedStatus}`);
    } else {
        console.log(`Got expected status: ${expectedStatus}`);
    }

}

export async function assertResponse(receivedResponse: any, expectedResponse: any) {
    if (receivedResponse !== expectedResponse) {
        throw new Error(`Expected status ${receivedResponse} but received ${expectedResponse}`);
    } else {
        console.log(`Got expected response: ${expectedResponse}`);
    }

}
/* if (expectedField && !response.data[expectedField]) {
    throw new Error(`Expected field "${expectedField}" not found in response`);

} */