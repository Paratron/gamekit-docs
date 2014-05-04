conf:{
    "root": "gamekit",
    "title": "gamekit.Sprite",
    "constructor": true,
    "file": "src/Sprite.js",
    "key": "gamekit.Sprite"
}:conf

#gamekit.Sprite
Sprite Elemente werden genutzt um visuelle Resourcen auf den Bildschirm des Spielers zu renedrn.
Sie können verwendet werden um Erscheinungsbild, Position und Größe der Resource zu modifizieren und
verfügen über Methoden zur Animation von Eigenschaften, oder dauerhafte Bewegung. Lies mehr über Sprites
im Artikel [Sprites, Ebenen und Gruppen](../article/sprites-ebenen-und-gruppen).


##Eigenschaften

###x:Number {.property}
Momentane horizontale Position des Sprites in Pixeln. Relativ zum umgebenden Element (Gruppe oder Ebene).

###y:Number {.property}
Momentane vertikale Position des Sprites in Pixeln. Relativ zum umgebenden Element (Gruppe oder Ebene)..

###w:Number {.property}
Breite des Sprite Elements in Pixeln. Wird automatisch auf die Breite der Grafik gesetzt, wenn der
Sprite erzeugt wird.

###h:Number {.property}
Höhe des Sprite Elements in Pixeln. Wird automatisch auf die Höhe der Grafik gesetzt, wenn der
Sprite erzeugt wird.

###originX:Number {.property}
Der horizontale Versatz des Ursprungspunkts in Pixeln. Standardwert ist `0`.

###originY:Number {.property}
Der vertikale Versatz des Ursprungspunkts in Pixeln. Standardwert ist `0`.

###rotation:Number {.property}
Drehung des Sprite in Grad. Sprites werden um ihren Ursprungspunkt herum gedreht. Gültige Werte liegen
zwischen `0` und `359` Grad. Die Eigenschaft verhält sich kreisend. Dies bedeutet, dass wenn du einen
Wert über 359, oder unter 0 setzt, wirst du immer einen Wert innerhalb des 0-359 Grad Bereichs erhalten.
Gamekit korrigiert den Winkel in seiner Update Routine.

###direction:Number {.property}
Direkt verknüpft mit der `speed` Eigenschaft. Dies setzt den Winkel der Richtung in welche der Sprite
bewegt wird, wenn `speed` ungleich null ist. Diese Eigenschaft dreht den Sprite nicht. Benutzt zu diesem
Zweck `rotation`.

###speed:Number {.property}
Wenn diese Eigenschaft ungleich Null gesetzt ist, wird sich der Sprite um die angegebene Anzahl Pixeln
pro Frame in die Richtung bewegen, welche unter `direction` angegeben ist.

###scaleX:Number {.property}
Der Skalierungsfaktor wird nur visuell angewandt. Der Sprite behält seine ursprünglichen Dimensionen in
allen Berechnungen bei - inklusive Grafikskalierung/-quetschung. Der Scale Faktor wird nur visuell, beim
Rendern des Sprite angewandt. Ein Wert von `1` (standard) lässt den Sprite mit 100% seiner Größe rendern.
Ein Wert von `0.5` lässt ihn bei 50% erscheinen und so weiter.

###scaleY:Number {.property}
Gegenstück zu `scaleX`. Setze beide Eigenschaften auf den gleichen Wert um eine Skalierung zu erhalten,
welche das Seitenverhältnis der Grafik des Sprite beibehält.

###alpha:Number {.property}
Manipuliert die Deckkraft des Sprite. Setze einen Wert zwischen `0` (unsichtbar) und `1` (100% sichtbar,
standard) um einen Sprite transparent zu rendern.

###stretch:Bool {.property}
Bestimmt Gamekit entweder die Grafik des Sprite so zu strecken dass sie in die am Sprite angegebenen
Dimensionen passt, oder sie einfach abzuschneiden. Standardwert ist `false`.

###asset:Asset {.property}
Pointer auf die Grafikresource des Sprite. Wird in der Constructor Funktion gesetzt.

###debugDrawing:Bool {.property}
Wenn auf `true` gesetzt, wird gamekit eine Box um die Grenzen des Sprite rendern und einen Punkt an der
Position des Ursprungspunktes.

##Methoden

###Sprite(asset):gamekit.Sprite {.method .constructor}
Constructor Methode für neue Sprites. Muss eine Grafikresource übergeben bekommen.

    var myBoat = new gamekit.Sprite(gamekit.a.boat);

###update():void {.method}
Diese Methode ist standardmäßig leer. Überschreibe sie mit deiner eigenen Update Methode.

Die Update Methode eines jeden Sprite Objekt wird aufgerufen, bevor die `render()` Methode
aufgerufen wird, damit jedes Sprite die Möglichkeit hat auf seine Umgebung zu reagieren, seine
Werte zu aktualisieren, oder andere Dinge bei jedem Frame zu erledigen.

###draw(ctx):void {.method}
Diese Methode wird von Gamekit bei jedem Frame aufgerufen. Es übergibt das [context2D Objekt](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
der Spiel-Canvas in die Methode, damit der Sprite direkten Zugriff zum Rendern hat.

Die Canvas ist bereits in einem Zustand, in dem der Sprite selbst sich nicht um Versetzungen, Drehung,
und andere Beeinflussung von Objekten unter dem Sprite (wie etwa umgebene Gruppen, Layer, etc.) kümmern
muss. Er muss einfach seinen eigenen Kontext zpeichern, seine eigenen Veränderungen bewirken, rendern
und dann den Kontext Status nach dem Rendern wieder zurücksetzen.

Diese Methode muss nicht manuell aufgerufen werden - sie wird automatisch von Gamekits [Zeichenroutine](../article/zeichenroutine)
aufgerufen.

###centerOrigin():self {.method}
Aktualisiert den Ursprungspunkt des Sprite, während die visuelle Position auf dem Bildschirm bewahrt
wird. Die Werte `originX` und `originY` werden auf jeweils die Hälfte der Breite und Höhe der verwendeten
Grafik gesetzt, während die `x` und `y` Eigenschaften des Sprite mit dem selben Wert negativ belastet
 werden.

###changeOrigin(x, y):self {.method}
Aktualisiert den Ursprungspunkt des Sprite, während die visuelle Position auf dem Bildschirm bewahrt
 wird. Die `x` und `y` Eigenschaften des Sprite werden mit dem selben Wert negativ belastet.

Wenn du die `x` und `y` Eigenschaften nicht beeinflussen möchtest, ändere die Eigenschaften `originX` und
`originY` direkt, ohne diesen Funktionsaufruf. Dies ist aber nicht empfehlenswert, da es den Sprite über
den Bildschirm "hüpfen" lässt, denn das Rendern des Sprite orientiert sich am Ursprungspunkt.

###tween(properties, duration):gamekit.Promise {.method}
Verändere einen oder mehrere numerische Eigenschaften des Objekts über die angegebene Zeitspanne.

Der `properties` Parameter muss ein Objekt sein, welches die Eigenschaften des Sprite enthält, die
getweent werden sollen, plus die jeweiligen Zielwerte, zu denen du tweenen willst. Die Werte können entweder
absolute, oder relative Werte sein. Um einen relativen Wert zu übergeben, setze entweder ein `+=`, oder
ein `-=` vor deinen Wert.

`duration` wird in Millisekunden angegeben.

Das zurückgegebene Promise wird erfüllt, wenn der Tween beendet wurde. Dies kann zur Steuerung des
Animationsflusses genutzt werden. Weitere Informationen über Tweening findest du im Artikel über
[Animation von Sprites](../article/sprites-animieren#tweening).

###prepareTween(properties, duration):function {.method}
Dies bereitet einen Tween vor, indem es eine Funktion zurückgibt, die jederzeit aufgerufen werden kann
 (auch wiederholt), ohne das weitere Konfiguration erforderlich ist.

###destroy():void {.method}
"Zerstört" den Sprite, indem es ihn vor dem nächsten Update/Render Zyklus von der Bühne entfernt.

Stelle sicher, dass dein Sprite auch aus jeglichen anderen Arrays/Objekten ausserhalb von Gamekits' Zeichenroutine
entwernt wird, damit der Garbage Collector ihn aus dem Speicher entfernen kann.

Wenn du irgendwo eine Referenz des Sprite aufbewahrst, kannst du den Sprite jederzeit wieder zur Bühne
hinzufügen.

###pointerEnable(onBoundingBox):void {.method}
Aktiviert den Sprite für die Verarbeitung von Pointer Events.
Dies fügt die Methode `on()` zum Sprite Objekt hinzu und beginnt danach, auf Pointer Events zu achten.

Setze `onBoundingBox` auf true, um lediglich auf Pointer Events innerhalb der Bounding Box des Sprite,
anstatt auf einen pixelgenauen Point auf die Grafik des Sprite zu achten (dies ist performanter).

###on(eventName):gamekit.Promise {.method}
Gibt ein Promise zum gewünschten Event zurück, das erfüllt wird, wann immer der Event auftritt.

Mögliche Events sind: `pointerdown`, `pointerup`, `pointermove`

Lies mehr darüber im Artikel über [Verarbeiten von Eingaben](../article/eingaben-verarbeiten).