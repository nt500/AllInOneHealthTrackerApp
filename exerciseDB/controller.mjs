import * as exercises from './model.mjs';
import express from 'express';

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/**
 * Create a new exercise with the date, type, calories, minutes, weight, and reps provided in the body
 */
app.post('/exercises', (req, res) => {
        exercises.createExercise( 
            req.body.date,
            req.body.type,
            req.body.calories,
            req.body.minutes,
            req.body.weight, 
            req.body.reps
        )       

        .then(exercise => {
        res.status(201).json(exercise);    
        })

        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });

});       

/**
 * Retrieve exercises. 
 */
app.get('/exercises', (req, res) => {
    exercises.findExercises()
        .then(exercises => { 
            res.status(200).json(exercises);         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });

});


/**
 * Update the exercise whose id is provided in the path parameter and set
 * its date, type, calories, minutes, weight, and reps to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    const filters = {
        _id: req.params._id,
        date: req.body.date,
        type: req.body.type,
        calories: req.body.calories,
        minutes: req.body.minutes,
        weight: req.body.weight,
        reps: req.body.reps
      }
    
      exercises.replaceExercise(filters)
        .then(nModified => {
          if (nModified === 1){
            res.json(filters) 
            res.status(200).send();
          } 
          else {
            res.status(404).json({ Error: 'Resource not found' })
          }
        })
        .catch(error => {
          console.error(error)
          res.status(400).json({ Error: 'Request failed' })
        });
    });

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:id', (req, res) => {
    exercises.deleteById(req.params.id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
