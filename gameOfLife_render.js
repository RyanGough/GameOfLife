"use strict"

var gameOfLife_render = function() {
	
	var methods = {};

	// variables
	var cellSize = 10;
	var cellRows = 50;
	var cellColumns = 80;

	// calculated constants
	var cellRadius = cellSize / 2;
	var fieldWidth = cellSize * cellColumns;
	var fieldHeight = cellSize * cellRows;

	// d3 scales
	var xscale = d3.scale.linear();
	xscale.domain([0,cellColumns])
	xscale.range([0,fieldWidth])

	var yscale = d3.scale.linear();
	yscale.domain([0,cellRows])
	yscale.range([0,fieldHeight])

	//d3 svg for drawing cells / grid lines
	var svg = d3.select("#GameOfLife").append("svg")
		.attr("width", fieldWidth)
		.attr("height", fieldHeight)
		.attr("id", "worldViewSvg");

	// convert svg co-ordinates to a cell position in the model
	function convertSvgPosToCellPos(svgPos) {
		var cell_x = Math.floor((svgPos[0] + cellRadius) / cellSize);
		var cell_y = Math.floor((svgPos[1] + cellRadius) / cellSize);
		return {x: cell_x, y: cell_y};
	}
	
	// draw all the cells using d3
	function renderCells(cells) {

		var circles = svg.selectAll("circle")
			.data(cells);

		circles
			.attr("cx", function(cell) {
				return xscale(cell.x);
			})
			.attr("cy", function(cell) {
				return yscale(cell.y);
			})
			.attr("r", function() {
				return cellRadius;
			});			

		circles.enter()
			.append("circle")
			.attr("cx", function(cell) {
				return cell.x * cellSize;
			})
			.attr("cy", function(cell) {
				return cell.y * cellSize;
			})
			.attr("r", function() {
				return cellRadius;
			});

		circles.exit().remove();
	}

	var drawGrid = function () {
		for (var row = 0; row <= fieldHeight; row += cellSize)
		{
			svg.append("line")
	    		.attr("x1", 0)
	    		.attr("y1", row + cellRadius)
	    		.attr("x2", cellSize * cellColumns)
	    		.attr("y2", row + cellRadius)
	    		.attr("stroke", "black")
		}

		for (var col = 0; col <= fieldWidth; col += cellSize)
		{
			svg.append("line")
	    		.attr("x1", col + cellRadius)
	    		.attr("y1", 0)
	    		.attr("x2", col + cellRadius)
	    		.attr("y2", fieldHeight)
	    		.attr("stroke", "black")
		}
	};

	var clear = function () {
		svg.selectAll("line").remove();
		renderCells([]);
	};	

	var renderingMethods = {};
	renderingMethods.renderWorld = renderCells;
	renderingMethods.drawGrid = drawGrid;
	renderingMethods.clear = clear;
	renderingMethods.convertSvgPosToCellPos = convertSvgPosToCellPos;
	return renderingMethods;
}

