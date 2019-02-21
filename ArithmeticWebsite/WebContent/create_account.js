/**
* Filename: create_account.js
*/

console.log("create_account.js page loaded...\n");

// handle reponse from ajax call.
function responseHandler(xhttpObject){
	console.log("reponseHandler function called...\n");
	//local variables
	var data;
	
	if (xhttpObject.readyState !== 4 && xhttpObject.status !== 200) {
	      console.log("Sorry, we could not create your account at this time.\n Please try again Later");
	}
	else{ //success
		console.log(xhttpObject.responseText);
		console.log("success");

		resultDataJson = JSON.parse(xhttpObject.responseText);
		var status = resultDataJson["status"];
		var message = resultDataJson["message"];
		var email = resultDataJson["username"];
		if(status == "duplicate"){
			alert(email + " already exists in database, please choose another email");
		}
		else{
			//alert("successfully created account with username: " + email);
			window.location = "thank_you.html";

		}
	}
}
// send req + form data to CreateAccountServlet
function formHandler(form){
	console.log("formHandler function called...\n");
	// Important: disable the default action of submitting the form
    //   which will cause the page to refresh
    //   see jQuery reference for details: https://api.jquery.com/submit/
	event.preventDefault();
	var email = form.newEmail.value;
	var password = form.newPassword.value;
	var firstName = form.firstName.value;
	var lastName = form.lastName.value;

	//making a request to CreateAccountServlet, passing the reponse to reponseHandler
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    	/*
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML =
            this.responseText;
       }
       */
    	responseHandler(this);
    };
    xhttp.open("POST", "CreateAccountServlet", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("newEmail=" + email + "&newPassword=" + password + "&firstName=" + firstName + "&lastName=" + lastName); 
}