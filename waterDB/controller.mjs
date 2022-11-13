import * as waters from './model.mjs';
import express from 'express';

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/**
 * Create a new water intake entry with the date, time, quantity, and unit provided in the body
 */
app.post('/water', (req, res) => {
        waters.createWater( 
            req.body.date,
            req.body.time,
            req.body.quantity,
            req.body.unit,
        )       

        .then(water => {
        res.status(201).json(water);    
        })

        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });

});       

/**
 * Retrieve water intake entries. 
 */
app.get('/water', (req, res) => {
    waters.findWaters()
        .then(waters => { 
            res.status(200).json(waters);         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });

});


/**
 * Update the water intake entry whose id is provided in the path parameter and set
 * its date, time, quantity, and unit to the values provided in the body.
 */
app.put('/water/:_id', (req, res) => {
    const filters = {
        _id: req.params._id,
        date: req.body.date,
        time: req.body.time,
        quantity: req.body.quantity,
        unit: req.body.unit
      }
    
      waters.replaceWater(filters)
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
 * Delete the water intake entry whose id is provided in the query parameters
 */
app.delete('/water/:id', (req, res) => {
    waters.deleteById(req.params.id)
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
