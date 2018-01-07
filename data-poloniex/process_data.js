// Read JSON captured from the historical data Poloniex API and reformat it to Google Chart API candlestick chart format

var fs = require('fs')

if (process.argv.length <= 2) {
  console.log("Usage: node " + __filename + " <input json from Poloniex candlestick historical data HTTP GET API>");
  process.exit(-1);
}

var inputFilename = process.argv[2];

fs.readFile(inputFilename, 'utf8', function(err, contents) {
  var historicalData = JSON.parse(contents);
  var processedHistoricalData = historicalData.map(function(element) {
    // Rearrange the elements to be compatible with the charting API
    // Array item order should be: low, open, close, high
    var close = element['close'];
    var high = element['high'];
    var low = element['low'];
    var open = element['open'];
    var date = new Date(element['date'] * 1000);
    return [date.toUTCString(), low, open, close, high];
  });

  console.log(JSON.stringify(processedHistoricalData));  
});


