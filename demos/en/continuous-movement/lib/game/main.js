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
            myTimer;

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

        //Setting up for continuous movement
        mySprite.direction = 90;
        mySprite.speed = 2;

        //Set up a timer to rotate for 180 degrees every few seconds,
        //or our spaceship would get lost!
        myTimer = new gamekit.Timer(2000);

        myTimer.then(function(){
            mySprite.direction -= 180;
        });
    }
});