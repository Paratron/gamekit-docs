conf:{
    "key": "capturing-inputs",
    "title": "Capturing Inputs"
}:conf

#Capturing Inputs
Gamekit provides utilities to capture user input by either the keyboard or any pointer device (mouse, touch, etc.).

The "classic" approach of mouse events and touch events is abstracted away in gamekit. Gamekit simply uses pointer events
and unifies them all. You don't have to care if your game is running on a mobile device which uses touch input or a desktop
device with mouse input. You just work with pointer events everywhere.

##Keyboard events
You can use the promise based approach to react to key presses and releases:

    gamekit.onKey('right').then(keyDownMethod, keyUpMethod);
    
This line of code will call the method `keyDownMethod()` upon every press of the right arrow key and call
 the method `keyUpMethod()` upon each release of the key.
 
Aditionally, if you just want to passively check if a given key is pressed, just call `gamekit.isPressed(keyname)`, which
will return either `true`, or `false`.
For using the passive method, you have to enable gamekits keyboard capturing first, by calling `gamekit.initializeKeyboard()`.
This is not necessary when using the `gamekit.onKey()` method, which initializes the keyboard capturing automatically.

##Pointer events
As mentioned above, you don't have to care if the current device uses mouse or touch or pen events. Gamekit will use
pointer events internally.

When you have included the input package into your gamekit build, gamekit will provide you with two ways of capturing
pointer input:

###Pointer Areas
A pointer area is an invisible object you can create and place on any layer or inside any [group](../reference/gamekit-Group).
It doesnt matter where the area is placed, scaled or rotated - gamekit will capture pointer events on it and trigger
the according events.

Here is an example:

    var myInputArea = new gamekit.PointerArea();
    myInputArea.x = 100;
    myInputArea.y = 1;
    myInputArea.w = 100; //By default, the width and height is set to the full canvas dimensions.
    myInputArea.h = 100;
    myInputArea.rotation = 30;
    
    myInputArea
        .on('pointerdown')
        .then(function(){
            //Do something
        });
        
A live version of the example:

demo:{
    "target": "en/pointerarea/",
    "display": [
        "lib/game/main.js"
    ],
    "editable": true
}:demo

Of course, you can also set a `update()` method on a pointer area to animate it.
        
####Possible Pointer events
Possible events to listen for on a pointer area are: `pointerdown`, `pointerup`, and `pointermove`.

####Accessing pointers
You can access all pointers that are currently active via the `gamekit.pointers` array. On a desktop device, using
a mouse there will always be only one pointer available that is stored in the first index of the array `gamekit.pointers[0]`.
On other devices - especially multi touch devices - the array can get different lengths.

All pointers are simply point objects with a `x` and `y` property.


###Pointer events on sprites
To make capturing pointer events on sprites easier (you don't have to create a separate pointer area for them), the input package
will add a new method to the [Sprite object](../reference/gamekit-Sprite): `Sprite.pointerEnable(onBoundingBox)`.

After you called this method on a sprite, it will trigger pointer events that can be captured via `Sprite.on(pointerEvent)` with
the familiar promise based approach.

By default, the capturing will be pixel perfect - that means if you use an asset with transparent areas clicks and taps on 
the transparent areas of the sprite will NOT trigger a pointer event.    
If you prefer to capture pointer events on the whole bounding box of a sprite, call the pointer enable with passing `true`
as first parameter.

demo:{
    "target": "en/spritepointer/",
    "display": [
        "lib/game/main.js"
    ],
    "links": {
        "Sprite source": "http://kenney.nl/"
    },
    "notice": "Click on the sprite image to trigger a message.",
    "editable": true
}:demo