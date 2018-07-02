// <------------------------------------------------------------------------------------------------------FEATURE EXTRACTION METHODS --------------------------------------------------------------------------------------------------->

// The program has detected muscle movement, flash on a div to indicate detection 
function onSetMuscle()
{
  $('#muscle').fadeTo(600, 3.0, function() { $(this).fadeTo(500, 0.3); });
}


// The program has detected a heartbeat, flash on div to indicate this
function onHeartBeat()
{
  $('#heartBeat').fadeTo(200, 3.0, function() { $(this).fadeTo(500, 0.3); });
}


// depending on the amount of light available to the sensor, indicate 
// what "level" of brightness we are currently at
function onLightLevel(level)
{
  if(level == 0)
  {
    $("#light").css("color", "#d1364a");
    $("#light").text("Blinding Light!");
  }
  else if(level == 1)
  {
    $("#light").css("color", "#ff5400");
    $("#light").text("Some Light!");
  }
  else
  {
    $("#light").css("color", "#5cb85c");
    $("#light").text("No Light!");
  }
}



// Check the data passed in and see if there is a significant spike in valeues
// This would indicate that there was considerable muscle movement
function checkForMuscleMovement(sensorData, userDefinedParamters=null)
{
  // This value might need to be different from person to person
  const muscleThreshold = 0.06;
  // Get only the last 250 values from the sensor data
  // Otherwise, we will detect multiple muscle movements
  var muscleData = sensorData[0].data.slice(sensorData[0].data.length - 250, sensorData[0].data.length);
  var muscleDiff = [];
  var envelope = 0;

  if(muscleData.length != 0)
  {
    // calculate the differences between each muscle value, and the next one
    for(var i = 0; i < muscleData.length - 1; i++)
    {
      muscleDiff.push(Math.abs(muscleData[i+1][1] - muscleData[i][1]));
    }
    // calculate the mean of the differences
    envelope = muscleDiff.reduce(function(a, b) {return a + b}, 0);
    envelope = envelope / muscleDiff.length;
    // if the differences were big enough, there has been a significant spike and therefore muscle movement
    if(envelope > muscleThreshold)
    {
      onSetMuscle();
    }
  }
}



// Similair to onSet Muscle detection, if there is a significant peak compared to the average,
// Then we determine that a heartbeat has been detected (Not the best approach)
function checkForHeartBeat(sensorData, userDefinedParamters=null)
{
  // Variable from person to person
  const heartThreshold = 0.05;
  // Collect last 250 values of current data
  var heartData = sensorData[0].data.slice(sensorData[0].data.length - 250, sensorData[0].data.length);
  var heartMovingAverages = [];
  if(heartData.length != 0)
  {
      // Collect the moving averages from the data, with a sliding window of 5
      for(var i = 0; i < heartData.length - 4; i+=5)
      {
        heartMovingAverages.push(heartData[i+4][1] + heartData[i+3][1] + heartData[i+2][1] + heartData[i+1][1] + heartData[i][1]);
      }
      // Go through all of the moving average value, if there is a moving average above the threshold
      // There is a significant peak and thus a heartbeat detected
      for(var i = 0; i < heartMovingAverages.length; i++)
      {
        if(heartMovingAverages[i] > heartThreshold)
        {
          onHeartBeat();
          break;
        }
      }
  }
}



// Determines what the average light value is, and from this what "level" of light we are at
// where "level" is just an arbitrary threshold value
function checkLightLevel(sensorData, userDefinedParamters=null)
{
  var lightData = sensorData[0].data;
  var lightValues = [];
  // calculate average value from data passed in
  for(var i = 0; i < lightData.length; i++)
  {
    lightValues.push (lightData[i][1]);
  }
  var averageLight = (lightValues.reduce(function(a, b) {return a + b}, 0)/lightData.length);

    if (averageLight <=5)
      onLightLevel(2);
    else if (averageLight <=30)
      onLightLevel(1);
    else
      onLightLevel(0);
}


// <----------------------------------------------------------------------------------------------------------CORE FEATURES------------------------------------------------------------------------------------------------------------------->


// Calculate the most significant value(s) in the current dataset
function globalMinAndMax(sensorData, userDefinedParamters)
{
  var min = 0;
  var max = 0;
  // Calculate global min and max
  for(var i = 0; i < sensorData[0].data.length; i++)
  {
    if(sensorData[0].data[i][1] > max)
    {
      max = sensorData[0].data[i][1];
    }
    else if(sensorData[0].data[i][1] < min)
    {
      min = sensorData[0].data[i][1];
    }
  }

  // Add only the global extrema(s) that we care about
  if(userDefinedParamters[0] === "extrema")
  {
    sensorData.push({data: [[0, max], [1000, max]]});
    sensorData.push({data: [[0, min], [1000, min]]});
  }
  else if(userDefinedParamters[0] === "maxima")
  {
    sensorData.push({data: [[0, max], [1000, max]]});
  }
  else if(userDefinedParamters[0] === "minima")
  {
    sensorData.push({data: [[0, min], [1000, min]]});
  }
}


// Calculate the x most significant minima/ maxima values from the current dataset
function localExtrema(sensorData, userDefinedParamters)
{
  var localMinima = [];
  var localMaxima = [];
  
  // Collect all global minima and all global maxima values
  for (var i = 1; i < sensorData[0].data.length - 1; i++)
  {
    if(sensorData[0].data[i][1] > sensorData[0].data[i - 1][1] 
      && sensorData[0].data[i][1] >= sensorData[0].data[i + 1][1])
    {
      localMaxima.push([i , sensorData[0].data[i][1]]);
    }
    else if(sensorData[0].data[i][1] < sensorData[0].data[i - 1][1] 
      && sensorData[0].data[i][1] <= sensorData[0].data[i + 1][1])
    {
      localMinima.push([i , sensorData[0].data[i][1]]);
    }
  } 

  // if the user wants to display a limited amount of extrema points
  if(userDefinedParamters[0] != -1)
  {
    // Order by most significant peaks/ troughs, and return them
    localMinima.sort(function(a,b){return a[1] - b[1];});
    localMaxima.sort(function(a,b){return b[1] - a[1];});

    if(userDefinedParamters[1] === 'maxima' || userDefinedParamters[1] === 'extrema')
    {
      sensorData.push({data: localMaxima.slice(0, userDefinedParamters[0]), color:"rgb(18,100,117)",  points: {show: true}, lines: {show: false}});
    }
    if(userDefinedParamters[1] === 'minima' || userDefinedParamters[1] === 'extrema')
    {
      sensorData.push({data: localMinima.slice(0, userDefinedParamters[0]), color:"rgb(117,19,65)", points: {show: true}, lines: {show: false}});
    }
  }
  // If the user wants to display ALL of the extrema points
  else
  {
    
    if(userDefinedParamters[1] === 'maxima' || userDefinedParamters[1] === 'extrema')
    {
      sensorData.push({data: localMaxima, color:"rgb(18,100,117)", points: {show: true}, lines: {show: false}});
    }
    if(userDefinedParamters[1] === 'minima' || userDefinedParamters[1] === 'extrema')
    {
      sensorData.push({data: localMinima, color:"rgb(117,19,65)", points: {show: true}, lines: {show: false}});
    }    
  }
}


// Calculate the Root Mean Square of the current dataset
function rootMeanSquare(sensorData, userDefinedParamters)
{
  var squareSum = 0;
  for(var i = 0; i < sensorData[0].data.length; i++)
  {
    squareSum += Math.pow(sensorData[0].data[i][1], 2);
  }

  var mean = squareSum / sensorData[0].data.length;

  var RMS = Math.sqrt(mean);

  // Display RMS with the desired number of significant figures
  $("#rootMeanSquare").text("Root Mean Square: " + RMS.toFixed(userDefinedParamters[0]));
}


// Calculate all of the points in the current dataset, in which the user crosses the X axis
function zeroCrossings(sensorData, userDefinedParamters)
{
  var crossings = [];
  var dYdX;
  for(var i = 0; i < sensorData[0].data.length - 1; i++)
  {
    // if we have crossed the x axis somewhere between 2 points, and the gradient is positive
    if (userDefinedParamters[0] === 'positive' && ((sensorData[0].data[i][1] < 0) && (sensorData[0].data[i + 1][1] >= 0)))
    {
      // determine exactly WHERE BETWEEN these 2 points the X axis has been crossed
      dYdX = (sensorData[0].data[i + 1][1] - sensorData[0].data[i][1]) / (1);
      c = sensorData[0].data[i][1] - (dYdX * i);
      crossings.push([-(c / dYdX), 0]);
    }
    // if we have crossed the x axis somewhere between 2 points, and the gradient is negative
    else if (userDefinedParamters[0] === 'negative' && ((sensorData[0].data[i][1] > 0) && (sensorData[0].data[i + 1][1] <= 0)))
    {
      dYdX = (sensorData[0].data[i + 1][1] - sensorData[0].data[i][1]) / (1);
      c = sensorData[0].data[i][1] - (dYdX * i);
      crossings.push([-(c / dYdX), 0]);      
    }
    // if we have crossed the x axis somewhere between 2 points, no matter the gradient
    else if(userDefinedParamters[0] === 'both' && ((sensorData[0].data[i][1] < 0) && (sensorData[0].data[i + 1][1] >= 0)) || ((sensorData[0].data[i][1] > 0) && (sensorData[0].data[i + 1][1] <= 0)))
    {
      dYdX = (sensorData[0].data[i + 1][1] - sensorData[0].data[i][1]) / (1);
      c = sensorData[0].data[i][1] - (dYdX * i);
      crossings.push([-(c / dYdX), 0]);     
    }
  }

  // push all zero crossing points to be displayed
  sensorData.push({data: crossings, color: "rgb(57, 249, 140)", points: {show: true }, lines: {show: false}});
}

// Calculate the Envelope curves of the dataset
// I.e. calculate the moving average points and make a "positive" and "negative" wave
function envelopeCurves(sensorData, userDefinedParamters)
{
  var movingAverages = [];
  var sum;
  var positiveAverages = [];
  var negativeAverages = [];

  // Calculate the movign averages of the dataset
  for(var i = 0; i < sensorData[0].data.length - userDefinedParamters[0]; i+=userDefinedParamters[0])
  {
    sum = 0;
    for(var j = i; j < i + userDefinedParamters[0]; j++)
    {
      sum+= sensorData[0].data[j][1];
    }
    movingAverages.push([i, sum/ userDefinedParamters[0]]);
  }

  // If the moving average is positive/ negative add it to the respective lists
  for(var i = 0; i < movingAverages.length; i++)
  {
    if(movingAverages[i][1] >= 0)
    {
      positiveAverages.push([movingAverages[i][0], movingAverages[i][1]]);
    } 
    else
    {
      negativeAverages.push([movingAverages[i][0], movingAverages[i][1]])
    }
  }
  // Add them to the data displayed on the plot
  sensorData.push({data: positiveAverages, lines: {show: true, lineWidth: 3}, curvedLines: {apply:true, tension: 1}});
  sensorData.push({data: negativeAverages, lines: {show: true, lineWidth: 3}, curvedLines: {apply:true, tension: 1}});
}

// Calculate the inflection points within the current dataset (where we go from upside down bucket to 
// upright on, and vice versa)
function calculateInflection(sensorData, userDefinedParamters)
{

  var inflectionPoints = [];
  var differences = [];
  var increasing = false;

  var numberOfPoints = userDefinedParamters[0];

  // Calculate the differences between 2 points (that are "numberOfPoints" distance away from each other)
  for(var i = 0; i < sensorData[0].data.length - numberOfPoints; i+= numberOfPoints)
  {
    differences.push(sensorData[0].data[i][1] - sensorData[0].data[i + numberOfPoints][1]);
  }


  for (var i = 0; i < differences.length; i++)
  {
    // if we are currently in an "upright" bowl, and this changes = inflection point
    if(differences[i] < differences[i + 1] && (differences[i + 1] != 0))
    {
      if(increasing == true)
      {
        inflectionPoints.push([i * numberOfPoints, sensorData[0].data[i * numberOfPoints][1]]);
        increasing = false;
      }
    }
    // if we are currently in an "upside down" bowl, and this changes = inflection point
    else if(differences[i] > differences[i + 1] && (differences[i + 1] != 0))
    {
      if(increasing == false)
      {
        inflectionPoints.push([i * numberOfPoints, sensorData[0].data[i * numberOfPoints][1]]);
        increasing = true;
      }
    }
  }
  // Display this data
  sensorData.push({data: inflectionPoints, color:"rgb(100,100,180)", points: {show: true}, lines: {show: false}})
}