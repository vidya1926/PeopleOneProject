/**
 * Utility class for making HTTP requests and logging request and response details.
 */
class RequestUtils {
    /**
     * Logs details with a specified prefix.
     * @param {string} prefix - The prefix for the log details.
     * @param {Record<string, any>} details - The details to be logged.
     */
    logDetails(prefix: string, details: Record<string, any>): void {
        console.log('------------------------------------------------------------');
        console.log(`${prefix} Details:`, details);
    }

    /**
     * Logs details for an HTTP request, including method, endpoint, and request body (if applicable).
     * @param {string} method - The HTTP request method (GET, POST, PUT, DELETE).
     * @param {string} endpoint - The endpoint or URL for the request.
     * @param {Record<string, any> | undefined} requestBody - The request body (if applicable).
     */
    logRequestDetails(method: string, endpoint: string, requestBody?: Record<string, any>): void {
        this.logDetails('Request', {
            method,
            endpoint,
            requestBody: (method === 'GET' || method === 'DELETE') ? 'N/A' : JSON.stringify(requestBody),
        });
    }

    /**
  * Logs details for an HTTP response.
  * @param {Response} response - The HTTP response object.
  */
    async logResponseDetails(response: Response): Promise<void> {
        this.logDetails('Response', {
            status: response.status,           // Access as a property
            statusText: response.statusText,   // Access as a property
            url: response.url,                 // Access as a property
            //headers: response.headers      // Uncomment if you need to log headers
        });
    }


    /**
     * Makes an HTTP request, logs details, and returns the response.
     * @param {any} request - The request object used for making HTTP requests.
     * @param {string} method - The HTTP request method (GET, POST, PUT, DELETE).
     * @param {string} endpoint - The endpoint or URL for the request.
     * @param {Record<string, any> | undefined} requestBody - The body of the HTTP request.
     * @returns {Promise<Response>} - The HTTP response object.
     */
    async makeRequest(
        request: any,
        method: string,
        endpoint: string,
        requestBody?: Record<string, any>
    ): Promise<Response> {
        this.logRequestDetails(method, endpoint, requestBody);
        const response = await request[method.toLowerCase()](endpoint, { data: requestBody });
        await this.logResponseDetails(response);
        return response;
    }

    /**
     * Makes a GET request and returns the response.
     * @param {any} request - The request object used for making HTTP requests.
     * @param {string} endpoint - The endpoint or URL for the request.
     * @returns {Promise<Response>} - The HTTP response object.
     */
    get(request: any, endpoint: string): Promise<Response> {
        return this.makeRequest(request, 'GET', endpoint);
    }

    /**
     * Makes a POST request and returns the response.
     * @param {any} request - The request object used for making HTTP requests.
     * @param {string} endpoint - The endpoint or URL for the request.
     * @param {Record<string, any>} requestBody - The body of the HTTP request.
     * @returns {Promise<Response>} - The HTTP response object.
     */
    post(request: any, endpoint: string, requestBody: Record<string, any>): Promise<Response> {
        return this.makeRequest(request, 'POST', endpoint, requestBody);
    }

    /**
     * Makes a PUT request and returns the response.
     * @param {any} request - The request object used for making HTTP requests.
     * @param {string} endpoint - The endpoint or URL for the request.
     * @param {Record<string, any>} requestBody - The body of the HTTP request.
     * @returns {Promise<Response>} - The HTTP response object.
     */
    put(request: any, endpoint: string, requestBody: Record<string, any>): Promise<Response> {
        return this.makeRequest(request, 'PUT', endpoint, requestBody);
    }

    /**
     * Makes a DELETE request and returns the response.
     * @param {any} request - The request object used for making HTTP requests.
     * @param {string} endpoint - The endpoint or URL for the request.
     * @returns {Promise<Response>} - The HTTP response object.
     */
    delete(request: any, endpoint: string): Promise<Response> {
        return this.makeRequest(request, 'DELETE', endpoint);
    }

    /**
     * Makes a PATCH request and returns the response.
     * @param {any} request - The request object used for making HTTP requests.
     * @param {string} endpoint - The endpoint or URL for the request.
     * @param {Record<string, any>} requestBody - The body of the HTTP request.
     * @returns {Promise<Response>} - The HTTP response object.
     */
    patch(request: any, endpoint: string, requestBody: Record<string, any>): Promise<Response> {
        return this.makeRequest(request, 'PATCH', endpoint, requestBody);
    }
}

export default new RequestUtils();
