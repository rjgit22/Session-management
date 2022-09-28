/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


var conn_token = "90939364|-31949287781007809|90941187";
var db = "Employee";
var rel = "emp-rel";
var user_rel = "user_rel"
var baseUrl = "http://api.login2explore.com:5577";
var iml_url = "/api/iml";
var irl_url = "/api/irl";
var emailUrl = "/serverless/send_email";


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ LOCAL STORAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function forgotPassword()
{

	var email = $("#email").val();

	if(email == "")
	{
		alert("Required Email ID");
		$("#email").focus();
		return ""
	}


	var request = createGET_BY_KEYRequest(conn_token, db, user_rel, JSON.stringify({email:email}));
	
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(request,baseUrl,irl_url);
    jQuery.ajaxSetup({async: true});
   
  	var password = JSON.parse(resultObj.data).record.pwd;
	jsonObj = {
		emailTo:email,
        emailSubject: "Forgot Password !!!!",
        emailContent: "Your Forgot Password is" + " "+ password,
	}

	jsonStr = JSON.stringify(jsonObj);

	alert(jsonStr);
	var createEmailReq = createEmailToSendReq(conn_token, jsonStr);
	alert(createEmailReq);
	jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(createEmailReq, baseUrl, emailUrl);
    jQuery.ajaxSetup({async: true});  

    console.log("DONE!!!");
    return ""
}