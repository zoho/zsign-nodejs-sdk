// 'Date' and 'CustomDate';
const textProperty = require('./TextProperty');
const TextProperty = textProperty.TextProperty;
const fieldSettersAndGetters = require('../FieldSettersAndGetters');
const FieldSettersAndGetters = fieldSettersAndGetters.FieldSettersAndGetters;
class DateField extends FieldSettersAndGetters {
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
            this.field_type_name = this.getResponseValueFromKey(response, 'field_type_name');
            this.abs_height = this.getResponseValueFromKey(response, 'abs_height');
            this.text_property =
                response['text_property'] !== undefined ? new TextProperty(response['text_property']) : {};
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
            this.date_format = this.getResponseValueFromKey(response, 'date_format');
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
        if (this.text_property) {
            response['text_property'] = this.text_property.constructJson();
        }
        return response;
    }
}
module.exports = { DateField };
