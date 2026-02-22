type Methods = "POST" | "GET" | "PUT" | "DELETE";
import StatusError from './error';
type ResponseData = Record<string, unknown>
type FetchResponse = ResponseData | StatusError | null;

import token from './token';

const api = {
    get: async (address: string) => { return await makeFetch('GET', address) },
    post: async (address: string, body: object | undefined) => { return await makeFetch('POST', address, body) },
    put: async (address: string, body: object | undefined) => { return await makeFetch('PUT', address, body) },
    delete: async (address: string, body: object | undefined) => { return await makeFetch('DELETE', address, body) },

    publicGet: async (address: string) => { return await publicFetch('GET', address) },
    publicPost: async (address: string, body: object | undefined) => { return await publicFetch('POST', address, body) },

    evaluateResponse,
}

async function makeFetch(method: Methods, address: string, body: object | undefined = undefined, isRetry: boolean = false): Promise<FetchResponse> {
    // token.accessToken -> either: token, null (null means expired) OR error -> refresh token invalid
    // token.fetchAccessToken -> promise of either: token, null OR error -> refresh token invalid

    try {
        let accessToken = token.accessToken;
        if (accessToken === null) accessToken = await token.fetchAccessToken();
        if (accessToken instanceof StatusError || accessToken === null) throw accessToken;

        // Request, with access token
        const request = new Request(`${import.meta.env.VITE_API_URL}/${address}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
        });

        const response = await fetch(request);

        const data = await response.json();
        if (data?.code === 'ACCESS_TOKEN_EXPIRED') {  // Check for invalid (or expired) access token
            if (isRetry) throw new StatusError(401, 'Authentication failed after refresh attempt');
            token.invalid();  // sets value of token.accessToken -> null -> refresh attempt
            return await makeFetch(method, address, body, true);  // Reattempt fetch (check at start for null will attempt refresh)
        }

        // Check Response Status, after checking data.?code, since retrying after refresh attempt has priority
        if (!response.ok) throw new StatusError(response.status, response.statusText);
        return data;  // Return data
    } catch (caughtError) {
        token.invalid();  // Reset value for token to null after fail
        if (caughtError instanceof StatusError) return caughtError;
        return null;
    }
}

async function publicFetch(method: Methods, address: string, body: object | undefined = undefined): Promise<FetchResponse> {
    try {
        const request = new Request(`${import.meta.env.VITE_API_URL}/${address}`, {
            method,
            credentials: 'include',  // Include credentials for login route
            headers: {
                'Content-Type': 'application/json',
            },
            ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
        });

        const response = await fetch(request);
        if (!response.ok) throw new StatusError(response.status, response.statusText);

        const data = await response.json();
        return data;
    } catch (caughtError) {
        if (caughtError instanceof StatusError) return caughtError;
        return null;
    }
}

// Convenience function: evaluate null or Error as false -> use to figure out if fetch was success
function evaluateResponse(apiResponse: FetchResponse): apiResponse is ResponseData {
    if (!apiResponse || apiResponse instanceof StatusError) {
        return false;
    }
    return true;  // successful api call
}

export default api;