import * as weights from './model.mjs';
import express from 'express';

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/**
 * Create a new weight entry with the date, weight, and weight change provided in the body
 */
app.post('/weight', (req, res) => {
        weights.createWeight( 
            req.body.date,
            req.body.weightLbs,
            req.body.weightChange
        )       

        .then(weight => {
        res.status(201).json(weight);    
        })

        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });

});       

/**
 * Retrieve weights. 
 */
app.get('/weight', (req, res) => {
    weights.findWeights()
        .then(weights => { 
            res.status(200).json(weights);         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });

});


/**
 * Update the weight whose id is provided in the path parameter and set
 * its date, weight, and weight change to the values provided in the body.
 */
app.put('/weight/:_id', (req, res) => {
    const filters = {
        _id: req.params._id,
        date: req.body.date,
        weightLbs: req.body.weightLbs,
        weightChange: req.body.weightChange
      }
    
      weights.replaceWeight(filters)
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
 * Delete the weight entry whose id is provided in the query parameters
 */
app.delete('/weight/:id', (req, res) => {
    weights.deleteById(req.params.id)
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
