const fields = require('./Fields');
const Fields = fields.Fields;
// SIGNER = 'SIGN';
// VIEWER = 'VIEW';
// INPERSON = 'INPERSONSIGN';
// APPROVER = 'APPROVER';
// EMAIL = 'EMAIL';
// OFFLINE = 'OFFLINE';
// SMS = 'SMS';
// EMAIL_SMS = 'EMAIL_SMS';
class Actions {
    getResponseValueFromKey(json, key) {
        if (json[key] !== undefined) {
            return json[key];
        }
        return null;
    }
    constructor(response) {
        this.verify_recipient;
        this.is_bulk;
        this.action_id;
        this.action_type;
        this.private_notes;
        this.recipient_email;
        this.signing_order;
        this.recipient_name;
        this.fields; // Object of fields class
        this.deleted_fields = new Array(); // Array of class deleted_fields
        this.recipient_countrycode;
        this.recipient_countrycode_iso;
        this.recipient_phonenumber;
        this.language;
        this.is_embedded;
        this.verification_type;
        this.verification_code;
        this.delivery_mode;
        // used in Templates only
        this.role;
        if (response) {
            this.verify_recipient = this.getResponseValueFromKey(response, 'verify_recipient');
            this.is_bulk = this.getResponseValueFromKey(response, 'is_bulk');
            this.action_id = this.getResponseValueFromKey(response, 'action_id');
            this.action_type = this.getResponseValueFromKey(response, 'action_type');
            this.private_notes = this.getResponseValueFromKey(response, 'private_notes');
            this.recipient_email = this.getResponseValueFromKey(response, 'recipient_email');
            this.signing_order = this.getResponseValueFromKey(response, 'signing_order');
            this.recipient_name = this.getResponseValueFromKey(response, 'recipient_name');
            this.fields = response['fields'] !== undefined ? new Fields(response['fields']) : null;
            this.recipient_countrycode = this.getResponseValueFromKey(response, 'recipient_countrycode');
            this.recipient_countrycode_iso = this.getResponseValueFromKey(response, 'recipient_countrycode_iso');
            this.recipient_phonenumber = this.getResponseValueFromKey(response, 'recipient_phonenumber');
            this.language = this.getResponseValueFromKey(response, 'language');
            this.verification_type = this.getResponseValueFromKey(response, 'verification_type');
            this.verification_code = this.getResponseValueFromKey(response, 'verification_code');
            this.delivery_mode = this.getResponseValueFromKey(response, 'delivery_mode');
            // used in Templates only
            this.deleted_fields = response['deleted_fields'] !== undefined ? response['deleted_fields'] : null;
            this.role = this.getResponseValueFromKey(response, 'role');
            this.is_embedded = this.getResponseValueFromKey(response, 'is_embedded');
        }
    }

    // GETTERS
    getVerifyRecipient() {
        return this.verify_recipient;
    }

    getIsBulk() {
        return this.is_bulk;
    }

    getActionId() {
        return this.action_id;
    }

    getActionType() {
        return this.action_type;
    }

    getPrivateNotes() {
        return this.private_notes;
    }

    getRecipientEmail() {
        return this.recipient_email;
    }

    getActionEmail() {
        return this.recipient_email;
    }

    getSigningOrder() {
        return this.signing_order;
    }

    getRecipientName() {
        return this.recipient_name;
    }
    getActionName() {
        return this.recipient_name;
    }

    getFields() {
        return this.fields;
    }

    getDeletedFields() {
        return this.deleted_fields;
    }

    getRecipientCountrycode() {
        return this.recipient_countrycode;
    }

    getRecipientCountrycodeISO() {
        return this.recipient_countrycode_iso;
    }

    getRecipientPhonenumber() {
        return this.recipient_phonenumber;
    }

    getLanguage() {
        return this.language;
    }

    getVerificationType() {
        return this.verification_type;
    }

    getVerificationCode() {
        return this.verification_code;
    }

    getRole() {
        return this.role;
    }

    getIsEmbedded() {
        return this.is_embedded;
    }

    getDeliveryMode() {
        return this.delivery_mode;
    }

    // SETTERS
    setVerifyRecipient(verify_recipient) {
        this.verify_recipient = verify_recipient;
    }

    setIsBulk(is_bulk) {
        this.is_bulk = is_bulk;
    }

    setActionId(action_id) {
        this.action_id = action_id;
    }

    setActionType(action_type) {
        this.action_type = action_type;
    }

    setPrivateNotes(private_notes) {
        this.private_notes = private_notes;
    }

    setRecipientEmail(recipient_email) {
        this.recipient_email = recipient_email;
    }

    setActionEmail(recipient_email) {
        this.recipient_email = recipient_email;
    }

    setSigningOrder(signing_order) {
        this.signing_order = signing_order;
    }

    setRecipientName(recipient_name) {
        this.recipient_name = recipient_name;
    }
    setActionName(recipient_name) {
        this.recipient_name = recipient_name;
    }

    setFields(fields) {
        this.fields = fields;
    }

    setDeletedFields(deleted_fields) {
        this.deleted_fields.push(deleted_fields);
    }

    setRecipientCountrycode(recipient_countrycode) {
        this.recipient_countrycode = recipient_countrycode;
    }

    setRecipientCountrycodeISO(recipient_countrycode_iso) {
        this.recipient_countrycode_iso = recipient_countrycode_iso;
    }

    setRecipientPhonenumber(recipient_phonenumber) {
        this.recipient_phonenumber = recipient_phonenumber;
    }

    setLanguage(language) {
        this.language = language;
    }

    setVerificationType(verification_type) {
        this.verification_type = verification_type;
    }

    setVerificationCode(verification_code) {
        this.verification_code = verification_code;
    }

    setRole(role) {
        this.role = role;
    }

    setIsEmbedded(is_embedded) {
        this.is_embedded = is_embedded;
    }

    setDeliveryMode(delivery_mode) {
        this.delivery_mode = delivery_mode;
    }

    constructJson() {
        let response = {};
        response['verify_recipient'] = this.verify_recipient;
        response['is_bulk'] = this.is_bulk;
        response['action_id'] = this.action_id;
        response['action_type'] = this.action_type;
        response['private_notes'] = this.private_notes;
        response['recipient_email'] = this.recipient_email;
        response['signing_order'] = this.signing_order;
        response['recipient_name'] = this.recipient_name;
        response['fields'] = this.fields != null ? this.fields.constructJson() : null;
        if (Array.isArray(this.deleted_fields) && this.deleted_fields.length > 0) {
            response['deleted_fields'] = this.deleted_fields;
        }
        response['recipient_countrycode'] = this.recipient_countrycode;
        response['recipient_countrycode_iso'] = this.recipient_countrycode_iso;
        response['recipient_phonenumber'] = this.recipient_phonenumber;
        response['verification_type'] = this.verification_type;
        response['verification_code'] = this.verification_code;
        response['is_embedded'] = this.is_embedded;
        response['language'] = this.language;
        response['delivery_mode'] = this.delivery_mode;
        // only for templates
        response['role'] = this.role;
        let obj = {};
        Object.keys(response).forEach((v) => {
            if (response[v]) {
                obj[v] = response[v];
            }
        });
        return obj;
    }
}
module.exports = { Actions };
