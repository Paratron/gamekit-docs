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
        .fetchAssets('ship.png')
        .then(gameSetup)
        .then(gamekit.start);

    /**
     * This method does our game setup. It creates a layer
     * and places our sprite on it.
     */
    function gameSetup(){
        var mySprite,
            crazyMove;

        //Our canvas will contain only one element.
        //It will look weird if we don't clean the canvas on every frame.
        gamekit.clearCanvas();

        //We need a layer to place our sprite upon
        gamekit.createLayer();

        //Here we create a new sprite and assign our previously loaded image.
        mySprite = new gamekit.Sprite(gamekit.a.ship);

        //Lets move the sprite to a little bit nicer position.
        mySprite.x = 50;
        mySprite.y = 50;

        //Attach the sprite to our created layer.
        gamekit.layer[0].attach(mySprite);

        //Prepare our crazy move tween!
        crazyMove = gamekit.chain(
            mySprite.prepareTween({x: 400}, 1000),
            gamekit.parallel(
                mySprite.prepareTween({y: 100}, 200),
                mySprite.prepareTween({scaleX: 0.5, scaleY: 0.5}, 200)
            ),
            mySprite.prepareTween({x: 200, y: 200}, 500),
            gamekit.parallel(
                mySprite.prepareTween({x: 50, y: 50}, 1000),
                mySprite.prepareTween({scaleX: 1, scaleY: 1}, 1000)
            )
        );

        //Enable pointer events on the sprite (not pixel perfect)
        mySprite.pointerEnable(true);

        //React to pointer-down events
        mySprite.on('pointerdown').then(crazyMove);

    }
});