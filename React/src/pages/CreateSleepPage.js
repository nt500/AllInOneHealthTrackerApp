import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export const CreateSleepPage = () => {
  const [date, setDate] = useState();
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  
  const history = useHistory();
  
  const createSleep = async () => {
    
    const createdSleep = { date, hours, minutes };
    
    const response = await fetch('/sleep', {
      method: 'POST',
      body: JSON.stringify(createdSleep),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.status === 201) {
      alert(`Sleep entry from ${date} has been created`);
    } 
    else {
      alert(`Error ${response.status}: Sleep entry not created.`);
    }
    history.push('/sleep-tracker');
  }
  
  return (
    <>
        <h2>Create Sleep Entry</h2>
        <form onSubmit={createSleep}>
            <div>
                <label>Date*</label>
                <input required type="date" value={date} onChange={e => setDate(e.target.value)}/>
            </div> 
            
            <div>
                <label>Hours of Sleep*</label>
                <input required type="number" value={hours} onChange={e => setHours(e.target.value)}/>
            </div>

            <div>
                <label>Additional Minutes of Sleep</label>
                <input required type="number" value={minutes} onChange={e => setMinutes(e.target.value)}/>
            </div>
            <br>
            </br>
            <p>
            * = Required Field  
            </p>
                       
            <Link className="App-link" to="/sleep-tracker"><button onClick={createSleep}>Save</button></Link>
        </form>

    </>
  );
}

export default CreateSleepPage;