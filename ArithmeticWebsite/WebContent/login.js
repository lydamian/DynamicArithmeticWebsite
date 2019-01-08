/**
 * Filename: login.js
 */

console.log("login.js page loaded..");


/**
 * Handle the data returned by LoginServlet
 * @param resultDataString jsonObject
 */
function handleLoginResult(resultDataString, textStatus, something) {
	console.log(resultDataString);
    resultDataJson = JSON.parse(resultDataString);

    console.log("handle login response");
    console.log(resultDataJson);
    console.log(resultDataJson["status"]);

    // If login success, redirect to index.html page
    if (resultDataJson["status"] === "success") {
    	//admit this user into the session - with javascript cookies
    	document.cookie = "user=" + resultDataJson["username"];
        window.location.replace("index.html");
    }
    // If login fail, display error message on <div> with id "login_error_message"
    else {
    	alert("unsuccessful login");
        console.log("show error message");
        console.log(resultDataJson["message"]);
        //jQuery("#login_error_message").text(resultDataJson["message"]);
    }
}


function loginhandler(form){
	console.log("function login_handler called...");
	// Important: disable the default action of submitting the form
    //   which will cause the page to refresh
    //   see jQuery reference for details: https://api.jquery.com/submit/
	event.preventDefault();
	
	var usernameVal = document.getElementById("inputEmail").value;
	var passwordVal = document.getElementById("inputPassword").value;
	
	console.log(usernameVal);
	console.log(passwordVal);
	
	var passObj = {
			username:usernameVal, 
			password:passwordVal
		};
	
    jQuery.post(
        "LoginServlet",
        {"username":usernameVal, "password":passwordVal},
        //(resultDataString) => handleLoginResult(resultDataString));
    	//Function( PlainObject data, String textStatus, jqXHR jqXHR )
        function(data, status, jqXHR) {
        	// LETS REMOVE SERVED AT SUBSTRING
        	var index = data.indexOf('{');
        	if(index != -1){
        		data = data.slice(index);
        	}
        	handleLoginResult(data);
        });
}
