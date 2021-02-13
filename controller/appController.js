const Beer = require("../models/beers");
const responses = ({
  success,
  error,
  forbidden,
  notfound,
} = require("../utils/responses"));

const init = (req, res) => {
  try {
    responses.success(res, {
      msg: "THIS IS A NEO PUNKAPI",
      description:
        "This is a Public API to query data on Brewdog craft beers brewed in 2020.",
      endPoints: {
        getAllBeers: "api/beers",
        getBeerByID: "api/beers/id/:id",
        getBeerByName: "api/beers/:name",
        getBeersBySection: "api/beers/section/:section",
        getBeersByStyle: "api/beers/style/:style",
        sortByLowABV: "api/beers/sort/low-abv",
        sortByHighABV: "api/beers/sort/high-abv",
      },
    });
  } catch (error) {
    responses.error(res);
  }
};

const addBeer = async (req, res) => {
  const beer = new Beer(req.body);
  try {
    const newBeer = await beer.save();
    responses.success(res, newBeer);
  } catch (error) {
    responses.error(res);
  }
};

const getAllBeers = async (req, res) => {
  try {
    const beers = await Beer.find({}, "-__v");
    const listedBeers = beers.sort((a, b) =>
      a.id > b.id ? 1 : b.id > a.id ? -1 : 0
    );
    responses.success(res, listedBeers);
  } catch (error) {
    responses.error(res);
  }
};

const getBeersByID = async (req, res) => {
  try {
    const beers = await Beer.find({}, "-__v");
    const beerCode = req.params.id;
    const foundBeer = beers.find((beer) => beer.id == beerCode);
    if (foundBeer) {
      responses.success(res, foundBeer);
    } else {
      responses.notfound(res, {
        error: `Beer with ID: '${beerCode}' not found`,
      });
    }
  } catch (error) {
    responses.error(res);
  }
};

const getBeerByName = async (req, res) => {
  try {
    const beers = await Beer.find({}, "-__v");
    const beerName = req.params.name;
    const foundBeer = beers.find((beer) => beer.name == beerName);
    if (foundBeer) {
      responses.success(res, foundBeer);
    } else {
      responses.notfound(res, {
        error: `Beer not found`,
      });
    }
  } catch (error) {
    responses.error(res);
  }
};

const getBeersBySection = async (req, res) => {
  try {
    const beers = await Beer.find({}, "-__v");
    const beerSection = req.params.section.toLowerCase();
    const foundBeers = beers.filter((beer) => {
      return beerSection.includes(beer.section);
    });
    if (foundBeers.length > 0) {
      responses.success(res, foundBeers);
    } else {
      responses.notfound(res, {
        error: `Section: '${beerSection}' not found`,
      });
    }
  } catch (error) {
    responses.error(res);
  }
};

const getBeersByStyle = async (req, res) => {
  try {
    const beers = await Beer.find({}, "-__v");
    const beerStyle = req.params.style.toLowerCase();
    const foundBeers = beers.filter((beer) => {
      return beerStyle.includes(beer.brewSheet.style);
    });
    if (foundBeers.length > 0) {
      responses.success(res, foundBeers);
    } else {
      responses.notfound(res, {
        error: `Style: '${beerStyle}' not found`,
      });
    }
  } catch (error) {
    responses.error(res);
  }
};

const sortByLowABV = async (req, res) => {
  try {
    const beers = await Beer.find({}, "-__v");
    const alcoholBeers = beers.filter((beer) => beer.abv > 3);
    const sortedBeers = alcoholBeers.sort((a, b) =>
      a.abv > b.abv ? 1 : b.abv > a.abv ? -1 : 0
    );
    if (sortedBeers) {
      responses.success(res, sortedBeers);
    }
  } catch (error) {
    responses.error(res);
  }
};

const sortByHighABV = async (req, res) => {
  try {
    const beers = await Beer.find({}, "-__v");
    const sortedBeers = beers.sort((a, b) =>
      a.abv < b.abv ? 1 : b.abv < a.abv ? -1 : 0
    );
    if (sortedBeers) {
      responses.success(res, sortedBeers);
    }
  } catch (error) {
    responses.error(res);
  }
};

const deleteAllBeers = async (req, res) => {
  try {
    await Beer.deleteMany({});
    return responses.success(res, { msg: "deleted all beers" });
  } catch (error) {
    responses.error(res);
  }
};

const deleteBeer = async (req, res) => {
  try {
    const beers = await Beer.find({}, "-__v");
    const beerCode = req.params.id;
    const foundBeer = beers.find((beer) => beer.id == beerCode);
    console.log(foundBeer);
    if (foundBeer) {
      await Beer.deleteOne(foundBeer);
      responses.success(res, {
        msg: `Beer with id: ${beerCode} successfully deleted`,
      });
    } else {
      responses.notfound(res, {
        error: `Beer with id: '${beerCode}' not found`,
      });
    }
  } catch (error) {
    responses.error(res);
  }
};

module.exports = {
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
};
