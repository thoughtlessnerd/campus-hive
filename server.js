const express = require("express");
const app = express();
const fs = require("fs");

app.use("/", express.static("css"));
app.use("/", express.static("js"));
app.set("view engine", "ejs");

const eventsData = fs.readFileSync("./json/BPIT/events.json");
const notesData = fs.readFileSync("./json/BPIT/notes.json");

app.get("/", (req, res) => {
  res.render("index", {
    events: JSON.parse(eventsData),
    notes: JSON.parse(notesData),
  });
});

app.listen(3000);
