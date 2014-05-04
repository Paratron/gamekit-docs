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
        .fetchAssets('mySpriteImage.png')
        .then(gameSetup)
        .then(gamekit.start);

    /**
     * Diese Methode richtet unser Spiel ein. Sie erzeugt einen
     * Layer und platziert unseren Sprite darauf.
     */
    function gameSetup(){
        var mySprite;

        //Unsere Canvas wird nur ein Element enthalten.
        //Es würde seltsam aussehen, wenn wir die Canvas nicht bei jedem
        //Frame leeren würden.
        gamekit.clearCanvas();

        //Wir brauchen einee Ebene auf der wir unseren Sprite platzieren können.
        gamekit.createLayer();

        //Hier erzeugen wir den neuen Sprite und weisen ihm unser
        //zuvor geladenes Bild zu.
        mySprite = new gamekit.Sprite(gamekit.a.mySpriteImage);

        //Lass uns den Sprite noch an eine etwas schönere Position schieben.
        mySprite.x = 50;
        mySprite.y = 50;

        //Jetzt fügen wir den Sprite unserer erzeugten Ebene hinzu.
        gamekit.layer[0].attach(mySprite);
    }
});