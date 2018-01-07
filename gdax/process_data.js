// Read JSON captured from the historical data GDAX API and reformat it to Google Chart API candlestick chart format

var fs = require('fs')

if (process.argv.length <= 2) {
  console.log("Usage: node " + __filename + " <input json from GDAX historical data HTTP GET API>");
  process.exit(-1);
}

var inputFilename = process.argv[2];

fs.readFile(inputFilename, 'utf8', function(err, contents) {
  var historicalData = JSON.parse(contents);
  historicalData.forEach(function(element) {
    // Rearrange the elements to be compatible with the charting API
    // Array item order should be: low, open, close, high
    var high = element[2];
    var open = element[3];
    var close = element[4];
    element[2] = open;
    element[3] = close;
    element[4] = high;
    var date = new Date(element[0] * 1000);
    element[0] = date.toUTCString();
    element.splice(-1,1); // Remove volume field
  });
  historicalData.reverse(); // JSON comes in reverse chronological order

  console.log(historicalData);  
});


