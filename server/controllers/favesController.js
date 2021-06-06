const db = require("../models/plantModel");

const favesController = {};

// this middleware retrieves a user's favorited plants
favesController.getFaves = (req, res, next) => {
  const queryString = "SELECT faves.* FROM faves";
  const userFaves = db.query(queryString);
  userFaves
    .then((data) => (res.locals.faves = data.rows))
    .then(console.log("fetching user's favorite plants NOW!"))
    .then(() => next());
};

// this middleware checks to see if a plant already exists in our plant table and if it doesn't, inserts the selected plant
favesController.addPlant = (req, res, next) => {
  const selectQuery =
    "SELECT scientific_name FROM public.plants WHERE public.plants.scientific_name = plants.scientific_name";
  const queryString = `public.plants VALUES ( plants.common_name,
    plants.scientific_name,
    plants.family_common_name,
    plants.edible,
    plants.vegetable,
    plants.image_url,
    plants.toxicity,
    plants.growth_habit,
    plants.growth_form,
    plants.growth_rate,
    plants.shape_and_orientation,
    plants.average_height )`;
  const insertQuery = `INSERT INTO ${queryString} WHERE NOT EXISTS ${selectQuery}`;
  const result = db.query(insertQuery);
  result.then(() => next());
};

favesController.addFave = (req, res, next) => {
  const newFave = db.query(queryString);
  newFave.then(() => next());
};

module.exports = favesController;
