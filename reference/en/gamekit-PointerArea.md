conf:{
    "root": "gamekit",
    "title": "gamekit.PointerArea",
    "constructor": true,
    "file": "src/Input.js",
    "key": "gamekit.PointerArea"
}:conf

#gamekit.PointerArea
The pointer area is an invisible object to be added to a layer or entity group.
When on stage, it captures clicks/taps that are made inside the specified area.

PointerAreas have a `draw()` method so they can be added to layers and groups
without causing the engine to crash. The draw method doesn't render anything until
you set `debugDrawing` to true.

You don't need to create a custom PointerArea to observe pointer events on sprites.
Simply call the Sprites' `pointerEnable()` method. Read more in the article about
[capturing inputs](../article/capturing-inputs).

##Properties

###x:Number {.property}
Horizontal position of the PointerArea in pixels.

###y:Number {.property}
Vertical position of the PointerArea in pixels.

###w:Number {.property}
Width of the PointerArea in pixels.

###h:Number {.property}
Height of the PointerArea in pixels.

###originX:Number {.property}
Look at the [Sprite's reference](../reference/gamekit-Sprite#property-originX) for more details.

###originY:Number {.property}
Look at the [Sprite's reference](../reference/gamekit-Sprite#property-originX) for more details.

###rotation:Number {.property}
Rotate the PointerArea around the origin point for the given angle in degrees. The property behaves
circular and is capped between 0 and 359.

###scaleX:Number {.property}


###scaleY:Number {.property}

###debugDrawing:Bool {.property}

###disabled:Bool {.property}

##Methods

###PointerArea():gamekit.PointerArea {.method .constructor}

###draw(ctx):void {.method}

###shadowDraw(x, y, eventname):void {.method}

###on(eventName):gamekit.Promise {.method}

