/**
 * Filename: login.js
 */

console.log("login.js page loaded..");


/**
 * Handle the data returned by LoginServlet
 * @param resultDataString jsonObject
 */
function handleLoginResult(resultDataString) {
	alert("successful login");
    resultDataJson = JSON.parse(resultDataString);

    console.log("handle login response");
    console.log(resultDataJson);
    console.log(resultDataJson["status"]);

    // If login success, redirect to index.html page
    if (resultDataJson["status"] === "success") {
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
        (resultDataString) => handleLoginResult(resultDataString));
}
