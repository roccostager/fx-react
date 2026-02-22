import api from "./api";

class User extends EventTarget {
    #isAuthenticated: boolean
    #username: string | undefined

    readonly CHANGE_EVENT = new Event('change');

    constructor() {
        super();
        this.#isAuthenticated = false;
        this.#username = undefined;
    }
    get isAuthenticated() {
        return this.#isAuthenticated;
    }
    get username() {
        return this.#username;
    }

    logIn(username: string) {
        this.#isAuthenticated = true;
        this.#username = username;

        this.dispatchEvent(this.CHANGE_EVENT);  // Notify listeners of change
    }

    async sync() {
        const response = await api.get('me');
        if (api.evaluateResponse(response)) {
            if (response && typeof response.username === 'string') {
                this.#isAuthenticated = true;
                this.#username = response.username;

                this.dispatchEvent(this.CHANGE_EVENT);
            }
        }
    }
}

const user = new User();
export default user;