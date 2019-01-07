/**
 * Filename: divisionproblems.js
 */

console.log("divisionproblem.js page called...");

// we will assume this is single?
function na(num_problems){
	console.log("na function called... with argument of: " + num_problems);
	//local variables
	var counter = 0;
	var x = 0;
	var y = 0;
	
	//dynamically generation content.
	for(var i = 0; i < num_problems; i++){
		
		//creating question
		do{
			x = Math.floor((Math.random() * 10) + 1);
			y = Math.floor((Math.random() * 10) + 1);
		}while(x%y != 0)

		
		console.log("x is: " + x);
		console.log("y is: " + y);
		
		//generating html content for question and form value
		var question = (num_problems - i) + ") " + x + " / " + y + " = ";
		var input_str = "<input class=h4 type=number name="+ x + "/" + y + ">";
			
		var markup ="<span class=h4>"+ question + "</span>"+ input_str + "<br/>";
		//appending html elements to table.
		$("#problems").prepend(markup);
		
		counter++;
	}
}

function single(num_problems){
	console.log("single function called... with argument of: " + num_problems);
	na(num_problems);
}

function multiple(num_problems){
	console.log("multiple function called... with argument of: " + num_problems);
	
	//local variables
	var counter = 0;
	var x = 0;
	var y = 0;
	
	//dynamically generation content.
	for(var i = 0; i < num_problems; i++){
		
		//creating question
		do{
			x = Math.floor((Math.random() * 100) + 1);
			y = Math.floor((Math.random() * 100) + 1);
		}while(x%y != 0)

		
		console.log("x is: " + x);
		console.log("y is: " + y);
		
		//generating html content for question and form value
		var question = (num_problems - i) + ") " + x + " / " + y + " = ";
		var input_str = "<input class=h4 type=number name="+ x + "/" + y + ">";
			
		var markup ="<span class=h4>"+ question + "</span>"+ input_str + "<br/>";
		//appending html elements to table.
		$("#problems").prepend(markup);
		
		counter++;
	}
}

function multiple_rename(num_problems){
	console.log("multiple_rename function called... with argument of: " + num_problems);
	
	//local variables
	var counter = 0;
	var x = 0;
	var y = 0;
	
	//dynamically generation content.
	for(var i = 0; i < num_problems; i++){
		
		//creating question
		do{
			x = Math.floor((Math.random() * 100) + 1);
			y = Math.floor((Math.random() * 100) + 1);
		}while(x%y != 0)

		
		console.log("x is: " + x);
		console.log("y is: " + y);
		
		//generating html content for question and form value
		var question = (num_problems - i) + ") " + x + " / " + y + " = ";
		var input_str = "<input class=h4 type=number name="+ x + "/" + y + ">";
			
		var markup ="<span class=h4>"+ question + "</span>"+ input_str + "<br/>";
		//appending html elements to table.
		$("#problems").prepend(markup);
		
		counter++;
	}
}


// ======== END FUNCTION IMPLEMENTATIONS ===========

var query = window.location.search;

console.log(query);
//I need to parse these values somehow...
//this is an example of what query will look like: 
//type=NA&num_problems=5

//check if the value contains certain thing
var amp_position = query.indexOf("&");

var type = query.slice(6,amp_position);
console.log("type is: " + type);

var num_problems = query.slice((amp_position+14),query.length)
console.log("num_problems is: " + num_problems);

if(type == "NA"){
	na(num_problems);	 
}
else if(type == "single"){
	single(num_problems);
}
else if(type == "multiple"){
	multiple(num_problems);
}
else{
	multiple_rename(num_problems);
}

// this function is called when the user submits their answers for addition

function submit_answers(form){
	console.log("submit_answers function called...");
	var mydata = "";
	var jsonObj = "";
	var myform = document.getElementById("problems").elements;
	
	for(var i = 0; i < myform.length -1; i++ ){
		console.log("name is: " + myform[i].name + " value is: " + myform[i].value);
	mydata = myform[i].name + "=" + myform[i].value;
	jsonObj += mydata + "&";
	}
	
	jsonObj = jsonObj.substr(0, jsonObj.length-1);
	console.log(jsonObj);
	var newURL = "results.html?" + jsonObj;
	console.log(newURL);
	window.location.href = newURL;}








