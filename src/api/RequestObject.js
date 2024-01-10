const D = require('./Documents');
const Documents = D.Documents;
const A = require('./Action');
const Actions = A.Actions;
class RequestObject {
    getResponseValueFromKey(json, key) {
        if (json[key] !== undefined) {
            return json[key];
        }
        return null;
    }

    constructor(response) {
        this.request_id; //not part of constructedJSON;
        this.request_status;
        this.owner_email;
        this.owner_first_name;
        this.owner_id;
        this.owner_last_name;
        this.created_time;
        this.modified_time;
        this.request_name;
        this.email_reminders;
        this.document_ids = new Array(); // Array of class document_ids
        this.notes;
        this.reminder_period;
        this.expiration_days;
        this.is_sequential;
        this.description;
        this.validity;
        this.request_type_id;
        this.actions = new Array(); // Array of class actions
        this.deleted_actions = new Array(); // Array of class deleted_actions
        //to include
        this.folder_id;
        this.self_sign;
        this.expiration_alert_period;
        this.bulk_actions;
        this.is_bulk;
        this.custom_data;
        this.redirect_pages;
        if (response) {
            this.request_id = this.getResponseValueFromKey(response, 'request_id');
            this.request_status = this.getResponseValueFromKey(response, 'request_status');
            this.request_name = this.getResponseValueFromKey(response, 'request_name');
            this.email_reminders = this.getResponseValueFromKey(response, 'email_reminders');
            this.notes = this.getResponseValueFromKey(response, 'notes');
            this.reminder_period = this.getResponseValueFromKey(response, 'reminder_period');
            this.expiration_days = this.getResponseValueFromKey(response, 'expiration_days');
            this.is_sequential = this.getResponseValueFromKey(response, 'is_sequential');
            this.description = this.getResponseValueFromKey(response, 'description');
            this.validity = this.getResponseValueFromKey(response, 'validity');
            this.request_type_id = this.getResponseValueFromKey(response, 'request_type_id');
            this.folder_id = this.getResponseValueFromKey(response, 'folder_id');
            this.self_sign = this.getResponseValueFromKey(response, 'self_sign');
            this.bulk_actions = this.getResponseValueFromKey(response, 'bulk_actions');
            this.is_bulk = this.getResponseValueFromKey(response, 'is_bulk');
            this.bulk_request_id = this.getResponseValueFromKey(response, 'bulk_request_id');
            this.custom_data =
                response['custom_data'] !== undefined ? response['custom_data'] : 'Sent Using Zoho Sign NODE JS  SDK.';
            this.owner_email = this.getResponseValueFromKey(response, 'owner_email');
            this.owner_first_name = this.getResponseValueFromKey(response, 'owner_first_name');
            this.owner_last_name = this.getResponseValueFromKey(response, 'owner_last_name');
            this.owner_id = this.getResponseValueFromKey(response, 'owner_id');
            this.created_time = this.getResponseValueFromKey(response, 'created_time');
            this.modified_time = this.getResponseValueFromKey(response, 'modified_time');

            this.deleted_actions = response['deleted_actions'] !== undefined ? response['deleted_actions'] : null;

            this.document_ids = new Array();
            if (response['document_ids'] !== undefined) {
                response['document_ids'].forEach((obj) => {
                    this.document_ids.push(new Documents(obj));
                });
            }

            this.actions = new Array();
            if (response['actions'] !== undefined) {
                response['actions'].forEach((obj) => {
                    this.actions.push(new Actions(obj));
                });
            }
        }
    }

    // Getters

    getRequestId() {
        return this.request_id;
    }

    getRequestStatus() {
        return this.request_status;
    }

    getRequestName() {
        return this.request_name;
    }

    getSelfSign() {
        return this.self_sign;
    }

    getAutomaiticReminders() {
        // alias : Email reminders
        return this.email_reminders;
    }

    getDocumentIds() {
        return this.document_ids;
    }

    getNotes() {
        return this.notes;
    }

    getReminderPeriod() {
        return this.reminder_period;
    }

    getRedirectPages() {
        return this.redirect_pages;
    }

    getExpirationDays() {
        return this.expiration_days;
    }

    getSequentialSigning() {
        return this.is_sequential;
    }

    getDescription() {
        return this.description;
    }

    getValidity() {
        return this.validity;
    }

    getRequestTypeId() {
        return this.request_type_id;
    }

    getActions() {
        return this.actions;
    }

    getDeleted_actions() {
        return this.deleted_actions;
    }

    getPageNum() {
        return this.page_num;
    }

    getExpirationAlertPeriod() {
        return this.expiration_alert_period;
    }

    getBulkActions() {
        return this.bulk_actions;
    }

    getIsBulk() {
        return this.is_bulk;
    }

    getCustomData() {
        return this.custom_data;
    }

    getOwnerEmail() {
        return this.owner_email;
    }

    getOwnerFirstName() {
        return this.owner_first_name;
    }

    getOwnerId() {
        return this.owner_id;
    }

    getOwnerLastName() {
        return this.owner_last_name;
    }

    getCreatedTime() {
        return this.created_time;
    }

    getModifiedTime() {
        return this.modified_time;
    }

    getFolderId() {
        return this.folder_id;
    }
    // Setters

    setRequestId(request_id) {
        this.request_id = request_id;
    }

    setRequestName(request_name) {
        this.request_name = request_name;
    }

    setSelfSign(self_sign) {
        this.self_sign = self_sign;
    }

    setAutomaticReminders(email_reminders) {
        // alias : Email reminders
        this.email_reminders = email_reminders;
    }

    setDocumentIds(document_ids) {
        this.document_ids.push(document_ids);
    }

    setNotes(notes) {
        this.notes = notes;
    }

    setReminderPeriod(reminder_period) {
        this.reminder_period = reminder_period;
    }

    setExpirationDays(expiration_days) {
        this.expiration_days = expiration_days;
    }

    setSequentialSigning(is_sequential) {
        this.is_sequential = is_sequential;
    }

    setDescription(description) {
        this.description = description;
    }

    setValidity(validity) {
        this.validity = validity;
    }

    setRequestTypeId(request_type_id) {
        this.request_type_id = request_type_id;
    }

    setRedirectPages(redirect_pages) {
        this.redirect_pages = redirect_pages;
    }

    addAction(action) {
        this.actions.push(action);
    }

    setActions(actions) {
        this.actions = actions;
    }

    setDeletedActions(deleted_actions) {
        this.deleted_actions.push(deleted_actions);
    }

    setPageNum(page_num) {
        this.page_num = page_num;
    }

    setExpirationAlertPeriod() {
        this.expiration_alert_period = expiration_alert_period;
    }

    setBulkActions(bulk_actions) {
        this.bulk_actions = bulk_actions;
    }

    setIsBulk(is_bulk) {
        this.is_bulk = is_bulk;
    }

    setCustomData(custom_data) {
        this.custom_data = custom_data;
    }

    setFolderId(folder_id) {
        this.folder_id = folder_id;
    }

    constructJson() {
        // request_id not to be included
        let response = {};
        response['request_name'] = this.request_name;
        response['email_reminders'] = this.email_reminders;

        let document_idsArr = new Array();
        this.document_ids.forEach((obj) => {
            document_idsArr.push(obj.constructJson());
        });

        response['document_ids'] = document_idsArr.length != 0 ? document_idsArr : null;
        response['notes'] = this.notes;
        response['reminder_period'] = this.reminder_period;
        response['expiration_days'] = this.expiration_days;
        response['is_sequential'] = this.is_sequential;
        response['description'] = this.description;
        response['validity'] = this.validity;
        response['request_type_id'] = this.request_type_id;

        let actionsArr = new Array();
        this.actions.forEach((obj) => {
            actionsArr.push(obj.constructJson());
        });
        response['actions'] = actionsArr.length != 0 ? actionsArr : null;
        if (Array.isArray(this.deleted_actions) && this.deleted_actions.length > 0) {
            response['deleted_actions'] = this.deleted_actions;
        }
        response['redirect_pages'] = this.redirect_pages == null ? null : this.redirect_pages.constructJson();

        response['folder_id'] = this.folder_id;
        response['self_sign'] = this.self_sign;
        response['bulk_actions'] = this.bulk_actions;
        response['is_bulk'] = this.is_bulk;
        response['custom_data'] = this.custom_data;

        let obj = {};
        Object.keys(response).forEach((v) => {
            if (response[v]) {
                obj[v] = response[v];
            }
        });
        return obj;
    }
}
module.exports = { RequestObject };
