"use strict";

var gameOfLife_app =  function () {

	var methods = {};

	var createApplication = function () {

		var model = gameOfLife_model();
		var gameRenderer = gameOfLife_render();
		var runTimer = null;
		var editMode = false;
		var svg = d3.select("#worldViewSvg");

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

		function editClickHandler()
		{
			var cellPos = gameRenderer.convertSvgPosToCellPos(d3.mouse(this));
			model.toggleCell(cellPos.x, cellPos.y);
			renderModel();
			gameRenderer.drawGrid();
		}

		var clickEdit = function () {
			editMode = !editMode;
			if (editMode)
			{
				setControlsForEditMode();
				gameRenderer.drawGrid();
				svg.on("click", editClickHandler);
			}
			else
			{
				setControlsForReadyMode();
				renderModel();
				svg.on("click", null);
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
