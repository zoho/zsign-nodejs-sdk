const ATTACHMENT = 'Attachment';
const fieldSettersAndGetters = require('../FieldSettersAndGetters');
const FieldSettersAndGetters = fieldSettersAndGetters.FieldSettersAndGetters;
class AttachmentField extends FieldSettersAndGetters {
    getResponseValueFromKey(json, key) {
        if (json[key] !== undefined) {
            return json[key];
        }
        return null;
    }
    constructor(response) {
        super();
        if (response) {
            this.field_id = this.getResponseValueFromKey(response, 'field_id');
            this.x_coord = this.getResponseValueFromKey(response, 'x_coord');
            this.field_type_id = this.getResponseValueFromKey(response, 'field_type_id');
            this.field_type_name = response['field_type_name'] !== undefined ? response['field_type_name'] : ATTACHMENT;
            this.abs_height = this.getResponseValueFromKey(response, 'abs_height');
            this.field_category = this.getResponseValueFromKey(response, 'field_category');
            this.field_label = this.getResponseValueFromKey(response, 'field_label');
            this.is_mandatory = this.getResponseValueFromKey(response, 'is_mandatory');
            this.page_no = this.getResponseValueFromKey(response, 'page_no');
            this.document_id = this.getResponseValueFromKey(response, 'document_id');
            this.field_name = this.getResponseValueFromKey(response, 'field_name');
            this.y_value = this.getResponseValueFromKey(response, 'y_value');
            this.abs_width = this.getResponseValueFromKey(response, 'abs_width');
            this.action_id = this.getResponseValueFromKey(response, 'action_id');
            this.width = this.getResponseValueFromKey(response, 'width');
            this.y_coord = this.getResponseValueFromKey(response, 'y_coord');
            this.description_tooltip = this.getResponseValueFromKey(response, 'description_tooltip');
            this.x_value = this.getResponseValueFromKey(response, 'x_value');
            this.height = this.getResponseValueFromKey(response, 'height');
        }
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
module.exports = { AttachmentField };
