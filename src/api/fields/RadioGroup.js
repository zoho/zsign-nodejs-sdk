const RADIOGROUP = 'Radiogroup';
const fieldSettersAndGetters = require('../FieldSettersAndGetters');
const FieldSettersAndGetters = fieldSettersAndGetters.FieldSettersAndGetters;
const radioField = require('./RadioField');
const RadioField = radioField.RadioField;
class RadioGroup extends FieldSettersAndGetters{
    getResponseValueFromKey(json, key) {
        if (json[key] !== undefined) {
            return json[key];
        }
        return null;
    }

    constructor(response) {
		super();
        this.sub_fields = new Array();
        if (response) {
            this.field_id = this.getResponseValueFromKey(response, 'field_id');
            this.field_type_id = this.getResponseValueFromKey(response, 'field_type_id');
            this.field_type_name = response['field_type_name'] !== undefined ? response['field_type_name'] : RADIOGROUP;
            this.action_id = this.getResponseValueFromKey(response, 'action_id');
            this.field_category = this.getResponseValueFromKey(response, 'field_category');
            this.field_label = this.getResponseValueFromKey(response, 'field_label');
            this.is_mandatory = this.getResponseValueFromKey(response, 'is_mandatory');
            this.is_read_only = this.getResponseValueFromKey(response, 'is_read_only');
            this.page_no = this.getResponseValueFromKey(response, 'page_no');
            this.description_tooltip = this.getResponseValueFromKey(response, 'description_tooltip');
            this.document_id = this.getResponseValueFromKey(response, 'document_id');
            this.field_name = this.getResponseValueFromKey(response, 'field_name');
            if (response['sub_fields'] !== undefined) {
                response['sub_fields'].forEach((obj) => {
                    this.sub_fields.push(new RadioField(obj));
                });
            }
        }
    }

    getSubFields() {
        return this.sub_fields;
    }
    addSubField(sub_field) {
        this.sub_fields.push(sub_field);
    }

    setSubFields(sub_fields) {
        this.sub_fields = sub_fields;
    }

    constructJson() {
        let response = {};
        const Obj = Object.entries(this);
        for (const [key, value] of Obj) {
            if (key !== null && value != null) {
                response[key] = value;
            }
        }
        let sub_fieldsArr = new Array();
        this.sub_fields.forEach((obj) => {
            sub_fieldsArr.push(obj.constructJson());
        });
        response['sub_fields'] = sub_fieldsArr.length != 0 ? sub_fieldsArr : {};
        return response;
    }
}
module.exports = { RadioGroup };
