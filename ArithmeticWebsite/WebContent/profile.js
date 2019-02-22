/**
 * Filename: profile.js
 */

console.log("profile.js page called...");

// Gets a cookie of the current user.
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

//Function draws a chart
function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Days', 'Addition', 'Subtraction','Multiplication','Division'],
      ['2004',  1000,      400,           1100, 1234],
      ['2005',  1170,      460,1100, 1234],
      ['2006',  660,       1120,1100, 1234],
      ['2007',  1030,      540,1100, 1234]
    ]);

    var options = {
      title: 'Math Quiz Statistics',
      curveType: 'function',
      legend: { position: 'bottom' }
    };


    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
}

//This function checks if the user is logged in.
function check_user_logged(){
	var user = getCookie("firstname");
	var header = document.getElementById("user_header").append(user + ",");
	console.log(user + " is in the cookiesss");
	if(user !== ""){
		return 1;
	}
	else{
		return -1;
	}
}

//script to be run when profile.html is loaded
function startup_code(){
	if(check_user_logged() == -1){
		alert("no user is logged in at this time.");
		window.location.assign("index.html");
		return -1;
	}
	
	// Get quiz data from java servlet in json format
	
	// Display data in graphular format using Google graph api's.
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
}

//============== MAIN BODY ====================================
window.onload = startup_code;