"use strict";

var GameOfLife =  function () {

	var formatPositionString = function(x, y){
		return x.toString() + "_" + y.toString();
	};

	var createCell = function (x,y) {
		var cell = {};
		cell.x = x;
		cell.y = y;
		cell.toString = function() {
			return formatPositionString(this.x, this.y);
		};
		cell.neighbours = function() {
			var neighbours = [];
			neighbours.push(formatPositionString(this.x - 1, this.y - 1));
			neighbours.push(formatPositionString(this.x - 1, this.y + 1));
			neighbours.push(formatPositionString(this.x + 1, this.y - 1));
			neighbours.push(formatPositionString(this.x + 1, this.y + 1));
			neighbours.push(formatPositionString(this.x + 1, this.y));
			neighbours.push(formatPositionString(this.x - 1, this.y));
			neighbours.push(formatPositionString(this.x, this.y - 1));
			neighbours.push(formatPositionString(this.x, this.y + 1));
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

			var neighbours = listOfCells[i].neighbours();
			for (var j = 0; j < neighbours.length; j++) {
				incrementNeighbourCount(neighbourCount, neighbours[j], 1);
			}
		}
		return neighbourCount;
	};

	var createNextGeneration = function (listOfCells) {
		var newCells = [];

		var neighbourCount = createNeighbourCount(listOfCells);

		for (var key in neighbourCount) {
			if (neighbourCount.hasOwnProperty(key)) {
				if ( neighbourCount[key] === 3 || neighbourCount[key] === 12 || neighbourCount[key] === 13) {
					var strings = key.split("_");
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
		canvasContext.fill();
		canvasContext.stroke();
	};

	var renderWorld = function (cells, canvas) {
		var ctx=canvas.getContext("2d");
		for (var i = 0; i < cells.length; i++)
		{
			renderCell(cells[i], ctx);
		}
	};

	var cells = [];

	var clickNewWorld = function () {
		cells = createWorld();
		var canvas = document.getElementById("worldView");
		canvas.width = canvas.width;
		renderWorld(cells, canvas)
	};

	var clickNewGeneration = function () {
		cells = createNextGeneration(cells);
		var canvas = document.getElementById("worldView");
		canvas.width = canvas.width;
		renderWorld(cells, canvas);
	};

	var timer = null;

	var clickRun = function () {
		if (timer === null) {
			timer = setInterval(clickNewGeneration,200);
			$('#GameOfLife #run').attr("value", "Stop");
			$('#GameOfLife #edit').attr("disabled", "disabled");
			$('#GameOfLife #nextGeneration').attr("disabled", "disabled");
			$('#GameOfLife #generateWorld').attr("disabled", "disabled");
			$('#GameOfLife #clearWorld').attr("disabled", "disabled");
		}
		else {
			window.clearInterval(timer);
			timer = null;
			$('#GameOfLife #run').attr("value", "Run");
			$('#GameOfLife #edit').removeAttr("disabled");
			$('#GameOfLife #nextGeneration').removeAttr("disabled");
			$('#GameOfLife #generateWorld').removeAttr("disabled");
			$('#GameOfLife #clearWorld').removeAttr("disabled");
		}
	};

	var clickClear = function () {
		cells = [];
		var canvas = document.getElementById("worldView");
		canvas.width = canvas.width;
		renderWorld(cells, canvas);		
	};

	var editMode = false;

	var editCanvas = function (event) {
		var canvas = document.getElementById("worldView");
		var context = canvas.getContext("2d");
    	var rect = canvas.getBoundingClientRect();
    	var cell_x = Math.floor((event.clientX - rect.left) / 10);
		var cell_y = Math.floor((event.clientY - rect.top) / 10);
		var cell = createCell(cell_x, cell_y);

		var cellExists = false;
		for (var x = 0; x < cells.length; x++) {
			if (cells[x].x === cell_x && cells[x].y === cell_y) {
				cells.splice(x, 1);
				cellExists = true;
				break;
			}
		}

		if (!cellExists) {
			cells.push(cell);
		}

		canvas.width = canvas.width;
		renderWorld(cells, canvas);
		drawGrid();
	};

	var drawGrid = function (){
		var canvasWidth = 800;
		var canvasHeight = 500;
		var cellSize = 10;
		var canvas = document.getElementById("worldView");
		var context = canvas.getContext("2d");
		for (var row = 0; row <= canvasHeight; row += cellSize)
		{
			context.moveTo(0, row - cellSize / 2);
			context.lineTo(canvasWidth, row - cellSize / 2);
		}

		for (var col = 0; col <= canvasWidth; col += cellSize)
		{
			context.moveTo(col - cellSize / 2, 0);
			context.lineTo(col - cellSize / 2, canvasHeight);
		}

		context.lineWidth = 0.5;
    	context.stroke();

    	canvas.addEventListener("mousedown", editCanvas, false);
	};

	var removeGrid = function (){
		var canvas = document.getElementById("worldView");
		canvas.width = canvas.width;
		renderWorld(cells, canvas);
		canvas.removeEventListener('mousedown', editCanvas);
	};

	var enterEditMode = function (){
		editMode= true;
		$('#GameOfLife #generateWorld').attr("disabled", "disabled");
		$('#GameOfLife #nextGeneration').attr("disabled", "disabled");
		$('#GameOfLife #run').attr("disabled", "disabled");
		$('#GameOfLife #clearWorld').attr("disabled", "disabled");
		drawGrid();
	};

	var exitEditMode = function (){
		editMode= false;
		$('#GameOfLife #generateWorld').removeAttr("disabled");
		$('#GameOfLife #nextGeneration').removeAttr("disabled");
		$('#GameOfLife #run').removeAttr("disabled");
		$('#GameOfLife #clearWorld').removeAttr("disabled");
		removeGrid();
	};

	var clickEdit = function () {
		if (editMode) {
			exitEditMode();
		}
		else
		{
			enterEditMode();
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
	methods.clickEdit = clickEdit;
	methods.clickClear = clickClear;
	return methods;

}();
