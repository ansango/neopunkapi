const responses = ({
  success,
  error,
  forbidden,
  notfound,
} = require("../utils/responses"));

const Beers = require("../DB/data");

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

const getAllBeers = async (req, res) => {
  try {
    let beers = await Beers;
    responses.success(res, beers);
  } catch (error) {
    responses.error(res);
  }
};

const getBeersByID = async (req, res) => {
  try {
    let beers = await Beers;
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
    let beers = await Beers;
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
    let beers = await Beers;
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
    let beers = await Beers;
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
    let beers = await Beers;
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
    let beers = await Beers;
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

module.exports = {
  init,
  getAllBeers,
  getBeersByID,
  getBeerByName,
  getBeersBySection,
  getBeersByStyle,
  sortByLowABV,
  sortByHighABV,
};
