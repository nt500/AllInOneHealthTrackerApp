import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

function EditWeightPage({ weight }) {
  const [date, setDate] = useState(weight.date);
  const [weightLbs, setWeightLbs] = useState(weight.weightLbs);
  const [weightChange, setWeightChange] = useState(weight.weightChange);
  
  const [id] = useState(weight._id);
  
  const history = useHistory(); 
  
  const updateWeight = async () => {
    const updatedWeight = {date, weightLbs, weightChange};

    const response = await fetch(`/weight/${weight._id}`, { 
      method: 'PUT',
      body: JSON.stringify(updatedWeight),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.status === 200) {
      alert(`Weight entry from ${date} has been updated`);
      history.push('/weight-tracker');
    } 
    else {
      alert(`Error ${response.status}: Weight not updated`);
    }
    history.push('/weight-tracker');
  }
  
  return (
    <div>
        <h2>Edit Weight Entry</h2>
        <form onSubmit={updateWeight}>
            <div>
                <label>Date*</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
            </div>

            <div>
                <label>Weight (lbs)*</label>
                <input type="number" value={weightLbs} onChange={e => setWeightLbs(e.target.value)}/>
            </div>
            
            <div>
                <label>Weight Change (lbs)*</label>
                <input type="number" value={weightChange} onChange={e => setWeightChange(e.target.value)}/>
            </div>

            <br>
            </br>
            <p>
            * = Required Field  
            </p>

            <Link className="App-link" to="/weight-tracker"><button onClick={updateWeight}>Save</button></Link>
        </form>
    </div>
  );
}

export default EditWeightPage;