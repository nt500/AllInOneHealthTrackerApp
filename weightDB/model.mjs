// Get the mongoose object
import mongoose from 'mongoose';
// Prepare to the database weight_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/weight_db",
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
const weightSchema = mongoose.Schema({
    date: { type: String, required: true, min: '2022-09-01', default: '2022-09-01'},
    weightLbs: { type: Number, required: true },
    weightChange: { type: Number, required: true },
});
/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Weight = mongoose.model("Weight", weightSchema);

/**
 * Create a weight entry
 */
 const createWeight = async (date, weightLbs, weightChange) => {
    // Call the constructor to create an instance of the model class Weight
    const weight = new Weight({ date: date, weightLbs: weightLbs, weightChange: weightChange });
    // Call save to persist this object as a document in MongoDB
    return weight.save();
}

/**
 * Retrieve weights based on the filter, projection and limit parameters
 */
const findWeights = async () => {
    const query = Weight.find()
    return query.exec();
}

/**
 * Replace the date, weight, amd weight change properties of the entry with the id value provided
 */
const replaceWeight = async ( {_id, date, weightLbs, weightChange} ) => {
    const result = await Weight.replaceOne( {_id: _id},
      { date: date, weightLbs: weightLbs, weightChange: weightChange });
  
    console.log(result);
    return result.nModified;
}

/**
 * Delete the weight entry with provided query
 */
const deleteById = async (_id) => {
    const result = await Weight.deleteOne({ _id : _id } );  
    // Return the count of deleted document
    return result.deletedCount;
}

export { createWeight, findWeights, replaceWeight, deleteById };
