$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBr2TUDqQdQMLID9MExRWQMUDx-ntjZXXw",
    authDomain: "trainschedule-40468.firebaseapp.com",
    databaseURL: "https://trainschedule-40468.firebaseio.com",
    projectId: "trainschedule-40468",
    storageBucket: "trainschedule-40468.appspot.com",
    messagingSenderId: "325488356914"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // Global Variables

  var trainName;
  var trainDestination;
  var trainTime;
  var trainFrequency;

  $("#add-train").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#trainName").val().trim();
    trainDestination = $("#trainDestination").val().trim();
    trainTime = $("#trainTime").val().trim();
    trainFrequency = $("#trainFrequency").val().trim();

    // Code for handling the push
    database.ref().push({
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#form")[0].reset();
  });

  database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.time);
    console.log(sv.frequency);

    // Calculating next train and minutes away
    var tFrequency = sv.frequency;

    var firstTime = sv.time;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log(moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(diffTime, tFrequency, tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    // var hoursAway = moment(sv.time, "hh:mm").fromNow();
    // console.log(hoursAway);
    // var minAway = (parseInt(hoursAway, 10) * "60");
    // console.log(minAway);

    var tBody = $("tbody");
    var tRow = $("<tr>");

    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    var tName = $("<td>").text(snapshot.val().name);
    var tDest = $("<td>").text(snapshot.val().destination);
    var tFreq = $("<td>").text(snapshot.val().frequency);
    var tTime = $("<td>").text(moment(nextTrain).format("HH:mm"));
    var tAway = $("<td>").text(tMinutesTillTrain);



    // Append the newly created table data to the table row
    tRow.append(tName, tDest, tFreq, tTime, tAway);
    // Append the table row to the table body
    tBody.append(tRow);

  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

  });

  function clearVars() {
    trainName = "";
    trainDestination = "";
    trainTime = "";
    trainFrequency = "";
    hoursAway = "";
    minAway = "";

  }
  clearVars();
});