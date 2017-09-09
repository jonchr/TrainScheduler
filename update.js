
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB1R_ZYKKuV52NUG07tQ0XnLR8EJ4C-dIc",
    authDomain: "jonstrainscheduler.firebaseapp.com",
    databaseURL: "https://jonstrainscheduler.firebaseio.com",
    projectId: "jonstrainscheduler",
    storageBucket: "jonstrainscheduler.appspot.com",
    messagingSenderId: "252737104084"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //Button for adding trains
  $("#add-train-btn").on("click", function(){

  	event.preventDefault();

  	//Grabs user input
	var trainName = $("#train-name-input").val().trim();
	var trainDest = $("#destination-input").val().trim();
  var trainStart = moment($("#startTime-input").val().trim(), "HH:mm").format("X");
	var trainFreq = $("#frequency-input").val().trim();

	console.log(trainName, trainDest, trainStart, trainFreq);

	//Creates temporary train object
	var newTrain = {
		name: trainName,
		dest: trainDest,
		startTime: trainStart,
		freq: trainFreq
	};

	//Pushes to firebase
	database.ref().push(newTrain);

	//Gives user alert
	alert("Train successfully added");

	//Clears input boxes
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#startTime-input").val("");
	$("#frequency-input").val("");

});

//Whenever a new child is added to firebase
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	//store things in variables for convenience
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().dest;
	var trainStart = childSnapshot.val().startTime;
	var trainFreq = childSnapshot.val().freq;
  
  // Difference between the times
  var diffTime = moment().diff(moment.unix(trainStart), "m");

  // Minute Until Train
  var minutesTillTrain = trainFreq - (moment().diff(moment.unix(trainStart), "m") % trainFreq);

  // Next Train
  var nextTrain = moment().add(minutesTillTrain, "m").format("hh:mm a");

  $("#train-table > tbody").append("<tr><td>" 
  	+ trainName + "</td><td>" 
  	+ trainDest + "</td><td>" 
  	+ trainFreq + "</td><td>" 
  	+ nextTrain + "</td><td>" 
  	+ minutesTillTrain + "</td></tr>");

});


