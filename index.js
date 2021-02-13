const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const appRoutes = require("./routes/appRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(__dirname + "/images"));
app.use("/", appRoutes);
app.use("/api", appRoutes);

app.listen(PORT, () => console.log(`NEO-PUNK API listening on port: ${PORT}!`));
