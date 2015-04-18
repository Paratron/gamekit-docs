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
		.loadAssets([
			'campFire.smap.64x64.png',
			'particles.smap.32x32.png',
			'ground.png',
			'shine.png'
		])
		.then(gameSetup)
		.then(gamekit.start);

	/**
	 * This method does our game setup. It creates a layer
	 * and places our sprite on it.
	 */
	function gameSetup(){
		var ground,
			campfire,
			fireShine,
			Emitter;

		//We need a layer to place our sprites upon
		gamekit.createLayer();

		//We loaded a spritemap for the fire (see link) - now lets define an animation.
		gamekit.a.campFire.createAnimation('burn', 0, 4, true, 8);

		//We want to have a nice ground layer.
		// Lets repeat the loaded ground asset across the full width and height.
		ground = new gamekit.Sprite(gamekit.a.ground);
		ground.w = gamekit.width();
		ground.h = gamekit.height();
		ground.stretch = false;

		//Our campfire uses the loaded SpriteMap and
		//plays the defined animation.
		campfire = new gamekit.Sprite(gamekit.a.campFire);
		campfire.x = 50;
		campfire.y = 120;
		campfire.setAnimation('burn');

		//The fire shine needs to be animated
		//to make the scene a bit nicer. :)
		fireShine = new gamekit.Sprite(gamekit.a.shine);
		fireShine.centerOrigin();
		fireShine.x = 82;
		fireShine.y = 180;

		//intScaleFactor and scaleFactore are just
		//mad up properties for our animation.
		fireShine.intScaleFactor = 0.04;
		fireShine.scaleFactor = fireShine.intScaleFactor;
		fireShine.update = function(){
			this.scaleX += this.scaleFactor;
			this.scaleY += this.scaleFactor;

			if(this.scaleX > 1.1){
				this.scaleFactor = -this.intScaleFactor;
				return;
			}

			if(this.scaleX < 0.9){
				this.scaleFactor = this.intScaleFactor;
			}
		};

		//Now this is the emitter
		var myEmitter = new gamekit.Emitter({
			x: 64,
			y: 120,
			w: 32,
			h: 32,
			scale: [0.1, 0.2],
			scaleChange: [-0.0005, -0.003],
			scaleTarget: 0,
			direction: [10, 40],
			directionChange: [0.5, 1],
			directionTarget: [40, 60],
			speed: [0.5, 1],
			number: 100,
			life: 90,
			alpha: [0.2, 0.6],
			spawnTime: 12000,
			fadeInValue: 0.05,
			fadeOutValue: 0.01,
			assets: [
				gamekit.a.particles[0],
				gamekit.a.particles[1],
				gamekit.a.particles[2],
				gamekit.a.particles[3]
			]
		});

		//Attach the sprite to our created layer.
		gamekit.layer[0].attach(ground);
		gamekit.layer[0].attach(fireShine);
		gamekit.layer[0].attach(campfire);
		gamekit.layer[0].attach(myEmitter);
	}
});