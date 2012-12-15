"use strict";

var gameOfLife_app =  function () {

	var methods = {};

	var renderer = function (canvas, cellSize) {

		var canvasContext = canvas.getContext("2d");
		
		var renderCell = function (cell) {
			canvasContext.beginPath();
			canvasContext.arc(cell.x * cellSize, cell.y * cellSize, cellSize / 2, 0, 2 * Math.PI);
			canvasContext.fill();
			canvasContext.stroke();
		};

		var renderCells = function (cells) {
			for (var i = 0; i < cells.length; i++)
			{
				renderCell(cells[i]);
			}
		};

		var drawGrid = function () {
			for (var row = 0; row <= canvas.height; row += cellSize)
			{
				canvasContext.moveTo(0, row - cellSize / 2);
				canvasContext.lineTo(canvas.width, row - cellSize / 2);
			}

			for (var col = 0; col <= canvas.width; col += cellSize)
			{
				canvasContext.moveTo(col - cellSize / 2, 0);
				canvasContext.lineTo(col - cellSize / 2, canvas.height);
			}

			canvasContext.lineWidth = 0.5;
	    	canvasContext.stroke();
		};

		var clear = function () {
			canvas.width = canvas.width;
		};	

		var renderingMethods = {};
		renderingMethods.renderWorld = renderCells;
		renderingMethods.drawGrid = drawGrid;
		renderingMethods.clear = clear;
		return renderingMethods;
	};

	var createApplication = function () {

		var model = gameOfLife_model();
		var canvas = document.getElementById("worldView");
		var cellRenderSize = 10;
		var gameRenderer = renderer(canvas, cellRenderSize);
		var runTimer = null;
		var editMode = false;

		var renderModel = function () {
			gameRenderer.clear();
			gameRenderer.renderWorld(model.liveCells());
		};

		var setControlsForRunningMode = function () {
			$('#GameOfLife #run').attr("value", "Stop");
			$('#GameOfLife #run').removeAttr("disabled");
			$('#GameOfLife #edit').attr("disabled", "disabled");
			$('#GameOfLife #nextGeneration').attr("disabled", "disabled");
			$('#GameOfLife #generateWorld').attr("disabled", "disabled");
			$('#GameOfLife #clearWorld').attr("disabled", "disabled");
		};

		var setControlsForReadyMode = function () {
			$('#GameOfLife #run').attr("value", "Run");
			$('#GameOfLife #run').removeAttr("disabled");
			$('#GameOfLife #edit').removeAttr("disabled");
			$('#GameOfLife #nextGeneration').removeAttr("disabled");
			$('#GameOfLife #generateWorld').removeAttr("disabled");
			$('#GameOfLife #clearWorld').removeAttr("disabled");
		};

		var setControlsForEditMode = function () {
			$('#GameOfLife #run').attr("disabled", "disabled");
			$('#GameOfLife #edit').removeAttr("disabled");
			$('#GameOfLife #nextGeneration').attr("disabled", "disabled");
			$('#GameOfLife #generateWorld').attr("disabled", "disabled");
			$('#GameOfLife #clearWorld').attr("disabled", "disabled");
		};

		var clickNewWorld = function () {
			model.createWorld();
			renderModel();
		};

		var clickNewGeneration = function () {
			model.createNextGeneration();
			renderModel();
		};		

		var clickRun = function () {
			if (runTimer === null)
			{
				runTimer = setInterval(clickNewGeneration,200);
				setControlsForRunningMode();
			}
			else
			{
				window.clearInterval(runTimer);
				runTimer = null;
				setControlsForReadyMode();
			}
		};

		var clickClear = function () {
			gameRenderer.clear();
			model.clearWorld();	
		};

		var clickCanvas = function (event) {
	    	var rect = canvas.getBoundingClientRect();
	    	var cell_x = Math.floor((event.clientX - rect.left) / cellRenderSize);
			var cell_y = Math.floor((event.clientY - rect.top) / cellRenderSize);

			model.toggleCell(cell_x, cell_y);
			renderModel();
			gameRenderer.drawGrid();
		};	

		var clickEdit = function () {
			editMode = !editMode;
			if (editMode)
			{
				setControlsForEditMode();
				gameRenderer.drawGrid();
				canvas.addEventListener("mousedown", clickCanvas, false);
			}
			else
			{
				setControlsForReadyMode();
				renderModel();
				canvas.removeEventListener('mousedown', clickCanvas);
			}
		};

		methods.clickNewWorld = clickNewWorld;
		methods.clickNewGeneration = clickNewGeneration;
		methods.clickRun = clickRun;
		methods.clickEdit = clickEdit;
		methods.clickClear = clickClear;
	};

	methods.createApplication = createApplication;
	return methods;
}();
