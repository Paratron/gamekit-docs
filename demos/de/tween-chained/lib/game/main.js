/**
 * Das main Modul.
 * Du kannst im Artikel "Module" mehr über Module erfahren.
 */
gamekit.defineModule('main', function(){

    /**
     * Standardablauf der Initialisierung. Resourcen laden,
     * alles einrichten, dann die Engine starten.
     */
    gamekit
        .fetchAssets('ship.png')
        .then(gameSetup)
        .then(gamekit.start);

    /**
     * Diese Methode richtet unser Spiel ein. Sie erzeugt einen
     * Layer und platziert unseren Sprite darauf.
     */
    function gameSetup(){
        var mySprite,
            myTimer;

        //Unsere Canvas wird nur ein Element enthalten.
        //Es würde seltsam aussehen, wenn wir die Canvas nicht bei jedem
        //Frame leeren würden.
        gamekit.clearCanvas();

        //Wir brauchen einee Ebene auf der wir unseren Sprite platzieren können.
        gamekit.createLayer();

        //Hier erzeugen wir den neuen Sprite und weisen ihm unser
        //zuvor geladenes Bild zu.
        mySprite = new gamekit.Sprite(gamekit.a.ship);

        //Lass uns den Sprite noch an eine etwas schönere Position schieben.
        mySprite.x = 50;
        mySprite.y = 50;

        //Jetzt fügen wir den Sprite unserer erzeugten Ebene hinzu.
        gamekit.layer[0].attach(mySprite);

        //Unseren verrückten Bewegungstween vorbereiten!
        crazyMove = gamekit.chain(
            mySprite.prepareTween({x: 400}, 1000),
            gamekit.parallel(
                mySprite.prepareTween({y: 100}, 200),
                mySprite.prepareTween({scaleX: 0.5, scaleY: 0.5}, 200)
            ),
            mySprite.prepareTween({x: 200, y: 200}, 500),
            gamekit.parallel(
                mySprite.prepareTween({x: 50, y: 50}, 1000),
                mySprite.prepareTween({scaleX: 1, scaleY: 1}, 1000)
            )
        );

        //Pointer Events auf dem Sprite aktivieren (nicht pixelgenau)
        mySprite.pointerEnable(true);

        //Auf Pointer-down Events reagieren
        mySprite.on('pointerdown').then(crazyMove);

    }
});