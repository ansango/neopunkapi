const Beer = require("../models/beers");
const responses = ({
  success,
  error,
  forbidden,
  notfound,
} = require("../utils/responses"));

const aux = ({
  sortAscById,
  sortDescById,
  sortAscByABV,
  sortDescByABV,
  randomBeer,
} = require("../utils/methods"));

const init = (req, res) => {
  try {
    responses.success(res, {
      msg: "THIS IS A NEO PUNKAPI",
      description:
        "This is a Public API to query data on Brewdog craft beers brewed in 2020.",
      endPoints: {
        getBeerByID: "/api/beer/id/:id",
        getBeerByName: "/api/beer/name/:name",
        getRandomBeer: "/api/beer/random",
        getAllBeers: "/api/beers",
        getBeersBySection: "/api/beers/section/:section",
        getBeersByStyle: "/api/beers/style/:style",
        sortByLowABV: "/api/beers/sort/low-abv",
        sortByHighABV: "/api/beers/sort/high-abv",
      },
    });
  } catch (error) {
    responses.error(res);
  }
};

/*const addBeer = async (req, res) => {
  try {
    const beer = new Beer(req.body);
    const newBeer = await beer.save();
    return responses.success(res, newBeer);
  } catch (error) {
    return responses.error(res);
  }
};*/

/*const updateURL = async (req, res) => {
  try {
    const id = req.params.id;
    const beer = await Beer.findByIdAndUpdate(id, {
      imgURL: req.body.imgURL,
    });
    if (!beer) return responses.notfound(res);
    return responses.success(res, beer);
  } catch (error) {
    return responses.error(res);
  }
};*/

const getAllBeers = async (req, res) => {
  try {
    const beers = await Beer.find({}, "-__v");
    const sortedBeers = aux.sortAscById(beers);
    if (!sortedBeers) return responses.notfound(res);
    return responses.success(res, sortedBeers);
  } catch (error) {
    return responses.error(res);
  }
};

const getBeersByID = async (req, res) => {
  try {
    const id = req.params.id;
    const beer = await Beer.findById(id);
    if (!beer) return responses.notfound(res);
    return responses.success(res, beer);
  } catch (error) {
    return responses.error(res);
  }
};

const getBeerByName = async (req, res) => {
  try {
    const name = req.params.name;
    const beer = await Beer.find({ name: name }, "-__v");
    if (!beer.length > 0) return responses.notfound(res);
    return responses.success(res, beer);
  } catch (error) {
    return responses.error(res);
  }
};

const getRandomBeer = async (req, res) => {
  try {
    const beers = await Beer.find({}, "-__v");
    const random = aux.randomBeer(beers);
    if (!random) return responses.notfound(res);
    return responses.success(res, random);
  } catch (error) {
    return responses.error(res);
  }
};

const getBeersBySection = async (req, res) => {
  try {
    const section = req.params.section;
    const beers = await Beer.find({ section: section }, "-__v");
    if (!beers.length > 0) return responses.notfound(res);
    return responses.success(res, beers);
  } catch (error) {
    return responses.error(res);
  }
};

const getBeersByStyle = async (req, res) => {
  try {
    const style = req.params.style;
    const beers = await Beer.find({}, "-__v");
    const _beers = beers.filter((beer) => {
      return style.includes(beer.brewSheet.style);
    });
    if (!_beers.length > 0) return responses.notfound(res);
    return responses.success(res, _beers);
  } catch (error) {
    return responses.error(res);
  }
};

const sortByLowABV = async (req, res) => {
  try {
    const beers = await Beer.find({}, "-__v");
    const alcoholBeers = beers.filter((beer) => beer.abv > 3);
    const sortedBeers = aux.sortAscByABV(alcoholBeers);
    if (!sortedBeers) return responses.notfound(res);
    return responses.success(res, sortedBeers);
  } catch (error) {
    return responses.error(res);
  }
};

const sortByHighABV = async (req, res) => {
  try {
    const beers = await Beer.find({}, "-__v");
    const alcoholBeers = beers.filter((beer) => beer.abv > 3);
    const sortedBeers = aux.sortDescByABV(alcoholBeers);
    if (!sortedBeers) return responses.notfound(res);
    return responses.success(res, sortedBeers);
  } catch (error) {
    return responses.error(res);
  }
};

/*const deleteAllBeers = async (req, res) => {
  try {
    await Beer.deleteMany({});
    return responses.success(res, { msg: "deleted all beers" });
  } catch (error) {
    return responses.error(res);
  }
};*/

/*const deleteBeer = async (req, res) => {
  try {
    const id = req.params.id;
    const beer = await Beer.findByIdAndDelete(id);
    if (!beer) return responses.notfound(res);
    return responses.success(res, { msg: "Beer deleted!" });
  } catch (error) {
    return responses.error(res);
  }
};*/

module.exports = {
  init,
  //addBeer,
  //updateURL,
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
};
