
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
	var trainStart = $("#startTime-input").val().trim();
	var trainFreq = $("#frequency-input").val().trim();
	console.log(trainStart);

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
	alert("Train succesfully added");

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
	var trainStart = moment(moment().format("YYYY-MM-DD") + " " + childSnapshot.val().startTime).format("hh:mm a");
	var trainFreq = childSnapshot.val().freq;

    var currentTime = moment();

    // Difference between the times
    console.log(moment(currentTime).format("hh:mm a"));
    console.log(trainStart);
    //console.log(moment().diff(trainStart,"minutes"));
    var diffTime = moment(currentTime).diff(trainStart, "minutes");
    console.log(diffTime);

    // Minute Until Train
    var minutesTillTrain = trainFreq - (diffTime % trainFreq);
    // console.log(minutesTillTrain);

    // Next Train
    var nextTrain = moment().add(minutesTillTrain, "minutes").format("hh:mm a");
    // console.log(nextTrain);

    $("#train-table > tbody").append("<tr><td>" 
    	+ trainName + "</td><td>" 
    	+ trainDest + "</td><td>" 
    	+ trainFreq + "</td><td>" 
    	+ nextTrain + "</td><td>" 
    	+ minutesTillTrain + "</td></tr>");

});

