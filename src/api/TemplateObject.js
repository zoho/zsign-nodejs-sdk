const document = require('./Documents');
const Documents = document.Documents;

const action = require('./Action');
const Actions = action.Actions;

const templateDocumentFields = require('./TemplateDocumentFields');
const TemplateDocumentFields = templateDocumentFields.TemplateDocumentFields;

const prefillField = require('./PrefillField');
const PrefillField = prefillField.PrefillField;

const s = require('../SignException');
const SignException = s.SignException;

class TemplateObject {
    getResponseValueFromKey(json, key) {
        if (json[key] !== undefined) {
            return json[key];
        }
        return null;
    }
    constructor(response = null) {
        this.document_ids = new Array();
        this.actions = new Array();
        if (response) {
            if (response['document_ids'] !== undefined) {
                response['document_ids'].forEach((obj) => {
                    this.document_ids.push(new Documents(obj));
                });
            }
            if (response['actions'] !== undefined) {
                response['actions'].forEach((obj) => {
                    this.actions.push(new Actions(obj));
                });
            }

            this.created_time = this.getResponseValueFromKey(response, 'created_time');
            this.modified_time = this.getResponseValueFromKey(response, 'modified_time');
            this.template_id = this.getResponseValueFromKey(response, 'template_id');
            this.template_name = this.getResponseValueFromKey(response, 'template_name');
            this.email_reminders = this.getResponseValueFromKey(response, 'email_reminders');
            this.notes = this.getResponseValueFromKey(response, 'notes');
            this.reminder_period = this.getResponseValueFromKey(response, 'reminder_period');
            this.expiration_days = this.getResponseValueFromKey(response, 'expiration_days');
            this.is_sequential = this.getResponseValueFromKey(response, 'is_sequential');
            this.description = this.getResponseValueFromKey(response, 'description');
            this.validity = this.getResponseValueFromKey(response, 'validity');
            this.request_type_id = this.getResponseValueFromKey(response, 'request_type_id');
            this.request_type_name = this.getResponseValueFromKey(response, 'request_type_name');
            this.folder_id = this.getResponseValueFromKey(response, 'folder_id');
            this.self_sign = this.getResponseValueFromKey(response, 'self_sign');
            this.bulk_actions = this.getResponseValueFromKey(response, 'bulk_actions');
            this.is_bulk = this.getResponseValueFromKey(response, 'is_bulk');
            this.bulk_template_id = this.getResponseValueFromKey(response, 'bulk_template_id');
            this.custom_data =
                response['custom_data'] !== undefined ? response['custom_data'] : 'Sent Using Zoho Sign NODE JS  SDK.';
            this.owner_email = this.getResponseValueFromKey(response, 'owner_email');
            this.owner_first_name = this.getResponseValueFromKey(response, 'owner_first_name');
            this.owner_last_name = this.getResponseValueFromKey(response, 'owner_last_name');
            this.owner_id = this.getResponseValueFromKey(response, 'owner_id');

            this.field_text_data = {};
            this.field_boolean_data = {};
            this.field_date_data = {};
            this.field_radio_data = {};
            this.document_fields = new Array();

            if (response['document_fields'] !== undefined) {
                response['document_fields'].forEach(
                    (
                        obj // obj = templates>docuemnt_fields>fields[i] = field
                    ) => {
                        this.document_fields.push(new TemplateDocumentFields(obj));
                        obj['fields'].forEach((field) => {
                            switch (field['field_category']) {
                                case 'checkbox':
                                    this.field_boolean_data[field['field_label']] = new PrefillField(field);
                                    break;
                                case 'textfield':
                                case 'dropdown':
                                    this.field_text_data[field['field_label']] = new PrefillField(field);
                                    break;
                                case 'datefield':
                                    this.field_date_data[field['field_label']] = new PrefillField(field);
                                case 'radiofield':
                                    this.field_radio_data[field['field_label']] = new PrefillField(field);
                                    break;
                            }
                        });
                    }
                );
            }
        }
    }

    // --------- GETTERS ---------

    getTemplateId() {
        return this.template_id;
    }

    getTemplateName() {
        return this.template_name;
    }

    getSelfSign() {
        return this.self_sign;
    }

    getAutomaticReminders() {
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

    getCreatedTime() {
        return this.created_time;
    }

    getModifiedTime() {
        return this.modified_time;
    }

    getDocumentFields() {
        return this.document_fields;
    }

    getRequestName() {
        return this.request_name;
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
    // --------- SETTERS ---------

    setTemplateId(template_id) {
        this.template_id = template_id;
    }

    setTemplateName(template_name) {
        this.template_name = template_name;
    }

    setSelfSign(self_sign) {
        this.self_sign = self_sign;
    }

    setAutomaticReminders(email_reminders) {
        // alias : Email reminders
        this.email_reminders = email_reminders;
    }

    setEmailReminders(email_reminders) {
        // DUPLICATE
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

    setCreatedTime(created_time) {
        this.created_time = created_time;
    }

    setModifiedTime(modified_time) {
        this.modified_time = modified_time;
    }

    setRequestName(requestName) {
        this.request_name = requestName;
    }

    /// ------------ FIELD DATA MANIPULATION FUNCITONS ------------

    // get pre-fill data (All or a specific label)

    getPrefillTextField(field_label = null) {
        if (field_label) {
            return this.field_text_data;
        } else {
            return this.field_text_data[field_label];
        }
    }

    getPrefillBooleanField(field_label = null) {
        if (field_label) {
            return this.field_boolean_data;
        } else {
            return this.field_boolean_data[field_label];
        }
    }

    getPrefillDateField(field_label = null) {
        if (field_label) {
            return this.field_date_data;
        } else {
            return this.field_date_data[field_label];
        }
    }

    getFieldRadioData() {
        return this.field_radio_data;
    }

    // -------- setters ---------
    setPrefillTextField(label, value) {
        this.field_text_data[label] = value;
    }

    setPrefillBooleanField(label, value) {
        this.field_boolean_data[label] = value;
    }

    setPrefillDateField(label, value) {
        this.field_date_data[label] = value;
    }

    setPrefillRadioField(label, value) {
        this.field_radio_data[label] = value;
    }

    /// ------------ ACTION DATA MANIPULATION FUNCITONS ------------
    getActionByRole(role) {
        let actionValue;
        this.actions.forEach((action) => {
            if (action.getRole() == role) {
                actionValue = action;
                return;
            }
        });
        if (!actionValue) {
            throw new SignException('Invalid Role Name');
        } else {
            return actionValue;
        }
    }

    // -------- construct  -------

    constructJson() {
        // template_id not to be included
        let response = {};
        response['template_name'] = this.template_name;
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
        if (response['deleted_actions'] != undefined)
            response['deleted_actions'] = this.deleted_actions.length != 0 ? this.deleted_actions : null;
        response['folder_id'] = this.folder_id;
        response['bulk_actions'] = this.bulk_actions;
        response['is_bulk'] = this.is_bulk;

        let obj = {};
        Object.keys(response).forEach((v) => {
            if (response[v] !== undefined && response[v] !== null) {
                obj[v] = response[v];
            }
        });
        return obj;
    }

    constructJsonForSubmit() {
        let field_text_data_Obj = {};
        Object.keys(this.field_text_data).forEach((obj) => {
            field_text_data_Obj[obj] = this.field_text_data[obj];
        });

        let field_boolean_data_Obj = {};
        Object.keys(this.field_boolean_data).forEach((obj) => {
            field_boolean_data_Obj[obj] = this.field_boolean_data[obj];
        });

        let field_date_data_Obj = {};
        Object.keys(this.field_date_data).forEach((obj) => {
            field_date_data_Obj[obj] = this.field_date_data[obj];
        });

        let field_radio_data_Obj = {};
        Object.keys(this.field_radio_data).forEach((obj) => {
            field_radio_data_Obj[obj] = this.field_radio_data[obj];
        });

        let field_data = {}; //new add
        field_data.field_text_data = field_text_data_Obj == null ? {} : field_text_data_Obj;
        field_data.field_boolean_data = field_boolean_data_Obj == null ? {} : field_boolean_data_Obj;
        field_data.field_date_data = field_date_data_Obj == null ? {} : field_date_data_Obj;
        field_data.field_radio_data = field_radio_data_Obj == null ? {} : field_radio_data_Obj;

        let actionsArr = new Array();
        this.actions.forEach((obj) => {
            obj.setFields(null);
            actionsArr.push(obj.constructJson());
        });

        var templates = {};
        templates['field_data'] = field_data;
        actionsArr = actionsArr.length != 0 ? actionsArr : null;
        templates['actions'] = actionsArr;
        templates['notes'] = this.notes;
        let request_name;
        if (this.request_name != null && this.request_name != '') {
            request_name = this.request_name;
        } else {
            request_name = this.template_name;
        }
        templates['request_name'] = request_name;
        templates['custom_data'] = this.custom_data;
        templates['is_bulk'] = this.is_bulk;
        return templates;
    }
}
module.exports = { TemplateObject };
