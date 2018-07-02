      // Establish a connection to the ServerBIT
      var ws = new WebSocket("ws://localhost:9001/");
      

      var ch = "nSeq";      
      var yMin = 0;
      var yMax = 1024;
      var yAxisLabel = "";
      var conversion;
      
      var features = [];
      var thresholdConstraints = [];
      
      var recordedData = [];
      var d1 = [];
      var position = 0;
      
      const maxValue = 1000;
      
      ws.onopen = function() 
      {
        $("#isConnected").css("color", "#5cb85c");
        $("#isConnected").text("Connected");        
      };
      // Process the responses sent by the ServerBIT
      

      // We will get a "message" from the ServerBIT python program, which contains all of the data collected from the BITalino board
      ws.onmessage = function (e) {
        
        var sensorData = [];

        if(!playing)
        {
          data = JSON.parse(e.data);

          // If the currently playing data becomes too large, we take off the olders data and add the newest one
          if(!(d1 === undefined) && d1.length > maxValue)
          {
            d1.splice(0, data[ch].length);
            position = 0;
            // If we are recording the current data then add it to the recording list
            if(recording)
            {
              recordedData.push.apply(recordedData, d1);
            }
          }

          for (var i = 0; i < data[ch].length; i += 1)
            d1.push([i + position, data[ch][i]]);

          position += d1.length;

          sensorData.push({data: d1, color: "rgb(255,255,255)", constraints: thresholdConstraints});

          // convert the data into their real unit equivalent
          if(conversion != undefined)
          {
            sensorData[0].data = conversion.call(this, sensorData[0].data);
          }

          // Perform all of the desired feature extraction methods
          for(var i = 0; i < features.length; i++)
          {
            features[i][0].call(this, sensorData, features[i][1]);
          }
          // Display ALL of the collected data and calculated features onto a graph 
          $.plot($("#placeholder"), sensorData, { yaxis: { min:yMin, max:yMax}, xaxis: { min: 0, max: maxValue },  series: {curvedLines: {active: true} }, xaxes: [{ axisLabel: 'message #' }], yaxes: [ { axisLabel: yAxisLabel} ]  });
        }
      };

      ws.onclose = function () 
      {

          console.log("Web Socket is closed");
          $("#isConnected").css("color", "#d1364a");
          $("#isConnected").text("Disconnected");
      };
     


      // Detect when the page is unloaded or close
      window.onbeforeunload = function() {
          ws.close()
      };        