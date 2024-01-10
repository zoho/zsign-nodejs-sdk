const action = require('./Action');
const Actions = action.Actions;

class Documents {
    getResponseValueFromKey(json, key) {
        if (json[key] !== undefined) {
            return json[key];
        }
        return null;
    }
    constructor(response) {
        this.document_name = this.getResponseValueFromKey(response, 'document_name');
        this.document_order = this.getResponseValueFromKey(response, 'document_order');
        this.document_id = this.getResponseValueFromKey(response, 'document_id');
    }
    getDocumentName() {
        return this.document_name;
    }

    getDocumentOrder() {
        return this.document_order;
    }

    getDocumentId() {
        return this.document_id;
    }

    setDocumentName(document_name) {
        this.document_name = document_name;
    }

    setDocumentOrder(document_order) {
        this.document_order = document_order;
    }

    setDocumentId(document_id) {
        this.document_id = document_id;
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
module.exports = { Documents };
