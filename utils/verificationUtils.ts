


export async function assertResponse(receivedResponse: any, expectedResponse?: any) {
    if (receivedResponse !== expectedResponse) {
        throw new Error(`Expected status ${expectedResponse} but received ${receivedResponse}`);
    }
}

export async function assertStatus(receivedStatus: any, expectedStatus?: any) {
    if (receivedStatus !== expectedStatus) {
        throw new Error(`Expected status ${expectedStatus} but received ${receivedStatus}`);
    } else {
        console.log(`Got expected status: ${expectedStatus}`);
    }
}
