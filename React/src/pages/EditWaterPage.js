import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

function EditWaterPage({ water }) {
  const [date, setDate] = useState(water.date);
  const [time, setTime] = useState(water.time);
  const [quantity, setQuantity] = useState(water.quantity);
  const [unit, setUnit] = useState(water.unit);
  
  const [id] = useState(water._id);
  
  const history = useHistory(); 
  
  const updateWater = async () => {
    const updatedWater = {date, time, quantity, unit};

    const response = await fetch(`/water/${water._id}`, { 
      method: 'PUT',
      body: JSON.stringify(updatedWater),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.status === 200) {
      alert(`Water intake entry from ${date} ${time} has been updated`);
      history.push('/water-tracker');
    } 
    else {
      alert(`Error ${response.status}: Water intake entry not updated`);
    }
    history.push('/water-tracker');
  }
  
  return (
    <div>
        <h2>Edit Water Intake Entry</h2>
        <form onSubmit={updateWater}>
            <div>
                <label>Date*</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
            </div>

            <div>
                <label>Time*</label>
                <input type="text" value={time} onChange={e => setTime(e.target.value)}/>
            </div>

            <div>
                <label>Quantity*</label>
                <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)}/>
            </div>
            
            <div>
                <label>Unit*</label>
                <input type="text" value={unit} onChange={e => setUnit(e.target.value)}/>
            </div>
            <br>
            </br>
            <p>
            * = Required Field  
            </p>

            <Link className="App-link" to="/water-tracker"><button onClick={updateWater}>Save</button></Link>
        </form>
    </div>
  );
}

export default EditWaterPage;