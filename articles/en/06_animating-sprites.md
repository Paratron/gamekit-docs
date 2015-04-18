conf:{
    "key": "animating-sprites",
    "title": "Animating Sprites"
}:conf

#Animating Sprites
Sprites can be animated in several ways in gamekit. This article shows you different techniques to
achieve property manipulation with fixed durations, continuously or even completely manually.

The article covers:

- [Tweening](#tweening)
- [Continuous movement](#continuous-movement)
- [Manual updates](#manual-updates)



##Tweening {#tweening}
Tweening is a tool that is used for animating (morphing, changing) the properties of an object
over time. I think the term was introduced with Adobe Flash a couple of years ago - at least every
flash developer knows what tweening means. If so, you can happily skip to the next sub-headline.

When you initiate a tween, you tell the object: Hey, your current property value is - lets say - 20.
I want to change it to the value 200 - during the next 20 seconds.

Your object knows that it's being rendered ~60 times per second to the screen. So it can calculate
that it will be drawn 1200 times during the 20 seconds of tween time. On each update, the value
should be slightly shifted towards the destination value, so a smooth animation is created for the
player that looks at the sprite object.

So the sprite calculates the difference between the current value 20 and the target value 200.
That would be 180. That so-called "delta value" is then divided through the number of animation steps,
calculated before: 1200. This gives a value increase of 0,15 per frame.

The rest of the tweening operation is simple addition or subtraction until the target value is reached
after 1200 updates (20 seconds).

###Executing a tween in gamekit
Every Sprite and Group object provide a [tween method](../reference/gamekit-Sprite#method-tween) to enable
you to easily change their properties over time. This is one of the cornerstones of animation in every
game.

Here is an example of how to change the position of a Sprite during a 10 second period:

    mySprite.tween({
        x: 200,
        y: 450
    }, 10000);

This is a so-called absolute tween, because it moves the sprite from wherever it was before to the
given position - and always in the same amount of time. This means, if the sprite is currently located
at 0,0 - it will move 200 pixels horizontally and 450 pixels vertically - so a diagonal distance of
roughly 490 pixels. The duration is set to 10000, so it will move ~50 pixels per second.

If your sprite is located at, say, 1200/2400, the vertical distance is ~2680 pixels, means it will
be moved at a speed of ~270 pixels per second - much faster!

This is because the tween always tries to meet its destination in time.

Gamekit also supports relative tweens, like this:

    mySprite.tween({
        x: '-=200',
        y: '+=450'
    }, 10000);

Giving relative values causes the sprite to take its current value and calculate the destination value
from it. Relative tweens will always have the same "speed", since the difference will alwas be the same.

The `tween()` method returns a Promise, that you can use to check when the tweening is finished.

demo:{
    "target": "en/tween/",
    "notice": "Click the spaceship to tween it relatively to the right",
    "display": [
        "lib/game/main.js"
    ],
    "links": {
        "Sprite source": "http://opengameart.org/content/space-ship-building-bits-volume-1"
    },
    "editable": true
}:demo

###Preparing, queueing and parallelizing tweens
Gamekit offers you a couple of methods that helps you create more complex animations by taking advantage
of the Promises returned by the tween method.

####Prepared tweens
A prepared tween can always be re-used at any time. For example, the tween we created above:

    mySprite.tween({
        x: '-=200',
        y: '+=450'
    }, 10000);

Can be easily turned into a prepared tween:

    var moveTopLeft = mySprite.prepareTween({
        x: '-=200',
        y: '+=450'
    }, 10000);

While the `Sprite.tween()` method directly starts the tween and returns a Promise, the `Sprite.prepareTween()`
method will store the tween settings and return a method to be called later.

When we executed the code above, we will have a function `moveTopLeft()` that we can call any time
to start the tween that has been stored inside.


####Queueing tweens
You can chain tweens so they get executed when the previous tween is finished in several ways.
If you utilize the returned promises, you can chain tweens like so:

    mySprite.tween(
        {
            x: '+=100'
        },
        1000
    )
    .then(mySprite.tween(
        {
            x: '-=100'
        },
        1000
    ));

I find this notation a bit tiresome - especially if you want to chain many tweens together.
Thats why I implemented a couple of helper functions together with the Promises implementation:
`gamekit.chain()`, `gamekit.all()`, `gamekit.parallel()` and `gamekit.wait()`. Read more about
them in the [Promise Reference](../reference/gamekit-Promise#static-methods).

With this helper functions, its easy to describe more complex animations:

    var jump = gamekit.parallel(
        gamekit.chain(
            alien.body.prepareTween({y: '-=100'}, 100),
            alien.body.prepareTween({y: '+=100'}, 100)
        ),
        gamekit.chain(
            alien.shadow.prepareTween({scaleX: 0.3, scaleY: 0.3}, 100),
            alien.shadow.prepareTween({scaleX: 1, scaleY: 1}, 100)
        )
    );

This is taken from a game and describes a jumping animation. It addresses two parts
of the sprite group "alien": the body and the shadow on the ground. Two chains are
executed in parallel - the body is moved up, then down again and in the same time, the
shadow is shrinked, then scaled up again.

Since `gamekit.chain()` and `gamekit.parallel()` both return functions and don't execute
right away, you can prepare complex animations and execute them at a later point with a
single function call, like in our example: `jump()` - that makes the alien jump.

demo:{
    "target": "en/tween-chained/",
    "notice": "Click the spaceship to start a chained tween",
    "display": [
        "lib/game/main.js"
    ],
    "links": {
        "Sprite source": "http://opengameart.org/content/space-ship-building-bits-volume-1"
    },
    "editable": true
}:demo


##Continuous movement {#continuous-movement}
Tweens are not always the best solution for animations in your game. While they suit perfectly
for stuff like the jump example above; letting a character walk or a spaceship fly is exactly the
kind of movement where tweens are rather not usable for.

The sprite class has a functionality built in for such cases, that can be controlled with two
properties on the sprite: `Sprite.direction` and `Sprite.speed`.

The `direction` property controls, well, the direction in which the sprite should move; 0 (default)
goes straight upwards and you can set a angle between 0 and 359 to change the direction clockwise.
It behaves just like the `rotation` property, with the difference that it doesn't affect the visual
presentation.

If you now set `speed` to a positive or negative value, the sprite will be automatically moved in the
 given direction on each new frame for the number of pixels you set on the speed value.

demo:{
     "target": "en/continuous-movement/",
     "display": [
         "lib/game/main.js"
     ],
     "links": {
         "Sprite source": "http://opengameart.org/content/space-ship-building-bits-volume-1"
     },
     "editable": true
}:demo


##Manual updates {#manual-updates}
Each sprite object has a `update()` method that is being called by gamekit on each frame, before
the sprite is rendered.

If you want to perform individual actions that you can't achieve with tweens or continuous movement,
just overwrite the `update()` method with your own function.

    mySprite.update = function(){
        this.rotation++;
    }


demo:{
     "target": "en/manual-update/",
     "display": [
         "lib/game/main.js"
     ],
     "links": {
         "Sprite source": "http://opengameart.org/content/space-ship-building-bits-volume-1"
     },
     "editable": true
}:demo


##Sprite based animation
You can read more about that topic in the [article about spritemaps](spritemaps#animations).

demo:{
    "target": "en/spritemap-loop/",
    "display": [
        "lib/game/main.js"
    ],
    "links": {
        "Sprite source": "http://kenney.nl/"
    },
    "editable": true
}:demo
