var simulator = require('./src/simulator');

/**
 * Get input file argument
 */
var fileName = process.argv[2];

/**
 * Run the simulation
 */
 simulator.readAndParseFile(fileName, function(err, commandList) {
  // If error, let the user know
  if (err) {
    console.log('ERROR: ' + err.message);
    return false;
  }
  
  simulator.runCommands(commandList,  function(err, toyRobot) {
	if (err) {
		console.log('ERROR: ' + err.message);
		return false;
	}
	
	console.log('Simulator command run successfully!!!');
	
  });

});