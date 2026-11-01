# Halmazok – 10–15 perces gyakorlóapp

12 feleletválasztós kérdés, magyarázat minden válasz után, stopper, pontszám, helyi demó mód, valamint opcionális közös eredménytábla Google Táblázattal.

## 1. GitHub Pages – azonnali indulás

1. Hozz létre egy **nyilvános** GitHub repositoryt (például `halmazok-kviz`).
2. Töltsd fel az **index.html** és **config.js** fájlokat a repository gyökerébe. A `Code.gs` fájlt **nem kell** a GitHubra feltölteni.
3. A GitHubon: **Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save**.
4. Néhány perc múlva a cím: `https://FELHASZNALONEV.github.io/halmazok-kviz/` (a pontos címet a Pages mutatja).

**Alapbeállítás:** demó mód. Ekkor a pontok csak az adott böngészőben láthatók, és a tanár NEM látja központilag a diákokat.

## 2. Közös eredménygyűjtés – Google Táblázat

1. Hozz létre egy **külön Google Táblázatot** a kvízhez. A táblázatot ne oszd meg a diákokkal.
2. **Bővítmények → Apps Script**. Töröld az alap kódot, és másold be a `Code.gs` teljes tartalmát.
3. Mentés, majd **Deploy / Üzembe helyezés → New deployment / Új üzembe helyezés → Web app / Webalkalmazás**.
4. **Execute as / Futtatás mint: Me (én)**. **Who has access / Hozzáférés: Anyone (bárki)**. Engedélyezd a szükséges Google-hozzáféréseket.
5. Másold ki a **/exec** végű webalkalmazás-URL-t.
6. A `config.js` fájlban a `scriptUrl: ''` értékéhez írd be az URL-t az idézőjelek közé.
7. A módosított `config.js` fájlt töltsd fel GitHubra (Commit changes). Nyisd meg az appot és teszteld egy próbakitöltéssel.
8. Az eredményeket a privát Google Táblázat **Eredmenyek** munkalapján találod, az appban pedig a közös rangsorban.

**Fontos:** A „bárki” hozzáférésű Apps Script végpontot ismerők eredményeket küldhetnek be és lekérhetik a rangsort. Ezért ez nem hitelesített vizsgarendszer; gyakorláshoz való. A rangsor a neveket/osztályokat minden látogatónak megmutatja, ha be van kapcsolva. Iskolai használat előtt mérlegeld az adatvédelmi szabályokat, és használj inkább tanári azonosítókat / álneveket. A táblázatot ne tedd nyilvánossá. Az alkalmazás a kliens által közölt pontot és időt fogadja el; ezek technikailag manipulálhatók.

## 3. Tanári ellenőrzés

A táblázat oszlopai: beküldés ideje, név/azonosító, osztály, pontszám, összes kérdés, megoldási idő másodpercben, kliens befejezési ideje.

A kvízoldalon két sorrend van:
- **Legjobb eredmények:** több pont előbb, holtversenyben gyorsabb idő előbb.
- **Leggyorsabb befejezések:** kevesebb másodperc előbb, holtversenyben több pont előbb.

A leggyorsabb nem feltétlenül a legjobb: ezért mindkét nézet fontos. A rendszer minden kitöltést rögzít, így ugyanaz a diák többször is szerepelhet. A beküldés technikai sikerét a böngésző `no-cors` módja miatt a Google Táblázatban ellenőrizd.

## 4. Tanári javaslat

Adj 12–15 percet. Kérd, hogy csak egyszer töltsék ki, és az időmérés előtt készüljenek elő. Ne használj teljes neveket a nyilvános rangsorban, ha nincs erre megfelelő iskolai jogalap és tájékoztatás. Az eredmények értékelésénél a pontszámot tekintsd elsődlegesnek.
