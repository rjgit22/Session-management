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


function resetForm(){
    $("#name").val("");
    $("#email").val("");
    $("#phone").val("");
    $("#pwd").val("");
    $("#pwd2").val("");

    $("#name").focus();
    
}

function validatedData() {

            var name_val = $("#name").val();
            var email_val = $("#email").val();
            var phone_val = $("#phone").val();
            var pwd_val = $("#pwd").val();
            var pwd2_val = $("#pwd2").val();

            if (name_val === "") {
                alert("Required Name");
                $("#name").focus();
                return "";
            }

            if (email_val === "") {
                alert("Required Email ID");
                $("#email").focus();
                return "";
            }

            if (phone_val.length != 10 ) {
                alert("Invalid Phone number");
                $("#phone").focus();
                return "";
            }

            if (pwd_val === "") {
                alert("Required Password");
                $("#pwd").focus();
                return "";
            }

            if (pwd2_val === "") {
                alert("Enter the Password again");
                $("#pwd2").focus();
                return "";
            }

            if (pwd_val !== pwd2_val) {
                alert("Enter Same Password");
                $("#pwd2").val("");
                $("#pwd").focus();
                return "";
            }


            var jsonObj = {
                    name:name_val,
                    email:email_val,
                    phone:phone_val,
                    pwd:pwd_val,
                };

            return JSON.stringify(jsonObj);
}

function checkUsername(){
        var e = $("#name").val();
        jsonObj = {
            name:e,
        }
        var request = createGET_BY_KEYRequest(conn_token, db, user_rel, JSON.stringify(jsonObj));
        jQuery.ajaxSetup({async: false});
        var resultObj = executeCommandAtGivenBaseUrl(request, baseUrl, irl_url);
        jQuery.ajaxSetup({async: true});

        if(resultObj.status == 200)
        {
            return true;
        }
        return false;
}

function checkEmail(){
        var e = $("#email").val();
        jsonObj = {
            email:e,
        }
        var request = createGET_BY_KEYRequest(conn_token, db, user_rel, JSON.stringify(jsonObj));
        jQuery.ajaxSetup({async: false});
        var resultObj = executeCommandAtGivenBaseUrl(request, baseUrl, irl_url);
        jQuery.ajaxSetup({async: true});

        if(resultObj.status == 200)
        {
            return true;
        }
        return false;
}

function checkPhone(){
        var e = $("#phone").val();
        jsonObj = {
            phone:e,
        }
        var request = createGET_BY_KEYRequest(conn_token, db, user_rel, JSON.stringify(jsonObj));
        jQuery.ajaxSetup({async: false});
        var resultObj = executeCommandAtGivenBaseUrl(request, baseUrl, irl_url);
        jQuery.ajaxSetup({async: true});

        if(resultObj.status == 200)
        {
            return true;
        }
        return false;
}



function registerUser(){
    var jsonStrObj = validatedData();
    if (jsonStrObj === ""){
        return "";
    }

    if(checkUsername())
    {
        alert("Username Already Exist");
        resetForm();
        return "";
    }

    if(checkEmail())
    {
        alert("Email Already Exist!!!");
        resetForm();
        return "";
    }

    if(checkPhone())
    {
        alert("phone number Already Exist");
        resetForm();
        return "";
    }
    var putReqStr = createPUTRequest(conn_token, jsonStrObj, db, user_rel); 

    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, baseUrl, iml_url);
    jQuery.ajaxSetup({async: true});

    if(resultObj.status == 200)
    {
        window.location.href = 'login.html';
    }

    else{
        alert("Something went wrong please try again!!!");
    }


}