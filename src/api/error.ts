class StatusError extends Error {
    #status: number

    constructor(status: number, message: string) {
        super(message)
        this.#status = status;
    }

    get status() {
        return this.#status;
    }
}

export default StatusError;