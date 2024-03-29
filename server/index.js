var express    = require("express")

var app        = express()
const path = require("path");

app.use("/opin-sharable-demo-app/", express.static(path.join(__dirname, "..", "build")));

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });

app.get("/buzzer-demo", function (req, res, next) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
})

app.listen(3005, function () {
  console.log("app listening on port", 3005)
})
