const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const routes = require("./routes/routes");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api", routes);
//connecting to mongoDB data base
mongoose.connect(
  "mongodb+srv://users:users@cluster0.seaixoy.mongodb.net/test",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function checkDb(err) {
    if (err) console.log("error to connect db");
    else console.log("Database connection done successfully");
  }
);
//creating server
app.listen(PORT, function check(err) {
  if (err) console.log("error");
  else {
    console.log("started");
    console.log(PORT);
  }
});
