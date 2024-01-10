class DocumentFormData {
    getResponseValueFromKey(json, key) {
        if (json[key] !== undefined) {
            return json[key];
        }
        return null;
    }

    constructor(response) {
        this.field_label = this.getResponseValueFromKey(response, 'field_label');
        this.field_name = this.getResponseValueFromKey(response, 'field_name');
        this.field_value = this.getResponseValueFromKey(response, 'field_value');
    }

    getFieldLabel() {
        return this.field_label;
    }

    getFieldName() {
        return this.field_name;
    }

    getFieldValue() {
        return this.field_value;
    }
}
module.exports = { DocumentFormData };
