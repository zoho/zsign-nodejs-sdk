NODE JS SDK for ZOHO SIGN
----------------------
This SDK provides wrapper functions for Zoho Sign v1 API's Document Management and Template Management.

You can setup signing workflows using this SDK similar as in Zoho Sign UI.

Links :
[Zoho Sign API Guide](https://www.zoho.com/sign/api/getting-started-guide/overview.html)
&
[Zoho Sign API Documentation](https://www.zoho.com/sign/api/)

Environment Set Up
------------------

NodeJS SDK is installable through npm (Node Package Manager). npm is a dependency management tool in NodeJS. SDK expects the following from the client app:

- Client app must have Node version 17 or above
- NodeJS SDK must be installed in the client app through npm.

Install NODE JS SDK
-------------------
- Install Node from nodejs.org (ignore this step if already installed).
- Navigate to the workspace of your client app.
- Run the command: npm i @zohosign/nodejs-sdk-1.0

The NodeJS SDK will be installed and a package named @zohosign/nodejs-sdk-1.0 will be created in the local machine.


Registering a Zoho Client
-------------------------
Since Zoho SIGN APIs are authenticated with OAuth2 standards, you should register your client app with Zoho. Follow the below steps to register your application:

- Visit this page https://accounts.zoho.com/developerconsole.
- Click on `Add Client`.
- Enter Client Name, Client Domain and Redirect URI then click `Create`.
- Your Client app would have been created and displayed by now.
- The newly registered app's Client ID and Client Secret can be found by clicking `Options` → `Edit`.


Initializing SDK
----------------

It is required to set the OAuth2 credentials of an user as the first step.

```js
    const credential = {};
    credential['CLIENT_ID'] = '<Client-Id>';
    credential['CLIENT_SECRET'] = '<Client-Secret>';
    credential['DC'] = '<DC TYPE>'; // values - (com,eu,au,in,jp)
    credential['REFRESH_TOKEN'] = '<REFRESH TOKEN>';
    credential['ACCESS_TOKEN'] = '<ACCESS TOKEN>'

    const user = new OAuth(credential);
``` 
To authorize the request calls, it is necessary to pass the OAuth object(user) as a parameter for all the functions in ZohoSign.js.
you can generate OAuth token using 
```js 
        user.generateAccessTokenUsingRefreshToken()
```

> [!NOTE]
>- The OAuth Credentials, which will expire within an hour of creation, needs to be stored in a database or file and needs to handle manually.
>- We offer a method, updateAccessToken() in UpdateOAuth.js, which can be utilized to implement your custom logic for storing the access token.If you are going to use this method, please comment the `SignException` below the method.
>- Install all dependencies specified in the package.json file to ensure the error-free execution of the Node.js SDK


Class Heirarchy
---------------

#### src
- ZohoSign
- Oauth
- UpdateOAuth
- ApiClient
- SignException
  #### api
  - Action
  - DocumentFormData
  - Documents
  - FieldSettersAndGetters
  - PrefillField
  - RedirectPages
  - RequestListObject
  - RequestType
  - TemplateDocumentFields
  - TemplateObject
    #### fields
    - AttachmentField
    - CheckBox
    - DateField
    - DropdownField
    - DropdownValues
    - ImageField
    - RadioField
    - RadioGroup
    - TextField
    - TextProperty


SDK functions description
-------------------------

All functions for Document and Template management are available under 'ZohoSign.js' class  

#### Document Management functions
```
 getRequest()  
    Params: i) request_id
            ii) [Oauth Object] user  
    Return: instance of RequestObject
    Throws: SignException
    Description: Fetch the details of a Zoho Sign Request by its request id.


 draftRequest()
    Params: i) [RequestObject] requestObject
            ii) [array] files
            iii) [Oauth Object] user
    Return: instance of RequestObject
    Throws: SignException
    Description: Uploads the files and draft's the request with the above properties.


 updateRequest()
    Params: i) [RequestObject] requestObject
            ii) [Oauth Object] user
            iii) [array] files
    Return: instance of RequestObject
    Throws: SignException
    Description: Uploads the files and draft's the request with the above properties.


 addFilesToRequest()
    Params: i) request_id
            ii) files
            iii) [Oauth Object] user
    Return: instance of RequestObject
    Throws: SignException
    Description: Uploads the files to a draft request.


submitForSignature()
    Params: i) [RequestObject] requestObject
            ii) [Oauth Object] user
    Return: instance of RequestObject
    Throws: SignException
    Description: The requestObject contains a reference for a 'draft' request with fields added. The function submits the 'draft' for signature.


selfSignRequest()
    Params: i) [RequestObject] requestObject
            ii) [Oauth Object] user
    Return: instance of RequestObject with
    Throws: SignException
    Description: The requestObject contains a reference for a 'draft' request with fields added. The function signs the document as the current user. If the document signing action fails, 'SignException' error is thrown, usually due to wrong field properties set.


getRequestList()
    Params: i) category    (values: ALL, DRAFT, INPROGRESS, RECALLED, COMPLETED, DECLINED, EXPIRED, EXPIRING, MY_REQUESTS, MY_PENDING, SHREDDED),
            ii) start_index (optional, default:0),
            iii) row_count   (optional, default:100, max:100),
            iv) sort_order  (optional, default:DESC, values : ASC, DESC),
            v) sort_column (optional, default:action_time, values: action_time, request_name, folder_name, owner_first_name, recipient_email, created_time, modified_time),
            vi) [Oauth Object] user
    Return: array of instances of RequestObject
    Throws: SignException
    Description: The function fetches the document list by category name.
    If only category name is specified, it fetches the 100 results sorted by last modified time of the category type.


generateEmbeddedSigningLink()
    Params: i) request_id,
            ii) action_id,
            iii) host (default:'null'/for opening in new tab)
            iv) [Oauth Object] user
    Return: URL string
    Throws: SignException
    Description: Generates and returns a signing link for the signer specified by action_id.
    Add the 'host' param for the website in which you want to embed.
    NOTE: The signing URL is valid ONLY for 3 minutes before which the link must be opened/loaded


getFieldDataFromCompletedDocument()
    Params: i) requestId
            ii)[Oauth Object] user
    Return: instance of DocumentFormData
    Throws: SignException
    Description: Returns the pdf fields form data with key:value as data_label:data_value


downloadRequest()
  Params: i) requrest_id
          ii) [Oauth Object] user
  Return: true
  Throws: SignException
  Description: Downloads the documents of the request with its current version of signatures placed, either as a PDF if single document or as ZIP of multiple documents


downloadDocument()
  Params: i) request_id,
          ii) document_id
          iii) [Oauth Object] user
  Return: true
  Throws: SignException
  Description: Downloads the specific document of the request with its current version of signatures placed as a PDF
               Documents will be downloaded to the directory path returned by 'getDownloadPath()' function.


downloadCompletionCertificate()
  Params: i) requrest_id
          ii) [Oauth Object] user
  Return: true
  Throws: SignException
  Description: Downloads the completion certificate ONLY for the completed requests.
               Completion Cetrificate will be downloaded as PDF to the directory path.


recallRequest()
  Params: i) request_id
          ii) [Oauth Object] user
  Return: true
  Throws: SignException
  Description: Recalls the request if submitted.


remindRequest()
  Params: i) request_id
          ii) [Oauth Object] user
  Return: true
  Throws: SignException
  Description: Sends a reminder to the recipient of the request.


deleteRequest()
  Params: i) request_id
          ii) [Oauth Object] user
          iii)[boolean] inProgress
          iv) reason - (If request is inprogress, must need to add reason)
  Return: true
  Throws: SignException
  Description: Deletes the request. Deleted requests will be available in 'Trash'.


createNewFolder()
  Params: i) request_id
          ii) [Oauth Object] user
  Return: folder_id
  Throws: SignException
  Description: Creates new folder by the name, if it doesnt exist already.


getFieldTypes()
  Params: - i) [Oauth Object] user
  Return: [JSONObject] field_types
  Throws: -
  Description: Retrieves all field types.


getRequestTypes()
  Params: - i) [Oauth Object] user
  Return: array of instances of 'RequestType'
  Throws: -
  Description: Retrieves all request types.


createRequestType()
  Params: i) name
          ii) desctiption
          iii) [Oauth Object] user
  Return: instance of RequestType
  Throws:
  Description: Creates a new request type.


getFolderList()
  Params: - i) [Oauth Object] user
  Return: Array of JSON
  Throws:
  Description: Retrieves list of folders
```

#### Template Management functions
```
createTemplate()
  Params: i) [TemplateObject] templateObject
          ii) [array] files
          iii) [Oauth Object] user
  Return: TemplateObject
  Throws: SignException
  Description: Creates a Zoho Sign template. Returns TemplateObect of the created template.


updateTemplate( $templateObject, $files=null )
  Params: i) [TemplateObject] templateObject
          ii)[Oauth Object] user
          iii) [array] files
  Return: TemplateObject
  Throws: SignException
  Description: Update an exsiting template with properties in the new templateObject, add files to the template.
              NOTE: The templateObject requires the request_id to be set.


addFilesToTemplate()
  Params: i) template_id
          ii) files
          iii) [Oauth Object] user
  Return: TemplateObject
  Throws: SignException
  Description: Adds files to the template.


getTemplate()
  Params: i)template_id
          ii) [Oauth Object] user
  return: TemplateObject
  Throws: SignException
  Description: Return the template object with its properties, which can be used to fill the prefill-fields and can be used for submission.


sendTemplate()
  Params: i) [TemplateObject] templateObject
          ii)[Oauth Object] user
          iii) [Boolean] quick_send - (by default its true)
  return: [RequestObject] requestObject
  Throws: SignException
  Description: The templateObject input param contains the TemplateObject returned by the "getTemplate()" function with the prefill-fields filled.
               Setting the quick send params as true sends the document for signature. Setting false, only creates a draft.
               Return value contains a RequestObject of the created request(either a DRAFT or INPROGRESS request).


getTemplatesList()
    Params: i)start_index (optional, default:0),
            ii)row_count   (optional, default:100, max:100),
            iii)sort_order  (optional, default:DESC, values : ASC, DESC),
            iv)sort_column (optional, default:action_time, values: action_time, request_name, folder_name, owner_first_name, recipient_email, created_time, modified_time)
            v)[Oauth Object] user
    Return: array of instances of TemplateObject
    Throws: SignException
    Description: The function fetches the templates list of the specified range, sorted by 'sort_column' name.
    If no params are passed, it fetches the 100 results sorted by last modified time of the category type.


deleteTemplate()
  Params: i)template_id
          ii) [Oauth Object] user
  Return: true
  Throws: SignException
  Description: Permanently deletes the template.
```


### Exceptions
All functions of class 'ZohoSign' on event of bad/invalid requests to Zoho Sign throws class SignException.


### Example:
We offer a straightforward sample application that encompasses all the provided examples. Refer the `sampleApp.js` file for a reference to the sample code.
