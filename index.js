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
    console.log("Esta es la receta añadida");
    return Recipe.find().select({ title: 1, _id: 0 });
  })
  .then((response) => {
    console.log(response);
    return Recipe.insertMany(data);
  })
  .then((response) => {
    console.log("Ahora hemos agregado toda la matriz de datos");
    return Recipe.find().select({ title: 1, _id: 0 });
  })
  .then((response) => {
    console.log(response);
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((response) => {
    console.log("Ahora ya hemos cambiado el tiempo a la receta!");
  })
  .then((response) => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((response) => {
    console.log("La Carrot Cake fue eliminada!");

    return mongoose.connection.close();
  })
  .then(() => console.log(`connection.closed`))
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
