// This file is run within the Dinosaur game as a web worker. 
// It basically just collects muscle data and if there is a significant spike, it sends a messsage back to the dinosaur game telling it to jump

// Establish a connection to the ServerBIT
var ws = new WebSocket("ws://localhost:9001/");
var ch = "A1";
var features = [];
var yAxisLabel = "";
var sensorData;

ws.onopen = function() 
{
  console.log("Worker has connected to web socket") 
};

var d1;
// Process the responses sent by the ServerBIT
ws.onmessage = function (e) {

    data = JSON.parse(e.data);
    d1 = [];
    for (var i = 0; i < data[ch].length; i += 1)
        d1.push([i, data[ch][i]]);

    d1 = convertEMG(d1);

    // sends the data back to the dinogame so that the EMG data can also be displayed on the graph
    postMessage(d1.toString());


    // If theres a significant muscle movement then tell the dino game to jump
    if (checkForMuscleMovement(d1))
    {
      postMessage("Jump!");
      setTimeout(stopJump, 300);
    }
};


// After a specific amount of milliseconds tell the dinosaur that it should "stop jumping" (so that it can jump again)
function stopJump()
{
  postMessage("Stop!");
}



ws.onclose = function () 
{
    $("#isConnected").css("color", "#d1364a");
    $("#isConnected").text("Disconnected");
};  


// when we collect some data from the EMG sensor, we want to detect a significant muscle movement
// This function does this
function checkForMuscleMovement(sensorData, userDefinedParamters=null)
{
  // MuscleThreshold may need to be changed depending on the person
  const muscleThreshold = 0.06;
  var envelope = 0;
  var muscleData = sensorData;
  var muscleDiff = [];

  if(muscleData.length != 0)
  {
      for(var i = 0; i < muscleData.length - 1; i++)
      {
        muscleDiff.push(Math.abs(muscleData[i+1][1] - muscleData[i][1]));
      }
      envelope = muscleDiff.reduce(function(a, b) {return a + b}, 0);
      envelope = envelope / muscleDiff.length;

      // If the average values of the muscle data indicates a significant movement, then return true so that the dino game jumps
      if(envelope > muscleThreshold)
      {
        return true;
      }
      return false;
  }
}

// converts the raw data into its real life equivalent
function convertEMG(muscleData)
{
  var muscleConverted = [];
  var EMGv;
  // convert every raw value into its real unit equivalent (formula found of Bitalino datasheets)
  for(var i = 0; i < muscleData.length; i++)
  {
    muscleConverted.push([i]);
    EMGv = ((((muscleData[i][1] * 3.3) / (Math.pow(2, 10))) - (3.3 / 2)) / 1000);
    muscleConverted[i].push(EMGv * 1000);
  }
  return muscleConverted;
}
