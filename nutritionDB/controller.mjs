import * as meals from './model.mjs';
import express from 'express';

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/**
 * Create a new meal with the date, food type, carbohydrate, fat, protein, and total calories provided in the body
 */
app.post('/nutrition', (req, res) => {
        meals.createMeal( 
            req.body.date,
            req.body.foodType,
            req.body.carbohydrate,
            req.body.fat,
            req.body.protein, 
            req.body.totalCalories
        )       

        .then(meal => {
        res.status(201).json(meal);    
        })

        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });

});       

/**
 * Retrieve meals. 
 */
app.get('/nutrition', (req, res) => {
    meals.findMeals()
        .then(meals => { 
            res.status(200).json(meals);         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });

});


/**
 * Update the meal whose id is provided in the path parameter and set
 * its date, food type, carbohydrate, fat, protein, and total calories to the values provided in the body.
 */
app.put('/nutrition/:_id', (req, res) => {
    const filters = {
        _id: req.params._id,
        date: req.body.date,
        foodType: req.body.foodType,
        carbohydrate: req.body.carbohydrate,
        fat: req.body.fat,
        protein: req.body.protein,
        totalCalories: req.body.totalCalories
      }
    
      meals.replaceMeal(filters)
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
 * Delete the meal whose id is provided in the query parameters
 */
app.delete('/nutrition/:id', (req, res) => {
    meals.deleteById(req.params.id)
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
