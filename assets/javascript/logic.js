$(document).ready(function () {

	var startBtn = $("#start");
	var map, infoWindow, service;
 	$("#map").hide()

	var quizItems = [{
		question: "How far are you willing to travel?",
		options: ["5 miles", "10 miles", "25 miles"],
	},
	{
		//change to what type of activity
		question: "Activity Level",
		options: ["active", "not active "],

	},
	{
		question: "On a scale from 0 (cheapest) to 4 (most expensive) what is you budget? ",
		options: ["0", "1", "2", "3", "4"],
	},
	{
		question: "How big is your group?",
		options: ["1", "2", "3+"],
	}] //end of quiz items 

	startBtn.click(function (event) {
		event.preventDefault();
		$(".subcontainer").remove();

		var description = $('<div class="instruction-list">' + '<h5 class="instructions"> Answer questions below to find your activity! </h5>' + '</div>')

		$('#questions-here').prepend(description);




		//created questions on page
		for (i = 0; i < quizItems.length; i++) {
			$("#questions-here").append("<h4 id='question-text' class='row-fluid'>" + quizItems[i].question + "</h4>");

			//created options for each question
			for (j = 0; j < quizItems[i].options.length; j++) {
				$('#questions-here').append("<div class='option-div inline '> <input type='radio' class='option-here ' name='question-" + i + "' value= " + quizItems[i].options[j] + "'>" + quizItems[i].options[j]) + "</div>";


			} //end of j (opiton) for loop

		} //end of i (question) for loop

		var city = $('<div class="row-fluid city">' +
			'<h4 class="card-title"> Zip Code(Must be in Orange County)</h4>' +
			'<input id="user-input">' +
			'</div>')

		var submitBtn = $('<div class="row-fluid submit-div"><button type="button" class="btn btn-submit">Submit</button></div>');

		$("#questions-here").append(city, submitBtn);


		//submit function
		submitBtn.on('click', function () {

			//obtain value of radio buttons

			var distance = $('input:radio[name=question-0]:checked').val();
			var activity = $('input:radio[name=question-1]:checked').val();
			var budget = $('input:radio[name=question-2]:checked').val();
			var groupSize = $('input:radio[name=question-3]:checked').val();
			var location = $("#user-input").val();


			//checking to see if submitBtn is working
			console.log("you clicked submit")

			//set of the results page
			$(".quiz-container").remove();
			$("#map").show();

			function initMap() {
				var orangeCounty = new google.maps.LatLng(33.7175, -117.8311);
		
				infowindow = new google.maps.InfoWindow();
		
				map = new google.maps.Map(
					document.getElementById("map"), {center: orangeCounty, zoom: 11});
				};
				initMap();

				var request = {
					query: "Chik Fil A",
					fields: ["name", "geometry", "price_level", "rating", "opening_hours","icon"]
				  };
				  
 
				service = new google.maps.places.PlacesService(map);
				
				service.findPlaceFromQuery(request, function(results, status) {
				  if (status === google.maps.places.PlacesServiceStatus.OK) {
					for (var i = 0; i < results.length; i++) {
					  createMarker(results[i]);
					 
					}
					map.setCenter(zip);
				  }
				});
			  
		
			  function createMarker(place) {
				var marker = new google.maps.Marker({
				  map: map,
				  position: place.geometry.location
				});
		
				google.maps.event.addListener(marker, 'click', function() {
				  infowindow.setContent(place.name);
				  infowindow.open(map, this);
				});
			  }

		}) //end of submit function

	}) //end of start function

	//start of submit button function


	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyA0VKHpsqWkKic4BZ4Sc8ArYp7WdLvQ-Vc",
		authDomain: "project1-c10f1.firebaseapp.com",
		databaseURL: "https://project1-c10f1.firebaseio.com",
		projectId: "project1-c10f1",
		storageBucket: "project1-c10f1.appspot.com",
		messagingSenderId: "696380136176"
	};
	firebase.initializeApp(config);






}) //end of document ready function