
// If this is pressed, rather than collecting data from the Bitalino device, 
// We should instead start playing pre recorded data from the file that has
// Been selected (Using the file input element)
var playing = false;

// All collected data gets added to antother array which isnt erased
// until we restart the recording
var recording = false;

function playFile()
{
	var playBack = [];
  	playing = true;
  	// Go through all of the currently recorded data and play it back
	for(var i = 1; i < recordedData.length; i+=250)
	{
		doSetTimeout(i, playBack, (i /250) * 100);
	}
	setTimeout( () => {playing = false;} , (recordedData.length / 250) * 100);
}

// Each subset of the data will be played a few milliseconds after the next one to mimic real time
function doSetTimeout(i, playBack, time)
{
	setTimeout(function() { getNextRecordedData(i, playBack) }, time);
}

// collect a small chunk of the recorded data and then play it back on the graph
function getNextRecordedData(i, playBack)
{

	var convert = window[recordedData[0][0]];
  	var recordedyMin = recordedData[0][1];  
  	var recordedyMax = recordedData[0][2];  
  	var recordedyAxisLabel = recordedData[0][3];
		// if the current data set is now too large, remove some of the older data (to mimic real time)
		if(playBack.length > maxValue)
		{
			playBack.splice(0, 250);
			position = 0;
		}

		for(var j = position; j < position + 250; j++)
		{
			playBack.push([i + j, recordedData[i + j][1]]);
		}		

		sensorData = [];
		position = playBack.length;
		sensorData.push({data: playBack, color: "rgb(255,255,255)", constraints: thresholdConstraints});

		// if we know what sensor we are reading from, convert it to real units
        if(recordedData[0] != undefined)
        {
          // sensorData[0].data = conversion.call(this, sensorData[0].data);
          sensorData[0].data = convert(sensorData[0].data);
        }

        // Perform the necessary feature extractions
        for(var k = 0; k < features.length; k++)
        {
          features[k][0].call(this, sensorData, features[k][1]);
        }  

        // Display the data on the graph
        $.plot($("#placeholder"), sensorData, 
  		{ 
  			yaxis: { min:recordedyMin, max:recordedyMax}
  			, xaxis: { min: 0, max: maxValue }
  			, series: {curvedLines: {active: true} }, 
  			xaxes: [{ axisLabel: 'message #' }], 
  			yaxes: [{ axisLabel: recordedyAxisLabel}] 
  		});
}



// When this is called we open a file browser and allow a user to select one of their local files
// The values within this file then become the recorded data set
function loadFromFile()
{
	var file = document.getElementById('fileInput').files[0];
	var reader = new FileReader();
	// collect the data from the file
	reader.onload = function()
	{
		var stringResult = reader.result;
		var values = stringResult.split(",");
		var reshaped = [];
		reshaped.push(values.splice(0, 4));

		// split the string into a 2D array
		while(values.length) reshaped.push(values.splice(0, 2));

		recordedData = reshaped; 
	}

	reader.readAsText(file);
}



function toggleRecord()
{
	recording = !recording;
	if(recording)
	{
		recordedData = [[conversion.name, yMin, yMax, yAxisLabel]];
	}
}


// Allow the data that we have recorded from the Sensor, to be downloaded as a file that a user can then
// Do whatever they want with
function exportToFile()
{
	var blobObject = null;
	var str = recordedData.toString();
	// If the user is still recording tell them to stop
	if(recording)
	{
		alert("Stop the recording before you try to save");
		return;
	}
	// save the recorded data to a downloadable text file
	if(window.navigator.msSaveOrOpenBlob) 
	{
		blobObject = new Blob([str]);
		
		$(anchorSelector).click(function(){
			window.navigator.msSaveOrOpenBlob(blobObject, "data.txt");
		});
	} 
	else
	{
		var url = "data:text/plain;charset=utf-8," + encodeURIComponent(str);	
		$("#export").attr("href", url);
	}

}


