conf:{
    "key": "sprite-atlases",
    "title": "Sprite Atlases"
}:conf

#Sprite Atlases

A sprite atlas is a "advanced" version of the old spritemap. It has the ability
to fuse many images of different sizes together into one image file, while the
Spritemap has the drawback that all images have to be of the same size due to
technical reasons.

The drawback of a sprite atlas is, that it needs a supporting file that contains
all the positions and dimensions of the sprites inside the image file. The sprite 
images cannot be "found" mathematically, like it works with the simple spritemap.
Because of that, a sprite atlas always makes two requests to the server.

![A sprite atlas](../../docs/assets/atlas.png)    
_Very small sprite atlas for a game I make_ 

Like with the spritemaps, you can either load atlases directly over the [asset loader](loading-assets#spritemaps-and-atlases),
or turn previously loaded images into atlases when you need to have more control.

In case you have loaded your atlas image already into the asset pool and want to
turn it into a sprite atlas (you need to have the position/dimension information at hand),
you simply do this:

    //Our image has been loaded as "plants"
    gamekit.a.plants = new gamekit.SpriteAtlas({
        image: gamekit.a.plants,
        positions: myPositionInformation
    });
    
This replaces the existing image asset "plants" with a usable sprite atlas. The information
in the variable `myPositionInformation` need to be fetched from elsewhere.

This is just a manual example - I suggest you to use the shorthand method of loading sprite
atlases, since it saves you from a lot of trouble.

##Creating sprite atlas support files
The support files of a sprite atlas are always in JSON format. Gamekit supports the "standard"
format and a slightly shorter format that may save you a few bytes.

Default format example:

    {
    	"treetrunk": {
            "x": 0, 
            "y": 83,
            "w": 44,
            "h": 25
    	},
    	"treecrown": {
    	    "x": 0,
    	    "y": 0,
    	    "w": 94,
    	    "h": 82
        }
    }
    
Shorter format (may only work with gamekit):

    {
    	"treetrunk": [0, 83, 44, 25],
    	"treecrown": [0, 0, 94, 82]
    }
    

##Using a sprite atlas on a sprite
When you have loaded your sprite atlas, you are ready to use it upon sprite generation.
You can use it in two different ways: either use a specific image statically on your sprite,
or pass the whole atlas to the sprite. When you have passed the whole atlas, you are able
to switch the atlas-keys on the fly, and even use animations.

Creating a sprite by accessing a image key inside the atlas directly:

    var mySprite = new gamekit.Sprite(gamekit.a.plants.treetrunk);
    
Aaaand the whole atlas:

    var mySprite = new gamekit.Sprite(gamekit.a.plants);
    
The sprite will automatically assign itself to the first key in the atlas, which would
also be `treetrunk` in our case.

demo:{
    "target": "en/spriteatlas/",
    "display": [
        "lib/game/main.js"
    ],
    "editable": true
}:demo


##Playing animations from a sprite atlas
Its perfectly possible to create animations from a sprite atlas. It works very similar to
animation definition on spritemaps - you just need to pass the atlas keys you want to use.

    gamekit.a.playerAtlas.createAnimation('walk', ['step1', 'step2', 'step3']);
    
    var mySprite = new gamekit.Sprite(gamekit.a.playerAtlas);
    
    mySprite.setAnimation('walk');
    
More about animations in the [Spritemaps article](spritemaps#playing-animations-on-a-sprite-object).