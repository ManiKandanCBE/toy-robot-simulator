var expect = require('chai').expect;
var ToyRobot = require('../src/toyRobot.js');

describe('ToyRobot', function() {
	var toyRobot;
	
	beforeEach(function(){
		toyRobot = new ToyRobot();
	});
	
	it('should place the robot in the correct position specified', function(){
		toyRobot = toyRobot.place([1,2,'east']);
		expect(toyRobot.isPlaced).to.be.true;
		expect(toyRobot.position).to.deep.equal({x:1, y:2});
		expect(toyRobot.direction).to.equal('east');
	});
	
	it('should not place the robot if position specified is out of range', function(){
		toyRobot = toyRobot.place([5,5,'north']);
		expect(toyRobot.isPlaced).to.be.false;
		expect(toyRobot.position).to.deep.equal({x:null, y:null});
		expect(toyRobot.direction).to.be.null;
	});
	
	it('should replace the robot if position specified multiple times', function(){
		toyRobot = toyRobot.place([1,2,'east']);
		toyRobot = toyRobot.place([3,2,'west']);
		expect(toyRobot.isPlaced).to.be.true;
		expect(toyRobot.position).to.deep.equal({x:3, y:2});
		expect(toyRobot.direction).to.equal('west');
	});
	
	it('should move the robot position on the saem direction by one step', function(){
		toyRobot = toyRobot.place([1,2,'east']);
		toyRobot = toyRobot.move();
		expect(toyRobot.isPlaced).to.be.true;
		expect(toyRobot.position).to.deep.equal({x:2, y:2});
		expect(toyRobot.direction).to.equal('east');
	});
	
	it('should turn the robot to corresponding direction', function(){
		toyRobot = toyRobot.place([1,2,'east']);
		toyRobot = toyRobot.turn('left');
		toyRobot = toyRobot.move();
		expect(toyRobot.isPlaced).to.be.true;
		expect(toyRobot.position).to.deep.equal({x:1, y:3});
		expect(toyRobot.direction).to.equal('north');
	});
	
	it('should ignore the movements that causes robot to move out of the table', function(){
		toyRobot = toyRobot.place([4,2,'east']);
		toyRobot = toyRobot.move();
		expect(toyRobot.isPlaced).to.be.true;
		expect(toyRobot.position).to.deep.equal({x:4, y:2});
		expect(toyRobot.direction).to.equal('east');
	});
	
	it('should place/move/turn the robot based on the commands passed', function(){
		toyRobot.runCommands([
		{
			command: 'place',
			args: [2, 3, 'north']
		},
		{
			command: 'move'
		},
		{
			command: 'turn',
			args: 'right'
		},
		{
			command: 'report'
		}
		]);
		
		expect(toyRobot.isPlaced).to.be.true;
		expect(toyRobot.position).to.deep.equal({x:2, y:4});
		expect(toyRobot.direction).to.equal('east');
	});
});