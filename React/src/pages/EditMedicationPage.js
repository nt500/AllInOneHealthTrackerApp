import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

function EditMedicationPage({ medication }) {
  const [drugName, setDrugName] = useState(medication.drugName);
  const [dose, setDose] = useState(medication.dose);
  const [timesPerDay, setTimesPerDay] = useState(medication.timesPerDay);
  const [lastFilled, setLastFilled] = useState(medication.lastFilled);
  const [refillDue, setRefillDue] = useState(medication.refillDue);
  
  const [id] = useState(medication._id);
  
  const history = useHistory(); 
  
  const updateMedication = async () => {
    const updatedMedication = {drugName, dose, timesPerDay, lastFilled, refillDue};

    const response = await fetch(`/medications/${medication._id}`, { 
      method: 'PUT',
      body: JSON.stringify(updatedMedication),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.status === 200) {
      alert(`Medication ${drugName} has been updated`);
      history.push('/medications-tracker');
    } 
    else {
      alert(`Error ${response.status}: Medication not updated`);
    }
    history.push('/medications-tracker');
  }
  
  return (
    <div>
        <h2>Edit Medication</h2>
        <form onSubmit={updateMedication}>
            <div>
                <label>Drug Name*</label>
                <input type="text" value={drugName} onChange={e => setDrugName(e.target.value)}/>
            </div>

            <div>
                <label>Dose*</label>
                <input type="text" value={dose} onChange={e => setDose(e.target.value)}/>
            </div>
            
            <div>
                <label>Times/Day*</label>
                <input type="number" value={timesPerDay} onChange={e => setTimesPerDay(e.target.value)}/>
            </div>

            <div>
                <label>Last Filled*</label>
                <input type="date" value={lastFilled} onChange={e => setLastFilled(e.target.value)}/>
            </div>
            
            <div>
                <label>Refill Due*</label>
                <input type="date" value={refillDue} onChange={e => setRefillDue(e.target.value)}/>
            </div>
            <br>
            </br>
            <p>
            * = Required Field  
            </p>

            <Link className="App-link" to="/medications-tracker"><button onClick={updateMedication}>Save</button></Link>
        </form>
    </div>
  );
}

export default EditMedicationPage;