
// This function converts the raw muscleData from the EMG into its real world units (mV)
// @param: muscleData - the raw muscleData from the EMG sensor
// @Returns: muscleConverted - the converted Muscle Data
function convertEMG(muscleData)
{
	var muscleConverted = [];
	var EMGv;
	// Go through every value in the raw data and convert it into mV using the formula
	// EMGmv = ((EMGb * Vcc / 2^n - Vcc / 2) / Gemg) * 1000
	for(var i = 0; i < muscleData.length; i++)
	{
		muscleConverted.push([i]);
		EMGv = ((((muscleData[i][1] * 3.3) / (Math.pow(2, 10))) - (3.3 / 2)) / 1000);
		muscleConverted[i].push(EMGv * 1000);
	}
	return muscleConverted;
}


// This function converts the raw heart Data from the ECG into its real world units (mV)
// @param: heartData - the raw muscleData from the ECG sensor
// @Returns: heartConverted - the converted heart Data
function convertECG(heartData)
{
	var heartConverted = [];
	var ECGv;

	// Go through every value in the raw data and convert it into mV using the formula
	// ECGmv = ((ECGb * Vcc / 2^n - Vcc / 2)/ Gecg) * 1000	
	for(var i = 0; i < heartData.length; i++)
	{
		heartConverted.push([i]);
		ECGv = ((((heartData[i][1] * 3.3) / Math.pow(2, 10)) - (3.3 / 2)) / 1100);
		heartConverted[i].push(ECGv * 1000);		
	}
	return heartConverted;
}

// This function converts the raw skin Data from the EDA into its real world units (uS)
// @param: skinData - the raw skin Data from the ECG sensor
// @Returns: skinConverted - the converted skin Data
function convertEDA(skinData)
{
	var skinConverted = [];
	var Rmohm;

	// Go through every value in the raw data and convert it into uS using the formula
	// 1 / (1 - EDAb / 2^n)
	for(var i = 0; i < skinData.length; i++)
	{
		skinConverted.push([i]);
		Rhohm = (1 - skinData[i][1] / Math.pow(2, 10));
		skinConverted[i].push(1 / Rhohm);		
	}
	return skinConverted;
}

// This function converts the raw brainData from the EEG into its real world units (uV)
// @param: brainData - the raw brain Data from the EEG sensor
// @Returns: brainConverted - the converted brain Data
function convertEEG(brainData)
{
	var brainConverted = [];
	var EEGv;

	// Go through every value in the raw data and convert it into uV using the formula
	// (ADC * Vcc / 2^n - Vcc / 2) / Geeg	
	for(var i = 0; i < brainData.length; i++)
	{	
		brainConverted.push([i]);
		EEGv = ((((brainData[i][1] / Math.pow(2, 10)) - 0.5) * 3.3) / 40000);
		brainConverted[i].push(EEGv * Math.pow(10, 6));
	}
	return brainConverted;
}


// This function converts the raw accellerometer Data from the ACC into its real world units (g)
// @param: accelerometerData - the raw accelerometer Data from the ACC sensor
// @Returns: accConverted - the converted accelerometer Data
function convertACC(accelerometerData)
{
	var accConverted = [];

	// Go through every value in the raw data and convert it into g using the formula
	// 	2 * ((ACCB - Cm) / (CM - Cm)) - 1
	for(var i = 0; i < accelerometerData.length; i++)
	{
		accConverted.push([i]);
		accConverted[i].push((2 * ((accelerometerData[i][1] - 25) / (49 - 25))) - 1);	
	}
	return accConverted;
}


// This function converts the raw muscleData from the EMG into its real world units (mV)
// @param: lightData - the raw light Data from the LUX sensor
// @Returns: lightConverted - the converted light Data
function convertLUX(lightData)
{
	var lightConverted = [];

	// Go through every value in the raw data and convert it into g using the formula
	// 	 100 * (LUXB / 2^n)
	for(var i = 0; i < lightData.length; i++)
	{
		lightConverted.push([i]);
		lightConverted[i].push(100 * (lightData[i][1] / Math.pow(2, 6)));	
	}
	return lightConverted;
}