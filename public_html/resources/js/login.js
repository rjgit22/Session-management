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



function createSessionEmail(email){

	jQuery.ajaxSetup({async: false});
	var sessionTokenStatus = createJpdbSessionToken(conn_token, 23, db, user_rel, email);
	jQuery.ajaxSetup({async: true});

    if(sessionTokenStatus == 200){
    	alert("sessionToken create!!!")
    	window.location.href = 'home.html';
    }

    else{
    	alert("Unable To Login Please Try Again!!!");
    	$("#email").val("");
		$("#pwd").val(""); 

		$("#email").focus();
    	return "";
    }
}

function checkUser(){

	var email = $("#email").val();
	var pwd = $("#pwd").val(); 

	jsonObj = {
		email:email,
		pwd: pwd
	}

	var request = createGET_BY_KEYRequest(conn_token, db, user_rel, JSON.stringify(jsonObj));
	alert(request);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(request,baseUrl,irl_url);
    jQuery.ajaxSetup({async: true});
    console.log(resultObj);

    if(resultObj.status == 200)
    {
    	createSessionEmail(email);
    }
    else{
    	alert("Unable To Login Please Try Again!!!");
    	$("#email").val("");
		$("#pwd").val(""); 

		$("#email").focus();
    	return "";
    }

}
