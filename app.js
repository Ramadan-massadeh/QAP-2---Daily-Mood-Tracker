const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const moods = [];

function getStreak() {
  let streak = 0;
  for (let i = moods.length - 1; i >= 0; i--) {
    if (
      moods[i].toLowerCase() === "happy" ||
      moods[i].toLowerCase() === "excited"
    ) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

app.get("/", (req, res) => {
  res.render("index", {
    moods,
    streak: getStreak(),
  });
});
app.get("/summary", (req, res) => {
  res.render("summary", { moods: moods, streak: getStreak() });
});
app.post("/add", (req, res) => {
  const newMood = req.body.mood;
  moods.push(newMood);
  res.redirect("/");
});
app.post("/submit", (req, res) => {
  const mood = req.body.mood;
  moods.push(mood);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
