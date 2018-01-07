// Read JSON captured from the historical data Poloniex API and reformat it to Google Chart API candlestick chart format

var fs = require('fs')

if (process.argv.length <= 2) {
  console.log("Usage: node " + __filename + " <input json from Poloniex candlestick historical data HTTP GET API>");
  process.exit(-1);
}

var inputFilename = process.argv[2];

fs.readFile(inputFilename, 'utf8', function(err, contents) {
  var historicalData = JSON.parse(contents);
  var processedHistoricalData = [];
  historicalData.forEach(function(element) {
    var date = new Date(element['date'] * 1000);
    var dateUtcString = date.toUTCString();

    // Midnight to 5:30am Pacific Time  
    var nightTimePacificTime = ['08:00:00 GMT', '08:30:00 GMT', '09:00:00 GMT', '09:30:00 GMT', '10:00:00 GMT',
                                '10:30:00 GMT', '11:00:00 GMT', '11:30:00 GMT', '12:00:00 GMT', '12:30:00 GMT',
                                '13:00:00 GMT', '13:30:00 GMT' ];
    var isNightTimePacificTime = false;
    nightTimePacificTime.forEach(function(element) {
      if (dateUtcString.indexOf(element) !== -1) {
          isNightTimePacificTime = true;
      }
    });

    if (isNightTimePacificTime) {
      // Rearrange the elements to be compatible with the charting API
      // Array item order should be: low, open, close, high
      var close = element['close'];
      var high = element['high'];
      var low = element['low'];
      var open = element['open'];
      processedHistoricalData.push([date.toUTCString(), low, open, close, high]);
    } else {
      processedHistoricalData.push([date.toUTCString(), 0, 0, 0, 0]);
    }

  });

  console.log(JSON.stringify(processedHistoricalData));  
});


