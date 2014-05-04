conf:{
    "key": "assetloading",
    "title": "Resourcen laden"
}:conf

#Resourcen laden

Wie die meisten anderen HTML5 Spiel Engines beinhaltet gamekit ebenfalls einen Asset-Loader um alle
benötigten Dateien für dein Spiel zu laden.

Der gamekit Asset-Loader speichert alle geladenen Resourcen in einem Namespace ähnlich dem Module-Namespace
des Module-Loaders. Alle geladenen Resourcen sind verfügbar über `gamekit.a.*`, wobei der * for den jeweiligen
Schlüssel jeder Resource steht.

Der Asset-Loader versucht die Art der geladenen Resourcen zu erkennen, indem er die URLs betrachtet. Du kannst
"einfache" Grafiken laden, oder sogar Spritemaps und auch Sprite-Atlase.

Der Asset-Loader unterstützt ebenfalls das Laden von Resourcen im Block, indem man Resourcenlisten definiert
und in einer JSON Datei speichert.


##Eine Resource Laden
Nach Voreinstellung versucht der Asset-Loader alle Dateien die du ihm übergibst aus dem Ordner `lib/assets/`
zu laden.

Du kannst diesen Ordner ändern indem du den Wert von `gamekit.assetFolder` überschreibst.

Die Dateinamen der geladenen Resourcen werden automatisch in Schlüssel umgewandelt, sodass du auf die Resourcen
von deiner Spiellogik aus zugreifen kannst. Wenn du willst, kannst du deine Resourcen-Schlüssel auch manuell setzen.

Hier ein Beispiel:

    gamekit.loadAssets('myImage.png');

Wird die Datei `lib/assets/myImage.png` laden und unter `gamekit.a.myImage` verfügbar machen.

    gamekit.loadAssets('myKey:someImage.png');

Wird die Datei `lib/assets/someImage.png` laden und unter `gamekit.a.myKey` verfügbar machen.


##Spezielle Resourcen laden
Du kannst gamekit Hinweise geben, dass es Spritemaps oder Sprite-Atlase laden soll. Um eine Spritemap
zu laden, direkt zu parsen und in ein Spritemap-Objekt umzuwandeln bevor es im Asset-Namespace gespeichert
wird, benenne deine Datei wie folgt:

    myMap.smap.32x32.png

Dies ist ein Beispiel. Gamekit wird nach dem Schlüsselwort `.smap.` suchen, sowie nach der Definition der
Teilgröße `32x32`. Die Spritemap in unserem Beispiel wird danach unter `gamekit.a.myMap` verfügbar gemacht
nachdem sie geladen und verarbeitet wurde.

Um einen Sprite-Atlas zu laden, benenne deine Datei so:

    myAtlas.atlas.png

In diesem Fall wird gamekit nach einer zugehörigen JSON Datei namens `myAtlas.json` suchen und versuchen diese
zu laden, damit Resourcen-Positionen und -Dimensionen, zusammen mit den Schlüsseln daraus gelesen werden können.
Das Sprite-Atlas Objekt aus unserem Beispiel wird danach unter `gamekit.a.myAtlas` zur Verfügung gestellt.


##Mehrere Resourcen laden
Wenn man ein Array von Strings, anstelle eines einzelnen Strings an die `loadAssets()` Methode übergibt, werden
alle angegebenen Resourcen auf einmal geladen. Du kannst sogar noch weiter gehen und den Namen einer JSON Datei
übergeben, welche dann von gamekit geladen wird und deren Inhalt als eine Resourcenliste interpretiert wird, die
dann ebenfalls alle geladen werden.

Hier ist ein Beispiel einer solchen JSON Datei:

    [
        "something:myImage.png",
        "image2.png",
        "closeButton:btn-close-window.png",
        "level1:level1.smap.32x32.png"
    ]


##Den Ladevorgang abwickeln
Wie alles Andere, was asynchrone Operationen in gamekit ausführt, wird der Asset-Loader ein Promise zurückgeben,
welches du überwachen kannst um das Ergebnis deines Ladevorgangs zu erhalten. Wenn alle Resourcen geladen wurden
wird das Promise erfüllt - wenn das Laden einer der angegebenen Resourcen fehlgeschlagen ist, wird das Promise
abgelehnt.