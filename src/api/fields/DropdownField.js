const DROPDOWN = 'Dropdown';
const t = require('./TextProperty');
const TextProperty = t.TextProperty;
const dropdownValues = require('./DropdownValues');
const DropdownValues = dropdownValues.DropdownValues;
const fieldSettersAndGetters = require('../FieldSettersAndGetters');
const FieldSettersAndGetters = fieldSettersAndGetters.FieldSettersAndGetters;
class DropdownField extends FieldSettersAndGetters {
    getResponseValueFromKey(json, key) {
        if (json[key] !== undefined) {
            return json[key];
        }
        return null;
    }

    constructor(response) {
        super();
        this.dropdown_values = new Array();
        if (response) {
            this.field_id = this.getResponseValueFromKey(response, 'field_id');
            this.x_coord = this.getResponseValueFromKey(response, 'x_coord');
            this.field_type_id = this.getResponseValueFromKey(response, 'field_type_id');
            this.field_type_name = response['field_type_name'] !== undefined ? response['field_type_name'] : DROPDOWN;
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
            this.description_tooltip = this.getResponseValueFromKey(response, 'description_tooltip');
            this.x_value = this.getResponseValueFromKey(response, 'x_value');
            this.height = this.getResponseValueFromKey(response, 'field_id');
            if (response['dropdown_values'] !== undefined) {
                response['dropdown_values'].forEach((obj) => {
                    this.dropdown_values.push(new DropdownValues(obj));
                });
            }
        }
    }
    getDropdownValues() {
        return this.dropdown_values;
    }

    addDropdownValues(dropdown_values) {
        this.dropdown_values.push(dropdown_values);
    }

    setDropdownValues(dropdown_values) {
        this.dropdown_values = dropdown_values;
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
        let dropdown_valuesArr = new Array();
        this.dropdown_values.forEach((obj) => {
            dropdown_valuesArr.push(obj.constructJson());
        });
        response['dropdown_values'] = dropdown_valuesArr.length != 0 ? dropdown_valuesArr : null;
        return response;
    }
}
module.exports = { DropdownField };
