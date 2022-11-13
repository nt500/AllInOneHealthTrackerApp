// Get the mongoose object
import mongoose from 'mongoose';
// Prepare to the database water_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/water_db",
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
const waterSchema = mongoose.Schema({
    date: { type: String, required: true, min: '2022-09-01', default: '2022-09-01'},
    time: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true }
});
/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Water = mongoose.model("Water", waterSchema);

/**
 * Create a water intake entry
 */
 const createWater = async (date, time, quantity, unit) => {
    // Call the constructor to create an instance of the model class Water
    const water = new Water({ date: date, time: time, quantity: quantity, unit: unit });
    // Call save to persist this object as a document in MongoDB
    return water.save();
}

/**
 * Retrive water intake entries based on the filter, projection and limit parameters
 */
const findWaters = async () => {
    const query = Water.find()
    return query.exec();
}

/**
 * Replace the date, type, calories, minutes, weight, and reps properties of the water intake entry with the id value provided
 */
const replaceWater = async ( {_id, date, time, quantity, unit} ) => {
    const result = await Water.replaceOne( {_id: _id},
      { date: date, time: time, quantity: quantity, unit: unit });
  
    console.log(result);
    return result.nModified;
}

/**
 * Delete the water intake entry with provided query
 */
const deleteById = async (_id) => {
    const result = await Water.deleteOne({ _id : _id } );  
    // Return the count of deleted document
    return result.deletedCount;
}

export { createWater, findWaters, replaceWater, deleteById };