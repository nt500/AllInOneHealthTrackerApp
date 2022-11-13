import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export const CreateMedicationPage = () => {
  const [drugName, setDrugName] = useState('');
  const [dose, setDose] = useState('');
  const [timesPerDay, setTimesPerDay] = useState('');
  const [lastFilled, setLastFilled] = useState();
  const [refillDue, setRefillDue] = useState();
  
  const history = useHistory();
  
  const createMedication = async () => {
    
    const createdMedication = { drugName, dose, timesPerDay, lastFilled, refillDue };
    
    const response = await fetch('/medications', {
      method: 'POST',
      body: JSON.stringify(createdMedication),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.status === 201) {
      alert(`Medication ${drugName} has been created`);
    } 
    else {
      alert(`Error ${response.status}: Medication not created.`);
    }
    history.push('/medications-tracker');
  }
  
  return (
    <>
        <h2>Create Medication</h2>
        <form onSubmit={createMedication}>
            <div>
                <label>Drug Name*</label>
                <input required type="text" value={drugName} onChange={e => setDrugName(e.target.value)}/>
            </div>

            <div>
                <label>Dose*</label>
                <input required type="text" value={dose} onChange={e => setDose(e.target.value)}/>
            </div>

            <div>
                <label>Times Per Day*</label>
                <input required type="number" value={timesPerDay} onChange={e => setTimesPerDay(e.target.value)}/>
            </div>

            <div>
                <label>Last Filled*</label>
                <input required type="date" value={lastFilled} onChange={e => setLastFilled(e.target.value)}/>
            </div> 

            <div>
                <label>Refill Due*</label>
                <input required type="date" value={refillDue} onChange={e => setRefillDue(e.target.value)}/>
            </div>
            <br>
            </br>
            <p>
            * = Required Field  
            </p>
                       
            <Link className="App-link" to="/medications-tracker"><button onClick={createMedication}>Save</button></Link>
        </form>

    </>
  );
}

export default CreateMedicationPage;