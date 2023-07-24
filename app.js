const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", () => {});

const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {});

// app.use((req, res, next) => {
//   req.user = {
//     _id: "5d8b8592978f8bd833ca8133", // paste the _id of the test user created in the previous step
//   };
//   next();
// });
