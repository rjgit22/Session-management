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

            var oldpwd = $("#oldpwd").val();
            var pwd1 = $("#pwd1").val();
            var pwd2 = $("#pwd2").val();

            if (oldpwd === "") {
                alert("Required Orginal Password");
                $("#oldpwd").focus();
                return "";
            }

            if (pwd1 === "") {
                alert("Required New Password");
                $("#pwd1").focus();
                return "";
            }

            if (pwd2 === "") {
                alert("Re-type Same New Password");
                $("#pwd2").focus();
                return "";
            }

            if (pwd1 != pwd2){
                alert("Entered New Passwords Should Be Same!!!");
                $("#pwd1").val("");
                $("#pwd2").val("");

                $("#pwd1").focus();
                return "";
            }

            var jsonObj = {
                pwd:pwd1,
                };

            return JSON.stringify(jsonObj);
}



function changePassword(){

    var jsonStrObj = validatedData();

    if(jsonStrObj == "")
    {
        return
    }
    var oldpwd = $("#oldpwd").val();
    var email = localStorage.getItem("userID");
    jsonObj = {
        email:email,
        pwd:oldpwd,
    }

    var request = createGET_BY_KEYRequest(conn_token, db, user_rel, JSON.stringify(jsonObj));
    alert(request);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(request,baseUrl,irl_url);
    jQuery.ajaxSetup({async: true});

    if(resultObj.status == 400)
    {
        alert("Orginal Password is wrong!!!");

        $("#oldpwd").val("");
        $("#pwd1").val("");
        $("#pwd2").val("");
        $("#oldpwd").focus();

        return ""
    }
    if(resultObj.status == 200)
    {
        var pass_rec = JSON.parse(resultObj.data).rec_no;
        var updateRequest = createUPDATERecordRequest(conn_token, jsonStrObj, db, user_rel, pass_rec);
        alert(updateRequest)
        jQuery.ajaxSetup({async: false});
        var resultObj = executeCommandAtGivenBaseUrl(updateRequest, baseUrl, iml_url);
        jQuery.ajaxSetup({async: true}); 

        $("#oldpwd").val("");
        $("#pwd1").val("");
        $("#pwd2").val("");

        alert("PASSWORD CHANGED SUCCESFULLY!!!");
    } 

    else
    {
        alert("Something went wrong!!!");
        return "";
    }
 
}

