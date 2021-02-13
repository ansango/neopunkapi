const express = require("express");

const {
  init,
  //addBeer,
  getAllBeers,
  getBeersByID,
  getBeerByName,
  getRandomBeer,
  getBeersBySection,
  getBeersByStyle,
  sortByLowABV,
  sortByHighABV,
  //deleteAllBeers,
  //deleteBeer,
  //updateURL,
} = require("../controller/appController");

const router = express.Router();
router.get("/", init);
router.get("/beer/id/:id", getBeersByID);
router.get("/beer/name/:name", getBeerByName);
router.get("/beer/random", getRandomBeer);
router.get("/beers", getAllBeers);
router.get("/beers/section/:section", getBeersBySection);
router.get("/beers/style/:style", getBeersByStyle);
router.get("/beers/sort/low-abv", sortByLowABV);
router.get("/beers/sort/high-abv", sortByHighABV);

//router.post("/addBeer", addBeer);

//router.put("/updateURL/:id", updateURL);

//router.delete("/deleteAllBeers", deleteAllBeers);
//router.delete("/deleteBeer/:id", deleteBeer);

module.exports = router;
