const fetch = require('node-fetch');
const download = require('download');
const signException = require('./SignException');
const SignException = signException.SignException;
const fs = require('fs');
const path = require('path');
const UpdateOAuth = require('./UpdateOAuth');
const updateAccessToken = UpdateOAuth.updateAccessToken;
const oauth = require('./Oauth');
const DC_type = oauth.DC_type;
const methods = ['GET', 'POST', 'PUT', 'DELETE'];

function ApiClient() {

    function callSignAPI(
        currentUser,
        api,
        method,
        queryparams = null,
        postData = null,
        file_path = null,
        authorizedCall = true,
        download = false
    ) {
        if (DC_type.includes(currentUser.DC.toLowerCase())) {
            this.DC = currentUser.DC;
        } else {
            throw new SignException('Invalid DC type');
        }

        if (!methods.includes(method)) {
            throw new SignException('Invalid method');
        }
        let URL = currentUser.getBaseURL() + api;
        return makeCall(currentUser, URL, method, queryparams, postData, file_path, authorizedCall, download);
    }

    async function makeCall(
        currentUser,
        URL,
        method,
        queryparams,
        postData,
        file_path,
        authorizedCall,
        download
    ) {
        if (queryparams) {
            if (URL.indexOf('?')) {
                URL += '?' + new URLSearchParams(queryparams).toString();
            } else {
                URL += '&' + new URLSearchParams(queryparams).toString();
            }
        }
        let access_token = currentUser.getAccessToken();
        if ((authorizedCall && access_token == '') || access_token === undefined) {
            let resp = await currentUser.generateAccessTokenUsingRefreshToken();
            updateAccessToken(accessToken); 
            throw new SignException('Authorization Missing(Access Token/ Refresh Token)');
        }

        let HEADERS = {};
        if (authorizedCall) {
            HEADERS['Authorization'] = 'Zoho-oauthtoken ' + currentUser.getAccessToken();
        }

        let requestOptions = {
            method: method,
            headers: HEADERS,
            body: postData
        };
        return fetch(URL, requestOptions)
            .then((_res) => {
                if (download) {
                    let contentDisposition = _res.headers.get('content-disposition');
                    if (contentDisposition !== null) {
                        let filename = contentDisposition
                            .split(';')[1]
                            .split('=')[1]
                            .replace(/\"/g, '')
                            .replace("UTF-8''", '');
                        let filepath = file_path;
                        if (!fs.existsSync(filepath + filename)) {
                            fs.mkdirSync(filepath, { recursive: true });
                        }
                        let fileStream = fs.createWriteStream(path.join(filepath, filename));
                        _res.body.pipe(fileStream);
                        return _res;
                    }
                }
                return _res.json().then((responseJson) => {
                    return validateResponse(_res, responseJson, currentUser, URL, authorizedCall);
                });
            })
            .catch((error) => {
                throw error;
            });
    }

    async function validateResponse(_res, responseJson, currentUser, URL, authorizedCall) {
        let http_code_msg = 'HTTP Code : ' + _res.status + '. ';
        if (authorizedCall) {
            switch (_res.status) {
                case 0:
                    throw new SignException('Call failed to initiate from client', http_code_msg);
                // return http_code_msg + 'Message : Call failed to initiate from client';
                case 200:
                    if (responseJson.code == 0) {
                        return responseJson;
                    } else {
                        let errorMessage = constructErrorMessageFromAPIResponse(responseJson);
                        throw new SignException(errorMessage, http_code_msg);
                    }
                case 400:
                    if (responseJson.code) {
                        let errorMessage = constructErrorMessageFromAPIResponse(responseJson);
                        throw new SignException(errorMessage, http_code_msg);
                    } else {
                        throw new SignException('Bad Request on ' + URL, http_code_msg);
                    }
                case 401:
                    //Unauthorised Access
                    if (authorizedCall) {
                        // if authorized call and 401, refresh token ..
                        // Access token Expired
                        let accessToken = await currentUser.generateAccessTokenUsingRefreshToken();
                        updateAccessToken(accessToken); //use this method to store access token
                        let errorMessage = constructErrorMessageFromAPIResponse(responseJson);
                        throw new SignException(errorMessage.message, http_code_msg);
                    } else {
                        return _res.message + ' ' + _res.status;
                    }
                default:
                    let resp = responseJson;
                    let err = http_code_msg + ' | Message : ' + resp.message ? resp.message : resp + ' | ';
                    throw new SignException(err, resp.code ? resp.code : -1);
            }
        }
    }

    function constructErrorMessageFromAPIResponse(response) {
        let errorMessage = response;
        return errorMessage;
    }
    return { callSignAPI, constructErrorMessageFromAPIResponse };
}

module.exports = { ApiClient };
