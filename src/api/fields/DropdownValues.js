class DropdownValues {
    getResponseValueFromKey(json, key) {
        if (json[key] !== undefined) {
            return json[key];
        }
        return null;
    }
    constructor(response) {
        if (response) {
            this.dropdown_value_id = this.getResponseValueFromKey(response, 'dropdown_value_id');
            this.dropdown_order = this.getResponseValueFromKey(response, 'dropdown_order');
            this.dropdown_value = this.getResponseValueFromKey(response, 'dropdown_value');
        }
    }
    getDropdownValueId() {
        return this.dropdown_value_id;
    }

    getDropdownOrder() {
        return this.dropdown_order;
    }

    getDropdownValue() {
        return this.dropdown_value;
    }

    setDropdownValueId(dropdown_value_id) {
        this.dropdown_value_id = dropdown_value_id;
    }

    setDropdownOrder(dropdown_order) {
        this.dropdown_order = dropdown_order;
    }

    setDropdownValue(dropdown_value) {
        this.dropdown_value = dropdown_value;
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
module.exports = { DropdownValues };
