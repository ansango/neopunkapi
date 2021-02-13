const express = require("express");

const {
  init,
  addBeer,
  getAllBeers,
  getBeersByID,
  getBeerByName,
  getBeersBySection,
  getBeersByStyle,
  sortByLowABV,
  sortByHighABV,
  deleteAllBeers,
  deleteBeer,
} = require("../controller/appController");

const router = express.Router();
router.get("/", init);
router.get("/beers", getAllBeers);
router.get("/beers/id/:id", getBeersByID);
router.get("/beers/:name", getBeerByName);
router.get("/beers/section/:section", getBeersBySection);
router.get("/beers/style/:style", getBeersByStyle);
router.get("/beers/sort/low-abv", sortByLowABV);
router.get("/beers/sort/high-abv", sortByHighABV);

router.post("/addBeer", addBeer);

router.delete("/deleteAllBeers", deleteAllBeers);
router.delete("/deleteBeer/:id", deleteBeer);

module.exports = router;
