var expect = require('chai').expect;
var ToyRobotUtil = require('../src/toyRobotUtil.js');
var path = require('path');

describe('toyRobotUtil', function() {
  var toyRobotUtil;

  before(function() {
	  toyRobotUtil = new ToyRobotUtil();
  });
  
  it('should correctly read in the contents of the command file', function(done) {
    toyRobotUtil.readInputFile(path.join(__dirname, 'files/test.txt'), function(err, fileData) {
      expect(err).to.be.null;
      expect(fileData.toString()).to.equal('PLACE 0,0,NORTH\r\nMOVE\r\nREPORT');
      done();
    });
  });

  it('should throw an error if file is empty', function(done) {
    toyRobotUtil.readInputFile(path.join(__dirname, 'files/testEmpty.txt'), function(err) {
      expect(err).to.exist;
      done();
    });
  });
  
  it('should throw an error if no commands passed', function(done) {
    toyRobotUtil.parseData('', function(err) {
      expect(err).to.exist;
      done();
    });
  });
  
  it('should correctly parse the valid comments', function(done) {
	toyRobotUtil.parseData('PLACE 1,1,EAST\r\nMOVE\r\nREPORT', function(err, commandList) {
		expect(commandList).to.deep.equal([
		{
			command: 'place',
			args: [1, 1, 'east']
		},
		{
			command: 'move'
		},
		{
			command: 'report'
		}
		]);
		done();
	});
  });
  
  it('should not parse the invalid comments', function(done) {
	toyRobotUtil.parseData('PLACE 1,1,EAST\r\n123fdfsf\r\nMOVE\r\nINVALID\r\nLEFT\r\nREPORT', function(err, commandList) {
		expect(commandList).to.deep.equal([
		{
			command: 'place',
			args: [1, 1, 'east']
		},
		{
			command: 'move'
		},
		{
			command: 'turn',
			args: 'left'
		},
		{
			command: 'report'
		}
		]);
		done();
	});
  });
});