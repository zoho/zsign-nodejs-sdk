const fieldSettersAndGetters = require('../FieldSettersAndGetters');
const FieldSettersAndGetters = fieldSettersAndGetters.FieldSettersAndGetters;
class RadioField extends FieldSettersAndGetters {
    getResponseValueFromKey(json, key) {
        if (json[key] !== undefined) {
            return json[key];
        }
        return null;
    }

    constructor(response) {
        super();
        if (response) {
            this.y_value = this.getResponseValueFromKey(response, 'y_value');
            this.x_coord = this.getResponseValueFromKey(response, 'x_coord');
            this.abs_width = this.getResponseValueFromKey(response, 'abs_width');
            this.abs_height = this.getResponseValueFromKey(response, 'abs_height');
            this.width = this.getResponseValueFromKey(response, 'width');
            this.sub_field_id = this.getResponseValueFromKey(response, 'sub_field_id');
            this.y_coord = this.getResponseValueFromKey(response, 'y_coord');
            this.default_value = this.getResponseValueFromKey(response, 'default_value');
            this.page_no = this.getResponseValueFromKey(response, 'page_no');
            this.sub_field_name = this.getResponseValueFromKey(response, 'sub_field_name');
            this.x_value = this.getResponseValueFromKey(response, 'x_value');
            this.height = this.getResponseValueFromKey(response, 'height');
        }
    }

    getSubFieldId() {
        return this.sub_field_id;
    }

    getSubFieldName() {
        return this.sub_field_name;
    }

    setSubFieldId(sub_field_id) {
        this.sub_field_id = sub_field_id;
    }

    setSubFieldName(sub_field_name) {
        this.sub_field_name = sub_field_name;
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
module.exports = { RadioField };
