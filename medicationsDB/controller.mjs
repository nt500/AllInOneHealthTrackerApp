import * as medications from './model.mjs';
import express from 'express';

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/**
 * Create a new medication with the drug name, dose, times per day, last filled, and refill due provided in the body
 */
app.post('/medications', (req, res) => {
        medications.createMedication( 
            req.body.drugName,
            req.body.dose,
            req.body.timesPerDay,
            req.body.lastFilled,
            req.body.refillDue
        )       

        .then(medication => {
        res.status(201).json(medication);    
        })

        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });

});       

/**
 * Retrieve medications. 
 */
app.get('/medications', (req, res) => {
    medications.findMedications()
        .then(medications => { 
            res.status(200).json(medications);         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });

});


/**
 * Update the medication whose id is provided in the path parameter and set
 * its drug name, dose, times per day, last filled, and refill due to the values provided in the body.
 */
app.put('/medications/:_id', (req, res) => {
    const filters = {
        _id: req.params._id,
        drugName: req.body.drugName,
        dose: req.body.dose,
        timesPerDay: req.body.timesPerDay,
        lastFilled: req.body.lastFilled,
        refillDue: req.body.refillDue
      }
    
      medications.replaceMedication(filters)
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
 * Delete the medication whose id is provided in the query parameters
 */
app.delete('/medications/:id', (req, res) => {
    medications.deleteById(req.params.id)
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
