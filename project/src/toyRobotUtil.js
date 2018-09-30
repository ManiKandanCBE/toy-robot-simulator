var fs = require('fs');

var ToyRobotUtil = function(){};

/**
 * Read input file
 * @param {String} fileName Input file name
 * @param {Function} cb Callback function
 */
ToyRobotUtil.prototype.readInputFile = function(fileName, cb) {

    fs.readFile(fileName, function(err, fileData) {
      if (err) {
        cb(new ReferenceError('File doesn\'t exist or cannot be accessed'));
        return false;
      }

      // If contents are empty, throw an error
      if (!fileData.length) {
        cb(new RangeError('File content cannot be empty'));
        return false;
      }

      cb(null, fileData);
    });

};

/**
 * Parse commands from file data
 * @param {String} fileData Unparsed file data containing commands
 * @param {Function} cb Callback function
 */
ToyRobotUtil.prototype.parseData = function(fileData, cb) {
  // Throw error if empty
  fileData = fileData.toString();
  if (!fileData.length) {
    cb(new RangeError('Must pass commands to the robot'));
    return false;
  }

  var parsedCommands = fileData
    .split('\r\n')
    .map(function(command) {
      return command.toLowerCase();
    })
    .reduce(function(commandList, commandStr) {
		var parsedCommand = this.parseCommand(commandStr);

	    if (parsedCommand) {
			commandList.push(parsedCommand);
		}
		return commandList;
    }.bind(this), []);

		
  // Throw error if no valid commands were passed
  if (!parsedCommands.length) {
    cb(new TypeError('No valid commands passed'));
    return false;
  }

  cb(null, parsedCommands);
};

/**
 * Valid directions for placement of robot
 * @type {string[]}
 */
ToyRobotUtil.prototype.validDirections = ['north', 'south', 'east', 'west'];

/**
 * Parse command string into an object
 * @param {String} commandStr Command string from input file
 * @returns {*}
 */
ToyRobotUtil.prototype.parseCommand = function(commandStr) {
  var commandObject;
  var commandStrList = commandStr.split(' ');

  if (commandStrList.length > 1 && commandStrList[0] === 'place') {
    commandObject = this.parsePlaceCommand(commandStrList);
  } else {
    commandObject = this.parseSingleWordCommand(commandStr);
  }

  if (commandObject) {
    return commandObject;
  }
};

/**
 * Parse place command
 * @param {Array} placeParts Place command parts
 * @returns {*}
 */
ToyRobotUtil.prototype.parsePlaceCommand = function(placeParts) {
  var placeArgsList = placeParts[1].split(',');

  var x = parseInt(placeArgsList[0], 10);
  var y = parseInt(placeArgsList[1], 10);
  var direction = placeArgsList[2];
  
  if (!isNaN(x) && !isNaN(y) && (this.validDirections.indexOf(direction) > -1)) {
    return {
      command: 'place',
      args: [x, y, direction]
    };
  } else {
    return null;
  }
};

/**
 * Parse non-place, single word command
 * @param {String} commandStr Single word command
 * @returns {*}
 */
ToyRobotUtil.prototype.parseSingleWordCommand = function(commandStr) {
  switch (commandStr) {
    case 'move':
      return {
        command: 'move'
      };
    case 'left':
      return {
        command: 'turn',
        args: 'left'
      };
    case 'right':
      return {
        command: 'turn',
        args: 'right'
      };
    case 'report':
      return {
        command: 'report'
      };
    default:
      return null;
  }
};


module.exports = ToyRobotUtil;