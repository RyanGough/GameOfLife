describe("GameOfLife Model", function() {

  var model = gameOfLife_model();

  beforeEach(function(){
    model.clearWorld();
  });

  describe("numberOfLiveCells", function() {
    it('returns number of cells in world', function () {
      expect(model.numberOfLiveCells()).to.be(0);
    });
  });

  describe("addCellToWorld", function() {
    it('adds a single cell to the world', function () {
      model.addCellToWorld(1,2);
      expect(model.numberOfLiveCells()).to.be(1);
    });
  }); 

  describe("liveCells", function() {
    it('returns list of all live cells', function () {
      model.addCellToWorld(1,2);
      expect(model.liveCells().length).to.be(1);
      expect(model.liveCells()[0].toString()).to.be("1_2");
    });
  });

  describe("createWorld", function() {
    it('Creates a random list of between 100 and 400 live points', function(){
      model.createWorld();
      expect(model.numberOfLiveCells()).to.be.greaterThan(99);
      expect(model.numberOfLiveCells()).to.be.lessThan(401);
    });
  });

  describe("clearWorld", function() {
    it('removes all cells', function(){
      model.createWorld();
      model.clearWorld();
      expect(model.numberOfLiveCells()).to.be(0);
    });
  });

  describe("Create Next Generation", function() {

    it('given single cell, returns empty list ', function(){
      model.addCellToWorld(1,2);
      model.createNextGeneration();
      expect(model.numberOfLiveCells()).to.be(0);
    });

    it('given 4 cell block, returns 4 cell block ', function(){
      model.addCellToWorld(1,1);
      model.addCellToWorld(1,2);
      model.addCellToWorld(2,1);
      model.addCellToWorld(2,2);
      model.createNextGeneration();
      expect(model.numberOfLiveCells()).to.be(4);
      expect(model.liveCells().toString()).to.contain("1_1");
      expect(model.liveCells().toString()).to.contain("1_2");
      expect(model.liveCells().toString()).to.contain("2_1");
      expect(model.liveCells().toString()).to.contain("2_2");
    }); 

    it('given 3 cell line vertical line, returns 3 cell horizontal line ', function(){
      model.addCellToWorld(1,1);
      model.addCellToWorld(1,2);
      model.addCellToWorld(1,3);
      model.createNextGeneration();
      expect(model.numberOfLiveCells()).to.be(3);
      expect(model.liveCells().toString()).to.contain("0_2");
      expect(model.liveCells().toString()).to.contain("1_2");
      expect(model.liveCells().toString()).to.contain("2_2");
    });   

  });

  describe.skip("Performace", function () {
    it('should be able to iterate 1000 generations in 2 seconds', function () {
      var liveCells = model.createWorld();
      var start = new Date().getTime();
      for (var i = 0; i < 1000; i++)
      {
        liveCells = model.createNextGeneration();
      }
      var end = new Date().getTime();
      expect(start - end).to.be.lessThan(2000);
    });
  });
});
