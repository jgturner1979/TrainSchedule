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
  });

  database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.time);
    console.log(sv.frequency);

    // Change the HTML to reflect
    // $("#employeeName").text(sv.name);
    // $("#employeeRole").text(sv.role);
    // $("#startDate").text(sv.startDate);
    // $("#employeeRate").text(sv.rate);

    var tBody = $("tbody");
    var tRow = $("<tr>");

    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    var tName = $("<td>").text(snapshot.val().name);
    var tDest = $("<td>").text(snapshot.val().destination);
    var tTime = $("<td>").text(snapshot.val().time);
    var tFreq = $("<td>").text(snapshot.val().frequency);

    // //var empMonthsWorked = $("<td>").text(snapshot.val().monthsWorked); // create a variable to calculate based on startDate
    // var minAway = $("<td>").text(snapshot.val().monthlyRate);
   
    // Append the newly created table data to the table row
    tRow.append(tName, tDest, tTime, tFreq);
    // Append the table row to the table body
    tBody.append(tRow);

  });

});