const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", (r) => {
  console.log("con to db", r);
});

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // paste the _id of the test user created in the previous step
  };
  next();
});

const routes = require("./routes");
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`listen ${PORT}`);
});
