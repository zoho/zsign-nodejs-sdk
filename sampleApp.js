const express = require('express');

const oauth = require('./src/Oauth');
const OAuth = oauth.OAuth;

const zohosign = require('./src/ZohoSign');
const ZohoSign = zohosign.ZohoSign;

const requestObject = require('./src/api/RequestObject');
const RequestObject = requestObject.RequestObject;

const templateObject = require('./src/api/TemplateObject');
const TemplateObject = templateObject.TemplateObject;

const action = require('./src/api/Action');
const Actions = action.Actions;

const imageField = require('./src/api/fields/ImageField');
const ImageField = imageField.ImageField;

const attachmentField = require('./src/api/fields/AttachmentField');
const AttachmentField = attachmentField.AttachmentField;

const checkBox = require('./src/api/fields/CheckBox');
const CheckBox = checkBox.CheckBox;

const dateField = require('./src/api/fields/DateField');
const DateField = dateField.DateField;

const dropDown = require('./src/api/fields/DropdownField');
const DropdownField = dropDown.DropdownField;

const dropdownValues = require('./src/api/fields/DropdownValues');
const DropdownValues = dropdownValues.DropdownValues;

const radioField = require('./src/api/fields/RadioField');
const RadioField = radioField.RadioField;

const radioGroup = require('./src/api/fields/RadioGroup');
const RadioGroup = radioGroup.RadioGroup;

const textField = require('./src/api/fields/TextField');
const TextField = textField.TextField;

const textProperty = require('./src/api/fields/TextProperty');
const TextProperty = textProperty.TextProperty;

const fields = require('./src/api/Fields');
const Fields = fields.Fields;

const { RequestType } = require('./src/api/RequestType');

const credential = {};
credential['CLIENT_ID'] = '<Client-Id>';
credential['CLIENT_SECRET'] = '<Client-Secret>';
credential['DC'] = '<DC TYPE>';
credential['REFRESH_TOKEN'] = '<REFRESH TOKEN>';
credential['ACCESS_TOKEN'] = '<ACCESS TOKEN>'

const app = express();
const port = 4000;

app.get('/getRequest', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let request_id = '<Request-Id>';
        let rs = await ZohoSign.getRequest(request_id, user);
        res.send(rs);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/createDraft', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let reqObj = new RequestObject();
        reqObj.setRequestName('<Request-Name>');
        let partner = new Actions();
        partner.setRecipientName('<Recipient-Name>');
        partner.setRecipientEmail('<Recipient-Email>');
        partner.setActionType('SIGN');
        partner.setIsEmbedded(false);
        partner.setPrivateNotes('Please ensure the mail is arrived');
        partner.setVerifyRecipient(true);
        partner.setVerificationType('EMAIL');
        partner.setRecipientCountrycode('<Countrycode>');
        partner.setRecipientPhonenumber('<Phone-number>');
        reqObj.addAction(partner);
        var filePath = [
            '<File-Path>',
        ];
        let rs = await ZohoSign.draftRequest(reqObj, filePath, user);
        res.send(rs);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/addFilesToRequest', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let request_id = '<Request-Id>';
        var filePath = [
            '<File-Path>',
            '<File-Path>'
        ];
        let rs = await ZohoSign.addFilesToRequest(request_id, filePath, user);
        res.send(rs);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/updateRequest', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let reqObj = new RequestObject();
        reqObj.setRequestId('<Request-Id>');
        reqObj.setRequestName('<Request-Name> ');
        let partner = new Actions();
        partner.setRecipientName('<Recipient-Name>');
        partner.setRecipientEmail('<Recipient-Email>');
        partner.setSigningOrder(2);
        partner.setActionType('SIGN');
        partner.setIsEmbedded(false);
        partner.setPrivateNotes('Please ensure the mail is arrived');
        partner.setVerifyRecipient(true);
        partner.setVerificationType('EMAIL');
        partner.setRecipientCountrycode('<Countrycode>');
        partner.setRecipientPhonenumber('<Phone-number>');
        reqObj.addAction(partner);
        var filePath = [
            '<File-Path>',
            '<File-Path>'
        ];
        let rs = await ZohoSign.updateRequest(reqObj,user,filePath);
        res.send(rs);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/submitForSignature', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let reqObj = new RequestObject();
        reqObj.setRequestName('<Request-Name> ');
        let partner = new Actions();
        partner.setRecipientName('<Recipient-Name>');
        partner.setRecipientEmail('<Recipient-Email>');
        partner.setActionType('SIGN');
        partner.setIsEmbedded(false);
        partner.setPrivateNotes('Please ensure the mail is arrived');
        partner.setVerifyRecipient(true);
        partner.setVerificationType('EMAIL');
        partner.setRecipientCountrycode('<Countrycode>');
        partner.setRecipientPhonenumber('<Phone-number>');
        reqObj.addAction(partner);
        var filePath = [
            '<File-Path>',
            '<File-Path>'
        ];

        let draftJSON = await ZohoSign.draftRequest(reqObj, filePath, user);
        let sign1 = new ImageField();
        sign1.setFieldTypeName('Signature');
        sign1.setDocumentId(draftJSON.getDocumentIds()[0].getDocumentId());
        sign1.setFieldLabel('<Field-Label>');
        sign1.setPageNum('0');
        sign1.setIsMandatory('true');
        sign1.setX_value(64);
        sign1.setY_value(81);
        sign1.setHeight(2.5);
        sign1.setWidth(22);

        let fields = new Fields();
        fields.addImageField(sign1);
        let action = draftJSON.getActions();
        let action0 = action[0];
        action0.setFields(fields);
        action[0] = action0;
        draftJSON.setActions(action);
        let rs = await ZohoSign.submitForSignature(draftJSON, user);
        res.send(rs);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/selfSignRequest', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let reqObj = new RequestObject();
        reqObj.setRequestName('<Request-Name>');
        reqObj.setSelfSign(true);

        var filePath = ['<File-Path>'];

        let draftJSON = await ZohoSign.draftRequest(reqObj, filePath, user);

        let sign1 = new ImageField();
        sign1.setFieldTypeName('Signature');
        sign1.setDocumentId(draftJSON.getDocumentIds()[0].getDocumentId());
        sign1.setFieldLabel('<Field-Label>');
        sign1.setPageNum('0');
        sign1.setIsMandatory('true');
        sign1.setX_value(64);
        sign1.setY_value(81);
        sign1.setHeight(2.5);
        sign1.setWidth(22);

        let fields = new Fields();
        fields.addImageField(sign1);

        let action = draftJSON.getActions();
        let action0 = action[0];
        action0.setFields(fields);
        action[0] = action0;
        draftJSON.setActions(action);

        let response = await ZohoSign.selfSignRequest(draftJSON, user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/getRequestList', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let response = await ZohoSign.getRequestList('_MY_REQUESTS', 1, 10, 'DESC', 'action_time', user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/generateEmbeddedSigningLink', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let reqObj = new RequestObject();
        reqObj.setRequestName('<Request-Name>');

        let partner = new Actions('SIGN');
        partner.setRecipientName('<Recipient-Name>');
        partner.setRecipientEmail('<Recipient-Email>');
        partner.setActionType('SIGN');
        partner.setIsEmbedded('true');
        reqObj.addAction(partner);

        var filePath = ['<File-Path>'];
        let draftJSON = await ZohoSign.draftRequest(reqObj, filePath, user);
        let sign1 = new ImageField();
        sign1.setFieldTypeName('Signature');
        sign1.setDocumentId(draftJSON.getDocumentIds()[0].getDocumentId());
        sign1.setFieldLabel('<Field-Label>');
        sign1.setPageNum('0');
        sign1.setIsMandatory('true');
        sign1.setX_value(64);
        sign1.setY_value(81);
        sign1.setHeight(2.5);
        sign1.setWidth(22);

        let fields = new Fields();
        fields.addImageField(sign1);

        let action = draftJSON.getActions();
        let action0 = action[0];
        action0.setFields(fields);
        action[0] = action0;
        draftJSON.setActions(action);
        let resp = await ZohoSign.submitForSignature(draftJSON, user);
        let request_id = resp.getRequestId();
        let action_id = resp.getActions()[0].getActionId();
        let hosting_parent_url = 'https://sign.zoho.com'; // your website URL where you are embedding in iframe. Null if opening in new Tab

        let signing_url = await ZohoSign.generateEmbeddedSigningLink(request_id, action_id, hosting_parent_url, user);
        res.send(signing_url);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/getFieldDataFromCompletedDocument', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let response = await ZohoSign.getFieldDataFromCompletedDocument('<Request-Id>', user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/downloadRequest', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let response = await ZohoSign.downloadRequest(
            '<Request-Id>',
            user,
            '<File-Path>',
            true,
            true
        );
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/downloadDocument', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let filepath = '<File-Path>';
        let response = await ZohoSign.downloadDocument('<Request-Id>', '<Document-Id>', filepath, user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/downloadCompletionCertificate', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let filepath = '<File-Path>';
        let response = await ZohoSign.downloadCompletionCertificate('<Request-Id>', filepath, user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/recallRequest', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let response = await ZohoSign.recallRequest('<Request-Id>', user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/remindRequest', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let response = await ZohoSign.remindRequest('<Request-Id>', user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/deleteRequest', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let response = await ZohoSign.deleteRequest('<Request-Id>', user ,"<Is-InProgress>","<Reason>");
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/deleteDocument', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let response = await ZohoSign.deleteDocument('<Document-Id>', user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/createNewFolder', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let response = await ZohoSign.createNewFolder('<Folder-Name>', user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/getFieldTypes', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let response = await ZohoSign.getFieldTypes(user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/getRequestTypes', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let response = await ZohoSign.getRequestTypes(user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/getFolderList', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let response = await ZohoSign.getFolderList(user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/createNewRequestType', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let requestTypeObj = new RequestType();
        requestTypeObj.setRequestTypeDescription('<Description>');
        requestTypeObj.setRequestTypeName('<RequestTypeName>');
        let response = await ZohoSign.createNewRequestType(requestTypeObj, user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/createTemplate', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let tempObj = new TemplateObject();
        tempObj.setTemplateName('<Template-Name>');
        tempObj.setRequestTypeId('<RequestType-Id>');

        let partner = new Actions();
        partner.setActionType('SIGN');
        partner.setPrivateNotes('Please ensure the mail is arrived');
        partner.setVerifyRecipient(true);
        partner.setVerificationType('EMAIL');
        partner.setRecipientCountrycode('<Countrycode>');
        partner.setRecipientPhonenumber('<Phone-number>');
        tempObj.addAction(partner);
        var filePath = [
            '<File-Path>',
            '<File-Path>'
        ];
        let response = await ZohoSign.createTemplate(tempObj, filePath, user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/sendTemplate', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let template = await ZohoSign.getTemplate('<Template-Id>', user);
        res.send(template.actions);
        /*********
		STEP 3 : Set values to the same object & send for signature
		**********/

        template.setRequestName('<Request-Name>');
        template.setNotes('Call us back if you need clarificaions regarding agreement');
        template.setPrefillTextField('Text - 1', '<Enter value for field>');
        template.setPrefillTextField('Text - 2', '<Enter value for field>');
        template.setPrefillDateField('Date - 1', '<Enter proper date suitable for dateformat>');
        template.getActionByRole('HR').setRecipientName('<Recipient-Name>');
        template.getActionByRole('HR').setRecipientEmail('<Recipient-Email>');
        let resp = await ZohoSign.sendTemplate(template, user);
        res.send(resp);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/updateTemplate', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let tempObj = new TemplateObject();
        tempObj.setTemplateId('<Template-Id>');
        tempObj.setTemplateName('<Template-Name> ');
        let partner = new Actions();
        partner.setActionType('SIGN');
        partner.setPrivateNotes('Please ensure the mail is arrived');
        partner.setVerifyRecipient(true);
        partner.setVerificationType('EMAIL');
        partner.setRecipientCountrycode('<Countrycode>');
        partner.setRecipientPhonenumber('<Phone-number>');
        tempObj.addAction(partner);
        var filePath = ['<File-Path>'];
        let response = await ZohoSign.updateTemplate(tempObj, user, filePath);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/addFilesToTemplate', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let template_id = '<Template-Id>';
        var filePath = [
            '<File-Path>',
            '<File-Path>'
        ];
        let response = await ZohoSign.addFilesToTemplate(template_id, filePath, user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/getTemplate', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let template_id = '<Template-Id>';
        let response = await ZohoSign.getTemplate(template_id, user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/getTemplatesList', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let response = await ZohoSign.getTemplatesList(1, 10, 'DESC', 'action_time', user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/deleteTemplate', async (req, res) => {
    try {
        let user = new OAuth(credential);
        let template_id = '<Template-Id>';
        let response = await ZohoSign.deleteTemplate(template_id, user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

//..................................................Examples.........................................................

app.get('/createDraftAndSendForSignature', async (req, res) => {
        /* Example : 1
	    	:: Zoho Sign API examples using NODE JS SDK ::
	    	Use Case : create a Zoho Sign request using a document with text-tags and a signer. 
            Send the draft for signature.
	    */

        /*********
	    	STEP 1 : Set user credentials 
	    **********/
    try {
        let user = new OAuth(credential);

        /*********
	    STEP 2 : Draft a request using SDK functions
	    **********/
        let reqObj = new RequestObject();
        reqObj.setRequestName('<Request-Name>');
        let partner = new Actions();
        partner.setRecipientName('<Recipient-Name>');
        partner.setRecipientEmail('<Recipient-Email>');
        partner.setActionType('SIGN');
        partner.setIsEmbedded(false);
        partner.setPrivateNotes('Please ensure the mail is arrived');
        partner.setVerifyRecipient(true);
        partner.setVerificationType('EMAIL');
        partner.setRecipientCountrycode('<Countrycode>');
        partner.setRecipientPhonenumber('<Phone-number>');
        reqObj.addAction(partner);
        var filePath = ['<File-Path>']; //Path of the pdf
        let draftJSON = await ZohoSign.draftRequest(reqObj, filePath, user);
        let response = await ZohoSign.submitForSignature(draftJSON, user);
        res.send(response);
    } catch (Ex) {
        res.send(Ex);
    }
});

app.get('/addFieldAndSendForSignature', async (req, res) => {
    /*
		Zoho Sign API examples using NodeJS SDK ::
		Use Case : create a Zoho Sign request using a document and a signer. Add a field & send for signature.
	*/
    /*********
	  	STEP 1 : Set user credentials 
	**********/
	 try{
    let user = new OAuth(credential);

    /*********
	    STEP 2 : Draft a request using SDK functions
	**********/
    let reqObj = new RequestObject();
    reqObj.setRequestName('<Request-Name> ');
    let partner = new Actions();
    partner.setRecipientName('<Recipient-Name>');
    partner.setRecipientEmail('<Recipient-Email>');
    partner.setActionType('SIGN');
    partner.setIsEmbedded(false);
    partner.setPrivateNotes('Please ensure the mail is arrived');
    partner.setVerifyRecipient(true);
    partner.setVerificationType('EMAIL');
    partner.setRecipientCountrycode('<Countrycode>');
    partner.setRecipientPhonenumber('<Phone-number>');
    reqObj.addAction(partner);
    var filePath = ['<File-Path>']; //Path of the pdf
    let draftJSON = await ZohoSign.draftRequest(reqObj, filePath, user);

    /*********
		STEP 3 :Set Fields & Submit for signature
	**********/

    let sign1 = new ImageField();
    sign1.setFieldTypeName('Signature');
    sign1.setDocumentId(draftJSON.getDocumentIds()[0].getDocumentId());
    sign1.setFieldLabel('<Field-Label>');
    sign1.setPageNum('0');
    sign1.setIsMandatory('true');
    sign1.setX_value(64);
    sign1.setY_value(81);
    sign1.setHeight(2.5);
    sign1.setWidth(22);

    let fields = new Fields();
    fields.addImageField(sign1);

    let action = draftJSON.getActions();
    let action0 = action[0];
    action0.setFields(fields);
    action[0] = action0;
    draftJSON.setActions(action);
    let rs = await ZohoSign.submitForSignature(draftJSON, user);
    res.send(rs);
}
	catch(Ex)
	{
		res.send(Ex);
	}
});

app.get('/requestWithMultipleDocument', async (req, res) => {
    /*  Example : 3
		Zoho Sign API examples using Node JS SDK ::
		Use Case : create a Zoho Sign request using multiple documents and a signer & send for signature.
	*/

    /*********
		STEP 1 : Set user credentials
	**********/
	try{
    let user = new OAuth(credential);

    /*********
	    STEP 2 : Draft a request using SDK functions
	**********/

    let reqObj = new RequestObject();
    reqObj.setRequestName('<Request-Name> ');
    let partner = new Actions();
    partner.setRecipientName('<Recipient-Name>');
    partner.setRecipientEmail('<Recipient-Email>');
    partner.setActionType('SIGN');
    partner.setIsEmbedded(true);
    partner.setPrivateNotes('Please ensure the mail is arrived');
    partner.setVerifyRecipient(true);
    partner.setVerificationType('EMAIL');
    partner.setRecipientCountrycode('<Countrycode>');
    partner.setRecipientPhonenumber('<Phone-number>');
    reqObj.addAction(partner);
    var filePath = [
        '<File-Path>',
        '<File-Path>',
        '<File-Path>'
    ]; //Path of the pdf
    let draftJSON = await ZohoSign.draftRequest(reqObj, filePath, user);

    /*********
			STEP 3 :Set Fields & Submit for signature
		**********/

    let sign1 = new ImageField();
    sign1.setFieldTypeName('Signature');
    sign1.setDocumentId(draftJSON.getDocumentIds()[0].getDocumentId());
    sign1.setFieldLabel('<Field-Label>');
    sign1.setPageNum('0');
    sign1.setIsMandatory('true');
    sign1.setX_value(64);
    sign1.setY_value(81);
    sign1.setHeight(2.5);
    sign1.setWidth(22);

    let fields = new Fields();
    fields.addImageField(sign1);

    let action = draftJSON.getActions();
    let action0 = action[0];
    action0.setFields(fields);
    action[0] = action0;
    draftJSON.setActions(action);
    let rs = await ZohoSign.submitForSignature(draftJSON, user);
    res.send(rs);}
	catch(Ex)
	{
		res.send(Ex);
	}
});

app.get('/differentTypeOfSigner', async (req, res) => {
    /*
		Zoho Sign API examples using Node SDK	
		Use Case : create a Zoho Sign request using multiple document and diff types of signer. Add fields & Send the draft for signature.
	*/

    /*********
		STEP 1 : Set user credentials
	**********/
		try{
    let user = new OAuth(credential);

    /*********
		STEP 2 : Draft a request using Node JS SDK functions

			you can construct the request object by
			> using SDK functions

		**********/

    let reqObj = new RequestObject();
    reqObj.setRequestName('<Request-Name>');
    reqObj.setSequentialSigning(true);

    let partner = new Actions();
    partner.setRecipientName('<Recipient-Name>');
    partner.setRecipientEmail('<Recipient-Email>');
    partner.setActionType('SIGN');
    partner.setSigningOrder(1);
    partner.setIsEmbedded(false);

    let ZylkerRepresentative = new Actions();
    ZylkerRepresentative.setRecipientName('<Recipient-Name>');
    ZylkerRepresentative.setRecipientEmail('<Recipient-Email>');
    ZylkerRepresentative.setActionType('SIGN');
    ZylkerRepresentative.setSigningOrder(2);

    let ZylkerHR = new Actions();
    ZylkerHR.setRecipientName('<Recipient-Name>');
    ZylkerHR.setRecipientEmail('<Recipient-Email>');
    ZylkerHR.setActionType('APPROVER');
    ZylkerHR.setSigningOrder(3);

    let ZylkerAdmin = new Actions();
    ZylkerAdmin.setRecipientName('<Recipient-Name>');
    ZylkerAdmin.setRecipientEmail('<Recipient-Email>');
    ZylkerAdmin.setActionType('VIEW');
    ZylkerAdmin.setSigningOrder(4);

    reqObj.addAction(partner);
    reqObj.addAction(ZylkerRepresentative);
    reqObj.addAction(ZylkerHR);
    reqObj.addAction(ZylkerAdmin);

    var filePath = [
        '<File-Path>',
        '<File-Path>',
        '<File-Path>'
    ]; //Path of the pdf
    let draftJSON = await ZohoSign.draftRequest(reqObj, filePath, user);
    /*********
			STEP 3 :Set Fields to the request object & Submit for signature
		**********/
    let fields_0 = new Fields();

    // IMAGE FIELD
    let partner_sign = new ImageField();
    partner_sign.setFieldTypeName('Signature');
    partner_sign.setDocumentId(draftJSON.getDocumentIds()[0].getDocumentId());
    partner_sign.setPageNum(0);
    partner_sign.setIsMandatory(true);
    partner_sign.setX_value(5);
    partner_sign.setY_value(10);
    partner_sign.setHeight(1.5);
    partner_sign.setWidth(22);

    // TEXT FIELD
    let partner_group = new TextField();
    partner_group.setFieldTypeName('Textfield');
    partner_group.setDocumentId(draftJSON.getDocumentIds()[0].getDocumentId());
    partner_group.setFieldName('Enter Text ');
    partner_group.setDefaultValue('Enter Text');
    partner_group.setPageNum(0);
    partner_group.setIsMandatory(true);
    partner_group.setX_value(5);
    partner_group.setY_value(10);
    partner_group.setHeight(1.5);
    partner_group.setWidth(22);
    let prop = new TextProperty();
    prop.setIsReadOnly(true);
    partner_group.setTextProperty(prop);

    // COMPANY (TEXT FIELD)
    let partner_company = new TextField();
    partner_company.setFieldTypeName('Company');
    partner_company.setDocumentId(draftJSON.getDocumentIds()[0].getDocumentId());
    partner_company.setFieldName('Company');
    partner_company.setPageNum(0);
    partner_company.setIsMandatory(true);
    partner_company.setX_value(5);
    partner_company.setY_value(15);
    partner_company.setHeight(1.5);
    partner_company.setWidth(22);

    // SIGN DATE (DATE FIELD)
    let sign_date = new DateField();
    sign_date.setFieldTypeName('Date');
    sign_date.setDocumentId(draftJSON.getDocumentIds()[0].getDocumentId());
    sign_date.setFieldName('Sign Date');
    sign_date.setDateFormat('MMM dd yyyy');
    sign_date.setPageNum(0);
    sign_date.setIsMandatory(true);
    sign_date.setX_value(5);
    sign_date.setY_value(15);
    sign_date.setHeight(1.5);
    sign_date.setWidth(22);

    // CUSTOM DATE (DATE FIELD)
    let sign_date1 = new DateField();
    sign_date1.setFieldTypeName('CustomDate');
    sign_date1.setDocumentId(draftJSON.getDocumentIds()[1].getDocumentId());
    sign_date1.setFieldName('Date Of Birth');
    sign_date1.setDateFormat('dd MMMM yyyy');
    sign_date1.setPageNum(0);
    sign_date1.setIsMandatory(false);
    sign_date1.setX_value(78);
    sign_date1.setY_value(75);
    sign_date1.setHeight(1.8);
    sign_date1.setWidth(14);

    // DROPDOWN FIELD
    let product_name = new DropdownField();
    product_name.setFieldTypeName('Dropdown'); // optional
    product_name.setDocumentId(draftJSON.getDocumentIds()[1].getDocumentId());
    product_name.setFieldName('Product name');
    product_name.setPageNum(0);
    product_name.setIsMandatory(false);
    product_name.setX_value(24);
    product_name.setY_value(50);
    product_name.setHeight(3);
    product_name.setWidth(30);
    let dd_value_1 = new DropdownValues();
    dd_value_1.setDropdownValue('TV');
    dd_value_1.setDropdownOrder(0);
    let dd_value_2 = new DropdownValues();
    dd_value_2.setDropdownValue('Mobile');
    dd_value_2.setDropdownOrder(1);
    let dd_value_3 = new DropdownValues();
    dd_value_3.setDropdownValue('Laptop');
    dd_value_3.setDropdownOrder(2);
    product_name.addDropdownValues(dd_value_1);
    product_name.addDropdownValues(dd_value_2);
    product_name.addDropdownValues(dd_value_3);
    let prop1 = new TextProperty();
    prop1.setFont('DejaVu Sans');
    prop1.setFontSize(20);
    prop1.setIsBold(true);
    product_name.setTextProperty(prop1);

    // RADIO FIELDS
    let radio_field = new RadioGroup();
    radio_field.setFieldTypeName('Radiogroup');
    radio_field.setDocumentId(draftJSON.getDocumentIds()[1].getDocumentId());
    radio_field.setFieldName('Nationality');
    radio_field.setPageNum(0);
    radio_field.setIsMandatory(false);
    let radio_subfield_1 = new RadioField();
    radio_subfield_1.setSubFieldName('Indian');
    radio_subfield_1.setHeight(1.39);
    radio_subfield_1.setWidth(2);
    radio_subfield_1.setX_value(75);
    radio_subfield_1.setY_value(73);
    radio_subfield_1.setPageNum(0);
    let radio_subfield_2 = new RadioField();
    radio_subfield_2.setSubFieldName('Others');
    radio_subfield_2.setHeight(1.39);
    radio_subfield_2.setWidth(2);
    radio_subfield_2.setX_value(75);
    radio_subfield_2.setY_value(75);
    radio_subfield_2.setPageNum(0);
    radio_field.addSubField(radio_subfield_1);
    radio_field.addSubField(radio_subfield_2);

    // CHECK BOX
    let terms_condt = new CheckBox();
    terms_condt.setFieldTypeName('Checkbox');
    terms_condt.setFieldName('Agree ?');
    terms_condt.setDocumentId(draftJSON.getDocumentIds()[1].getDocumentId());
    terms_condt.setPageNum(0);
    terms_condt.setIsMandatory(true);
    terms_condt.setDefaultValue(true);
    terms_condt.setHeight(1.4);
    terms_condt.setWidth(2);
    terms_condt.setX_value(7);
    terms_condt.setY_value(68);

    let kyc_proof = new AttachmentField();
    kyc_proof.setFieldTypeName('Attachment');
    kyc_proof.setFieldName('KYC proof');
    kyc_proof.setDocumentId(draftJSON.getDocumentIds()[1].getDocumentId());
    kyc_proof.setPageNum(0);
    kyc_proof.setIsMandatory(false);
    kyc_proof.setHeight(1.4);
    kyc_proof.setWidth(2);
    kyc_proof.setX_value(7);
    kyc_proof.setY_value(93);

    fields_0.addImageField(partner_sign);
    fields_0.addTextField(partner_group);
    fields_0.addTextField(partner_company);
    fields_0.addDateField(sign_date);
    fields_0.addDateField(sign_date1);
    fields_0.addDropdownField(product_name);
     fields_0.addRadioGroup(  radio_field );
    fields_0.addCheckBox(terms_condt);
    fields_0.addFileField(kyc_proof);

    // recipient 2 fields
    let fields_1 = new Fields();

    let Zylker_rep_sign = new ImageField();
    Zylker_rep_sign.setFieldTypeName('Signature');
    Zylker_rep_sign.setDocumentId(draftJSON.getDocumentIds()[0].getDocumentId());
    Zylker_rep_sign.setPageNum(0);
    Zylker_rep_sign.setIsMandatory(true);
    Zylker_rep_sign.setX_value(64);
    Zylker_rep_sign.setY_value(81);
    Zylker_rep_sign.setHeight(2.5);
    Zylker_rep_sign.setWidth(22);

    fields_1.addImageField(Zylker_rep_sign);

    let action = draftJSON.getActions();
    action0 = action[0];
    action0.setFields(fields_0);
    action[0] = action0;

    let action1 = action[1];
    action1.setFields(fields_1);
    action[1] = action1;
    draftJSON.setActions(action);
    let rs = await ZohoSign.submitForSignature(draftJSON, user);
    res.send(rs);}
	catch(Ex)
	{
		res.send(Ex);
	}
});

app.get('/sendUsingJSON', async (req, res) => {
    /*
		 Zoho Sign Node SDK 
        create a Zoho Sign request using multiple document and diff types of signer. Add fields & Send the draft for signature.
		using JSON instead of SDK functions.
	*/
 try{
    /*********
			STEP 1 : Set user credentials
		**********/
    let user = new OAuth(credential);

    /*********
		STEP 2 : Draft a request using SDK functions

			you can construct the request object by
			> using JSON 
		**********/

    let req1 = {
        request_name: '<Request-Name>',
        is_sequential: true,
        actions: [
            {
                action_type: 'SIGN',
                recipient_email: '<Recipient-Email>',
                signing_order: 1,
                recipient_name: '<Recipient-Name>',
                is_embedded: true
            },
            {
                action_type: 'SIGN',
                recipient_email: '<Recipient-Email>',
                signing_order: 2,
                recipient_name: '<Recipient-Name>'
            },
            {
                action_type: 'APPROVER',
                recipient_email: '<Recipient-Email>',
                signing_order: 3,
                recipient_name: '<Recipient-Name>'
            }
        ],
        self_sign: false,
        custom_data: 'Sent Using Zoho Sign Node SDK.'
    };
    let reqObj=new RequestObject(req1);
    var filePath = [
        '<File-Path>',
        '<File-Path>',
        '<File-Path>'
    ]; //Path of the pdf
    let draftJSON = await ZohoSign.draftRequest(reqObj, filePath, user);
    /*********
			STEP 3 :Set Fields to the request object & Submit for signature
		**********/

    let document_id_0 = draftJSON.getDocumentIds()[0].getDocumentId();
    let document_id_1 = draftJSON.getDocumentIds()[1].getDocumentId();

    let fieldsJSON_0 = {
        image_fields: [
            {
                field_type_name: 'Signature',
                is_mandatory: true,
                page_no: 0,
                document_id: document_id_0,
                y_value: 81,
                width: 22,
                x_value: 64,
                height: 2.5
            }
        ]
    };

    let fields_0 = new Fields(fieldsJSON_0);

    let fieldsJSON_1 = {
        image_fields: [
            {
                field_type_name: 'Signature',
                is_mandatory: true,
                page_no: 0,
                document_id: document_id_1,
                y_value: 81,
                width: 22,
                x_value: 64,
                height: 2.5
            }
        ]
    };

    let fields_1 = new Fields(fieldsJSON_1);

    let action = draftJSON.getActions();
    let action0 = action[0];
    action0.setFields(fields_0);
    action[0] = action0;

    let action1 = action[1];
    action1.setFields(fields_1);
    action[1] = action1;
    draftJSON.setActions(action);

    let rs = await ZohoSign.submitForSignature(draftJSON, user);
    res.send(rs);
}
catch(Ex)
{
    res.send(Ex);
}
});

app.get('/sendTemplateAndGetEmbedURL', async (req, res) => {
    /*********
		STEP 1 : Set user credentials
        
	**********/
    try
    {
        let user = new OAuth(credential);

    /*********
		STEP 2 : Get template object by ID
	**********/

        let template = await ZohoSign.getTemplate('<Template-Id>', user);
        /*********
		STEP 3 : Set values to the same object & send for signature
		**********/

        template.setRequestName('<Request-Name>');
        template.setNotes('Call us back if you need clarificaions regarding agreement');
        template.setPrefillTextField('Text - 1', '<Enter text>');
        template.setPrefillTextField('Text - 2', '<Enter text>');
        template.setPrefillDateField('Date - 1', '<Enter Date>');
        template.getActionByRole('HR').setRecipientName('<Recipient-Name>');
        template.getActionByRole('HR').setRecipientEmail('<Recipient-Email>');
        template.getActionByRole('HR').setIsEmbedded(true);
        let resp = await ZohoSign.sendTemplate(template, user);
    let request_id = resp.getRequestId();
    let action_id = resp.getActions()[0].getActionId();
    let hosting_parent_url = 'https://sign.zoho.com'; // your website URL where you are embedding in iframe. Null if opening in new Tab
    let signing_url = await ZohoSign.generateEmbeddedSigningLink(request_id, action_id, hosting_parent_url, user);
    res.send(signing_url);
    }
    catch(Ex)
    {
        res.send(Ex);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port  ${port}`);
});