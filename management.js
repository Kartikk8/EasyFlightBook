
/*
# TODO


function signIn() ---> checks json file for matching record in loop and commits first name to storage.

function getAllFlights() ---> prints all flights ---> produces flight number and details -----> displayed in booking.html

function getFlight(flight number) --> takes flight number ---> produces flight number and details

function bookFlight() ---> writes data to existing user account of flight number

function manageBooking() ---> access current user bookings, allows --> extra data to be written

function flightTotalUser(flightNumber) ---> uses email as ID for user, ---> matches to flight number ---> calls getFlight();

function getFood() --> prints food and prices

function getDrink() ---> prints drink and prices

function buyFood(email, number) ---> stores inside that user json and appends to flight cost of user

*/

var name;

var flights;
var depCity;
var arrCity;
var date;
var numberofpeople;

var arrFlights = [];



checkUser(name);

console.log("you are logged in as: " + name); // to see in console

function checkUser(name) {

	if (name != '') {
		var signIn = document.getElementById('signInDiv');

		var htmlHelloUser = "<div class='col-sm py-3'><button type='button' class='login-btn' id='signOut' onClick='reset()'>Sign Out</button></div>";
		htmlHelloUser += "<br><br><br><div class='col px-lg-3'><p style='font-size:50px'>Hello " + name + "!</p></div>";
		
		signIn.innerHTML = htmlHelloUser;
	}

}

function reset() {
	var signOut = document.getElementById('signInDiv');
	name = '';
	var htmlReset = "<div class='col-md-auto'><a href='sign-in.html'><button type='button' class='login-btn'>Sign In</button></a></div><div class='col-md-auto'><a href='sign-up.html'><button type='button' class='signup-btn'>Sign up</button></a></div>";

	signOut.innerHTML = htmlReset;
}

/*
	<div class='col-md-auto'><a href='sign-in.html'><button type='button' class='login-btn'>Sign In</button></a></div><div class='col-md-auto'><a href='sign-up.html'><button type='button' class='signup-btn'>Sign up</button></a></div>
*/



function fetchJson(jsonFile) { // fetches json file
	fetch(jsonFile)
		.then(response => response.json())
		.then(data => {

			var keys = Object.keys(data);

			console.log(keys[0]);

			switch (keys[0]) {
				case 'User':
					console.log(keys[0]);
					//console.log(data.User[0].email);


					break;
				case 'Flight':
					console.log(keys[0]);


					break;
				case 'Extras':
					console.log(keys[0]);

					break;
				default:
					console.log("we suck and it didn't work");
					break;
			}

		});
}

function signIn() {
	var email = document.getElementById('inputEmail1').value;
	var password = document.getElementById('inputPassword1').value;
	console.log(email);
	console.log(password);

	fetch('user.json')
		.then(response => response.json())
		.then(data => {

			var keys = Object.keys(data);

			console.log(keys[0]);
			console.log(data.User[0].email);

			var correctLogin = false;

			for (var i = 0; i < data.User.length; i++) {

				if (email == data.User[i].email && password == data.User[i].password) {
					name = data.User[i].firstName;
					correctLogin = true;
					//return to home screen 
					window.location.href = "index.html";
				}

			}
			if (correctLogin == false) {
				alert("Incorrect email and or password!");
			}

		});

}


//To be called once the show flights button is pressed
function bookingSubmit() {
	//commit date and number of people to a global variable
	//to be used to calculate price and display price
	depCity = document.getElementById('departureSelect').value;
	arrCity = document.getElementById('arrivalSelect').value;
	date = document.getElementById('datetimepicker').value;
	numberofpeople = document.getElementById('selectPeople').value;

	getRelevantFlights();

	arrFlights.forEach( e => {
	});

	//send depCity and arrCity to getRelevantFlights()
	//and store the returned flight object in a var
	displayFlights();
}

//cycles through the flight json file and returns a js object holding all matching flights
function getRelevantFlights() {	
	fetch("flight.json")
		.then(response => response.json())
		.then(data => {

			var count = 0;

			for (var i = 0; i < data.Flight.length; i++) {

				
				if (depCity == data.Flight[i].departure && arrCity == data.Flight[i].destination) {

					arrFlights[count] = data.Flight[i];
					count++;
				}
			}
			
		});
}

//Inserts html into the show flights section of the booking page
function displayFlights() {
	var varBlock = document.getElementById('bookingArea');
	
	var html2 = '';
	
	html2 += "<h1 class='display-4'>Available Flights</h1>";
	
	html2 += "<div class='list-group'>";

	arrFlights.forEach( e => {

		html2 += "<a href='#' class='list-group-item list-group-item-action'> Flight Number: " + e.number + "  |  Date: " + date + "  |  From: " + e.departure + " - " + e.timeDep + " To: " + e.destination + " - " + e.timeDest + "  |  Price for " + numberofpeople + " passengers  $" + e.cost*numberofpeople + "</a>";

	});
	
	html2 += "</div>";
	varBlock.innerHTML = html2;
}



function pickTrip(flight){
	currentFlight = flight;
	
}
