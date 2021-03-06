conf:{
    "key": "renderloop",
    "title": "The Render Loop"
}:conf

The Render Loop
===============

Gamekit implements its own render loop using [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame), when possible. If the
browser doesn't support RAF, [a fallback](https://gist.github.com/paulirish/1579671) is used, trying to render at ~60FPS using a Javascript
timer.


Gamekit uses instances of `gamekit.Core` to render to a canvas element. If you only have
one canvas element you want to render to, you don't have to make any efforts. Upon pageload
gamekit automatically fetches the first canvas element on the page and connects itself to it.
This makes it easier for you to setup your game.

Gamekit also doesn't require you to retrieve the default instance of the `gamekit.Core` element
and juggle around with it to access your canvas. The default instance is directly mapped onto
the root namespace `gamekit`. If you want to render to additional canvases in your document,
please create additional instances of `gamekit.Core` manually. Read more about using multiple canvas tags [below](#multiple-canvas).

For beginners, the only important method of the core is `gamekit.start()` which makes the engine rendering
your contents.


Inside the render loop
----------------------

On every frame to be rendered, the render loop first clears the canvas (if enabled through
`gamekit.clearCanvas()`), then calls the `onBeforeFrame()` hook (see below).

After that, gamekit iterates over all active tweens and updates them.

When all tweens have been updated, the render loop begins to iterate across the layer
stack. In each layer, all renderable objects are iterated and first updated (calling their
`Sprite.update()` method) and rendered (with `Sprite.render()`).

After everything has been rendered, gamekit calls the `onAfterFrame()` hook, if applied.


Manipulate the rendering {#manipulate}
------------------------
Its possible to inject custom routines before and after each frame is rendered. You can
define the methods like so:

    gamekit.setOnBeforeFrame(function(ctx){
        //...
    });

    gamekit.setOnAfterFrame(function(ctx){
        //...
    });

The `gamekit.setOnBeforeFrame()` and `gamekit.setOnAfterFrame()` methods expect a function as
first parameter. The given function is called on each frame that is being rendered by the main loop.

To have easier access to the canvas, the context2D object is passed into the hook functions as
first parameter.


Using multiple canvas tags on one page {#multiple-canvas}
--------------------------------------
Like mentioned above, its possible to utilize multiple canvas tags on your webpage and create separate
gamekit instances for each of those canvases. This is especially useful if you want to decorate a website
with canvas effects on several positions.

To render to a specific canvas element, you can do this:

    var core2;

    core2 = new gamekit.Core();
    core2.useCanvas('#my2ndcanvas');
    core2.clearCanvas();
    core2.createLayer();

You can otherwise use gamekit as usual, that means you still use `new gamekit.Sprite()` to create sprites or
`new gamekit.Group()` for groups and so on. Just make sure that you add your created elements to the separate
core instead of the main gamekit object:

    var myNewSprite;

    myNewSprite = new gamekit.Sprite(gamekit.a.player);

    core2.layer[0].attach(myNewSprite);

And of course, you can/have to start and stop the new core separately:

    core2.start();