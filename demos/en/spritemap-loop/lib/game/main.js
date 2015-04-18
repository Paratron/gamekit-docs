/**
 * The main module.
 * Read more about modules in the article "Modules".
 */
gamekit.defineModule('main', function (){

    /**
     * Basic initalization flow. Loading assets, setting
     * everything up, then starting the engine.
     */
    gamekit
        .fetchAssets('walk.smap.72x97.png')
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

        //We create a animation on our spritemap asset.
        gamekit.a.walk.createAnimation({
            key: 'walk',
            from: 0,
            to: 9,
            fps: 25,
            loop: true
        });

        //Here we create a new sprite and assign our previously loaded image.
        mySprite = new gamekit.Sprite(gamekit.a.walk);

        //Lets move the sprite to a little bit nicer position.
        mySprite.x = 50;
        mySprite.y = 50;

        //Play the animation!
        mySprite.setAnimation('walk');

        //Attach the sprite to our created layer.
        gamekit.layer[0].attach(mySprite);
    }
});