# Prága projekt (PRG)

A korábbi pozsonyi és kassai projekttel azonos felépítésű, önálló, statikus magyar idegenvezető. Nyitóoldal az index.html, mellette 27 külön PRG_*.html részletoldal.

A 27 állomás mindegyikéhez 6 hosszú idegenvezetői bekezdés tartozik. Összesen 162 bekezdés és közel 7800 szó. A magyar és cseh helynevek együtt szerepelnek. A szöveg történeti hátteret, helyszíni megfigyeléseket és kulturális összefüggéseket kapcsol össze. A legendák külön jelölve jelennek meg.

## Használat

Csomagold ki a ZIP fájlt, és a Praga mappa teljes tartalmát tedd statikus HTTPS tárhelyre. A nyitóoldal index.html. Nincs fordítási lépés, API kulcs vagy adatbázis.

Helyi próbához a mappában a `python -m http.server 8000` paranccsal indítható kiszolgálás, majd megnyitható a `http://localhost:8000` cím. Az index.html közvetlen megnyitásakor a helyi szöveg és a képek is rendelkezésre állnak, a GPS működése azonban a böngésző biztonsági feltételeitől függ.

Telefonon a helyadatokhoz HTTPS és helymeghatározási engedély kell. A kijelzett távolság légvonalbeli. A Google Maps navigáció gyalogos útvonalat kér, a 27 sorszám az eredeti lista sorrendjét követi, nem egy napra optimalizált útvonal. A pontok több sétára is feloszthatók.

## Funkciók

* Lista és 27 külön részletoldal a korábbi mintával azonos kezelőszervekkel.
* Számozott Leaflet térképjelölők, képpel és leírással.
* Automatikus GPS távolságmérés és legközelebbi pont.
* Lista görgetési helyének mentése és visszaállítása.
* Magyar felolvasás rövid egymást követő szakaszokban, leállítás és következő állomás.
* Google Maps gyalogos navigáció.
* Önálló PRG adattér és mentési előtag, a pozsonyi és kassai projektet nem írja felül.

A felolvasás a készülék és a böngésző beszédszintézisét használja. Magyar hang telepítése szükséges lehet. A narrációt olvassa fel, a forrásjegyzéket és a látogatási megjegyzéseket nem.

## Tartalom és források

Minden kép helyi JPEG az images mappában. Mind a 27 képnél szerepel a szerző, a pontos Wikimedia Commons forrás és a választott Creative Commons licenc. Teljes képjegyzék a KEPEK_FORRASAI.md és KEPEK_FORRASAI.html fájlokban.

A hosszú leírások intézményi, városi és helytörténeti forrásai a részletoldalakon lenyithatók. Az eredeti listához képesti javításokat és a koordináták összevetését az ADATELLENORZES.md és ADATELLENORZES.html tartalmazza. A koordináták nem garantált bejárat- vagy parkolópontok.

A Petřín torony 2026. november 7. és 14. közötti zárásáról külön, dátumhoz kötött megjegyzés szerepel. A később is használt útmutató látogatási feltételeit indulás előtt a hivatkozott hivatalos oldalakon ellenőrizni kell. Általános, gyorsan elavuló belépőárlistát nem rögzít a projekt.

## Adatok és export

Az assets/data/pois.js a böngésző által használt adatállomány és tartalomfrissítő kód. Az assets/data/pois.json ugyanennek a kiadásnak az önálló adatmásolata. A teljes narráció statikus HTML formában is minden részletoldalban benne van.

A Praga_koordinatak.csv UTF-8 BOM kódolású, pontosvesszővel tagolt pontlista, magyar és cseh nevekkel, Google Maps hivatkozással és helyadatforrással. A Praga_POI.gpx 27 különálló waypointot tartalmaz, nem összekötő útvonalvonalat. A Praga_teljes_szoveg.txt egyben is olvashatóvá teszi az összes narrációt.

## Internet és offline használat

A szövegekhez és a képekhez nincs szükség külső tartalomszerverre. A Leaflet, az OpenStreetMap térképcsempék és a Google Maps navigáció internetet igényelnek. Ez a projekt a mintához hasonlóan nem telepíthető offline PWA. A térkép hiánya nem akadályozza a lista és a hosszú leírások olvasását.


## Egynapos sétaút a térképen · 2026. november 14.

A nyitóoldalon a Sétaút a térképen gomb közvetlenül a térképhez visz. A csatolt Prague 1-Day Itinerary.kml öt vonala került be, összesen 1169 koordinátával. A fő séta 6,0 km, az A indulás 0,4 km, a B indulás 0,6 km, a Petřín kitérő 3,3 km, a Josefov kitérő 1,1 km. Ezek nyomvonalból számított közelítő hosszak.

Alapból a fő séta és az A indulás látható. A további szakaszok külön kapcsolhatók. A választás ugyanabban a böngészőben megmarad, ha a helyi adattárolás elérhető. A Látható útvonal gomb a bekapcsolt vonalakra, az Összes látnivaló gomb mind a 27 eredeti helyszínre igazítja a térképet. A GPS frissítése nem állítja vissza a térkép nézetét.

A Praga_egynapos_seta.gpx az öt vonalat külön trackként tartalmazza. Az alternatív indulások és kitérők külön maradtak, a fájl nem jelent egyetlen folyamatos útvonalat. Az eredeti 27 pontos Praga_POI.gpx továbbra is külön elérhető. Az eredeti KML a routes mappában található. A térkép a helyben tárolt walking_routes.js fájlt használja, fájlbetöltés vagy API kulcs nélkül. A KML vonalainak eredeti koordinátái és sorrendje megmaradtak, közöttük új összekötő vonal nem készült. A részletoldalak térképei továbbra is az adott látnivalót mutatják.

Frissítéshez a teljes Praga mappa tartalmát másold a korábbi oldal helyére. A meglévő szövegek, képek és részletoldalak változatlanok.
