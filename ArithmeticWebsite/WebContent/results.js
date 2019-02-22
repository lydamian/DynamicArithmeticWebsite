/**
 * Filename: results.js
 */

console.log("results.js page called..." );


// FUNCTIONS ====================================================
function gotohomepage(){
	location.assign("index.html");
}

//Gets a cookie of the current user.
function getCookie(cname) {
	  var name = cname + "=";
	  var ca = document.cookie.split(';');
	  for(var i = 0; i < ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) == ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(name) == 0) {
	      return c.substring(name.length, c.length);
	    }
	  }
	  return "";
}

function responseHandler(xhttpObject){
	console.log("reponseHandler function called...\n");
	//local variables
	var data;
	
	if (xhttpObject.readyState !== 4 && xhttpObject.status !== 200) { //failure
	      alert("Sorry, we could not enter your scores into the database");
	}
	else{ //success
		console.log(xhttpObject.responseText);
		console.log("success");

		resultDataJson = JSON.parse(xhttpObject.responseText);
		var status = resultDataJson["status"];
		var message = resultDataJson["message"];
		if(status == "duplicate"){
			alert("duplicate scores found in database");
		}
		else{
			//alert("successfully created account with username: " + email);
			console.log("success insertion of scores into database")
		}
	}
}
// send req + form data to InsertResultServlet
function requestInsertData(numRight, numTotal, arithmeticType, email){
	console.log("requestInsertData function called...\n");
	console.log("arithmeticType is: " + arithmeticType);

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
    xhttp.open("POST", "InsertResultServlet", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("numRight=" + numRight + "&numTotal=" + numTotal + "&arithmeticType=" + arithmeticType + "&email=" + email); 
}

//determining the type of arithmetic.
function getArithmeticType(mydata){
	console.log("getArithmeticType function called");
	console.log(mydata);
	//local variables
	var pos = mydata[0].indexOf("=");
	var question = mydata[0].substring(0, pos);
	var type = null;
	if(question.indexOf("+") !== -1){
		console.log("the type of arithmetic is: +");
		arithmeticType = "plus";
	}
	else if(question.indexOf("-") !== -1){
		console.log("the type of arithmetic is: -");
		arithmeticType = "minus";
	}
	else if(question.indexOf("*") !== -1){
		console.log("the type of arithmetic is: *");
		arithmeticType = "times";
	}else{
		console.log("the type of arithmetic is: /");
		arithmeticType = "divide";
	}
}

//check if their is a user logged, if user is logged in
//send results to servlet to add to database, else do nothing
function InsertResultDatabase(numRight,total,arithmeticType){
	//console.log("InsertResultDatabase function called...\n");
	//console.log("numRight is: " + numRight);
	//console.log("total is: " + total);
	//console.log("arithmeticType is: " + arithmeticType);
	
	var email = getCookie("user");
	console.log("the cookie id is: " + email);
	
	if(email !== ""){ // their is a user logged on
		// make ajax call to the servlet to input information
		requestInsertData(numRight, total, arithmeticType, email)
	}
}

// END FUNCTIONS ==========================================================

// MAIN ============ EXECUTION STARTS HERE =======================================
var queryString = window.location.search;
queryString = queryString.substring(1, queryString.length);
console.log(queryString);
var mydata = queryString.split("&");

//local variables
var numRight = 0;
var score = $(".score");
var answers = $(".answers");
var totalScore = 0; // holds the total score.
var arithmeticType = null; // stores the type of arithmetic.

getArithmeticType(mydata);

for(var i = 0; i < mydata.length; i++){
	console.log(mydata[i]);
	var pos = mydata[i].indexOf("=");
	var question = mydata[i].substring(0, pos);
	var user_answer = mydata[i].substring(pos+1, mydata[i].length);
	console.log("the question is: " + question +  " which evaulates to " + eval(question));
	console.log("the user answer is: " + user_answer);
	if(eval(question) == user_answer){ //append the users answer to return object with green
		numRight++;
		
		var betterfmt = question.split("+").join(" + ");
		betterfmt = question.split("-").join(" - ");
		betterfmt = question.split("*").join(" * ");
		betterfmt = question.split("/").join(" / ");
	
		answers.append("<p class=h4>" + (i+1) + ") " + betterfmt+ " = " + eval(question) + "</p>");
	}
	else{ // append the users answer to return objet with red, they got it wrong.
		var betterfmt = question.split("+").join(" + ");
		answers.append("<span class='text-danger h4'>" + (i+1) + ") " + betterfmt + " = " + user_answer + "</span>" + "<span style=color:green; class=h4> The right answer was: " + eval(question) + "</span> <br/>");
	}
}

score.append(numRight + "/" + mydata.length);
totalScore = mydata.length;

console.log("The arithmetic type is: " + arithmeticType);
InsertResultDatabase(numRight, totalScore, arithmeticType);




