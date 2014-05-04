conf:{
    "root": "gamekit",
    "title": "gamekit",
    "constructor": false,
    "file": "src/Core.js",
    "key": "gamekit"
}:conf

#gamekit
The gamekit object is created when the library is loaded. It contains nearly all methods
that the different parts of the engine provide, since they internally share their scope
and the access to "hot path" variables.

##Properties

###a:Object {.property}
Namespace object for all loaded assets.

###assetFolder:String {.property}
Default asset folder to load assets from. Defaults to `lib/assets/`.


###layer:array {.property}
Array of layer objects. The engines render loop iterates over this array and renders everything
inside it.

###camera:Object {.property}
The "camera" is a object with a `x` and `y` property and defines an offset for *everything*.
Use this if you want to move the viewport around without having to update all visual elements.

Default:

    {
        x: 0,
        y: 0
    }

###pointers:array {.property}
Array of currently active pointer (mouse, touch, pen) inputs.

###randomSeed:Number {.property}
This is the seed for the included random number generator. The seed is set to a random
value between 1 and 100000 on each load of the framework.

If you want to retrieve the same set of random numbers again, set randomSeed to the same number.


##Methods

###getLastRuntime():Number {.method}
Returns the last tick time of the engine (the timestamp emitted by [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame)).

###useCanvas(domElement):self {.method}
Use this method to manually assign a canvas element to gamekit. Isn't necessary normally,
since gamekit automatically attaches itself to the first canvas element found on the page.

###start():self {.method}
Starts the render loop. Call this after your assets have been loaded and your scenes
are set up.

###stop():self {.method}
Stops the render loop, so stops the whole engine from updating and rendering.

###width([newWidth]):Number {.method}
Returns and/or sets the width of the canvas. Omit the parameter to just fetch the width.

###height([newHeight]):Number {.method}
Returns and/or sets the height of the canvas. Omit the parameter to just fetch the height.

###addTween(tween):void {.method}
Adds a tween object to the global tween stack. This method is normally only called
automatically by Sprites and Groups, when you call `Sprite.tween()`, or `Group.tween()`.

###setOnBeforeFrame(function):self {.method}
Set a function to be called before each frame is being rendered. Read more in the
[render loop article](../article/render-loop#manipulate).

###setOnAfterFrame(function):self {.method}
Set a function to be called after each frame has been rendered. Read more in the
[render loop article](../article/render-loop#manipulate).

###clearCanvas([x], [y], [w], [h]):self {.method}
Define a area to be cleared on every frame. If all parameters are omitted, the whole
canvas is cleared on every frame.

###getCanvas():CanvasElement {.method}
Returns a reference to the currently used Canvas DOM element.

###getCTX():CanvasRenderingContext2D {.method}
Returns a reference to the canvas context object.

###getJSON(url):gamekit.Promise {.method}
Loads a JSON file from the given URL and parses it. Returns a promise that will be resolved
with the JSON result as first parameter.

###fetchAssets(assetNames):gamekit.Promise {.method}
Loads one or more assets into the global asset namespace. Read more about this function and
asset loading in general in the article about [Loading Assets](../article/loading-assets).

###limitCalls(function, timeSpacing):function {.method}
Limits the given function and only allows calls to it after the defined waiting time has passed.
All calls in between are being dropped.

###clone(obj):Object {.method}
Attempts to clone an object.

###random():Number {.method}
Returns a random number between 0 and 1. The random number is seeded, means the random
numbers returned from `random()` will always be the same for a given seed. Set the
`gamekit.randomSeed` property for that purpose to any integer.

###randomInRange(min, max):Number {.method}
Returns a float number between min and max, based on `gamekit.random()`.

###extend(obj, [obj, ...]):Object {.method}
Extend a given object with all the properties of the other passed-in objects.

###keyDown(keyName):gamekit.Promise {.method}
Returns a promise that is resolved every time the given key is pressed. Pass in the
_name_ of the key, instead of its keycode. Find a list of supported keycodes, view
the source of [Input.js](https://github.com/Paratron/gamekit/blob/master/src/Input.js#L7).
