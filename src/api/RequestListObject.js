const D = require('./Documents');
const Documents = D.Documents;
class RequestListObject {
    getResponseValueFromKey(json, key) {
        if (json[key] !== undefined) {
            return json[key];
        }
        return null;
    }

    constructor(response) {
        this.ishost;
        this.request_status;
        this.document_ids = new Array();
        this.notes;
        this.action_type;
        this.sign_id;
        this.private_notes;
        this.my_status;
        this.my_request_id;
        this.requester_email;
        this.request_name;
        this.requested_time;
        this.action_time;
        this.request_type_name;
        this.org_name;
        this.expire_by;
        this.requester_name;

        if (response) {
            this.ishost = this.getResponseValueFromKey(response, 'ishost');
            this.request_status = this.getResponseValueFromKey(response, 'request_status');
            this.notes = this.getResponseValueFromKey(response, 'notes');
            this.action_type = this.getResponseValueFromKey(response, 'action_type');
            this.sign_id = this.getResponseValueFromKey(response, 'sign_id');
            this.private_notes = this.getResponseValueFromKey(response, 'private_notes');
            this.my_status = this.getResponseValueFromKey(response, 'my_status');
            this.my_request_id = this.getResponseValueFromKey(response, 'my_request_id');
            this.requester_email = this.getResponseValueFromKey(response, 'requester_email');
            this.request_name = this.getResponseValueFromKey(response, 'request_name');
            this.requested_time = this.getResponseValueFromKey(response, 'requested_time');
            this.action_time = this.getResponseValueFromKey(response, 'action_time');
            this.request_type_name = this.getResponseValueFromKey(response, 'request_type_name');
            this.org_name = this.getResponseValueFromKey(response, 'org_name');
            this.expire_by = this.getResponseValueFromKey(response, 'expire_by');
            this.requester_name = this.getResponseValueFromKey(response, 'requester_name');

            this.document_ids = new Array();
            if (response['document_ids'] !== undefined) {
                response['document_ids'].forEach((obj) => {
                    this.document_ids.push(new Documents(obj));
                });
            }
        }
    }

    // Getters

    getRequestId() {
        return this.request_id;
    }

    getIsHost() {
        return this.ishost;
    }

    getRequestStatus() {
        return this.request_status;
    }

    getDocumentIds() {
        return this.document_ids;
    }
    getNotes() {
        return this.notes;
    }
    getActionType() {
        return this.action_type;
    }
    getSignId() {
        return this.sign_id;
    }

    getPrivateNotes() {
        return this.private_notes;
    }

    getMyStatus() {
        return this.my_status;
    }

    getRequesterEmail() {
        return this.requester_email;
    }

    getRequestName() {
        return this.request_name;
    }

    getRequestTime() {
        return this.requested_time;
    }

    getActionTime() {
        return this.action_time;
    }

    getRequestTypeName() {
        return this.request_type_name;
    }

    getOrgName() {
        return this.org_name;
    }

    getExpireBy() {
        return this.expire_by;
    }

    getRequesterName() {
        return this.requester_name;
    }
}
module.exports = { RequestListObject };
