// Load the Google Chart Tools Visualization API and the chart package.
if (typeof google == 'object') {
  google.load('visualization', '1', {packages: ['corechart']});
} else {
  alert('Unable to load Google\'s chart API.\n' +
        'Are you connected to the Internet?');
}

/**
 * Create a namespace for the application.
 */
var Graph = {};

/**
 * Main Blockly workspace.
 * @type {Blockly.WorkspaceSvg}
 */
Graph.workspace = null;

/**
 * Cached copy of the function string.
 * @type {?string}
 * @private
 */
Graph.oldFormula_ = null;

/**
 * Drawing options for the Chart API.
 * @type {!Object}
 * @private
 */
Graph.options_ = {
  //curveType: 'function',
  width: 400, height: 400,
  chartArea: {left: '10%', width: '85%', height: '85%'}
};

/**
 * Visualize the graph of y = f(x) using Google Chart Tools.
 * For more documentation on Google Chart Tools, see this linechart example:
 * https://developers.google.com/chart/interactive/docs/gallery/linechart
 */
Graph.drawVisualization = function() {
  var formula = Blockly.JavaScript.workspaceToCode(Graph.workspace);
  if (formula === Graph.oldFormula_) {
    // No change in the formula, don't recompute.
    return;
  }
  Graph.oldFormula_ = formula;

  // Create and populate the data table.
  var data = google.visualization.arrayToDataTable(Graph.plot(formula));
  // Create and draw the visualization, passing in the data and options.
  new google.visualization.LineChart(document.getElementById('visualization')).
      draw(data, Graph.options_);

  // Create the "y = ..." label.  Find the relevant part of the code.
  formula = formula.substring(formula.indexOf('y = '));
  formula = formula.substring(0, formula.indexOf(';'));
  var funcText = document.getElementById('funcText');
  //funcText.replaceChild(document.createTextNode(formula), funcText.lastChild);
};

/**
 * Plot points on the function y = f(x).
 * @param {string} code JavaScript code.
 * @return {!Array.<!Array>} 2D Array of points on the graph.
 */
Graph.plot = function(code) {
  // Initialize a table with two column headings.
  var table = [];
  var y;
  // TODO: Improve range and scale of graph.
  for (var x = -10; x <= 10; x = Math.round((x + 0.1) * 10) / 10) {
    try {
      eval(code);
    } catch (e) {
      y = NaN;
    }
    if (!isNaN(y)) {
      // Prevent y from being displayed inconsistently, some in decimals, some
      // in scientific notation, often when y has accumulated rounding errors.
      y = Math.round(y * Math.pow(10, 14)) / Math.pow(10, 14);
      table.push([x, y]);
    }
  }
  // Add column heading to table.
  if (table.length) {
    table.unshift(['x', 'y']);
  } else {
    // If the table is empty, add a [0, 0] row to prevent graph error.
    table.unshift(['x', 'y'], [0, 0]);
  }
  return table;
};

/**
 * Force Blockly to resize into the available width.
 */
Graph.resize = function() {
  var width = Math.max(window.innerWidth - 440, 250);
  document.getElementById('blocklyDiv').style.width = width + 'px';
  Blockly.svgResize(Graph.workspace);
};

/**
 * Initialize Blockly and the graph.  Called on page load.
 */
Graph.init = function() {
  Graph.workspace = Blockly.inject('blocklyDiv',
      {collapse: false,
       disable: false,
       media: '../../media/',
       toolbox: document.getElementById('toolbox')});
   Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
                              Graph.workspace);
  Graph.workspace.clearUndo();

  // When Blockly changes, update the graph.
  Graph.workspace.addChangeListener(Graph.drawVisualization);
  Graph.workspace.addChangeListener(Blockly.Events.disableOrphans);
  Graph.resize();
};

window.addEventListener('load', Graph.init);
window.addEventListener('resize', Graph.resize);