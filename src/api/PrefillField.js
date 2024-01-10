const signException = require('../SignException');
const SignException = signException.SignException;
class PrefillField {
    constructor(field = null) {
        this.field_label;
        this.field_value;
        this.default_value;
        this.field_category;
        this.field_type_name;

        if (field) {
            switch (field['field_category']) {
                // VALIDATION
                case 'dropdown':
                case 'checkbox':
                case 'textfield':
                case 'datefield':
                case 'radiogroup':
                    // allowed field types
                    break;

                case 'image':
                    throw new SignException('Image fields are autofilled from Zoho Sign Profile Settings',-1);
                case 'filefield':
                default:
                    throw new SignException('Invalid PREFILL-FIELD type', -1);
            }

            this.field_label = field['field_label'] !== undefined ? field['field_label'] : null;
            this.field_value = field['default_value'] !== undefined ? field['default_value'] : null;
            // assigned to default value
            this.default_value = field['default_value'] !== undefined ? field['default_value'] : null;
            this.field_category = field['field_category'];
            this.field_type_name = field['field_type_name'];
        }
    }

    // GETTERS
    getFieldLabel() {
        return this.field_label;
    }

    getFieldValue() {
        return this.field_value;
    }

    getDefaultValue() {
        return this.default_value;
    }

    getFeildCategory() {
        return this.field_category;
    }

    getFieldTypeName() {
        return this.field_type_name;
    }

    // SETTERS
    setFeildValue(field_value) {
        this.field_value = field_value;
    }

    // CONSTRUCT JSON
    constructJson() {
        response[this.field_label] = this.field_value;
        return response;
    }
}
module.exports = { PrefillField };
