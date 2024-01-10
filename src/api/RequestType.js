class RequestType {
    getResponseValueFromKey(json, key) {
        if (json[key] !== undefined) {
            return json[key];
        }
        return null;
    }
    constructor(response) {
        this.request_type_id;
        this.request_type_name;
        this.request_type_description;
        if (response) {
            this.request_type_id = this.getResponseValueFromKey(response, 'request_type_id');
            this.request_type_name = this.getResponseValueFromKey(response, 'request_type_name');
            this.request_type_description = this.getResponseValueFromKey(response, 'request_type_description');
        }
    }

    getRequestTypeId() {
        return this.request_type_id;
    }

    getRequestTypeName() {
        return this.request_type_name;
    }

    getRequestTypeDescription() {
        return this.request_type_description;
    }

    setRequestTypeId(request_type_id) {
        this.request_type_id = request_type_id;
    }

    setRequestTypeName(request_type_name) {
        this.request_type_name = request_type_name;
    }

    setRequestTypeDescription(request_type_description) {
        this.request_type_description = request_type_description;
    }

    constructJson() {
        let response = {};
        response['request_type_id'] = this.request_type_id !== undefined ? this.request_type_id : null;
        response['request_type_name'] = this.request_type_name;
        response['request_type_description'] = this.request_type_description;
        let obj = {};
        Object.keys(response).forEach((v) => {
            if (response[v]) {
                obj[v] = response[v];
            }
        });
        let response1 = {};
        response1['request_types'] = obj;

        return response1;
    }
}
module.exports = { RequestType };
