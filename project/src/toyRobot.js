var ToyRobot = function() {
  this.isPlaced = false;
  this.position = {
    x: null,
    y: null
  };
  this.direction = null;
};

/**
 * Map for turning the robot
 * @type {{direction: {value: string, left: string, right: string}}}
 */
var directionMap = {
  north: {
    value: 'north',
    left: 'west',
    right: 'east'
  },
  east: {
    value: 'east',
    left: 'north',
    right: 'south'
  },
  south: {
    value: 'south',
    left: 'east',
    right: 'west'
  },
  west: {
    value: 'west',
    left: 'south',
    right: 'north'
  }
};

/**
 * The max size of the table
 * @type {{x: number, y: number}}
 */
ToyRobot.prototype.tableSize = {x: 4, y: 4};

/**
 * Place a robot
 * @param {Array} paramList 3-tuple of x, y, and direction
 * @returns {ToyRobot}
 */
ToyRobot.prototype.place = function(paramList) {
  var x = paramList[0];
  var y = paramList[1];
  var direction = directionMap[paramList[2]].value;

  // Ignore if placement is off the table
  if (x > this.tableSize.x || y > this.tableSize.y) {
    return this;
  }

  // Modify robot with directions
  this.isPlaced = true;
  this.position.x = x;
  this.position.y = y;
  this.direction = direction;

  return this;
};

/**
 * Move the robot one step in the direction it is facing
 * @returns {ToyRobot}
 */
ToyRobot.prototype.move = function() {
  // Ignore command if robot is not yet placed
  if (!this.isPlaced) {
    return this;
  }

  var x = this.position.x;
  var y = this.position.y;

  switch (this.direction) {
    case 'north':
      if (++y < this.tableSize.y) {
        this.position = {x: x, y: y}
      }
      break;
    case 'east':
      if (++x < this.tableSize.x) {
        this.position = {x: x, y: y}
      }
      break;
    case 'south':
      if (--y >= 0) {
        this.position = {x: x, y: y};
      }
      break;
    case 'west':
      if (--x >= 0) {
        this.position = {x: x, y: y}
      }
      break;
    default:
      break;
  }

  return this;
};

/**
 * Turn robot in given direction
 * @param {String} direction Direction to turn in
 * @returns {ToyRobot}
 */
ToyRobot.prototype.turn = function(direction) {
  // Ignore command if robot is not yet placed
  if (!this.isPlaced) {
    return this;
  }

  var resultDirection = directionMap[this.direction][direction];

  if (resultDirection) {
    this.direction = resultDirection;
  }

  return this;
};

/**
 * Report current position of the robot
 * @returns {ToyRobot}
 */
ToyRobot.prototype.report = function() {
  // Ignore command if robot is not yet placed
  if (!this.isPlaced) {
	console.log('Robot was not placed on the table');
	return this;
  }

  console.log('REPORT: ' + [this.position.x, this.position.y,this.direction.toUpperCase()].join(','));

  return this;
};

/**
 * Run parsed commands
 * @param {Array} commandList List of parsed commands
 * @returns {ToyRobot}
 */
ToyRobot.prototype.runCommands = function(commandList) {
  var command;
  var robot = this;

  // Run each command in series
  for (var i = 0; i<commandList.length; i++) {
    command = commandList[i];
    if (command.args) {
      robot = this[command.command](command.args);
    } else {
      robot = this[command.command]()
    }
  }

  return robot;
};

module.exports = ToyRobot;
