const sortAscById = (arr) => {
  return arr.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
};
const sortDescById = (arr) => {
  return arr.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
};

const sortAscByABV = (arr) => {
  return arr.sort((a, b) => parseFloat(a.abv) - parseFloat(b.abv));
};
const sortDescByABV = (arr) => {
  return arr.sort((a, b) => parseFloat(b.abv) - parseFloat(a.abv));
};
const randomBeer = (set) => {
  let beers = Array.from(set);
  return beers[Math.floor(Math.random() * beers.length)];
};

module.exports = {
  sortDescById,
  sortAscById,
  sortDescByABV,
  sortAscByABV,
  randomBeer,
};
