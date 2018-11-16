 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBP60-ClhA0Fwck5ujNcFRJW6DTxuTGHJs",
    authDomain: "trainhomework-90a9c.firebaseapp.com",
    databaseURL: "https://trainhomework-90a9c.firebaseio.com",
    projectId: "trainhomework-90a9c",
    storageBucket: "trainhomework-90a9c.appspot.com",
    messagingSenderId: "118603936459"
  };
  firebase.initializeApp(config);


var database = firebase.database();

function clear() {
   $("#trainName").val("");
   $("#destination").val("");
   $("#firstTime").val("");
   $("#frequency").val("");
}

$("#submitBtn").on("click", function(event) {

// Grabbed values from text boxes
name = $("#trainName").val().trim();
destination = $("#destination").val().trim();
firstTime = moment($("#firstTime").val().trim(), "hh:mm").format("X");
frequency = $("#frequency").val().trim();

// Code for handling the push

var newTrain = {
  name: name,
  destination: destination,
  firstTime: firstTime,
  frequency: frequency,
  }

//    dateAdded: firebase.database.ServerValue.TIMESTAMP
database.ref().push(newTrain)
clear();

});


database.ref().on("child_added", function(childSnapshot) {

   var name = childSnapshot.val().name;
   var destination = childSnapshot.val().destination;
   var firstTimeConverted = moment(firstTime, "X").subtract(1, "years");
   console.log(firstTimeConverted);
   var currentTime = moment().format("X");
   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   console.log(diffTime);
   var frequency = childSnapshot.val().frequency;
   console.log(frequency);
   var tRemainder = diffTime % frequency;
   console.log (tRemainder);
   var minutesAway = frequency - tRemainder;
   console.log(minutesAway);
   var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
   console.log(nextArrival);

   $(`
   <tr>
       <td scope="row"> ${name} </td>
       <td>${destination}</td>
       <td>${frequency}</td>
       <td>${nextArrival}</td>
       <td>${minutesAway}</td>
   </tr>
   `).appendTo('#trainSchedule')

})