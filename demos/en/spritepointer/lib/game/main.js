/**
 * The main module.
 * Read more about modules in the article "Modules".
 */
gamekit.defineModule('main', function(){

    /**
     * Basic initalization flow. Loading assets, setting
     * everything up, then starting the engine.
     */
    gamekit
        .fetchAssets('mySpriteImage.png')
        .then(gameSetup)
        .then(gamekit.start);

    /**
     * This method does our game setup. It creates a layer
     * and places our sprite on it.
     */
    function gameSetup(){
        var mySprite;

        //Our canvas will contain only one element.
        //It will look weird if we don't clean the canvas on every frame.
        gamekit.clearCanvas();

        //We need a layer to place our sprite upon
        gamekit.createLayer();

        //Here we create a new sprite and assign our previously loaded image.
        mySprite = new gamekit.Sprite(gamekit.a.mySpriteImage);

        //Lets move the sprite to a little bit nicer position.
        mySprite.x = 50;
        mySprite.y = 50;

		//Enable the capturing of pointer events on the sprite.
		mySprite.pointerEnable();

		mySprite
			.on('pointerdown')
			.then(function(){
				alert('You triggered the sprite!');
			});

        //Attach the sprite to our created layer.
        gamekit.layer[0].attach(mySprite);
    }
});