
/** QRS detection was functionality that was not thoroughly tested and as such was not converted into a block.
 * 	Other Developers are free to continue this work however.
 */
function movingAverage(data, filterR)
{
	filteredData = [];

	unfiltered = data.map(x=> x[1]);

	if(unfiltered.length > filterR*2+1)
	{
		if(filteredData.length <= filterR)
		{
			for(var i = 0; i < filterR+1; i++)
			{
				filteredData.push(averageSlice(unfiltered, 0, 2*filterR + 1));
			}
		}
		for (var i = filteredData.length; i < unfiltered.length - filterR - 1; i++)
		{
			filteredData.push(averageSlice(unfiltered, i, i + filterR));
		}
	}

	return filteredData;
}

function averageSlice(data, initial, end)
{
	slice = data.slice(initial, end);

	return slice.reduce(function(a,b){return a+b;}) / (end - initial);
}


var beats = [];
var initialised = false;
var m;
var M;
var m_i;
var m_d;
var f;
var last_clead_i;

var detect_interval = Math.round(0.2 * 1000);

function initialiseBeats()
{
    m = 0.6*Math.max.apply(filteredClead);
    M = [m, m, m, m, m];
    m_i = 0;
    m_d = (m*0.4)/1000;
   	f = averageSlice(filteredClead, 0, 250);   // [0:Math.round(1000*0.35)]);
}


function detectBeats()
{
	var newBeats = [];

	for(i = last_clead_i; i < filteredClead.length; i++)
	{
		if(i > f_interval)
		{
			f = f + (Math.max.apply(filteredClead.slice(i - Math.round(1000*0.05), i)) - Math.max.apply(filteredClead)) / 150;
		}

		if (i < rr / 3 + last)
		{
			r = 0;
		}
		else if(r_i > 0 && i < last + rr)
		{
			r = r - m_d/1.4;
		}
		if(i - last >= detect_interval)
		{
			if(i - last == detect_interval)
			{
				var values = filteredClead.slice(last, i).map(function(elt) { return elt[1]});
				var new_M = 0.6*Math.max(values);
				var old_M = M[m_i];
				m_i = (m_i + 1) % len(M);
				if(new_M > 1.5 * M[m_i])
				{
					M[m_i] = 1.1 * old_M;
				}
				else
				{
					M[m_i] = new_M;
				}


				m = averageSlice(M , 0, M.length);

				m_d = 0.4 * m / 1000;
			}

			else if(i - last < 1.2 * 1000)
			{
				m = m - m_d;
			}

			if (filteredClead[i][1] > m + f + r) // found beat
			{

				console.log("Found Beat");

				if( r_i == -1 && !(last === 0))
				{
					RR = [i - last, i - last, i - last, i - last, i - last];
					r_i = 0;
				}
				else
				{
					RR[r_i] = i - last;
					r_i = (r_i + 1) % 5;
				}
				rr = averageSlice(RR, 0, RR.length);

				beats.append(i);
				newBeats.append((i - last) / 1000);
				last = i;
			}

		}
	}
	return newBeats;

}

var filteredClead;

var r;

var RR = [0, 0, 0, 0, 0];

var r_i = -1;

var rr = 0;

var last = 0;

function QRSDetection(data)
{
	var clead = [];


	var filteredData = movingAverage(data, Math.round(0.5*1000/34));

	for(var i = 0; i < filteredData.length - 1; i++)
	{
		if( i === 0)
		{
			clead.append(Math.abs(filteredData[2] - filteredData[0]));
		}
		else
		{
			clead.append(Math.abs(filteredData[i - 1] - filteredData[i + 1]));
		}
	}


	last_clead_i = filteredClead.length;

	filteredClead = movingAverage(clead, Math.round(0.5*1000/24));

	if(!initialised)
	{
		initialiseBeats();
		detectBeats(0);
	}
	else
	{
		detectBeats(last_clead_i);
	}
}


