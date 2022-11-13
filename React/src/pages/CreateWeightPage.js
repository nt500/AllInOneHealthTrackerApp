import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export const CreateWeightPage = () => {
  const [date, setDate] = useState();
  const [weightLbs, setWeight] = useState('');
  const [weightChange, setWeightChange] = useState('');
  
  const history = useHistory();
  
  const createWeight = async () => {
    
    const createdWeight = { date, weightLbs, weightChange };
    
    const response = await fetch('/weight', {
      method: 'POST',
      body: JSON.stringify(createdWeight),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.status === 201) {
      alert(`Weight entry from ${date} has been created`);
    } 
    else {
      alert(`Error ${response.status}: Weight entry not created.`);
    }
    history.push('/weight-tracker');
  }
  
  return (
    <>
        <h2>Create Weight Entry</h2>
        <form onSubmit={createWeight}>
            <div>
                <label>Date*</label>
                <input required type="date" value={date} onChange={e => setDate(e.target.value)}/>
            </div> 
            
            <div>
                <label>Weight (lbs)*</label>
                <input required type="number" value={weightLbs} onChange={e => setWeight(e.target.value)}/>
            </div>

            <div>
                <label>Weight Change (lbs)*</label>
                <input required type="number" value={weightChange} onChange={e => setWeightChange(e.target.value)}/>
            </div>
            <br>
            </br>
            <p>
            * = Required Field  
            </p>
                       
            <Link className="App-link" to="/weight-tracker"><button onClick={createWeight}>Save</button></Link>
        </form>

    </>
  );
}

export default CreateWeightPage;