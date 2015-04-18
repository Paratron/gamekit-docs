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
        .loadAssets('plants.atlas.png')
        .then(gameSetup)
        .then(gamekit.start);

    /**
     * This method does our game setup. It creates a layer
     * and places our sprite on it.
     */
    function gameSetup(){
        //Our game background remains transparent.
        //It will look weird if we don't clean the canvas on every frame.
        gamekit.clearCanvas();

        //We need a layer to place our sprites upon
        gamekit.createLayer();

		var trunk = new gamekit.Sprite(gamekit.a.plants.treetrunk);
		trunk.x = 100;
		trunk.y = 100;

		var crown = new gamekit.Sprite(gamekit.a.plants.treecrown);
		crown.x = 75;
		crown.y = 25;

		gamekit.layer[0].attach(trunk);
		gamekit.layer[0].attach(crown);
    }
});