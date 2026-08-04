# lamert partners
**++ diese README.md wurde mithilfe von KI verfasst ++**

### 🚀 Web-Projekt Setup & Entwicklung
Willkommen im Repository! Um die Website lokal zu testen und daran zu arbeiten, folge einfach dieser kurzen Anleitung.

### 🛠 Voraussetzungen
Bevor du startest, muss Node.js auf deinem Rechner installiert sein. Mit Node.js wird automatisch auch der Paketmanager NPM installiert, den wir für die Befehle benötigen.

Node.js Download: nodejs.org (Empfohlen wird die LTS-Version)

### 🏃‍♂️ Erste Schritte (Setup)
Befolge diese Schritte der Reihe nach, um die Entwicklungsumgebung einzurichten:

#### 1. In das Projektverzeichnis wechseln

Öffne dein Terminal (PowerShell, Bash oder VS Code Terminal) und navigiere in den Ordner des Projekts:

````
cd name-deines-projektordners
````
#### 2. Abhängigkeiten installieren

Dieser Schritt ist nur einmalig zu Beginn (oder wenn sich die Pakete ändern) notwendig. Er lädt alle benötigten Bibliotheken herunter, die in der package.json definiert sind.

Du kannst entweder den langen oder den kurzen Befehl nutzen:

````
npm install
````
##### ODER kurz:
````
npm i
````

### 💻 Die Website testen
Sobald die Installation abgeschlossen ist, kannst du den lokalen Entwicklungsserver starten.

#### 3. Entwicklungsserver starten

Nutze den folgenden Befehl, um die Website mit Live-Reload zu starten:

````
npm run dev
````
*Hinweis: Nach dem Starten des Befehls erscheint im Terminal meist ein Link (z. B. http://localhost:5173 oder http://localhost:3000). Halte Strg gedrückt und klicke auf den Link, um die Website in deinem Browser zu öffnen.*
