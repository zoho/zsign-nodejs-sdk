const DC_type = ['com', 'in', 'eu', 'au', 'jp'];
const signException = require('./SignException');
const SignException = signException.SignException;
class OAuth {
    getResponseValueFromKey(json, key) {
        if (json[key] !== undefined) {
            return json[key];
        }
        return null;
    }

    constructor(arr) {
        this.client_id = this.getResponseValueFromKey(arr, 'CLIENT_ID');
        this.client_secret = this.getResponseValueFromKey(arr, 'CLIENT_SECRET');
        this.DC = this.getResponseValueFromKey(arr, 'DC');
        this.access_token = this.getResponseValueFromKey(arr, 'ACCESS_TOKEN');
        this.refresh_token = this.getResponseValueFromKey(arr, 'REFRESH_TOKEN');
    }

    getDC() {
        return this.DC;
    }

    getBaseURL() {
        return 'https://sign.zoho.' + this.DC.toLowerCase();
    }

    getAccessToken() {
        return this.access_token;
    }

    setAccessToken(access_token) {
        this.access_token = access_token;
    }

    getRefreshToken() {
        return this.refresh_token;
    }

    setRefreshToken(refresh_token) {
        this.refresh_token = refresh_token;
    }

    validateParams(currentUser) {
        if (currentUser.client_id != undefined) {
            this.client_id = currentUser.client_id;
        } else {
            throw new SignException('Client ID not set');
        }

        if (currentUser.client_secret != undefined) {
            this.client_secret = currentUser.client_secret;
        } else {
            throw new SignException('Client Secret not set');
        }

        if (currentUser.refresh_token != undefined) {
            this.refresh_token = currentUser.refresh_token;
        } else {
            throw new SignException('Refresh Token not set');
        }

        if (currentUser.DC != undefined) {
            if (DC_type.includes(currentUser.DC.toLowerCase())) {
                this.DC = currentUser.DC;
            } else {
                throw new SignException('Invalid DC type');
            }
        } else {
            throw new SignException('DC type not set not set');
        }
        return true;
    }

    generateAccessTokenUsingRefreshToken() {
        let value = this.validateParams(this);
        if (value != true) {
            return value;
        }
        let params = {
            refresh_token: this.refresh_token,
            client_id: this.client_id,
            client_secret: this.client_secret,
            grant_type: 'refresh_token'
        };
        //Fetch api
        return fetch('https://accounts.zoho.' + this.DC + '/oauth/v2/token?' + new URLSearchParams(params), {
            method: 'POST'
        })
            .then((resp) => resp.json())
            .then((res) => {
                if (res['error'] != undefined) {
                    throw new SignException(res['error']);
                }
                this.access_token = res.access_token;
                return res.access_token;
            })
            .catch((err) => {
                throw new SignException('error in generating access token');
            });
    }
}
module.exports = { OAuth, DC_type };
