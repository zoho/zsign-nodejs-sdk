class RedirectPages {
    getResponseValueFromKey(json, key) {
        if (json[key] !== undefined) {
            return json[key];
        }
        return null;
    }

    constructor(response) {
        this.sign_success = this.getResponseValueFromKey(response, 'sign_success');
        this.sign_failure = this.getResponseValueFromKey(response, 'sign_failure');
        this.sign_later = this.getResponseValueFromKey(response, 'sign_later');
        this.sign_declined = this.getResponseValueFromKey(response, 'sign_declined');
        this.sign_completed = this.getResponseValueFromKey(response, 'sign_completed');
        this.sign_forwarded = this.getResponseValueFromKey(response, 'sign_forwarded');
    }

    // GETTERS

    getSignSuccess() {
        return this.sign_success;
    }

    getSignFailure() {
        return this.sign_failure;
    }

    getSignLater() {
        return this.sign_later;
    }

    getSignDeclined() {
        return this.sign_declined;
    }

    getSignCompleted() {
        return this.sign_completed;
    }

    getSignForwarded() {
        return this.sign_forwarded;
    }

    // SETTERS

    setSignSuccess(sign_success) {
        this.sign_success = sign_success;
    }

    setSignFailure(sign_failure) {
        this.sign_failure = sign_failure;
    }

    setSignLater(sign_later) {
        this.sign_later = sign_later;
    }

    setSignDeclined(sign_declined) {
        this.sign_declined = sign_declined;
    }

    setSignCompleted(sign_completed) {
        this.sign_completed = sign_completed;
    }

    setSignForwarded(sign_forwarded) {
        this.sign_forwarded = sign_forwarded;
    }

    constructJson() {
        let response = {};
        const Obj = Object.entries(this);
        for (const [key, value] of Obj) {
            if (key !== null && value != null) {
                response[key] = value;
            }
        }
        return response;
    }
}
module.exports = { RedirectPages };
