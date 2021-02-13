const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const appRoutes = require("./routes/appRoutes");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use("/images", express.static(__dirname + "/images"));
app.use("/", appRoutes);
app.use("/api", appRoutes);
app.disable("etag");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((error) => console.error(error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`NEO-PUNK API listening on port: ${PORT}!`));
