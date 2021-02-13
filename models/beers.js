const mongoose = require("mongoose");

const BeerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  subtitle: String,
  section: String,
  abv: Number,
  description: String,
  tastingNotes: {
    bitterness: Number,
    hoppyness: Number,
    maltyness: Number,
  },
  brewSheet: {
    colour: Number,
    hops: [],
    malts: [],
    style: String,
  },
  ingredients: [],
  imgURL: String,
});

module.exports = mongoose.model("Beer", BeerSchema);
