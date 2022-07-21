const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
const newRecipe = {
  title: "lassana",
  level: "Easy Peasy",
  ingredients: ["meat", "tomatoe", "pasta"],
  cuisine: "Italy",
  dishType: "main_course",
  duration: 120,
  creator: "malva",
};

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(newRecipe);
  })
  .then((response) => {
    console.log("receta añadida a la BD");
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
