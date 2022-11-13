// Get the mongoose object
import mongoose from 'mongoose';
// Prepare to the database sleep_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/sleep_db",
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
const sleepSchema = mongoose.Schema({
    date: { type: String, required: true, min: '2022-09-01', default: '2022-09-01'},
    hours: { type: Number, required: true },
    minutes: { type: Number, required: false },
});
/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Sleep = mongoose.model("Sleep", sleepSchema);

/**
 * Create a sleep entry
 */
 const createSleep = async (date, hours, minutes) => {
    // Call the constructor to create an instance of the model class Sleep
    const sleep = new Sleep({ date: date, hours: hours, minutes: minutes });
    // Call save to persist this object as a document in MongoDB
    return sleep.save();
}

/**
 * Retrieve sleep entries based on the filter, projection and limit parameters
 */
const findSleeps = async () => {
    const query = Sleep.find()
    return query.exec();
}

/**
 * Replace the date, hours, and minutes properties of the entry with the id value provided
 */
const replaceSleep = async ( {_id, date, hours, minutes} ) => {
    const result = await Sleep.replaceOne( {_id: _id},
      { date: date, hours: hours, minutes: minutes });
  
    console.log(result);
    return result.nModified;
}

/**
 * Delete the sleep entry with provided query
 */
const deleteById = async (_id) => {
    const result = await Sleep.deleteOne({ _id : _id } );  
    // Return the count of deleted document
    return result.deletedCount;
}

export { createSleep, findSleeps, replaceSleep, deleteById };