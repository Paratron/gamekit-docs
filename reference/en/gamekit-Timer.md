conf:{
    "root": "gamekit",
    "title": "gamekit.Timer",
    "constructor": true,
    "file": "src/Helpers.js",
    "key": "gamekit.Timer"
}:conf

#gamekit.Timer
A gamekit timer object is like a cross-breed between JavaScript Interval and a gamekit.Promise.

Use it to be able to pass the interval object around and start and stop it at any time. The
gamekit.Timer also doesn't use a JavaScript Interval but is tied to requestAnimationFrame, so
it will be paused when the engine is stopped by `gamekit.stop()` or requestAnimationFrame isn't
firing anymore because the user has moved to another tab.

##Properties

###interval:Number {.property}
The number of milliseconds the timers interval should take. Alter it any time if you want to.

##Methods
The gamekit.Timer implements all methods from [gamekit.Promise](../reference/gamekit-Promise).

###Timer(interval):gamekit.Timer {.method}
Creates a timer object that also acts as a promise. It will be resolved every time interval has passed.

The interval is given in milliseconds.

    var myTimer = new gamekit.Timer(1000);

    myTimer.then(function(){
        console.log('tick');
    });

###disable():self {.method}
Pauses the timer. Can be re-started at any time again.

###enable():self {.method}
Starts the timer. Is being called immediately upon object creation.