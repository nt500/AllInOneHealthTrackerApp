// Get the mongoose object
import mongoose from 'mongoose';
// Prepare to the database nutrition_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/nutrition_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);
// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});
/**
 * Define the schema
 */
const nutritionSchema = mongoose.Schema({
    date: { type: String, required: true, min: '2022-09-01', default: '2022-09-01'},
    foodType: { type: String, required: true },
    carbohydrate: { type: Number, required: false },
    fat: { type: Number, required: false },
    protein: { type: Number, required: false },
    totalCalories: { type: Number, required: true }
});
/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Meal = mongoose.model("Meal", nutritionSchema);

/**
 * Create a meal
 */
 const createMeal = async (date, foodType, carbohydrate, fat, protein, totalCalories) => {
    // Call the constructor to create an instance of the model class Meal
    const meal = new Meal({ date: date, foodType: foodType, carbohydrate: carbohydrate, fat: fat, protein: protein, totalCalories: totalCalories });
    // Call save to persist this object as a document in MongoDB
    return meal.save();
}

/**
 * Retrieve meals based on the filter, projection and limit parameters
 */
const findMeals = async () => {
    const query = Meal.find()
    return query.exec();
}

/**
 * Replace the date, food type, carbohydrate, fat, protein, and total calories properties of the meal with the id value provided
 */
const replaceMeal = async ( {_id, date, foodType, carbohydrate, fat, protein, totalCalories} ) => {
    const result = await Meal.replaceOne( {_id: _id},
      { date: date, foodType: foodType, carbohydrate: carbohydrate, fat: fat, protein: protein, totalCalories: totalCalories });
  
    console.log(result);
    return result.nModified;
}

/**
 * Delete the meal with provided query
 */
const deleteById = async (_id) => {
    const result = await Meal.deleteOne({ _id : _id } );  
    // Return the count of deleted document
    return result.deletedCount;
}

export { createMeal, findMeals, replaceMeal, deleteById };