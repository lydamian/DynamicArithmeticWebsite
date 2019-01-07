/**
 * Filename: profile.js
 */

console.log("profile.js page called...");


//This function checks if the user is logged in.
function check_user_logged(){
	return -1;
}

//script to be run when profile.html is loaded
function startup_code(){
	if(check_user_logged() == -1){
		alert("no user is logged in at this time.");
		window.location.assign("index.html");
		return -1;
	}
}

//============== MAIN BODY ====================================
window.onload = startup_code;