conf:{
    "key": "particles",
    "title": "Particles"
}:conf

#Particles
The particle system of gamekit is very very simple. It brings you an Emitter object that can be placed somewhere on your
layers to emit sprite particles. The Emitter is coded in a way that particle objects are recycled rather than created and
destroyed all the time, which makes the system much faster.

demo:{
    "target": "en/particle-fire/",
    "display": [
        "lib/game/main.js"
    ],
    "links": {
        "Campfire sprite source": "http://opengameart.org/content/camp-fire-animation-for-rpgs-finished"
    },
    "editable": true
}:demo
_A simple campfire with sparks created by a particle emitter._

##Configuring the particle emitter
The particle emitter has a couple of properties you can pass to the constructor. All the properties affect the behaviour
of the generated particles. Their movement behaviour and life time.

    var myEmitter = new gamekit.Emitter({
        x: 64,
        y: 100,
        w: 32,
        h: 32,
        
        assets: ['particle1', 'particle2', 'particle3', 'particle4'],
        scale: [0.1, 0.2],
        scaleChange: [-0.0005, -0.003],
        scaleTarget: 0,
        direction: [10, 40],
        directionChange: [0.5, 1],
        directionTarget: [40, 60],
        speed: [0.5, 1],
        number: 100,
        life: 90,
        alpha: [0.2, 0.6],
        spawnTime: 12000,
        fadeInValue: 0.05,
        fadeOutValue: 0.01
    });

Wow, thats a lot of configuration... Lets sort this stuff out :)

The first four properties x, y, w and h define the dimensions of the emitter. You can as well define a rotation for the emitter.

The remaining properties define rules for the to-be-constructed particles.

##The assets
The `assets` array defines, which assets should be picked for the generated particles.
Either pass strings with the names of previously loaded assets, or pass directly references if you want to use assets from
a spritemap or sprite atlas for example. The Particles will get assigned one of the listed assets randomly. If you want some
assets to appear more, simply list them multiple times.

##Particle dimensions, appearance and acceleration
You can define four properties that will affect your particles upon creation: `scale` will affect the particle size, `direction`
sets the direction in which the particles should be moved. Direction is measured in degrees where 0 goes upwards and rotates
clockwise. Define a `speed` value to move your particles into the given direction. Define an `alpha` property to set the 
particles transparency.

For all those four properties, you can either set a simple numeric value - this means all your particles will get the same
value all the time. Or you can set an array and gamekit will assign a random value in the given range upon each particle
creation. For example `alpha: [0.1, 0.7]` will create all particles with a random alpha value between 0.1 and 0.7.

##Influence particle properties over time
Gamekit can take care about manipulating the particle properties over time. For all of the properties mentioned above there
is a `...Change` property that can be defined to tell gamekit how it should change the given properties with each render step.
There are the properties `scaleChange`, `directionChange`, `speedChange` and `alphaChange` that all either take a simple number,
or an array to process a random value. The random value is assigned ONCE upon particle creation and won't change during the
lifetime of the particle. This means the change rate won't vary and remains constant during the particle lifetime. Your change
parameters can be both positive and negative numbers.

##Set limits for the property changes
To limit the changes on your particles properties, define `target...` properties, that define a value that should not be surpassed
when increasing or decreasing the properties of your particles. For example, when you have defined `speed: 1` and `speedChange: 0.1`,
your particle speed will be increased constantly after the particle creation. To cap your speed and define a value where it should
not be increased anymore, define for example `targetSpeed: 10` and the particle speed won't be increased any more.

Available target properties are `targetScale`, `targetDirection`, `targetSpeed` and `targetAlpha` that can be - as usual - a numeric
value, or an array of two numeric values.

##The birth and death of a particle
If you want your particles to not just pop on and off the screen on birth and death, you can define a `fadeInValue` and `fadeOutValue`.
Thats a value that will be added to your alpha after birth  to reach the defined `alpha` value and subtracted after death to reach 0.
If you do not define the fade in/out values, the alpha will be set to your defined value or 1 immediately after birth and will be set
to 0 immediately after death.

Each particle has life points. If they reach 0, the particle dies and will be taken from the screen. If you don't define a `life`
property on the emitter, it will default to 100. A particle loses one life point per rendered frame.

If you want particles to re-appear on screen after they die, define a `rebirth` property in the emitter constructor with a value
between 0 and 1, giving the chance of a rebirth after death. Every particle will be redefined before they are reborn.

The `number` property defines how many particles the emitter will create - if you set the `rebirth` rate to 0, the emitter will
spit out only one batch of particles and then end doing nothing. You can re-emit the particles by calling `emitter.emit()`. With
a rebirth rate of 1, the particles will never die out and will constantly be reborn after death.

The `spawnTime` property defines the time window in which the first generation of particles will be born in milliseconds.
 f you want all your particles to emerge at the same time, set a spawn time of 1. Increase it as you wish to distribute
  your particles more softly.
  
##Custom updates
In case the internal mechanics of the particle system aren't enough for your needs, you can still rely on a custom mechanic
for your particle system. Pass a function to the `particleUpdate` property of the emitter constructor. It will be called upon
each particles update cycle with `this` inside the function pointing to the particle sprite.