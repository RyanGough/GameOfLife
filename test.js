// page exists with title
// page exists with canvas
// page exists with generate button
// generate button cretes random play field
// field is rendered to canvas
// step forward button exists
// step forward button generates new play field from current
// new play field is rendered to screen
// play button constantly generates new play field and renders


describe("GameOfLife", function() {

  describe("Page Layout", function() {
  	
  	it('Shows title - Game Of Life', function (){
  		expect($('#GameOfLife h1').length).to.be(1);
  		expect($('#GameOfLife h1').text()).to.be("Game Of Life");
  	});

  	it('Contains Canvas element', function (){
  		expect($('#GameOfLife canvas').length).to.be(1);
  		expect($('#GameOfLife canvas').attr("width")).to.be("800");
  		expect($('#GameOfLife canvas').attr("height")).to.be("500");
  		expect($('#GameOfLife canvas').attr("id")).to.be("worldView");
  	});

  	it('Contains Generate button', function (){
  		expect($('#GameOfLife #generateWorld').length).to.be(1);
  		expect($('#GameOfLife #generateWorld').attr("value")).to.be("New Game");
  	});

    it('Contains Next button', function (){
      expect($('#GameOfLife #nextGeneration').length).to.be(1);
      expect($('#GameOfLife #nextGeneration').attr("value")).to.be("Next");
    });

    it('Contains Run button', function (){
      expect($('#GameOfLife #run').length).to.be(1);
      expect($('#GameOfLife #Run').attr("value")).to.be("Run");
    }); 
  
  });

  describe("Generation Of New Game", function (){

    describe("createWorld", function() {

      it('Creates a random list of between 100 and 400 live points', function(){
        var liveCells = GameOfLife.createWorld();
        expect(liveCells.length).to.be.greaterThan(99);
        expect(liveCells.length).to.be.lessThan(401);
        expect(liveCells[0].x).to.be.greaterThan(-1);
        expect(liveCells[0].x).to.be.lessThan(401);
        expect(liveCells[0].y).to.be.greaterThan(-1);
        expect(liveCells[0].y).to.be.lessThan(401);
      });
    });
  });

  describe("Rendering World", function() {

    it('can render single cell ', function(){
      var cell = GameOfLife.createCell(1,2);
      var canvas = document.getElementById("worldView");
      var context = canvas.getContext("2d");
      var mockCanvasContext = sinon.mock(context);
      mockCanvasContext.expects("beginPath").once();
      mockCanvasContext.expects("arc").once();
      mockCanvasContext.expects("stroke").once();
      GameOfLife.renderCell(cell, context);
      mockCanvasContext.verify();
    });

  });

  describe("Create Neighbour Count", function() {

    it('given single cell, returns correct neighbour count', function(){
      var cell = GameOfLife.createCell(1,2);
      var cells = [];
      cells.push(cell);
      var neighbourCount = GameOfLife.createNeighbourCount(cells);
      expect(neighbourCount["p1_2"]).to.be(10);
      expect(neighbourCount["p0_1"]).to.be(1);
      expect(neighbourCount["p0_2"]).to.be(1);
      expect(neighbourCount["p0_3"]).to.be(1);
      expect(neighbourCount["p1_1"]).to.be(1);
      expect(neighbourCount["p1_3"]).to.be(1);
      expect(neighbourCount["p2_1"]).to.be(1);
      expect(neighbourCount["p2_2"]).to.be(1);
      expect(neighbourCount["p2_3"]).to.be(1);
    }); 

    it('given 4 cell block returns correct neighbour count', function(){
      var cell1 = GameOfLife.createCell(1,2);
      var cell2 = GameOfLife.createCell(1,1);
      var cell3 = GameOfLife.createCell(2,1);
      var cell4 = GameOfLife.createCell(2,2);
      var cells = [cell1, cell2, cell3, cell4];
      var neighbourCount = GameOfLife.createNeighbourCount(cells);
      expect(neighbourCount["p1_2"]).to.be(13);
      expect(neighbourCount["p2_2"]).to.be(13);
      expect(neighbourCount["p1_1"]).to.be(13);
      expect(neighbourCount["p2_1"]).to.be(13);
    }); 

  });

  describe("Create Next Generation", function() {

    it('given single cell, returns empty list ', function(){
      var cell = GameOfLife.createCell(1,2);
      var cells = [];
      cells.push(cell);
      var nextGeneration = GameOfLife.createNextGeneration(cells);
      expect(nextGeneration.length).to.be(0);
    });

    it('given 4 cell block, returns 4 cell block ', function(){
      var cell1 = GameOfLife.createCell(1,1);
      var cell2 = GameOfLife.createCell(1,2);
      var cell3 = GameOfLife.createCell(2,1);
      var cell4 = GameOfLife.createCell(2,2);
      var cells = [cell1, cell2, cell3, cell4];
      var nextGeneration = GameOfLife.createNextGeneration(cells);
      expect(nextGeneration.length).to.be(4);
      expect(nextGeneration[0].toString()).to.be("1_1");
    });    

  });

  describe("performace", function () {
    it('should be able to iterate 1000 generations in 2 seconds', function () {
      var liveCells = GameOfLife.createWorld();
      var start = new Date().getTime();
      for (var i = 0; i < 1000; i++)
      {
        liveCells = GameOfLife.createNextGeneration(liveCells);
      }
      var end = new Date().getTime();
      expect(start - end).to.be.lessThan(2000);
    });
  });
});
