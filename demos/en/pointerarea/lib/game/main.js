/**
 * The main module.
 * Read more about modules in the article "Modules".
 */
gamekit.defineModule('main', function(){

    /**
     * Basic initalization flow. Setting everything up, then starting the engine.
     */
    gameSetup();
	gamekit.start();

    /**
     * This method does our game setup. It creates a layer
     * and places our area on it.
     */
    function gameSetup(){
        var myInputArea;

        gamekit.createLayer();

		//Creating the new pointer area to capture pointer inputs.
		myInputArea = new gamekit.PointerArea();

        //Move and resize the pointer area - also rotate it a bit.
		myInputArea.x = 100;
		myInputArea.y = 10;
		myInputArea.w = 100; //By default, the width and height is set to the full canvas dimensions.
		myInputArea.h = 100;
		myInputArea.rotation = 30;

		//To make it visible, we enable debug drawing.
		myInputArea.debugDrawing = true;

		myInputArea
			.on('pointerdown')
			.then(function(){
				alert('You triggered the area!');
			});

        //Attach the area to our created layer.
        gamekit.layer[0].attach(myInputArea);
    }
});