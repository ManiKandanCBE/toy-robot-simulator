var simulator = require('./src/simulator');

/**
 * Get input file argument
 */
var fileName = process.argv[2];

/**
 * Run the simulation
 */
 simulator.readAndParseFile(fileName, function(err, simulator) {
  // If error, let the user know
  if (err) {
    console.log('ERROR: ' + err.message);
    return false;
  }

});