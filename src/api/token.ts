import StatusError from "./error";
type TokenValue = string | null | StatusError;

class Token {
    #AccessToken: TokenValue = null;
    #ongoingPromise: Promise<TokenValue> | null = null;

    constructor(initial: TokenValue = null) {
        this.#AccessToken = initial;
    }

    get accessToken(): TokenValue {
        return this.#AccessToken;
    }

    invalid(invalidToken: null = null) {
        this.#AccessToken = invalidToken;
    }

    async fetchAccessToken(): Promise<TokenValue> {
        if (this.#ongoingPromise) {  // Already fetching
            return this.#ongoingPromise;  // Return the promise which will return the fetch result
        }

        // Double check (prevent race conditions)
        if (this.#AccessToken) return this.#AccessToken;

        // Not fetching, create a promise
        this.#ongoingPromise = (async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
                    credentials: 'include',
                });
                if (!response.ok) throw new StatusError(response.status, response.statusText);

                const data = await response.json();
                if (data?.code === 'SESSION_EXPIRED') throw new StatusError(401, data.message);  // refresh token invalid
                this.#AccessToken = data.AccessToken;  // set new access token
            } catch (caughtError) {
                if (caughtError instanceof StatusError) {
                    if (caughtError.status === 401 && caughtError.message === 'Unauthenticated') console.log('Redirect to login!');
                    this.#AccessToken = caughtError;
                }
                this.#AccessToken = new StatusError(500, 'Caught Error');
            } finally {
                this.#ongoingPromise = null;
            }
            return this.#AccessToken;
        })();
        return this.#ongoingPromise;  // Return created
    }
}
const token: Token = new Token();

export default token;