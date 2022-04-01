# 🌐 Y.A.R.A.C.

### Was ist Y.A.R.A.C.?

Y.A.R.A.C. ist im Grunde ein Forum. In diesem können Topics angelegt werden, welchen wiederrum Posts angehängt werden können. Ein User Managment ist ebenfalls vorhanden, inklusive Admin-Managment.

Y.A.R.A.C. wurde als Projektarbeit für die BSINFO für das Fach AP erstellt.

### Wofür steht Y.A.R.A.C.?

Y.A.R.A.C. steht für ***Y**et **a**nother **R**eddit **a**bstracted **c**lone*.

---

### Projekt-Setup

Bitte klonen Sie zunächst dieses Repository in einen Ordner.
Diesen Ordner werden wir in diesem Guide als `YARAC-HOME` bezeichnen.

##### Abhängigkeiten

* **Node.js/NPM** *für die Datenbank-Schnittstelle und der Applikation*
* **MariaDB** *für die Datenbank*

##### Datenbank-Guide

1. Installieren Sie die aktuelle Version der [MariaDB-Server Software](https://mariadb.org/download) für Ihr Betriebssystem, falls dies nicht bereits erfolgt ist.
2. Stellen Sie sicher, dass Sie einen Datenbank-User mit den Berechtigungen zum Erstellen und Manipulieren von Datenbanken, Usern und Berechtigungen haben. Dieser User wird benötigt um das Abbild der Datenbank einzuspielen. In unserem Beispiel verwenden wir den User `root`
3. Erstellen Sie zunächst eine Datenbank mit dem Namen `yarac`.
4. Dannach müssen Sie einen User mit dem Namen `yarac` und dem Passwort `apistkuhl` erstellen. Dieser sollte von `localhost` oder `127.0.0.1` erreichbar sein.
5. Erteilen Sie dem neu erstellten User alle Rechte auf die neu erstellte Datenbank.
6. Öffnen Sie dannach ein Terminal/eine Eingabeaufforderung und navigieren Sie zum Ordner `YARAC-HOME/database`.
7. Um das Abbild nun in Ihre Datenbank einzuspielen, führen Sie folgenden Befehl aus:

   *Bitte beachten Sie: Der Parameter `-p` ist nur zu verwenden, falls der User ein Passwort benötigt!*

   ```bash
   mysql -u root -p yarac < yarac.sql
   ```
8. Ihre Datenbank sollte nun einsatzbereit sein.

##### API-Server-Guide

1. Installieren Sie die aktuelle Version der [Node.js Software](https://nodejs.org/en/download/https://mariadb.org/downloa) für Ihr Betriebssystem, falls dies nicht bereits erfolgt ist.
2. Öffnen Sie ein Terminal/eine Eingabeaufforderung und navigieren Sie zum Ordner `YARAC-HOME/server`.
3. Damit alle Modul-Abhängigkeiten installiert werden können führen Sie bitte nun folgenden Befehl aus:

   ```bash
   npm install
   ```
4. Nach der Installation der Datenbank und des API-Servers kann dieser nun gestartet werden. Führen Sie dazu folgenden Befehl aus:

   ```bash
   npm start
   ```
5. Der API-Server sollte in wenigen Sekunden hochgefahren sein. Während der Ausführung der Applikation sollte der API-Server nicht gestoppt werden.
6. Um die Applikation zu stoppen, drücken Sie bitte STRG+C.

##### Applikations-Guide

1. Installieren Sie die aktuelle Version der [Node.js Software](https://nodejs.org/en/download/https://mariadb.org/downloa) für Ihr Betriebssystem, falls dies nicht bereits erfolgt ist.
2. Öffnen Sie ein Terminal/eine Eingabeaufforderung und navigieren Sie zum Ordner `YARAC-HOME/client`.
3. Damit alle Modul-Abhängigkeiten installiert werden können führen Sie bitte nun folgenden Befehl aus:

   ```bash
   npm install
   ```
4. Nach der Installation der Datenbank, des API-Servers und der Applikation kann die Applikation nun gestartet werden. Führen Sie dazu folgenden Befehl aus:

   ```bash
   npm start
   ```
5. Die Applikation sollte in wenigen Sekunden hochgefahren sein. Während der Ausführung der Applikation sollte der API-Server nicht gestoppt werden.
6. Die Applikation kann in einem beliebigen Browser (des aktuellen Zeitalters) unter [http://localhost:4200](http://localhost:4200https:/) aufgerufen werden.
7. Um die Applikation zu stoppen, drücken Sie bitte STRG+C.
