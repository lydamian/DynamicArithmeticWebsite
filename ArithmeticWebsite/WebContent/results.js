/**
 * Filename: results.js
 */

console.log("results.js page called..." );

function gotohomepage(){
	location.assign("index.html");
}

var queryString = window.location.search;
queryString = queryString.substring(1, queryString.length);
console.log(queryString);
var mydata = queryString.split("&");

//local variables
var numRight = 0;
var score = $(".score");
var answers = $(".answers");


for(var i = 0; i < mydata.length; i++){
	console.log(mydata[i]);
	var pos = mydata[i].indexOf("=");
	var question = mydata[i].substring(0, pos);
	var user_answer = mydata[i].substring(pos+1, mydata[i].length);
	console.log("the question is: " + question +  " which evaulates to " + eval(question));
	console.log("the user answer is: " + user_answer);
	if(eval(question) == user_answer){
		numRight++;
		
		var betterfmt = question.split("+").join(" + ");
		betterfmt = question.split("-").join(" - ");
		betterfmt = question.split("*").join(" * ");
		betterfmt = question.split("/").join(" / ");
		
		
		
		answers.append("<p class=h4>" + (i+1) + ") " + betterfmt+ " = " + eval(question) + "</p>");
	}
	else{
		var betterfmt = question.split("+").join(" + ");
		answers.append("<span class='text-danger h4'>" + (i+1) + ") " + betterfmt + " = " + user_answer + "</span>" + "<span style=color:green; class=h4> The right answer was: " + eval(question) + "</span> <br/>");
	}
}
score.append(numRight + "/" + mydata.length);