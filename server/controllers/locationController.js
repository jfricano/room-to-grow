const fetch = require("node-fetch");

// Connection URLs:
const TOKEN = "9dp4rcwCMuudpX55TiiVU0HDQCh3OmOcRJXePNUW2_w";
const TREFLE_DIST = "https://trefle.io/api/v1/distributions";

const locationController = {};

locationController.familyNames = async (req, res, next) => {
  const response = await fetch(
    `${TREFLE_DIST}?token=${TOKEN}&q=${req.params.locName}`
  );
  const json = await response.json();

  const slug = json.data[0].slug;
  const url = `${TREFLE_DIST}/${slug}/plants?filter%5Bestablishment%5D=native&token=${TOKEN}`;
  const newResponse = await fetch(url);
  const jsonRes = await newResponse.json();
  const data = jsonRes.data;
  const obj = {};
  
  data.forEach((plant) => {
    obj[plant["family_common_name"]] = true;
  });

  res.locals.families = {
    families: Object.keys(obj),
    slug: slug,
  };
  return next();
};

locationController.getPlants = async (req, res, next) => {
  const url = `${TREFLE_DIST}/${req.params.locName}/plants?filter%5Bestablishment%5D=native&filter[family_common_name]=${req.params.famName}&token=${TOKEN}`;
  const newResponse = await fetch(url);
  const jsonRes = await newResponse.json();
  const data = jsonRes.data;
  const randoPlants = [];

  for (let i = 0; i < 20; i++) {
    const plant = {
      common_name: data[i].common_name,
      scientific_name: data[i].scientific_name,
      image_url: data[i].image_url,
    };
    randoPlants.push(data[i]);
    console.log(plant);
  }
  res.locals.plants = {
    plants: randoPlants,
    family: req.params.famName,
    slug: req.params.locName,
  };
  return next();
};

locationController.getDetails = async (req, res, next) => {
  const response = await fetch(
    `${TREFLE_DIST}/${req.params.locName}/plants?filter%5Bestablishment%5D=native&filter[family_common_name]=${req.params.famName}&filter[scientific_name]=${req.params.plantName}&token=${TOKEN}`
  );
  const json = await response.json();
  const url = `http://trefle.io${json.data[0].links.self}?token=${TOKEN}`;
  const newResponse = await fetch(url);
  const jsonRes = await newResponse.json();
  const data = jsonRes.data;
  const resultObj = {
    common_name: data.common_name,
    scientific_name: data.scientific_name,
    family_common_name: data.family_common_name,
    edible: data.edible,
    vegetable: data.vegetable,
    image_url: data.image_url,
    toxicity: data.specifications.toxicity,
    growth_habit: data.specifications.growth_habit,
    growth_form: data.specifications.growth_form,
    growth_rate: data.specifications.growth_rate,
    shape_and_orientation: data.specifications.shape_and_orientation,
    average_height: data.specifications.average_height.cm / 100 + " meters",
  };
  console.log(resultObj);
  res.locals.plantInfo = resultObj;
  return next();
};

module.exports = locationController;
