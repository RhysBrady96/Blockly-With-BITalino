
/** Electrodermal response was functionality that was not thoroughly tested and as such was not converted into a block.
 * 	Other Developers are free to continue this work however. */

var found = false;
// AKA Skin Conductance, determine if there has been a significant skin response from
// the data that has been passed in
function electroDermalResponseDetection(sensorData, userDefinedParamters=null)
{
  var data = sensorData[0].data;
  var responses = [[]];
  var d;
  var minimumLength = 20;
  var threshold = 0.4;


  filteredData = movingAverage(data, 5);

  // console.log(filteredData);

  for(var i = 1; i < filteredData.length; i++)
  {
    d = filteredData[i][1] - filteredData[i - 1][1];
    if (!found && d > threshold)
    {
      for(var j = i; j > 1; j--)
      {
        // check for a Zero crossing before response
        if(filteredData[j][1] - filteredData[j - 1][1] < 0 && responses[-1] === [])
        {
          responses[-1].append(j);
          found = true;
          // Isnt in the origional code may need to take out
          break;
        }
      }
    }
    // Zero Crossing after response
    else if (found && d < 0)
    {
      response_l = i - responses[-1][0];
      // check if the last "response" was far enough away to count as a response
      if (response_l > minimumLength)
      {

        console.log("Found a Skin Response!");

        responses[-1].append(response_l);
        responses[-1].append(filteredData[i][1] - filteredData[responses[-1][0]][1]);
        responses.append([]);
      }
      else
      {
        responses[-1] = [];
      }
      found = false;
    }
  }

  // Dont want to return this just yet (until the format is correct)
  // return(responses);
}


// Not yet implemented
function QRSDetection(sensorData, userDefinedParamters=null)
{

}