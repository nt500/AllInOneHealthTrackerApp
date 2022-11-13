// Get the mongoose object
import mongoose from 'mongoose';
// Prepare to the database medications_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/medications_db",
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
const medicationsSchema = mongoose.Schema({
    drugName: { type: String, required: true },
    dose: { type: String, required: true },
    timesPerDay: { type: Number, required: true },
    lastFilled: { type: String, required: true, min: '2022-09-01', default: '2022-09-01'},
    refillDue: { type: String, required: true, min: '2022-09-01', default: '2022-09-01'},
});
/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Medication = mongoose.model("Medication", medicationsSchema);

/**
 * Create a medication
 */
 const createMedication = async (drugName, dose, timesPerDay, lastFilled, refillDue) => {
    // Call the constructor to create an instance of the model class Medication
    const medication = new Medication({ drugName: drugName, dose: dose, timesPerDay: timesPerDay, lastFilled: lastFilled, refillDue: refillDue });
    // Call save to persist this object as a document in MongoDB
    return medication.save();
}

/**
 * Retrieve medications based on the filter, projection and limit parameters
 */
const findMedications = async () => {
    const query = Medication.find()
    return query.exec();
}

/**
 * Replace the drug name, dose, times per day, last filled, and refill due properties of the medication with the id value provided
 */
const replaceMedication = async ( {_id, drugName, dose, timesPerDay, lastFilled, refillDue} ) => {
    const result = await Medication.replaceOne( {_id: _id},
      { drugName: drugName, dose: dose, timesPerDay: timesPerDay, lastFilled: lastFilled, refillDue: refillDue });
  
    console.log(result);
    return result.nModified;
}

/**
 * Delete the medication with provided query
 */
const deleteById = async (_id) => {
    const result = await Medication.deleteOne({ _id : _id } );  
    // Return the count of deleted document
    return result.deletedCount;
}

export { createMedication, findMedications, replaceMedication, deleteById };