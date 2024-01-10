// "Textfield", "Email", "Name", "Company", "Jobtitle"
class TextProperty {
    getResponseValueFromKey(json, key) {
        if (json[key] !== undefined) {
            return json[key];
        }
        return null;
    }

    construct(response = null) {
        this.is_italic = this.getResponseValueFromKey(response, 'is_italic');
        this.is_underline = this.getResponseValueFromKey(response, 'is_underline');
        this.font_color = this.getResponseValueFromKey(response, 'font_color');
        this.font_size = this.getResponseValueFromKey(response, 'font_size');
        this.is_read_only = this.getResponseValueFromKey(response, 'is_read_only');
        this.is_bold = this.getResponseValueFromKey(response, 'is_bold');
        this.font = this.getResponseValueFromKey(response, 'font');
    }
    getIsItalic() {
        return this.is_italic;
    }

    getIsUnderline() {
        return this.is_underline;
    }

    getFontColor() {
        return this.font_color;
    }

    getFontSize() {
        return this.font_size;
    }

    getIsReadOnly() {
        return this.is_read_only;
    }

    getIsBold() {
        return this.is_bold;
    }

    getFont() {
        return this.font;
    }

    setIsItalic(is_italic) {
        this.is_italic = is_italic;
    }

    setIsUnderline(is_underline) {
        this.is_underline = is_underline;
    }

    setFontColor(font_color) {
        this.font_color = font_color;
    }

    setFontSize(font_size) {
        this.font_size = font_size;
    }

    setIsReadOnly(is_read_only) {
        this.is_read_only = is_read_only;
    }

    setIsBold(is_bold) {
        this.is_bold = is_bold;
    }

    setFont(font) {
        this.font = font;
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
module.exports = { TextProperty };
