conf:{
    "root": "gamekit",
    "title": "gamekit.SpriteMap",
    "constructor": true,
    "file": "src/SpriteMap.js",
    "key": "gamekit.SpriteMap"
}:conf

#gamekit.SpriteMap
Automatically splits an image into a sprite map and makes tiles accessible via index.
The Spritemap behaves like an array, so you can access the separate sprites by calling

    mySpritemap[index]

For example when using a sprite object:

    var car = new Sprite(mySpritemap[12]);

##Properties

###gamekit.SpriteMap.defaultFPS:Number {.property}
The default amount of frames per second that each sprite based animation should use by default.

###length:NUmber {.property}
The number of sprites in the spritemap.

##Methods

###SpriteMap(params):gamekit.SpriteMap {.method}
Creates a new spritemap object. Pass an object using the following properties:

####image:Image
The image asset you want to use for this spritemap.

####tileW:Number
The width of a sprite in pixel.

####tileH:Number
The height of a sprite in pixel.

####offsX:Number
(optional) The global offset from the upper side of the image in pixel.

####offsY:Number
(optional) The global offset from the left side of the image in pixel.

####spacingX
(optional) Horizontal spacing between the sprites in pixel.

####spacingY
(optional) Vertical spacing between the sprites in pixel.


###createAnimation(key, fromIndex, toIndex, loop, fps):void {.method}
This creates a new animation on the spritemap that is accessable by other
objects which use the spritemap.

You need to define a unique key through which the animation can be accessed.
`fromIndex` and `toIndex` mark the start and end positions within the spritemap.

`loop` defines if the animation should run repeatedly or not. Defaults to `true`.

`fps` is the playback speed of the animation. Defaults to `gamekit.SpriteMap.defaultFPS` which
defaults itself to `25`.