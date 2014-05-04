conf:{
    "key": "animating-sprites",
    "title": "Sprites animieren"
}:conf

#Sprites animieren
Sprites können in Gamekit auf mehrere Arten animiert werden. Dieser Artikel zeigt dir die verschiedenen
Techniken mit denen Objekteigenschaften in festen Zeitrahmen, dauerhaft oder sogar komplett manuell
manipuliert werden können.

Dieser Artikel umfasst:

- [Tweening](#tweening)
- [Dauerhafte Bewegung](#dauerhafte-bewegung)
- [Manuelle Updates](#manuelle-updates)



##Tweening {#tweening}
Tweening ist ein Werkzeug mit dem man die Eigenschaften eines Objekts über einen festgelegten Zeitraum
hinweg Animieren (Morphen, Verändern) kann. Ich glaube der Begriff wurde vor ein paar Jahren mit Adobe
Flash eingeführt - jedenfalls weiß jeder Flash Entwickler, was Tweening bedeutet. Wenn du auch schon
bescheid weisst, kannst du gerne bei der nächsten Überschrift weiterlesen.

Wenn du einen Tween einleitest, sagst du einem Objekt: Hey, deine momentane Eigenschaft steht bei, sagen
wir mal 20. Ich möchte den Wert innerhalb der nächsten 20 Sekunden auf 200 verändern.

Dein Objekt weiß, dass es etwa 60 mal pro Sekunde auf den Bildschirm gezeichnet wird. Also kann es
berechnen, dass dies 1200 mal, während der nächsten 20 Sekunden Tween-Zeit geschieht. Bei jedem Update
sollte der Wert ganz sachte in Richtung des Zielwerts verändert werden, damit für den Spieler, welcher
auf das Sprite Objekt schaut, der Eindruck einer flüssigen Animation entsteht.

Also kalkuliert der Sprite die Differenz zwischen dem momentanen Wert 20 und dem Zielwert 200. Das
wäre dann 180. Dieser sogenannte Deltawert wird dann durch die Anzahl der Animationsschritte geteilt,
die wir schon vorher berechnet haben: 1200. Dies ergibt eine Erhöhung des Werts von 0,15 pro Frame.

Der Rest der Tweeningoperation ist einfache Addition oder Subtraktion, bis der Zielwert nach 1200
Updates (20 Sekunden) erreicht ist.

###Einen Tween in Gamekit ausführen
Jedes Sprite und Group Objekt verfügt über eine [tween Methode](../reference/gamekit-Sprite#method-tween),
welche dir die einfache Möglichkeit gibt die Eigenschaften über einen festgelegten Zeitraum hinweg zu verändern.
Dies ist einer der Ecksteine der Animation in jedem Spiel

Hier ein Beispiel, wie man die Position eines Sprites über einen Zeitraum von 10 Sekunden hinweg anpassen kann:

    mySprite.tween({
        x: 200,
        y: 450
    }, 10000);

Dies ist ein sogenannter absoluter Tween, denn er bewegt den Sprite von woher auch immer er vorher war, zur
angegebenen Position - und immer mit der gleichen Dauer. Dies bedeutet, dass wenn dein Sprite gerade bei 0,0 steht
wird er 200 Pixel horizontal und 450 Pixel vertikal bewegt - also eine diagonale Distanz von ca. 490 Pixeln.
Die Dauer ist auf 10000 gesetzt, also bewegt er sich mit ca. 50 Pixeln pro Sekunde.

Wenn dein Sprite jetzt aber bei sagen wir mal 1200/2400 steht, beträgt die vertikale Distanz etwa 2680 Pixel,
was bedeutet das der Sprite sich mit einer Geschwindigkeit von ca. 270 Pixeln pro Sekunde bewegt - also viel
schneller!

Dies liegt daran, dass ein Tween immer versucht seine Zielwerte innerhalb der angebenen Zeit zu erreichen.

Gamekit unterstützt auch relative Tweens wie diesen hier:

    mySprite.tween({
        x: '-=200',
        y: '+=450'
    }, 10000);

Die Angabe von relativen Werten bewirkt, dass der Sprite seine momentanen Werte nimmt und die Zielwerte daraus
berechnet. Relative Tweens werden immer die selbe "Geschwindigkeit" haben, da die Differenz jedes mal die Gleiche
ist.

Die `tween()` methode gibt ein Promise zurück, über welches du prüfen kannst ob dein Tweening abgeschlossen ist.

demo:{
    "target": "de/tween/",
    "notice": "Klicke auf das Raumschiff um es relativ nach Rechts zu tweenen.",
    "display": [
        "lib/game/main.js"
    ],
    "links": {
        "Grafikquelle": "http://opengameart.org/content/space-ship-building-bits-volume-1"
    },
    "editable": true
}:demo

###Tweens vorbereiten, aneinanderreihen und parellelisieren
Gamekit bietet dir eine Reihe von Methoden, welche dir dabei helfen sollen komplexere Animationen zu
erzeugen, indem du Vorteil aus den Promises ziehst, welche von der Tween Methode zurückgegeben werden.

####Tweens vorbereiten
Ein vorbereiteter Tween kann jederzeit wiederverwendet werden. Zum Beispiel der Tween den wir weiter oben
erzeugt haben:

    mySprite.tween({
        x: '-=200',
        y: '+=450'
    }, 10000);

Kann sehr einfach in einen vorbereiteten Tween umgewandelt werden:

    var moveTopLeft = mySprite.prepareTween({
        x: '-=200',
        y: '+=450'
    }, 10000);

Während die `Sprite.tween()` Methode direkt mit dem Tweening beginnt und ein Promise zurückgibt, speichert
die `Sprite.prepareTween()` Methode die Tween Einstellungen und gibt eine Funktion zurück, welche später
aufgerufen werden kann.

Wenn wir den Code von Oben ausführen, erhalten wir eine Funktion `moveTopLeft()`, welche wir jederzeit
aufrufen können um den Tween der darin gespeichert wurde auszuführen.


####Tweens aneinanderreihen
Du kannst Tweens auf verschiedene Artverketten, damit sie jeweils ausgeführt werden, wenn der vorherige
Tween abgeschlossen wurde.
Wenn du dazu die zurückgegebenen Promises verwendest, kannst du Tweens folendermaßen verketten:

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

Ich finde diese Schreibweise ein wenig umständlich - besonders wenn du viele Tweens miteinander verketten
möchtest. Deshalb habe ich eine Reihe Hilfsfunktionen zusammen mit der Promises Implementation erzeugt:
`gamekit.chain()`, `gamekit.all()`, `gamekit.parallel()` und `gamekit.wait()`. Du kannst mehr darüber in
 der [Promise Referenz](../reference/gamekit-Promise#static-methods) lesen.

Mit diesen Helperfunktionen ist es leicht, eine komplexe Animation zu beschreiben:

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

Dies ist aus einem Spiel entnommen und beschreibt eine Sprung-Animation. Sie behandelt zwei Teile
einer Sprite-Gruppe namens "alien": Den Körper und den Schatten am Boden. Zwei Ketten werden parallel ausgeführt -
der Körper wird erst nach Oben, dann wieder hinab bewegt und gleichzeitig wird der Schatten verkleinert, dann
wieder vergrößert.

Da `gamekit.chain()` und `gamekit.parallel()` beide Funktionen zurückgeben und nicht direkt ausgeführt werden,
kannst du komplexe Animationen vorbereiten und zu einem späteren Zeitpunkt mit einem simplen Funktionsaufruf ausführen,
wie in unserem Beispiel von Oben: `jump()` - lässt den Alien springen.

demo:{
    "target": "de/tween-chained/",
    "notice": "Klicke auf das Raumschiff, um einen verketteten Tween zu starten",
    "display": [
        "lib/game/main.js"
    ],
    "links": {
        "Grafikquelle": "http://opengameart.org/content/space-ship-building-bits-volume-1"
    },
    "editable": true
}:demo


##Dauerhafte Bewegung {#dauerhafte-bewegung}
Tweens sind nicht immer die beste Lösung für Animationen in deinem Spiel. Während sie sich perfekt für
Sachen wie unsere Sprung-Animation von oben eignen sind Dinge wie der Flug eines Raumschiffs, oder der Gang
eines Charakters exakt die Art von Bewegung, für welche Tweens eher nicht geeignet sind.

Die Sprite Klasse hat für solche Fälle eine Funktionalität eingebaut, welche über zwei Eigenschaften des
Sprite gesteuert werden kann: `Sprite.direction` und `Sprite.speed`.

Die `direction` Eigenschaft gibt, die Richtung an, in welche der Sprite sich bewegen soll. 0 (Standardwert)
führt direkt nach Oben und du kannst einen Winkel zwischen 0 und 359 angeben, um die Richtung im uhrzeigersinn
zu wechseln. Es verhält sich genauso wie die `rotation` Eigenschaft; mit dem Unterschied, dass es nicht die
visuelle Darstellung verändert.

Wenn du jetzt `speed` auf einen positiven oder negativen Wert setzt, wird der Sprite sich mit jedem Frame
automatisch mit der in `speed` angebebenen Anzal von Pixeln in die angegebene Richtung bewegen.

demo:{
     "target": "de/continuous-movement/",
     "display": [
         "lib/game/main.js"
     ],
     "links": {
         "Grafikquelle": "http://opengameart.org/content/space-ship-building-bits-volume-1"
     },
     "editable": true
}:demo

##Manuelle Updates {#manuelle-updates}
Jedes Sprite Objekt hat eine `update()` Methode, welche von Gamekit bei jeden Frame zuerst aufgerufen wird,
bevor der Sprite gerendert wird.

Wenn du individuelle Aktionen ausführen möchtest, welche du nicht über Tweens oder dauerhafte Bewegung
erreichen kannst, so überschreibe einfach die `update()` Methode mit deiner eigenen Funktion.

    mySprite.update = function(){
        this.rotation++;
    }


demo:{
     "target": "de/manual-update/",
     "display": [
         "lib/game/main.js"
     ],
     "links": {
         "Grafikquelle": "http://opengameart.org/content/space-ship-building-bits-volume-1"
     },
     "editable": true
}:demo
