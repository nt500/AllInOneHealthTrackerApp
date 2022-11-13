import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import WaterTable from '../components/WaterTable.js';

function WaterTrackerPage({ setWater }) {
  const [waters, setWaters] = useState([]);
  const history = useHistory();
  
  const loadWaters = async () => {
    const response = await fetch('/water',{method: 'GET'});
    const data = await response.json();
    setWaters(data);  
  }
  
  const onDelete = async (id) => {
    const response = await fetch(`/water/${id}`, { method: 'DELETE' });
    
    if ( response.status === 204) {
      setWaters(waters.filter( water => water._id !== id ));
    } 
    else {
      console.error(`Error ${response.status}: Water intake entry not deleted`);
    }
  }
  
  const onEdit = async (water) => {
    setWater(water);
    await history.push(`/water/${water._id}`);
  }
  
  useEffect(() => {
    loadWaters();
  }, []);
  
  return (
    <div>
        <h1>
        Water Intake Tracker
        </h1> 
        <br>
        </br>
        <br>
        </br>
        <WaterTable waters={waters} onEdit={onEdit} onDelete={onDelete} />
        <br></br>
        <br></br>
        <Link to="/create-water">Add a water intake entry</Link>
        <br></br>
        <br></br>
        <Link to="/">Return to the Home Page</Link>
    </div>
  );
}

export default WaterTrackerPage;