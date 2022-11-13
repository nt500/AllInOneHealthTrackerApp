import * as sleeps from './model.mjs';
import express from 'express';

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/**
 * Create a new sleep entry with the date, hours of sleep, and additional minutes of sleep provided in the body
 */
app.post('/sleep', (req, res) => {
        sleeps.createSleep( 
            req.body.date,
            req.body.hours,
            req.body.minutes
        )       

        .then(sleep => {
        res.status(201).json(sleep);    
        })

        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });

});       

/**
 * Retrieve sleep entries. 
 */
app.get('/sleep', (req, res) => {
    sleeps.findSleeps()
        .then(sleeps => { 
            res.status(200).json(sleeps);         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });

});


/**
 * Update the sleep whose id is provided in the path parameter and set
 * its date, hours of sleep, and additional minutes of sleep to the values provided in the body.
 */
app.put('/sleep/:_id', (req, res) => {
    const filters = {
        _id: req.params._id,
        date: req.body.date,
        hours: req.body.hours,
        minutes: req.body.minutes
      }
    
      sleeps.replaceSleep(filters)
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
 * Delete the sleep entry whose id is provided in the query parameters
 */
app.delete('/sleep/:id', (req, res) => {
    sleeps.deleteById(req.params.id)
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
