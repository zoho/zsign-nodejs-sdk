const i = require('./fields/ImageField');
const ImageField = i.ImageField;

const a = require('./fields/AttachmentField');
const AttachmentField = a.AttachmentField;

const c = require('./fields/CheckBox');
const CheckBox = c.CheckBox;

const Date = require('./fields/DateField');
const DateField = Date.DateField;

const drop = require('./fields/DropdownField');
const DropdownField = drop.DropdownField;
const rg = require('./fields/RadioGroup');
const RadioGroup = rg.RadioGroup;

const t = require('./fields/TextField');
const TextField = t.TextField;

class TemplateDocumentFields {
    /*
		USE: for reading template fields

		GET: /api/v1/templates/--ID--/details  > templates > document_fields
	*/

    constructor(response) {
        this.document_id;
        this.fields = new Array();
        this.date_fields = new Array(); // Array of class date_fields
        this.dropdown_fields = new Array(); // Array of class dropdown_fields
        this.file_fields = new Array(); // Array of class file_fields
        this.text_fields = new Array(); // Array of class text_fields
        this.image_fields = new Array(); // Array of class image_fields
        this.check_boxes = new Array(); // Array of class check_boxes
        this.radio_groups = new Array(); // Array of class radio_groups

        this.document_id = response['document_id'] !== undefined ? response['document_id'] : null;

        if (response['fields'] !== undefined) {
            response['fields'].forEach((field) => {
                switch (field['field_category']) {
                    case 'checkbox':
                        let cb = new CheckBox(field);
                        this.check_boxes.push(cb);
                        this.fields.push(cb);
                        break;
                    case 'radiogroup':
                        let rb = new RadioGroup(field);
                        this.radio_groups.push(rb);
                        this.fields.push(rb);
                        break;
                    case 'image':
                        let imgF = new ImageField(field);
                        this.image_fields.push(imgF);
                        this.fields.push(imgF);
                        break;
                    case 'textfield':
                        let tf = new TextField(field);
                        this.text_fields.push(tf);
                        this.fields.push(tf);
                        break;
                    case 'datefield':
                        let df = new DateField(field);
                        this.date_fields.push(df);
                        this.fields.push(df);
                        break;
                    case 'dropdown':
                        let dd = new DropdownField(field);
                        this.dropdown_fields.push(dd);
                        this.fields.push(dd);
                        break;
                    case 'filefield':
                        let ff = new AttachmentField(field);
                        this.file_fields.push(ff);
                        this.fields.push(ff);
                        break;
                }
            });
        }
    }

    getDocumentId() {
        return this.document_id;
    }

    getFields() {
        return this.fields;
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
}
module.exports = { TemplateDocumentFields };
