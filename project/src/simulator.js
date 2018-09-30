var ToyRobotUtil = require('./toyRobotUtil');
var ToyRobot = require('./toyRobot');

/**
 * Application module
 */
var simulator = {};

var toyRobotUtil = new ToyRobotUtil();
var toyRobot = new ToyRobot();

/**
 * Read and parse file name
 * @param {String} fileName File to read and parse
 * @param {Function} cb Callback function
 */
simulator.readAndParseFile = function(fileName, cb) {
  toyRobotUtil.readInputFile(fileName, function(err, fileData) {
    if (err) {
      cb(err);
      return false;
    }

    toyRobotUtil.parseData(fileData, function(err, commandList) {
      if (err) {
        cb(err);
        return false;
      }
	  
	  cb(null, commandList);
    })
  });
};

simulator.runCommands = function(commandList) {
	return toyRobot.runCommands(commandList);
};

module.exports = simulator;