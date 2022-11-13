// Get the mongoose object
import mongoose from 'mongoose';
// Prepare to the database exercises_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
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
const exerciseSchema = mongoose.Schema({
    date: { type: String, required: true, min: '2022-09-01', default: '2022-09-01'},
    type: { type: String, required: true },
    calories: { type: Number, required: false },
    minutes: { type: Number, required: true },
    weight: { type: Number, required: false },
    reps: { type: Number, required: true }
});
/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create an exercise
 */
 const createExercise = async (date, type, calories, minutes, weight, reps) => {
    // Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({ date: date, type: type, calories: calories, minutes: minutes, weight: weight, reps: reps });
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
}

/**
 * Retrive exercises based on the filter, projection and limit parameters
 */
const findExercises = async () => {
    const query = Exercise.find()
    return query.exec();
}

/**
 * Replace the date, type, calories, minutes, weight, and reps properties of the exercise with the id value provided
 */
const replaceExercise = async ( {_id, date, type, calories, minutes, weight, reps} ) => {
    const result = await Exercise.replaceOne( {_id: _id},
      { date: date, type: type, calories: calories, minutes: minutes, weight: weight, reps: reps });
  
    console.log(result);
    return result.nModified;
}

/**
 * Delete the exercise with provided query
 */
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id : _id } );  
    // Return the count of deleted document
    return result.deletedCount;
}

export { createExercise, findExercises, replaceExercise, deleteById };