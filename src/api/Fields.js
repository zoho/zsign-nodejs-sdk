const imageField = require('./fields/ImageField');
const ImageField = imageField.ImageField;

const attachmentField = require('./fields/AttachmentField');
const AttachmentField = attachmentField.AttachmentField;

const checkBox = require('./fields/CheckBox');
const CheckBox = checkBox.CheckBox;

const dateField = require('./fields/DateField');
const DateField = dateField.DateField;

const dropDown = require('./fields/DropdownField');
const DropdownField = dropDown.DropdownField;

const dropdownValues = require('./fields/DropdownValues');
const DropdownValues = dropdownValues.DropdownValues;

const radioField = require('./fields/RadioField');
const RadioField = radioField.RadioField;

const radioGroup = require('./fields/RadioGroup');
const RadioGroup = radioGroup.RadioGroup;

const textField = require('./fields/TextField');
const TextField = textField.TextField;

const documentFormData = require('./DocumentFormData');
const DocumentFormData = documentFormData.DocumentFormData;

class Fields {
    constructor(response) {
        this.date_fields = new Array(); // Array of class date_fields
        this.dropdown_fields = new Array(); // Array of class dropdown_fields
        this.file_fields = new Array(); // Array of class file_fields
        this.text_fields = new Array(); // Array of class text_fields
        this.image_fields = new Array(); // Array of class image_fields
        this.check_boxes = new Array(); // Array of class check_boxes
        this.radio_groups = new Array(); // Array of class radio_groups
        this.document_form_data = new Array(); // Array of class radio_groups

        if (response != null) {
            var temp = response;
            if (!Array.isArray(response)) {
                this.date_fields = new Array();
                if (response['date_fields'] !== undefined) {
                    response['date_fields'].forEach((obj) => {
                        this.date_fields.push(new DateField(obj));
                    });
                }

                this.dropdown_fields = new Array();
                if (response['dropdown_fields'] !== undefined) {
                    response['dropdown_fields'].forEach((obj) => {
                        this.dropdown_fields.push(new DropdownField(obj));
                    });
                }

                this.file_fields = new Array();
                if (response['file_fields'] !== undefined) {
                    response['file_fields'].forEach((obj) => {
                        this.file_fields.push(new AttachmentField(obj));
                    });
                }

                this.text_fields = new Array();
                if (response['text_fields'] !== undefined) {
                    response['text_fields'].forEach((obj) => {
                        this.text_fields.push(new TextField(obj));
                    });
                }

                this.image_fields = new Array();
                if (response['image_fields'] !== undefined) {
                    response['image_fields'].forEach((obj) => {
                        this.image_fields.push(new ImageField(obj));
                    });
                }

                this.check_boxes = new Array();
                if (response['check_boxes'] !== undefined) {
                    response['check_boxes'].forEach((obj) => {
                        this.check_boxes.push(new CheckBox(obj));
                    });
                }

                this.radio_groups = new Array();
                if (response['radio_groups'] !== undefined) {
                    response['radio_groups'].forEach((obj) => {
                        this.radio_groups.push(new RadioGroup(obj));
                    });
                }
            } else if (typeof temp == 'object') {
                temp.forEach((field) => {
                    if (field['field_category'] != undefined) {
                        switch (field['field_category'].toLowerCase()) {
                            case 'checkbox':
                                this.check_boxes.push(new CheckBox(field));
                                break;
                            case 'radiogroup':
                                this.radio_groups.push(new RadioGroup(field));
                                break;
                            case 'image':
                                this.image_fields.push(new ImageField(field));
                                break;
                            case 'textfield':
                                this.text_fields.push(new TextField(field));
                                break;
                            case 'datefield':
                                this.date_fields.push(new DateField(field));
                                break;
                            case 'dropdown':
                                this.dropdown_fields.push(new DropdownField(field));
                                break;
                            case 'filefield':
                                this.file_fields.push(new AttachmentField(field));
                                break;
                        }
                    } else {
                        this.document_form_data.push(new DocumentFormData(field));
                    }
                });
            }
        }
    }

    getDateFields() {
        return this.date_fields;
    }

    getDropdownFields() {
        return this.dropdown_fields;
    }

    getFileFields() {
        return this.file_fields;
    }

    getTextFields() {
        return this.text_fields;
    }

    getImageFields() {
        return this.image_fields;
    }

    getCheckBoxes() {
        return this.check_boxes;
    }

    getRadioGroups() {
        return this.radio_groups;
    }

    getDocumentFormData() {
        return this.document_form_data;
    }

    getDocumentFormDataByFieldLabel(field_label) {
        Object.keys(this.document_form_data).forEach((obj) => {
            if (this.document_form_data[obj].getFieldLabel() == field_label) {
                return this.document_form_data[obj];
            }
        });
        return null;
    }

    addDateField(date_field) {
        this.date_fields.push(date_field);
    }

    addDropdownField(dropdown_field) {
        this.dropdown_fields.push(dropdown_field);
    }

    addFileField(file_field) {
        this.file_fields.push(file_field);
    }

    addTextField(text_field) {
        this.text_fields.push(text_field);
    }

    addImageField(image_field) {
        this.image_fields.push(image_field);
    }

    addCheckBox(check_box) {
        this.check_boxes.push(check_box);
    }

    addRadioGroup(radio_group) {
        this.radio_groups.push(radio_group);
    }

    setDateFields(date_fields) {
        this.date_fields = date_fields;
    }

    setDropdownFields(dropdown_fields) {
        this.dropdown_fields = dropdown_fields;
    }

    setFileFields(file_fields) {
        this.file_fields = file_fields;
    }

    setTextFields(text_fields) {
        this.text_fields = text_fields;
    }

    setImageFields(image_fields) {
        this.image_fields = image_fields;
    }

    setCheckBoxes(check_boxes) {
        this.check_boxes = check_boxes;
    }

    setRadioGroups(radio_groups) {
        this.radio_groups = radio_groups;
    }

    constructJson() {
        let response = {};
        let date_fieldsArr = new Array();
        this.date_fields.forEach((obj) => {
            date_fieldsArr.push(obj.constructJson());
        });
        response['date_fields'] = date_fieldsArr.length != 0 ? date_fieldsArr : null;

        let dropdown_fieldsArr = new Array();
        this.dropdown_fields.forEach((obj) => {
            dropdown_fieldsArr.push(obj.constructJson());
        });
        response['dropdown_fields'] = dropdown_fieldsArr.length != 0 ? dropdown_fieldsArr : null;

        let file_fieldsArr = new Array();
        this.file_fields.forEach((obj) => {
            file_fieldsArr.push(obj.constructJson());
        });
        response['file_fields'] = file_fieldsArr.length != 0 ? file_fieldsArr : null;

        let text_fieldsArr = new Array();
        this.text_fields.forEach((obj) => {
            text_fieldsArr.push(obj.constructJson());
        });
        response['text_fields'] = text_fieldsArr.length != 0 ? text_fieldsArr : null;

        let image_fieldsArr = new Array();
        this.image_fields.forEach((obj) => {
            image_fieldsArr.push(obj.constructJson());
        });
        response['image_fields'] = image_fieldsArr.length != 0 ? image_fieldsArr : null;

        let check_boxesArr = new Array();
        this.check_boxes.forEach((obj) => {
            check_boxesArr.push(obj.constructJson());
        });
        response['check_boxes'] = check_boxesArr.length != 0 ? check_boxesArr : null;

        let radio_groupsArr = new Array();
        this.radio_groups.forEach((obj) => {
            radio_groupsArr.push(obj.constructJson());
        });
        response['radio_groups'] = radio_groupsArr.length != 0 ? radio_groupsArr : null;

        let obj = {};
        Object.keys(response).forEach((v) => {
            if (response[v] !== undefined && response[v] !== null) {
                obj[v] = response[v];
            }
        });
        return obj;
    }
}
module.exports = { Fields };
