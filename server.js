const express = require("express");
const app = express();
const PORT = 3000;

const fs = require("fs");
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/register", (req, res) => {
  const { Name, Email, password } = req.body;
  const userData = `${Name},${Email},${password}\n`;
  const filePath = path.join(__dirname, "users.txt");

  fs.appendFile(filePath, userData, (err) => {
    if (err) {
      console.error("Fehler beim Schreiben der Datei", err);
      return res.status(500).send("Fehler beim Schreiben der Datei");
    }
    res.send("Registrierung erfolgreich!");
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port: ${PORT}`);
});
