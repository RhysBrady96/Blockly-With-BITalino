
//<------------------------------------------------------------------------------------------------------- SENSOR SELECTION BLOCKS ----------------------------------------------------------------------------------------------------------->


Blockly.Blocks['electromyography'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Monitor EMG on Channel ")
        .appendField(new Blockly.FieldDropdown([["A1","A1"], ["A2","A2"], ["A3","A3"], ["A4","A4"], ["A5","A5"], ["A6","A6"]]), "channel");
    this.appendStatementInput("Monitor_features")
        .setCheck("Features")
        .appendField("Monitor Features");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("http://bitalino.com/datasheets/EMG_Sensor_Datasheet.pdf");
  }
};

Blockly.Blocks['accelerometer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Monitor Accelerometer On Channel ")
        .appendField(new Blockly.FieldDropdown([["A1","A1"], ["A2","A2"], ["A3","A3"], ["A4","A4"], ["A5","A5"], ["A6","A6"]]), "channel");
    this.appendStatementInput("Monitor_features")
        .setCheck("Features")
        .appendField("Monitor Features: ");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("http://bitalino.com/datasheets/ACC_Sensor_Datasheet.pdf");
  }
};

Blockly.Blocks['electrocardiography'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Monitor ECG on Channel ")
        .appendField(new Blockly.FieldDropdown([["A1","A1"], ["A2","A2"], ["A3","A3"], ["A4","A4"], ["A5","A5"], ["A6","A6"]]), "channel");
    this.appendStatementInput("Monitor_features")
        .setCheck("Features")
        .appendField("Monitor Features");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("http://bitalino.com/datasheets/ECG_Sensor_Datasheet.pdf");
  }
};

Blockly.Blocks['electrodermalactivity'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Monitor EDA on Channel ")
        .appendField(new Blockly.FieldDropdown([["A1","A1"], ["A2","A2"], ["A3","A3"], ["A4","A4"], ["A5","A5"], ["A6","A6"]]), "channel");
    this.appendStatementInput("Monitor_features")
        .setCheck("Features")
        .appendField("Monitor Features");
    this.setColour(120);
 this.setTooltip("");
this.setHelpUrl("http://bitalino.com/datasheets/EDA_Sensor_Datasheet.pdf");
  }
};

Blockly.Blocks['electroencephalography'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Monitor EEG on Channel ")
        .appendField(new Blockly.FieldDropdown([["A1","A1"], ["A2","A2"], ["A3","A3"], ["A4","A4"], ["A5","A5"], ["A6","A6"]]), "channel");
    this.appendStatementInput("Monitor_features")
        .setCheck("Features")
        .appendField("Monitor Features");
    this.setColour(120);
 this.setTooltip("");
this.setHelpUrl("http://bitalino.com/datasheets/EEG_Sensor_Datasheet.pdf");
  }
};

Blockly.Blocks['lightsensor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Monitor LUX on Channel ")
        .appendField(new Blockly.FieldDropdown([["A1","A1"], ["A2","A2"], ["A3","A3"], ["A4","A4"], ["A5","A5"], ["A6","A6"]]), "channel");
    this.appendStatementInput("Monitor_features")
        .setCheck("Features")
        .appendField("Monitor Features");
    this.setColour(120);
 this.setTooltip("");
this.setHelpUrl("http://bitalino.com/datasheets/LUX_Sensor_Datasheet.pdf");
  }
};

Blockly.Blocks['prototype'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Monitor Prototype on ")
        .appendField(new Blockly.FieldTextInput(""), "channel");
    this.appendStatementInput("Monitor_features")
        .setCheck(null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("http://bitalino.com/datasheets");
  }
};

//<------------------------------------------------------------------------------------------------------- SPECIALISED SENSOR FEATURE EXTRACTION ------------------------------------------------------------------------------------->


Blockly.Blocks['heartbeat'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("HeartBeat Feature");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['onsetmuscle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Muscle Movement");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['lightintensity'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Light Intensity");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



//<------------------------------------------------------------------------------------------------------- CORE FEATURE EXTRACTIONS ----------------------------------------------------------------------------------------------------------->


Blockly.Blocks['zerocrossing'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Zero Crossings")
        .appendField(new Blockly.FieldDropdown([["both","both"], ["positive","positive"], ["negative","negative"]]), "gradientChoice");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['rootmeansquare'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Root Mean Square");
    this.appendDummyInput()
        .appendField("to ")
        .appendField(new Blockly.FieldNumber(0, 1, 8), "decimalPlaces")
        .appendField(" Decimal Places");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['envelope'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Signal Envelope");
    this.appendDummyInput()
        .appendField("With ")
        .appendField(new Blockly.FieldNumber(0, 1, 10), "movingAverages")
        .appendField(" Zero Average Places");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['thresholdingbelow'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Threshold below ")
        .appendField(new Blockly.FieldNumber(0, -1000, 1000), "thresholdVal");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['thresholdingabove'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Threshold above")
        .appendField(new Blockly.FieldNumber(0, -1000, 1000), "thresholdVal");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['globalminandmax'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Global")
        .appendField(new Blockly.FieldDropdown([["extrema","extrema"], ["minima","minima"], ["maxima","maxima"]]), "extremaChoice");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['inflection'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Inflection with Significance")
        .appendField(new Blockly.FieldNumber(0, 1, 20), "movingAverageNum");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['localextrema'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0, -1, 250), "numberOfExtrema")
        .appendField(" most Significant");
    this.appendDummyInput()
        .appendField("Local")
        .appendField(new Blockly.FieldDropdown([["extrema","extrema"], ["minima","minima"], ["maxima","maxima"]]), "extremaChoice");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



// <--------------------------------------------------------------------------------------------------DINO GAME CONFIG BLOCKS ------------------------------------------------------------------------------------------------------>


Blockly.Blocks['dinosaur_config'] = {
  init: function() {
    this.appendStatementInput("configurables")
        .setCheck(null)
        .appendField("Configure Dinosaur Game");
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['gravity'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gravity Value: ")
        .appendField(new Blockly.FieldNumber(0.6, 0, 20, 0.0001), "gravityValue");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['jump_height'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Jump Height Value: ")
        .appendField(new Blockly.FieldNumber(-10, -100, 100), "jump_height");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['enemy_frequency'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Enemy Frequency")
        .appendField(new Blockly.FieldNumber(120, 1, 700), "enemyFrequency");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['cloud_frequency'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Cloud Frequency")
        .appendField(new Blockly.FieldNumber(100, 10, 700), "cloudFrequency");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['dino_position'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Dinosaur Position")
        .appendField(new Blockly.FieldNumber(50, 50, 1000), "dinoPosition");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['dino_speed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Dinosaur Speed")
        .appendField(new Blockly.FieldNumber(6, 1, 200), "dino_speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};