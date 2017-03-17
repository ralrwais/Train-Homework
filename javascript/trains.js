var config = {
    apiKey: "AIzaSyBSO7tiyPj2xF9KyUIADiCRzH4NYrvyJWo",
    authDomain: "train-times-210a1.firebaseapp.com",
    databaseURL: "https://train-times-210a1.firebaseio.com",
    storageBucket: "train-times-210a1.appspot.com",
    messagingSenderId: "350746419310"
  };
  firebase.initializeApp(config);

  	var database = firebase.database(); 

  	$("#submit").on("click", function() {
  		event.preventDefault();
  		var name = $("#trainName").val().trim();
  		var destination = $("#trainDestination").val().trim();
  		var first = $("#firstTrain").val().trim();
  		var frequency = $("#frequency").val().trim();



  		database.ref().push({

  			Name: name,
  			Destination: destination,
  			FirstTrain: first,
  			Frequency: frequency
  		});	

        });
    

  	database.ref().on("child_added", function(childSnapshot){

        var time = moment(childSnapshot.val().FirstTrain, "HH:mm");
        var currentTime = moment();
        var frequency = childSnapshot.val().Frequency;
        var difference = (currentTime.diff(time, 'minutes'));
        var lastTrain = difference%frequency;
        var minutesAway = frequency - (lastTrain);
        var nextArrival = currentTime.add(minutesAway, 'minutes').format("hh:mm A");

        $(".theTable").append("<tr><td>" + childSnapshot.val().Name + "</td><td>" + childSnapshot.val().Destination +
         "</td><td>" + childSnapshot.val().Frequency + "</td><td>" +nextArrival+ "</td><td>" +minutesAway+ "</td></tr>");

        console.log(childSnapshot.val().Name);


  	
  	   }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
          });







 