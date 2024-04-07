# How to run this App
## Voraussetzungen
1. [Node.js](https://nodejs.org/en/download)
2. [MongoDB](https://www.mongodb.com/try/download/shell)
   - run MongoDB Compass
   - connect to localhost:27017
   - create a database "webprog" with collections "pets" and "users"

## Repository klonen
`git clone https://github.com/F1nnian/webprog`

## (optional) Beispieldaten importieren
Collections aus "example_data" in MongoDB Compass importieren

Bilder sollten bereits vorhanden sein, wenn nicht: kopieren nach server/resource/images

## Backend-Abhängigkeiten und starten
Bitte auf Port 5000

In App-Ordner: 
```cmd
cd server
npm install
node src/server.js
```

## Frontend-Abhängigkeiten und starten
Bitte auf Port 3000

In App-Ordner: 
```cmd
npm install
npm start
```
Website sollte automatisch geöffnet werden. Wenn nicht auf "localhost:3000"
