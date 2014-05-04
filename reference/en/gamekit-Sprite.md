conf:{
    "root": "gamekit",
    "title": "gamekit.Sprite",
    "constructor": true,
    "file": "src/Sprite.js",
    "key": "gamekit.Sprite"
}:conf

#gamekit.Sprite
Sprite elements are the used to render visual assets to the players' screen. They can be used to
 modify the appearance, position and dimension of the asset and contain methods for property animation
 or continuous movement. Read more about sprites in the article [Sprites, Layers and Groups](sprites-layers-and-groups).


##Properties
###x:Number {.property}
Current horizontal position of the sprite in pixels. Relative to the surrounding element (group or layer).

###y:Number {.property}
Current vertical position of the sprite in pixels. Relative to the surrounding element (group or layer).

###w:Number {.property}
Width of the sprite element in pixels. Is automatically set to the asset's width upon sprite creation.

###h:Number {.property}
Height of the sprite element in pixels. Is automatically set to the asset's height upon sprite creation.

###originX:Number {.property}
The horizontal offset of the origin point in pixels. Default is `0`.

###originY:Number {.property}
The vertical offset of the origin point in pixels. Default is `0`.

###rotation:Number {.property}
Rotation of the sprite in degrees. Sprites are rotated around their origin point. Valid values are between
`0` and `359` degrees. The property behaves circular - this means if you set a value greater than 359, or smaller
than 0, you will always achieve a value inside the 0-359 degree range. Gamekit corrects the angle in its
update loop.

###direction:Number {.property}
Directly related to the `speed` property. This sets the angle of the direction in which the sprite will
be moved if speed is not equal to zero. This property doesn't rotate the sprite - use `rotation` for
that purpose.

###speed:Number {.property}
If this property is not equal to zero, the sprite will be moved the given number of pixels per frame into
the direction set under `direction`.

###scaleX:Number {.property}
The scale factor is only applied visually. The sprite will keep its original dimensions in all
 calculations including asset scaling/skewing. The scale factor is only applied visually when rendering
 the Sprite. A value of `1` (default) will let the Sprite appear at 100% of its size. A value of `0.5`
 will make it appear at 50% and so on.

###scaleY:Number {.property}
Counterpart of `scaleX`. Set both properties to the same value to achieve a scaling that preserves the
Sprite assets' aspect ratio.

###alpha:Number {.property}
Manipulates the Sprites' opacity. Set a value between `0` (invisible) and `1` (100% visible, default)
to render Sprites transparently.

###stretch:Bool {.property}
Advises gamekit whether the Sprites asset image should be stretched to fit the Sprites' dimensions
or simply cut off. Defaults to `false`.

###asset:Asset {.property}
Pointer to the Sprites' asset image. Is set in the constructor function.

###debugDrawing:Bool {.property}
If set to `true`, gamekit will draw a box around the Sprites' borders and a dot, where the origin
 point is.

##Methods

###Sprite(asset):gamekit.Sprite {.method .constructor}
Constructor method for new Sprites. Needs an asset object passed.

    var myBoat = new gamekit.Sprite(gamekit.a.boat);

###update():void {.method}
This method is empty by default. Overwrite it with your own update method.

The update method of each Sprite object is called before the `render()` method is called,
so the Sprite has the chance of reacting to its environment, updating its values or other
stuff on each frame.

###draw(ctx):void {.method}
This method is being called by gamekit on each frame. It passes the [context2D object](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
of the game canvas into the method, so the Sprite has direct access to render itself.

The canvas is already in a state where the Sprite itself doesn't have to care much about the
translations, rotations and other manipulations from objects below the Sprite (like surrounding
groups, layers, etc.). It simply has to save the context, do its own translations, render and
reset the context state after the rendering.

This method is not required to be called manually - its automatically called by gamekits
[render loop](../article/render-loop).

###centerOrigin():self {.method}
Updates the origin point of the Sprite while preserving its visual position on the screen.
The `originX` and `originY` will be set to half the used asset's width and height, while the `x` and `y`
property of the Sprite is negatively translated by the same value.

###changeOrigin(x, y):self {.method}
Updates the origin point of the Sprite while preserving its visual position on the screen.
The `x` and `y` properties are negatively translated by the same values.

If you don't want `x` and `y` to be affected, change the `originX` and `originY` properties of the
Sprite manually. This is not recommended, since it will make the Sprite "hop" on the screen, since
the rendering of the Sprite is oriented on the origin point.

###tween(properties, duration):gamekit.Promise {.method}
Morph one or more numeric properties of the object during a specified amount of time.

The `properties` parameter must be an object containing the Sprite properties you want to tween,
plus the target values you want to tween to. The values can either be absolute values, or relative
values. To pass a relative value, prepend your value with either `+=`, or `-=`.

`duration` is set in milliseconds.

The returned promise is fulfilled when the tween has finished. This can be used to control your animation
flow. Read more about tweening in the article [about animating sprites](../article/animating-sprites#tweening).

###prepareTween(properties, duration):function {.method}
This prepares a tween, by returning a method that can be called at any time (also repeated) without further
configuration.

###destroy():void {.method}
Will "destroy" the sprite by removing it from the stage before its being updated/rendered in the next frame.

Make sure to remove the sprite from any arrays/objects outside of gamekit's main loop as well to have
it removed from memory by the garbage collector.

If you keep a reference anywhere, you can re-add the sprite to stage at any time.

###pointerEnable(onBoundingBox):void {.method}
Enable this sprite for capturing pointer events.
This adds the method `on()` to the sprite object and will start capturing pointer events.

Set `onBoundingBox` to true to capture touches within the sprites bounding box instead within the pixel-perfect asset content. Default = false

###on(eventName):gamekit.Promise {.method}
Returns a promise for the desired event, that gets resolved whenever the event occurs.

Possible events are: `pointerdown`, `pointerup`, `pointermove`

Read more in the article about [capturing inputs](../article/capturing-inputs).