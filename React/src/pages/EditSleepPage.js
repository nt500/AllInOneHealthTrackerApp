import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

function EditSleepPage({ sleep }) {
  const [date, setDate] = useState(sleep.date);
  const [hours, setHours] = useState(sleep.hours);
  const [minutes, setMinutes] = useState(sleep.minutes);
  
  const [id] = useState(sleep._id);
  
  const history = useHistory(); 
  
  const updateSleep = async () => {
    const updatedSleep = {date, hours, minutes};

    const response = await fetch(`/sleep/${sleep._id}`, { 
      method: 'PUT',
      body: JSON.stringify(updatedSleep),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.status === 200) {
      alert(`Sleep entry from ${date} has been updated`);
      history.push('/sleep-tracker');
    } 
    else {
      alert(`Error ${response.status}: Sleep entry not updated`);
    }
    history.push('/sleep-tracker');
  }
  
  return (
    <div>
        <h2>Edit Sleep Entry</h2>
        <form onSubmit={updateSleep}>
            <div>
                <label>Date*</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
            </div>

            <div>
                <label>Hours of Sleep*</label>
                <input type="number" value={hours} onChange={e => setHours(e.target.value)}/>
            </div>
            
            <div>
                <label>Additional Minutes of Sleep</label>
                <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)}/>
            </div>

            <br>
            </br>
            <p>
            * = Required Field  
            </p>

            <Link className="App-link" to="/sleep-tracker"><button onClick={updateSleep}>Save</button></Link>
        </form>
    </div>
  );
}

export default EditSleepPage;