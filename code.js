"use strict";

var GameOfLife =  function () {

	var createCell = function (x,y) {
		var cell = {};
		cell.x = x;
		cell.y = y;
		cell.toString = function() {
			return this.x.toString() + "_" + this.y.toString();
		};
		cell.neighbours = function() {
			var neighbours = [];
			neighbours.push("p" + (this.x - 1).toString() + "_" + (this.y - 1).toString());
			neighbours.push("p" + (this.x - 1).toString() + "_" + (this.y).toString());
			neighbours.push("p" + (this.x - 1).toString() + "_" + (this.y + 1).toString());
			neighbours.push("p" + (this.x).toString() + "_" + (this.y - 1).toString());
			neighbours.push("p" + (this.x).toString() + "_" + (this.y + 1).toString());
			neighbours.push("p" + (this.x + 1).toString() + "_" + (this.y - 1).toString());
			neighbours.push("p" + (this.x + 1).toString() + "_" + (this.y).toString());
			neighbours.push("p" + (this.x + 1).toString() + "_" + (this.y + 1).toString());
			return neighbours;
		}
		return cell;
	};

	var createWorld = function () {
		var numberOfCells =  Math.floor(Math.random()*300) + 100;
		var liveCells = [];
		var x, y;
		for (var i = 0; i < numberOfCells; i++) {
			x = Math.floor(Math.random()*30) + 25;
			y = Math.floor(Math.random()*30) + 10;
			liveCells.push(createCell(x,y));
		}

		return liveCells;
	};

	var createNeighbourCount = function (listOfCells) {
		var neighbourCount = {};

		// increment neighbours
		for (var i = 0; i < listOfCells.length; i++)
		{
			// add ten for this cell
			if (neighbourCount["p" + listOfCells[i].toString()] === undefined) {
				neighbourCount["p" + listOfCells[i].toString()] = 0;
			}
			neighbourCount["p" + listOfCells[i].toString()] += 10;

			// add one for each neighbour
			var neighbours = listOfCells[i].neighbours();
			for (var j = 0; j < neighbours.length; j++) {
				if (neighbourCount[neighbours[j]] === undefined) {
					neighbourCount[neighbours[j]] = 0;
				}
				neighbourCount[neighbours[j]] += 1;
			}
		}
		return neighbourCount;
	};

	var createNextGeneration = function (listOfCells) {
		var newCells = [];

		var neighbourCount = createNeighbourCount(listOfCells);

		// purge list
		for (var key in neighbourCount) {
			if (neighbourCount.hasOwnProperty(key))
			{
				if (neighbourCount[key] === 3 || neighbourCount[key] === 12 || neighbourCount[key] === 13) {
					var strings = key.substr(1).split("_");
					var newCell = createCell(parseInt(strings[0]), parseInt(strings[1]));
					newCells.push(newCell);
				}
			}
		}

		return newCells;
	};

	var renderCell = function (cell, canvasContext) {
		canvasContext.beginPath();
		canvasContext.arc(cell.x * 10, cell.y * 10, 5, 0, 2*Math.PI);
		canvasContext.stroke();
	};

	var renderWorld = function (cells, canvas) {
		var ctx=canvas.getContext("2d");
		canvas.width = canvas.width;
		for (var i = 0; i < cells.length; i++)
		{
			renderCell(cells[i], ctx);
		}
	};

	var cells;

	var clickNewWorld = function () {
		cells = createWorld();
		var canvas = document.getElementById("worldView");
		renderWorld(cells, canvas)
	};

	var clickNewGeneration = function () {
		cells = createNextGeneration(cells);
		var canvas = document.getElementById("worldView");
		renderWorld(cells, canvas)
	};

	var timer = null;

	var clickRun = function () {
		if (timer === null) {
			timer = setInterval(clickNewGeneration,200);
		}
		else {
			window.clearInterval(timer);
			timer = null;
		}
	};	

 	// export methods
	var methods = {};
	methods.createWorld = createWorld;
	methods.createCell = createCell;
	methods.createNeighbourCount = createNeighbourCount;
	methods.createNextGeneration = createNextGeneration;
	methods.renderCell = renderCell;
	methods.renderWorld = renderWorld;
	methods.clickNewWorld = clickNewWorld;
	methods.clickNewGeneration = clickNewGeneration;
	methods.clickRun = clickRun;
	return methods;

}();
