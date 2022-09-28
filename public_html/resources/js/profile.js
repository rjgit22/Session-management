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

function formDisable(ctrl) {
    $("#pro_name").prop("disabled",ctrl);
    $("#pro_phone").prop("disabled",ctrl);
}

function validatedData() {

            var pro_email = $("#pro_email").val();
            var pro_name = $("#pro_name").val();
            var pro_phone = $("#pro_phone").val();

            if (pro_email === "") {
                alert("Required Email ID");
                $("#pro_email").focus();
                return "";
            }

            if (pro_name === "") {
                alert("Required Name Value");
                $("#pro_name").focus();
                return "";
            }

            if (pro_phone === "") {
                alert("Required phone Value");
                $("#pro_phone").focus();
                return "";
            }

            var jsonObj = {
                email: pro_email,
                name: pro_name,
                phone: pro_phone,

                };

            return JSON.stringify(jsonObj);
}

function editProfile(){

    formDisable(false);

    $("#save").prop("disabled",false);
    $("#edit").prop("disabled",true);
}

function saveProfile(){

    var jsonStrObj = validatedData();

    if(jsonStrObj == "")
    {

        return "";
    }

    var updateRequest = createUPDATERecordRequest(conn_token, jsonStrObj, db, user_rel, localStorage.getItem("profile_rec_no"));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(updateRequest, baseUrl, iml_url);
    jQuery.ajaxSetup({async: true});

    formDisable(true);
    $("#save").prop("disabled",true);
    $("#edit").prop("disabled",false);    

    alert("PROFILE CHANGED SUCCESFULLY!!!");
 
}


function fillProfile(resObj){

	if( resObj.status == 400)
    {
    	alert("Something went wrong!!!");
        return "";
    }

    var data = JSON.parse(resObj.data).record;
    var profile_rec = JSON.parse(resObj.data).rec_no;
    localStorage.setItem("profile_rec_no",profile_rec);
    $("#pro_email").val(data.email);
    $("#pro_name").val(data.name);
    $("#pro_phone").val(data.phone);

    $("#pro_email").prop("disabled",true);
    formDisable(true);   


    console.log("Done!!!");


}

function getProfile(){


	var email = localStorage.getItem("userID");
	jsonObj = {
		email:email,
	}

	var request = createGET_BY_KEYRequest(conn_token, db, user_rel, JSON.stringify(jsonObj));
	alert(request);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(request,baseUrl,irl_url);
    jQuery.ajaxSetup({async: true});
    fillProfile(resultObj);


}

getProfile();