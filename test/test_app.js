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
      expect($('#GameOfLife #run').attr("value")).to.be("Run");
    }); 

    it('Contains Edit button', function (){
      expect($('#GameOfLife #edit').length).to.be(1);
      expect($('#GameOfLife #edit').attr("value")).to.be("Toggle Edit");
    });

    it('Contains Clear button', function (){
      expect($('#GameOfLife #clearWorld').length).to.be(1);
      expect($('#GameOfLife #clearWorld').attr("value")).to.be("Clear");
    }); 
  });

  describe("Running Mode", function (){
    it('Run text changes to stop when running', function (){
      gameOfLife_app.clickRun();
      expect($('#GameOfLife #run').attr("value")).to.be("Stop");
      expect($('#GameOfLife #edit').attr("disabled")).to.be("disabled");
      expect($('#GameOfLife #nextGeneration').attr("disabled")).to.be("disabled");
      expect($('#GameOfLife #generateWorld').attr("disabled")).to.be("disabled");
      expect($('#GameOfLife #clearWorld').attr("disabled")).to.be("disabled");
      gameOfLife_app.clickRun();
      expect($('#GameOfLife #run').attr("value")).to.be("Run");
      expect($('#GameOfLife #edit').attr("disabled")).to.be(undefined);      
      expect($('#GameOfLife #nextGeneration').attr("disabled")).to.be(undefined);
      expect($('#GameOfLife #generateWorld').attr("disabled")).to.be(undefined);
      expect($('#GameOfLife #clearWorld').attr("disabled")).to.be(undefined);
    });
  });

  describe("Edit Mode", function (){
    it('Other buttons disabled during edit mode', function (){
      gameOfLife_app.clickEdit();
      expect($('#GameOfLife #generateWorld').attr("disabled")).to.be("disabled");
      expect($('#GameOfLife #nextGeneration').attr("disabled")).to.be("disabled");
      expect($('#GameOfLife #run').attr("disabled")).to.be("disabled");
      expect($('#GameOfLife #clearWorld').attr("disabled")).to.be("disabled");
      gameOfLife_app.clickEdit();
      expect($('#GameOfLife #generateWorld').attr("disabled")).to.be(undefined);
      expect($('#GameOfLife #nextGeneration').attr("disabled")).to.be(undefined);
      expect($('#GameOfLife #run').attr("disabled")).to.be(undefined);
      expect($('#GameOfLife #clearWorld').attr("disabled")).to.be(undefined);
    });   
  }); 

 
});
