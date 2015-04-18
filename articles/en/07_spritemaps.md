conf:{
    "key": "spritemaps",
    "title": "Spritemaps"
}:conf

#Spritemaps

Spritemaps are used in games since the days of where it was absolutely necessary to use them due to limited system memory.
Today they are also popular because you save a lot of traffic, loading your game assets combined instead of single images.
And it also speeds up your game loading time and gives you nice abilities to animate your sprites easily.

![A spritemap](../../docs/assets/spritemap.png)    
_A spritemap for an animation by [kenney](http://kenney.nl/)._

You can load spritemaps either directly over the [asset loader](loading-assets#spritemaps-and-atlases), or turn loaded 
 image assets into spritemaps on your own, in case you need more control.

The short-hand loading method used by the asset loader does not support the specification of a global offset and spacing
between the sprites. If your spritemap uses those, you have to initialize it on your own.

Lets assume you have loaded a image file with the asset loader and want to turn it into a spritemap, just do this:

    //Our image asset is loaded as "player".
    gamekit.a.player = new gamekit.SpriteMap({
        image: gamekit.a.player,
        tileW: 32,
        tileH: 32,
        offsX: 0,
        offsY: 50,
        spacingX: 1,
        spacingY: 1
    });
    
This replaces the image asset "player" with a spritemap generated from the image. The tilesize is 32x32px, the spritemap
uses a spacing of 50px to the top (maybe has a copyright header) and has a spacing of 1px between the separate sprites.


##Using spritemaps
Accessing the sprites inside a spritemap is easy. You can access them by index, starting at the upper left corner of the 
spritemap, then counting to the right and down. Accessing the sprites inside a spritemap works like accessing elements
inside an array: `gamekit.a.player[2]` is the sprite at index `2`.

You can create [Sprite objects](sprites-layers-and-groups) with a spritemap reference instead of a complete image asset:

    var myPlayer = new gamekit.Sprite(gamekit.a.player[2]);
    
However, this would initialize the Sprite object with only the single given sprite index, like a still image. This is fine
if you do not wish to animate anything and maybe want to render your inventory and have all item images combined into one
spritemap, but when you want to use sprite based animations, I'd suggest passing the complete spritemap object to the Sprite
controller:
 
    var myPlayer = new gamekit.Sprite(gamekit.a.player);
    
This approach enables you to do a couple of things:

- Change the spritemap index of the sprite at any time
- Utilize spritemap based animations

By default, a Sprite, initialized with a spritemap object uses frame 0 to be rendered. However, you an always change the `Sprite._spritemapIndex`
property to make it render a different sprite of the spritemap.

##Spritemap animations {#animations}
You can define animations on a spritemap that can be played back by a sprite to create nice, natural animations on your game sprites.

Animations on spritemaps are defined as following:

    gamekit.a.player.createAnimation({
        key: 'walk',
        from: 0,
        to: 10,
        fps: 25,
        loop: true
    });
    
This defines a new animation on the spritemap and tells gamekit that it utilizes the indexes 0 to 10, should be played back at 25fps and looped
infinitely, if not stopped anyhow.

You may be asking yourself why you have to define a framerate for the animation.    
Canvas based games normally run at about 60fps. This means, that to get one second of frame/sprite based animation, you need to have 60 images inside
your spritemap for that one animation. Thats way too much. The human eye cannot distinct between separate images of an animation at a framerate of about
25 to 30 frames per second. The movies you watch on your TV or computer also have a framerate of about 25fps. Thats perfectly fine and reduces the needed
images of one second of animation from 60 to 25. Flash animations; in the older days; even sometimes used only framerates of about 12fps and still looked pretty
good.

I suggest you to play a bit around with your animation framerates. If you do not specify a fps value for your animation, gamekit will use the default value 
defined at `gamekit.SpriteMap.defaultFPS`, which is initially set to 25.

___Note___: gamekit automatically manages the speed of your animations, even if your actual game framerate varies. As long as your game framerate is equal or faster than
the framerate your animation uses, the animation speed will remain the same for the player, so it doesn't matter if the game runs with 60, 50 or 40fps.


##Playing animations on a sprite object
Now that we have defined a sample animation on our spritemap, we can use it very very simply on a sprite:

    myPlayer.setAnimation('walk');
    
Easy, isn't it? Keep in mind that this will only work if we assigned the whole spritemap object to the player sprite and defined
the animation on the spritemap.

Since the `loop = true` property is set on the animation, it will run forever, until we call `setAnimation()` with a different animation key.

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


##Not-infinite animations
Here is a little gotcha that you can use for animations with a definitive end (not looped): If you start an animation that is not looped,
the `setAnimation()` method of your sprite object will return a promise that will be fulfilled when the animation has finished playing.

So this makes it very easy to chain animations together:

    //...
    //first, some code that detects that a jump has been finished
    //then this:
    myPlayer
        .setAnimation('landAndRoll')
        .then(function(){
            if(myPlayer.moving){
                myPlayer.setAnimation('walk');   
            } else {
                myPlayer.setAnimation('idle');
            }
        });

In this case, we let our player character do a nice roll off when he lands on the ground, then we decide what to do next.
Is the player currently moving? Then switch to the walk animation immediately. Otherwise, we play the idle (standing) animation.