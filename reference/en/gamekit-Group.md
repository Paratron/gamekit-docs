conf:{
    "root": "gamekit",
    "title": "gamekit.Group",
    "constructor": true,
    "file": "src/Group.js",
    "key": "gamekit.Group"
}:conf

#gamekit.Group
A group is not visually drawn to the screen, but can contain multiple gamekit.Sprite, or other
group objects. All contained objects are treated relatively to the outer groups position, rotation,
alpha and so on.

Use groups to move and rotate multiple objects at once.

##Properties

###x:Number {.property}
Horizontal position of the group in pixels. Relative to the surrounding element (group or layer).

###y:Number {.property}
Vertical position of the group in pixels. Relative to the surrounding element (group or layer).

###rotation:Number {.property}
Rotation of the group in degrees. The value is circular and capped at 0 and 359. Defaults to 0.
Rotation is done around the x/y position of the group.

###alpha:Number {.property}
Visibility of the group. Set a value between 0 and 1. Default is 1.

###scaleX:Number {.property}
The scale factor is only applied visually. The group will keep its original dimensions in all
 calculations including asset scaling/skewing. The scale factor is only applied visually when rendering
 the group. A value of `1` (default) will let the group appear at 100% of its size. A value of `0.5`
 will make it appear at 50% and so on.

###scaleY:Number {.property}
Counterpart of `scaleX`. Set both properties to the same value to achieve a scaling that preserves the
aspect ratio of the contained elements.

###entities:Array {.property}
Array of entities inside the group. That would be other groups, or sprites (but can be technically any
renderable element, even custom ones).

###debugDrawing:Bool {.property}
If set to `true`, gamekit will draw a box around the groups' borders.

##Methods

###Group():gamekit.Group {.method .constructor}
Creates a new, empty group. You may add elements to the group after it has been created.

    var myGroup = new gamekit.Group();

###update():void {.method}
This method is empty by default. Overwrite it with your own update method.

The update method of each group object is called before the `render()` method is called,
so the group has the chance of reacting to its environment, updating its values or other
stuff on each frame.

###draw(ctx):void {.method}
This method is being called by gamekit on each frame. It passes the [context2D object](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
of the game canvas into the method, so the Sprite has direct access to render itself.

Since the group doesn't render anything itself, it just saves the canvas state, applies its transformation,
rotation and scaling, then iterates over its children and calls their `draw()` methods.

This method is not required to be called manually - its automatically called by gamekits
[render loop](../article/render-loop).

###getBoundaries():Object {.method}
Returns the boundary dimensions of this group. This means the x position of the most left entity, the
y position of the most upper entity and a width and height calculated from the rightmost and bottommost
entities.

Example response:

    {
        x: 12,
        y: 24,
        w: 241,
        h: 412
    }

###attach(element):void {.method}
Adds a new entity to the groups entity collection.
Basically the same as `group.entities.push(element);`.

###changeOrigin(x, y):self {.method}
Update the groups origin position to any point and update the positions of all contained entities so they remain at their current visual position.

###destroy():void {.method}
Will "destroy" the group by removing it from the stage before its being updated/rendered in the next frame.

Make sure to remove the group from any arrays/objects outside of gamekit's main loop as well to have
it removed from memory by the garbage collector.

If you keep a reference anywhere, you can re-add the group to stage at any time.

###tween():gamekit.Tween {.method}
See [gamekit.Sprite.tween()](../reference/gamekit-Sprite#method-tween) and the [tweening section in the article about animation](../article/animating-sprites#tweening).

###prepareTween():function {.method}
See [gamekit.Sprite.prepareTween()](../reference/gamekit-Sprite#method-prepareTween) and the [tweening section in the article about animation](../article/animating-sprites#tweening).