import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export const CreateWaterPage = () => {
  const [date, setDate] = useState();
  const [time, setTime] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  
  const history = useHistory();
  
  const createWater = async () => {
    
    const createdWater = { date, time, quantity, unit };
    
    const response = await fetch('/water', {
      method: 'POST',
      body: JSON.stringify(createdWater),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.status === 201) {
      alert(`Water intake entry from ${date} ${time} has been created`);
    } 
    else {
      alert(`Error ${response.status}: Water intake entry not created.`);
    }
    history.push('/water-tracker');
  }
  
  return (
    <>
        <h2>Create Water Intake Entry</h2>
        <form onSubmit={createWater}>
            <div>
                <label>Date*</label>
                <input required type="date" value={date} onChange={e => setDate(e.target.value)}/>
            </div> 
            
            <div>
                <label>Time*</label>
                <input required type="text" value={time} onChange={e => setTime(e.target.value)}/>
            </div>
            
            <div>
                <label>Quantity*</label>
                <input required type="number" value={quantity} onChange={e => setQuantity(e.target.value)}/>
            </div>

            <div>
                <label>Unit*</label>
                <input required type="text" value={unit} onChange={e => setUnit(e.target.value)}/>
            </div>
            <br>
            </br>
            <p>
            * = Required Field  
            </p>
                       
            <Link className="App-link" to="/water-tracker"><button onClick={createWater}>Save</button></Link>
        </form>

    </>
  );
}

export default CreateWaterPage;