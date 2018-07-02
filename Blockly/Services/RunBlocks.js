
// monitor Muscle Signals
Blockly.JavaScript['electromyography'] = function(block) {
  // what channel are we reading raw data from
  var emg_channel = block.getFieldValue('channel');
  // Collect all the features that need to be read (the blocks WITHIN the EMG block)
  var statements_monitor_features = Blockly.JavaScript.statementToCode(block, 'Monitor_features');
  // code that will be executed when the user presses the "run code" button
  var code = "ch = '" + emg_channel + "';\n"
  + "yMin = -1.65;\n"
  + "yMax = 1.65;\n"
  + "yAxisLabel = 'mV';\n"
  + "conversion = convertEMG;\n"
  + "headerFeedBack('#EMG');\n"
  + statements_monitor_features;
  return code;
};

// Monitor accelerometer signals
Blockly.JavaScript['accelerometer'] = function(block) {
  // What channel are we reading the raw data from
  var acc_channel = block.getFieldValue('channel');
  var statements_monitor_features = Blockly.JavaScript.statementToCode(block, 'Monitor_features');
  // code executed when run is pressed
  var code = "ch = '" + acc_channel + "';\n" 
  + "yMin = -3;\n" 
  + "yMax = 3;\n" 
  + "yAxisLabel = 'g';\n"
  + "conversion = convertACC;\n"
  + "headerFeedBack('#ACC');\n"
  + statements_monitor_features;
  return code;
};

// Monitor Heart Signals
Blockly.JavaScript['electrocardiography'] = function(block) {
  // Channel on Bitalino we're reading from
  var ecg_channel = block.getFieldValue('channel');
  var statements_monitor_features = Blockly.JavaScript.statementToCode(block, 'Monitor_features');
  // Code executed when run is pressed
  var code = "ch = '" + ecg_channel + "';\n"
  + "yMin = -1.5;\n"
  + "yMax = 1.5;\n"
  + "yAxisLabel = 'mV';\n"
  + "conversion = convertECG;\n"
  + "headerFeedBack('#ECG');\n"
  + statements_monitor_features;
  return code;
};

// Monitor Skin Biosignals
Blockly.JavaScript['electrodermalactivity'] = function(block) {
  // Bitalino channel we're reading from
  var eda_channel = block.getFieldValue('channel');
  var statements_monitor_features = Blockly.JavaScript.statementToCode(block, 'Monitor_features');
  // code executed when the run is pressed
  var code = "ch = '" + eda_channel + "';\n"
  + "yMin = 1;\n"
  + "yMax = 2;\n"
  + "yAxisLabel = 'mu' + 'S';\n"
  + "conversion = convertEDA;\n"
  + "headerFeedBack('#EDA');\n"
  + statements_monitor_features;
  return code;
};

// Monitor Brain signals
Blockly.JavaScript['electroencephalography'] = function(block) {
  // What bitalino channel to be read from
  var eeg_channel = block.getFieldValue('channel');
  var statements_monitor_features = Blockly.JavaScript.statementToCode(block, 'Monitor_features');
  // code executed when run is pressed
  var code = "ch = '" + eeg_channel + "';\n"
  + "yMin = -41.25;\n"
  + "yMax = 41.25;\n"
  + "yAxisLabel = &mu + 'V';\n"
  + "conversion = convertEEG;\n"
  + "headerFeedBack('#EEG');\n"
  + statements_monitor_features;
  return code;
};

// Monitor Light levels
Blockly.JavaScript['lightsensor'] = function(block) {
  // Channel read from
  var lux_channel = block.getFieldValue('channel');
  var statements_monitor_features = Blockly.JavaScript.statementToCode(block, 'Monitor_features');
  // code run
  var code = "ch = '" + lux_channel + "';\n"
  + "yMin = 0;\n" 
  + "yMax = 100;\n"
  + "yAxisLabel = '%';\n"
  + "conversion = convertLUX;\n"
  + "headerFeedBack('#LUX');\n"
  + statements_monitor_features;
  return code;
};


// An independent block that can account for third party sensors etc.
Blockly.JavaScript['prototype'] = function(block) {
  // channel to read from
  var sensor_channel = block.getFieldValue('channel');
  var statements_monitor_features = Blockly.JavaScript.statementToCode(block, 'Monitor_features');
  // code executed (we dont know the block or the units therefore we cannot convert it)
  var code = "ch = '" + sensor_channel + "';\n"
  + "yMin = 0;\n" 
  + "yMax = 1023;\n"
  + "conversion = null;\n"
  + "headerFeedBack('#PRO');\n"
  + statements_monitor_features;
  return code;
};




// <----------------------------------------------------------------------------------------------------------SPECIALISED FEATURES----------------------------------------------------------------------------------------------------------->

// If this block is found then we monitor heartbeat from the data
Blockly.JavaScript['heartbeat'] = function(block) {
  var code = 'features.push([checkForHeartBeat, []]);\n';
  return code;
};

// If this block is found then we monitor for significant muscle movement
Blockly.JavaScript['onsetmuscle'] = function(block) {
  var code = 'features.push([checkForMuscleMovement, []]);\n';
  return code;
};

// If this block is found then we monitor light levels
Blockly.JavaScript['lightintensity'] = function(block) {
  var code = 'features.push([checkLightLevel, []]);\n';
  return code;
};


// <------------------------------------------------------------------------------------------------------------CORE FEATURES--------------------------------------------------------------------------------------------------------------->


// If this block is found we monitor when the sensor crosses zero
Blockly.JavaScript['zerocrossing'] = function(block) {
  // When should we detect a zero crossing (positive/ negative/ either gradient)
  var gradientChoice = block.getFieldValue('gradientChoice');
  var code = 'features.push([zeroCrossings, ["' + gradientChoice + '"]]);\n';
  return code;
};


// Calculate Root mean sqaure of the data
Blockly.JavaScript['rootmeansquare'] = function(block) {
  // How many d.ps does the user want to round to
  var decimalPlaces = block.getFieldValue('decimalPlaces');
  var code = 'features.push([rootMeanSquare, [' + decimalPlaces + ']]);\n';
  return code;
};


// Calculate Envelope (Like moving averages)
Blockly.JavaScript['envelope'] = function(block) {
  // How many values are considered in moving average (i.e. what is the window size)
  var movingAverages = block.getFieldValue('movingAverages');
  var code = 'features.push([envelopeCurves, [' + movingAverages + ']]);\n';
  return code;
};

// If this is found, mark all values that are below a certain value
Blockly.JavaScript['thresholdingbelow'] = function(block) {
  // Monitor values below threshold val
  var thresholdValue = block.getFieldValue('thresholdVal');
  var code = "thresholdConstraints.push({threshold: " + thresholdValue + ", color: \"rgb(244,134,66)\", evaluate: function(y, threshold){return y < threshold}});\n";
  return code;
};

// Mark all values above a certain value
Blockly.JavaScript['thresholdingabove'] = function(block) {
  // Monitor values above threshold val
  var thresholdValue = block.getFieldValue('thresholdVal');
  var code = "thresholdConstraints.push({threshold: " + thresholdValue + ", color: \"rgb(66,134,244)\", evaluate: function(y, threshold){return y > threshold}});\n";
  return code;
};

// find the highest values for the current dataset
Blockly.JavaScript['globalminandmax'] = function(block) {
  // Find global min/ max/ both
  var extremaChoice = block.getFieldValue('extremaChoice');
  var code = 'features.push([globalMinAndMax, ["' + extremaChoice + '"]]);\n';
  return code;
};

// Determine all inflection points in current dataset
Blockly.JavaScript['inflection'] = function(block) {
  var movingAverageNum = block.getFieldValue('movingAverageNum');
  var code = 'features.push([calculateInflection, [' + movingAverageNum + ']]);\n';
  return code;
};

// find the x most significant local minima/ maxima/ both points
Blockly.JavaScript['localextrema'] = function(block) {
  // How many local values to find
  var numberOfExtrema = block.getFieldValue('numberOfExtrema');
  // min/ max/ both
  var extremaChoice = block.getFieldValue('extremaChoice');
  var code = 'features.push([localExtrema, [' + numberOfExtrema + ',"' + extremaChoice + '"]]);\n';
  return code;
};



// <-----------------------------------------------------------------------------------------------DINO CONFIGURATION BLOCKS ------------------------------------------------------------------------------------------------------>

Blockly.JavaScript['dinosaur_config'] = function(block) {
  var manualConfigurations = Blockly.JavaScript.statementToCode(block, 'configurables');
  // TODO: Assemble JavaScript into code variable.
  var code = manualConfigurations;
  return code;
};

Blockly.JavaScript['gravity'] = function(block) {
  var gravityValue = block.getFieldValue('gravityValue');
  // TODO: Assemble JavaScript into code variable.
  var code = 'manualConfig.GRAVITY =' + gravityValue + ' ;\n';
  return code;
};

Blockly.JavaScript['jump_height'] = function(block) {
  var jumpHeight = block.getFieldValue('jump_height');
  // TODO: Assemble JavaScript into code variable.
  var code = 'manualConfig.INIITAL_JUMP_VELOCITY =' + (-1 * Math.abs(jumpHeight)) + ' ;\n';
  return code;
};

Blockly.JavaScript['enemy_frequency'] = function(block) {
  var enemyFrequency = block.getFieldValue('enemyFrequency');
  // TODO: Assemble JavaScript into code variable.
  var code = 'manualConfig.minGap =' + enemyFrequency + ' ;\n';
  return code;
};

Blockly.JavaScript['cloud_frequency'] = function(block) {
  var cloudFrequency = block.getFieldValue('cloudFrequency');
  // TODO: Assemble JavaScript into code variable.
  var code = 'manualConfig.MIN_CLOUD_GAP =' + cloudFrequency + ' ;\n';
  return code;
};

Blockly.JavaScript['dino_position'] = function(block) {
  var dinoPosition = block.getFieldValue('dinoPosition');
  // TODO: Assemble JavaScript into code variable.
  var code = 'manualConfig.START_X_POS =' + dinoPosition + ' ;\n';
  return code;
};

Blockly.JavaScript['dino_speed'] = function(block) {
  var dinoSpeed = block.getFieldValue('dino_speed');
  // TODO: Assemble JavaScript into code variable.
  var code = 'manualConfig.SPEED =' + dinoSpeed + ' ;\n';
  return code;
};


//<----------------------------------------------------------------------------------------------RUN CODE FROM THE BLOCKLY "PROGRAM" --------------------------------------------------------------------------------------------------------->

// Called when the user presses the "run" button found underneath the blockly workshop
function runBlockly() 
{
  // Just a quick reset of values
  ch = 'nSeq';
  features = [];
  thresholdConstraints = [];
  // Generate JavaScript code (from the blocks) and run it.
  window.LoopTrap = 1000;
  Blockly.JavaScript.INFINITE_LOOP_TRAP =
      'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
  var code = Blockly.JavaScript.workspaceToCode(workspacePlayground);
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try {
    eval(code);
  } catch (e) {
    console.log(e);
  }
}




//set the colour of the header so that the user knows what theyre currently viewing.
// E.g. are they viewing EMG/ ECG/ EEG data etc.
function headerFeedBack(isActive)
{
  $(".sensorIcon").css("color", "rgb(255, 53, 53)");
  $(isActive).css("color", "#5cb85c");
}
