    var gameRunning,
        lastRunTime;

    /**
     * This starts the main loop.
     */
    gamekit.start = function (){
        gameRunning = true;
        window.requestAnimationFrame(mainLoop);
    };

    /**
     * This breaks the main loop.
     */
    gamekit.stop = function (){
        gameRunning = false;
    };

    gamekit.width = function (){
        return canvas.width;
    };

    gamekit.height = function (){
        return canvas.height;
    };

    /**
     * Called, before each rendered frame.
     * Can be overwritten with custom functions.
     * @param {CanvasContext2D} ctx
     */
    gamekit.onBeforeFrame = function (){
    };

    /**
     * Called, after each rendered frame.
     * Can be overwritten with custom functions.
     * @param {CanvasContext2D} ctx
     */
    gamekit.onAfterFrame = function (){
    };


    var clearX,
        clearY,
        clearW,
        clearH;
    /**
     * Define a area to be cleared on every frame.
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [w=gamekit.width()]
     * @param {Number} [h=gamekit.height()]
     * @return gamekit
     */
    gamekit.clearCanvas = function (x, y, w, h){
        clearX = x || 0;
        clearY = y || 0;
        clearW = w || gamekit.width();
        clearH = h || gamekit.height();
        return this;
    };

    gamekit.fps = 0;

    function mainLoop(runTime){
        var i,
            j,
            e,
            l,
            layerLen,
            entityLen;

        if(!gameRunning){
            return;
        }

        gamekit.fps++;
        if(runTime % 1000 === 0){
            gamekit.fps = 0;
        }

        window.requestAnimationFrame(mainLoop);

        //Update the last run time for the tween processing.
        lastRunTime = runTime;

        gamekit.onBeforeFrame(ctx);

        if(clearW || clearH){
            ctx.clearRect(clearX, clearY, clearW, clearH);
        }

        //Lets update all tweens, first.
        for (i = tweenQueue.length; i--;) {
            j = tweenQueue[i];
            if(j.finished){
                tweenQueue.splice(i, 1);
                continue;
            }

            j.update(runTime);
        }

        layerLen = gamekit.layer.length - 1;
        for (i = layerLen + 1; i--;) {
            l = gamekit.layer[layerLen - i];
            if(!l.visible || !l.alpha){
                continue;
            }

            entityLen = l.entities.length - 1;
            for (j = entityLen + 1; j--;) {
                e = l.entities[entityLen - j];

                if(e.alpha < 0){
                    e.alpha = 0;
                }

                if(e._destroy){
                    l.entities.splice(entityLen - j, 1);
                    entityLen--;
                    continue;
                }

                ctx.globalAlpha = e.alpha * l.alpha;

                e.update();
                e.draw(ctx);
            }
        }

        gamekit.onAfterFrame(ctx);
    }