const FormData=require("form-data")
const ALL 		= "_ALL";		// key valid in sdk only
const SHREDDED	= "shredded";
const ARCHIVED	= "archived";
const DELETED 	= "deleted";
const DRAFT		= "draft";
const INPROGRESS= "inprogress";
const ONHOLD  	= "onhold";
const RECALLED	= "recalled";
const COMPLETED	= "completed";
const DECLINED	= "declined";
const EXPIRED 	= "expired";
const EXPIRING 	= "expiring";

const MY_REQUESTS = "_MY_REQUESTS";	// key valid in sdk only
const MY_PENDING  = "my_pending";

const fs=require('fs');

const apiclient = require('./ApiClient');
const ApiClient=apiclient.ApiClient();

const action = require('./api/Action');
const Actions = action.Actions;

const templateObject = require('./api/TemplateObject');
const TemplateObject=templateObject.TemplateObject;

const requestObject=require('./api/RequestObject');
const RequestObject=requestObject.RequestObject;

const requestListObject=require('./api/RequestListObject');
const RequestListObject=requestListObject.RequestListObject;

const signException=require('./SignException');
const SignException=signException.SignException;

const requestType = require("./api/RequestType");
const RequestType = requestType.RequestType;

class ZohoSign{

	//-----------------------_REQUESTS_-----------------------
	
	//GET REQUEST USING REQUEST ID
	static async getRequest( requestId,currentUser ){

		let resp = await ApiClient.callSignAPI(currentUser,"/api/v1/requests/"+String(requestId), 'GET', null,null,null,true,false );
		if(resp["requests"]!==undefined)
		{	   
			let responseObject = new RequestObject( resp.requests );
			return responseObject;
		}
	}


	// CREATE DRAFT REQUEST 
	static async draftRequest(requestObject,files,currentUser)
	{
		if(!requestObject instanceof RequestObject)
		{
			throw new SignException("Not an object of 'RequestObject' class", -1);
		}
		else
		{
			let data = {};
			data["requests"]=requestObject.constructJson();
			let payload = new FormData();
			let flag=true;
			files.forEach(file => {
				if(typeof(file)=="string")
				{
					if(fs.existsSync(file)) 
					{
						let value=fs.createReadStream(file);
						payload.append('file',value);
					}
					else
					{
						flag=false;
						return;
					}
				}
			});  
			if(flag==false)
			{
				throw new SignException("Invalid Directory");
			}
			payload.append('data',JSON.stringify(data));
			let resp = await ApiClient.callSignAPI( currentUser,"/api/v1/requests", 'POST', null, payload,null,true,false )
			if(resp["requests"]!==undefined)
	   		{	
				let responseObject = new RequestObject( resp.requests );
				return responseObject;
			}
			else{
				return resp;
			}
		}
	}
	

	//ADD FILES TO EXISTING REQUEST 
	 static async addFilesToRequest(request_id,files,currentUser) {
		let payload = new FormData();
		let response={};
		let flag=true;
		files.forEach(file=>{
			if(fs.existsSync(file)) 
			{
			let value=fs.createReadStream(file);
			payload.append('file',value);
		}
		else{
			flag=false;
			return;
		}
		});
		if(flag==false)
		{
			throw new SignException("Invalid Directory");
		}
		response = await ApiClient.callSignAPI(currentUser, "/api/v1/requests/"+request_id, 'PUT', null, payload,null,true,false );
		if(response["requests"]!==undefined)
	   	{	
			return new RequestObject(response.requests);
		}
		else
		{
			return response;
		}
	}

	//UPDATE REQUEST
	static async updateRequest(requestObject,currentUser,files=null)
	{
		if(!(requestObject instanceof RequestObject))
		{
			throw new SignException("Request object not found");
		}
		let request_id = requestObject.getRequestId();
		if(request_id==null)
		{
			throw new SignException("No request Id found");
		}
		
		let data={};
		data["requests"]=requestObject.constructJson();
		let payload= new FormData();
		let flag=true;
		files.forEach(file => {
			if(typeof(file)=="string")
			{
				if(fs.existsSync(file)) 
				{
				let value=fs.createReadStream(file);
				payload.append('file',value);
				}
				else{
					flag=false;
					return;
				}
			}
		});  
		if(flag==false)
		{
			throw new SignException("Invalid Directory");
		}
		payload.append('data',JSON.stringify(data));
		let response = await ApiClient.callSignAPI( currentUser,"/api/v1/requests/"+request_id, 'PUT', null, payload,false,true,false);
		if(response["requests"]!==undefined)
	   	{
			return new RequestObject(response.requests);
		}
		else{
			return response;
		}
		
	}

	//SUBMIT FOR SIGNATURE
	static async submitForSignature(requestObject,currentUser)
	{
		if(!(requestObject instanceof RequestObject))
		{
			throw new SignException("Request object not found");
		}
		let request_id = requestObject.getRequestId();
		if(request_id==null)
		{
			throw new SignException("No request Id found");
		}
		let data={};
		data["requests"]=requestObject.constructJson();
		let payload= new FormData();
		payload.append('data',JSON.stringify(data));
		let response = await ApiClient.callSignAPI( currentUser,"/api/v1/requests/"+request_id+"/submit", 'POST', null, payload,null,true,false);
        if(response["requests"]==undefined)
	   	{
			return response;
		}
		return new RequestObject(response.requests);
		

	}

	//SELF SIGN REQUEST
	static async selfSignRequest(requestObject,currentUser)
	{
		if(!(requestObject instanceof RequestObject))
		{
			throw new SignException("Request object  not found");
		}
		let request_id = requestObject.getRequestId();
		if(request_id==null)
		{
			throw new SignException("No request Id found");
		}
		let data={};
		data["requests"]=requestObject.constructJson();

		let payload= new FormData();
		payload.append('data',JSON.stringify(data));
		let response = await ApiClient.callSignAPI( currentUser,"/api/v1/requests/"+request_id+"/sign", 'POST', null, payload,false,true,false);
		if(typeof(response) == "object")
		{
			if(response["request_status"]!=undefined && response["request_status"]=="completed")
			{
				return true;
			}
			else{
				return false;
			}
		}

	}

	//GET REQUEST LIST 
	static async getRequestList(category, start_index,row_count, sort_order="DESC",sort_column="action_time",currentUser)
	{
		let page_context ={};
		page_context.start_index = start_index;
		page_context.row_count = row_count;
		page_context.sort_column = sort_column;
		page_context.sort_order = sort_order;


		let data ={};
		data.page_context = page_context;

		let queryparams= {};
		queryparams['data']= JSON.stringify(data);

		let response = {};
		let myRequest = null;


		switch(category)
		{
			case SHREDDED:
			case ARCHIVED:
			case DELETED:
			case DRAFT:
			case INPROGRESS:
			case RECALLED:
			case COMPLETED:
			case ONHOLD:
			case DECLINED:
			case EXPIRED:
			case EXPIRING:
				queryparams["request_status"] = category;
			case ALL:
				response = await ApiClient.callSignAPI( currentUser,"/api/v1/requests", 'GET', queryparams,null,null,true,false);
				myRequest = false;
				break;
			case MY_PENDING: 
				queryparams["request_status"] = category;
			case MY_REQUESTS:
				response = await ApiClient.callSignAPI( currentUser,"/api/v1/myrequests", 'GET', queryparams,null,null,true,false);
				myRequest = true;
				break;
			default:
				throw new SignException("Invalid document category");
		}
		let requestsList = new Array();
		if(myRequest)
		{
			if(response["my_requests"]!==undefined)
			{
				response.my_requests.forEach((reqJSON) => {
            	    requestsList.push(new RequestListObject(reqJSON) );
            	})
			}
			else
			{
				return response;
			}
		}
		else{
			if(response["requests"]!==undefined)
			{
				response.requests.forEach((reqJSON) => {
					requestsList.push(new RequestListObject(reqJSON) );
				})
			}
			else
			{
				return response;
			}
		}
		return requestsList;

	}

	//GENERATE EMBEDDED SIGNING LINK
	static async generateEmbeddedSigningLink( request_id, action_id, host=null,currentUser ){
		let response;
		if(host)
		{
			 response = await ApiClient.callSignAPI( currentUser,"/api/v1/requests/"+request_id+"/actions/"+action_id+"/embedtoken?"+"host="+host, 'POST', null,null,null,true,false);
		}
		else
		{
			 response = await ApiClient.callSignAPI(currentUser, "/api/v1/requests/"+request_id+"/actions/"+action_id+"/embedtoken", 'POST', null,null,null,true,false);
		}
		if(response["sign_url"]==undefined)
		{
			return response;
		}
		return response.sign_url;
		
	}


	//GET FEILD DATA FROM COMPLETED DOCUMENT 
	static async getFieldDataFromCompletedDocument( request_id,currentUser ){
		let response=await ApiClient.callSignAPI( currentUser,"/api/v1/requests/"+request_id+"/fielddata", 'GET', null,null,null,true,false);
		if(response["document_form_data"]==undefined)
		{
			return response;
		}
		let actionsArr= new Array();
		response.document_form_data.actions.forEach((action) => {
			actionsArr.push(new Actions(action));
		})
		
		return actionsArr;
	}

	//DOWNLOAD REQUEST
	static async downloadRequest(request_id,currentUser,filepath, with_coc, is_merged)
	{
		let queryparams="";
		if(with_coc && is_merged)
		{
			queryparams+="with_coc=true&is_merged=true";
		}
		else if(with_coc)
		{
			queryparams+="with_coc=true";
		}
		else if(is_merged)
		{
			queryparams+="is_merged=true";
		}
		let response=await ApiClient.callSignAPI( currentUser,"/api/v1/requests/"+request_id+"/pdf?"+queryparams, 'GET', null,null,filepath,true,true);
		if(response.status==200)
		{
			return true;
		}
		else
		{
			return response;	
		}
	}

	//DOWNLOAD DOCUMENT FROM PARTICULAR REQUEST
	static async downloadDocument(request_id,document_id,filepath,currentUser)
	{
		let response = await ApiClient.callSignAPI( currentUser,"/api/v1/requests/"+request_id+"/documents/"+document_id+"/pdf?", 'GET', null,null,filepath,true,true);
		if(response.status==200)
		{
			return true;
		}
		else
		{
			return response;	
		}
	}

	//DOWNLOAD COMPLETION CERTIFICATE OF THE SIGNED REQUEST
	static async downloadCompletionCertificate(request_id,filepath,currentUser)
	{
		let response = await ApiClient.callSignAPI( currentUser,"/api/v1/requests/"+request_id+"/completioncertificate", 'GET', null,null,filepath,true,true);
		if(response.status==200)
		{
			return true;
		}
		else
		{
			return response;	
		}
	}

	//RECALL REQUEST
	static async recallRequest( request_id , currentUser){
		
		let response=await ApiClient.callSignAPI( currentUser,"/api/v1/requests/"+request_id+"/recall", 'POST', null,null,null,true,false);
		return response;
	}

	//REMIND USER REGARDS REQUEST
	 static async remindRequest( request_id, currentUser ){
		let response=await ApiClient.callSignAPI( currentUser,"/api/v1/requests/"+request_id+"/remind", 'POST',null,null,null,true,false);
		return response; 

	}

	//DELETE REQUEST
	static async deleteRequest( request_id, currentUser, inProgress=false, reason=null){
		var payload = null;
		if(inProgress)
		{
			payload= new FormData();
			payload.append('recall_inprogress',"true");
			payload.append('reason',reason);
		}
		let response=await ApiClient.callSignAPI( currentUser,"/api/v1/requests/"+request_id+"/delete", 'PUT',null,payload,null,true,false);
		return response; 

	}

	//DELETE PARTICULAR DOCUMENT FROM REQUEST
	static async deleteDocument( document_id, currentUser ){
		let response=await ApiClient.callSignAPI( currentUser,"/api/v1/documents/"+document_id+"/delete", 'DELETE',null,null,null,true,false);
		return response; 
	}

	//CREATE NEW FOLDER
	static async createNewFolder( folderName, currentUser){ 
		let data ={};
		let folders={};
		folders["folder_name"] = folderName;
		data["folders"] = folders;
		let payload= new FormData();
		payload.append('data',JSON.stringify(data));

		let response=await ApiClient.callSignAPI( currentUser,"/api/v1/folders", 'POST', null,payload,null,true,false);
		if(response["folders"]==undefined)
		{
			return response;
		}
		return response["folders"]; 
	}

	//GET FIELD TYPES
	static async getFieldTypes(currentUser){

		let response=await ApiClient.callSignAPI( currentUser,"/api/v1/fieldtypes", 'GET', null,null,null,true,false);
		if(response["field_types"]==undefined)
		{
			return response;
		}
		return response.field_types; // [!!] RETURN AS FIELD OBJECT
	}

	//GET REQUEST TYPES
	static async getRequestTypes(currentUser)
	{
		let response=await ApiClient.callSignAPI( currentUser,"/api/v1/requesttypes", 'GET', null,null,null,true,false);
		let arr = new Array();
		if(response["request_types"]==undefined)
		{
			return response;
		}
		response.request_types.forEach((request_type)=>{
			arr.push(request_type);
		});
		return arr;
	}

	//GET FOLDER LIST 
	static async getFolderList(currentUser)
	{
		let response=await ApiClient.callSignAPI( currentUser,"/api/v1/folders", 'GET', null,null,null,true,false);
		if(response["folders"]==undefined)
		{
			return response;
		}
		return response.folders;
	}

	//CREATE NEW REQUEST 
	static async createNewRequestType(requestTypeObj,currentUser)
	{
		let payload = new FormData()
		if(requestTypeObj && requestTypeObj instanceof RequestType)
		{
			let data = requestTypeObj.constructJson();
			payload.append('data',JSON.stringify(data));
		}
		else
		{
			throw new SignException("requestType Object not found");
		}
		let response=await ApiClient.callSignAPI( currentUser,"/api/v1/requesttypes", 'POST', null,payload,null,true,false);
		if(response["request_types"]==undefined)
		{
			return response;
		}
		return new RequestType(response.request_types[0]);
	}

	
	


///////////////////////////////////TEMPLATES///////////////////////////////////////////////

	//CREATE TEMPLATE 
	static async createTemplate(templateObj,files,currentUser)
	{
		let data = {};
		data["templates"]=templateObj.constructJson();
		let payload = new FormData();
		let flag=true;
		files.forEach(file => {
			if(typeof(file)=="string")
			{
				if(fs.existsSync(file)) 
				{
				let value=fs.createReadStream(file);
				payload.append('file',value);
				}
				else{
					flag=false;
					return;
				}
			}
		});  
		if(flag==false)
		{
			throw new SignException("Invalid Directory");
		}
		payload.append('data',JSON.stringify(data));
		
		let resp = await ApiClient.callSignAPI( currentUser,"/api/v1/templates", 'POST', null, payload,null,true,false );
		if(resp["templates"]==undefined)
		{
			return resp;
		}
		let tempObj = new TemplateObject( resp.templates );
		return tempObj;
	}

	//UPDATE TEMPLATE 
	static async updateTemplate(templateObj,currentUser,files=null)
	{
		
		if(!(templateObj instanceof TemplateObject))
		{
			throw new SignException("Template Object not found");
		}

		let template_id = templateObj.getTemplateId();
		if(template_id==null)
		{
			throw new SignException("No template Id found");
		}
		
		let data={};
		data["templates"]=templateObj.constructJson();
		let payload= new FormData();
		let flag=true;
		files.forEach(file => {
			if(typeof(file)=="string")
			{
				if(fs.existsSync(file)) 
				{
				let value=fs.createReadStream(file);
				payload.append('file',value);
				}
				else{
					flag=false;
					return;
				}
			}
		});  
		if(flag==false)
		{
			throw new SignException("Invalid Directory");
		}
		payload.append('data',JSON.stringify(data));
		let response = await ApiClient.callSignAPI( currentUser,"/api/v1/templates/"+template_id, 'PUT', null, payload,null,true,false);
		if(response["templates"]==undefined)
		{
			return response;
		}
		return new TemplateObject(response.templates);
	}

	//ADD FILES TO TEMPLATE
	static async addFilesToTemplate(template_id,files,currentUser) {
		let payload = new FormData();
		let response={};
		let flag=true;
		files.forEach(file=>{
			if(fs.existsSync(file)) 
			{
			let value=fs.createReadStream(file);
			payload.append('file',value);
		}
		else{
			flag=false;
			return;
		}
		});
		if(flag==false)
		{
			throw new SignException("Invalid Directory");
		}
		response = await ApiClient.callSignAPI( currentUser,"/api/v1/templates/"+template_id, 'PUT', null, payload,null,true,false );
		if(response["templates"]==undefined)
		{
			return response;
		}
		return new TemplateObject(response.templates);
	}
	
	//GET TEMPLATE USING TEMPLATE_ID
	static async getTemplate(template_id,currentUser)
	{
		let response = await ApiClient.callSignAPI( currentUser,"/api/v1/templates/"+template_id, 'GET', null, null,null,true,false);
		if(response["templates"]==undefined)
		{
			return response;
		}
		return new TemplateObject(response.templates);
	}

	//QUICK SEND TEMPLATE FOR SIGN
	static async sendTemplate(templateObj,currentUser,quick_send=true)
	{
		
		if(!(templateObj instanceof TemplateObject))
		{
			throw new SignException("Template Object not found");
		}
		let template_id = templateObj.getTemplateId();
		if(template_id==null)
		{
			throw new SignException("No template Id found");
		}
		let data={};
		data["templates"]=templateObj.constructJsonForSubmit();
		let payload= new FormData();
		payload.append('data',JSON.stringify(data));
		payload.append('is_quicksend','true');

		let response = await ApiClient.callSignAPI( currentUser,"/api/v1/templates/"+template_id+"/createdocument", 'POST', null, payload,null,true,false);
		if(response["requests"]==undefined)
		{
			return response;
		}
		return new RequestObject(response.requests);
	}

	//GET ALL TEMPLATE LIST
	static async getTemplatesList( start_index=0,row_count=100, sort_order="DESC",sort_column="action_time",currentUser)
	{
		let page_context ={};
		page_context.start_index = start_index;
		page_context.row_count = row_count;
		page_context.sort_column = sort_column;
		page_context.sort_order = sort_order;


		let data ={};
		data.page_context = page_context;

		let queryparams= {};
		queryparams['data']= JSON.stringify(data);

		
		let response = await ApiClient.callSignAPI( currentUser,"/api/v1/templates", 'GET',queryparams,null,null,true,false);
        if(response["templates"]==undefined)
		{
			return response;
		}
		let templateList = new Array();
		response.templates.forEach((reqJSON) => {
			templateList.push(new TemplateObject(reqJSON));
		});
		return templateList;
	}

	//DELETE TEMPLATE USING TEMPLATE_ID
	static async deleteTemplate(template_id,currentUser)
	{
		let response=await ApiClient.callSignAPI( currentUser,"/api/v1/templates/"+template_id+"/delete", 'PUT', null,null,null,true,false);
		if(response.status == "success")
		{
			return true;
		}
		else
		{
			return response;
		}
	}

	static async extendDocumentValidity(currentUser,request_id,extendedDate) //In format (dd MMMM yyyy )
	{

		let payload = new FormData()
		payload.append('expire_by',extendedDate);
		let response=await ApiClient.callSignAPI( currentUser,"api/v1/requests/"+request_id+"/extend", 'POST', null,payload,null,true,false);
		if(response["status"]=="success")
		{
			return response;
		}
		return response;
	}

	static async emailDocument(currentUser,request_id,emails)//only 3 email allowed
	{

		let payload = new FormData()
		payload.append('email_id',emails);
		let response=await ApiClient.callSignAPI( currentUser,"api/v1/requests/"+request_id+"/email", 'POST', null,payload,null,true,false);
		if(response["status"]=="success")
		{
			return response;
		}
		return response;
	}

	static async getReminderSettings(currentUser,request_id)
	{
		let response=await ApiClient.callSignAPI( currentUser,"api/v1/requests/"+request_id+"/remindersettings", 'GET', null,null,null,true,false);
		if(response["status"]=="success")
		{
			return response;
		}
		return response;
	}

	static async setReminderSettings(currentUser,request_id,reminder_period,email_reminders=true)
	{
		let data = {};
		let settings={};
		let reminders_settings={};
		reminders_settings["reminder_period"]=reminder_period;
		reminders_settings["email_reminders"]=email_reminders;
		settings["reminders_settings"]=reminders_settings;
		data["settings"]=settings;
		let payload = new FormData()
		payload.append('data',JSON.stringify(data));
		let response=await ApiClient.callSignAPI( currentUser,"api/v1/requests/"+request_id+"/remindersettings", 'POST', null,payload,null,true,false);
		if(response["status"]=="success")
		{
			return response;
		}
		return response;
	}

}

module.exports = { ZohoSign }
