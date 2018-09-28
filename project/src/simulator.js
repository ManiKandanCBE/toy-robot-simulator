var ToyRobotUtil = require('./toyRobotUtil');

/**
 * Application module
 */
var simulator = {};

var toyRobotUtil = new ToyRobotUtil();

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
	  console.log("commandList : " + JSON.stringify(commandList));

      //cb(null, commandList);
    })
  });
};

module.exports = simulator;