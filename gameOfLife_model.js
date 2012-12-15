"use strict";

var gameOfLife_model = function () {

	var cells = [];

	var formatPositionString = function(x, y){
		return x.toString() + "_" + y.toString();
	};

	var getCellNeighbours = function (cell) {
		var neighbours = [];
		neighbours.push(formatPositionString(cell.x - 1, cell.y - 1));
		neighbours.push(formatPositionString(cell.x - 1, cell.y + 1));
		neighbours.push(formatPositionString(cell.x + 1, cell.y - 1));
		neighbours.push(formatPositionString(cell.x + 1, cell.y + 1));
		neighbours.push(formatPositionString(cell.x + 1, cell.y));
		neighbours.push(formatPositionString(cell.x - 1, cell.y));
		neighbours.push(formatPositionString(cell.x, cell.y - 1));
		neighbours.push(formatPositionString(cell.x, cell.y + 1));
		return neighbours;
	};

	var createCell = function (x,y) {
		var cell = {};
		cell.x = x;
		cell.y = y;
		cell.toString = function() {
			return formatPositionString(this.x, this.y);
		};
		return cell;
	};

	var addCellToWorld = function (x, y) {
		cells.push(createCell(x, y));
	};

	var numberOfLiveCells = function () {
		return cells.length;
	};

	var liveCells = function () {
		return cells;
	};

	var createWorld = function () {
		var numberOfCells =  Math.floor(Math.random()*300) + 100;
		clearWorld();
		var x, y;
		for (var i = 0; i < numberOfCells; i++) {
			x = Math.floor(Math.random()*30) + 25;
			y = Math.floor(Math.random()*30) + 10;
			cells.push(createCell(x,y));
		}
	};

	var clearWorld = function () {
		cells = [];
	};

	var incrementNeighbourCount = function(neighbourCount, cell, increment) {
		if (neighbourCount[cell] === undefined) {
			neighbourCount[cell] = 0;
		}
		neighbourCount[cell] += increment;
	};

	var createNeighbourCount = function (listOfCells) {
		var neighbourCount = {};

		for (var i = 0; i < listOfCells.length; i++)
		{
			incrementNeighbourCount(neighbourCount, listOfCells[i], 10);

			var neighbours = getCellNeighbours(listOfCells[i]);
			for (var j = 0; j < neighbours.length; j++) {
				incrementNeighbourCount(neighbourCount, neighbours[j], 1);
			}
		}
		return neighbourCount;
	};

	var createNextGeneration = function () {
		var newCells = [];

		var neighbourCount = createNeighbourCount(cells);

		for (var key in neighbourCount) {
			if (neighbourCount.hasOwnProperty(key)) {
				if ( neighbourCount[key] === 3 || neighbourCount[key] === 12 || neighbourCount[key] === 13) {
					var strings = key.split("_");
					var newCell = createCell(parseInt(strings[0]), parseInt(strings[1]));
					newCells.push(newCell);
				}
			}
		}

		cells = newCells;
	};

	var toggleCell = function (x, y) {
		var cell = createCell(x, y);
		var cellExists = false;
		for (var x = 0; x < cells.length; x++) {
			if (cells[x].x === cell.x && cells[x].y === cell.y) {
				cells.splice(x, 1);
				cellExists = true;
				break;
			}
		}

		if (!cellExists) {
			cells.push(cell);
		}
	};

	// export methods
	var modelMethods = {};
	modelMethods.numberOfLiveCells = numberOfLiveCells;
	modelMethods.addCellToWorld = addCellToWorld;
	modelMethods.liveCells = liveCells;
	modelMethods.createWorld = createWorld;
	modelMethods.clearWorld = clearWorld;
	modelMethods.createNextGeneration = createNextGeneration;
	modelMethods.createNeighbourCount = createNeighbourCount;
	modelMethods.toggleCell = toggleCell;
	return modelMethods;
};
