/**
 * Filename: addition.js
 */

console.log("addition.js page called...");

// SELECT FORM VALUES
function getResult(form){
	//getting form values
	var type = form.type.value; // this doesnt work in ie for some reason...
	var num_problems = form.num_problems.value;

	if(type == undefined){
		type = "NA";
	}
	if(num_problems < 5){
		num_problems = 5;
	}

	//verifying correct form values
	console.log("type is: " + type);
	console.log("num_problems: " + num_problems);
	
	//checking assigning values to a new page
	window.location.href = "additionproblems.html?type="+type+"&num_problems="+num_problems;
}

/*
document.getElementById("addition_form").addEventListener("click", function(){
	form = document.getElementById("addition_form");

	// getting form values
	var type = form.type.value;
	var num_problems = form.num_problems.value;

	//verifying correct form values
	console.log("type is: " + type);
	console.log("num_problems: " + num_problems);

});
*/


	