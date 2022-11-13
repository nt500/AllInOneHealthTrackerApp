import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SleepTable from '../components/SleepTable.js';

function SleepTrackerPage({ setSleep }) {
  const [sleeps, setSleeps] = useState([]);
  const history = useHistory();
  
  const loadSleeps = async () => {
    const response = await fetch('/sleep',{method: 'GET'});
    const data = await response.json();
    setSleeps(data);  
  }
  
  const onDelete = async (id) => {
    const response = await fetch(`/sleep/${id}`, { method: 'DELETE' });
    
    if ( response.status === 204) {
      setSleeps(sleeps.filter( sleep => sleep._id !== id ));
    } 
    else {
      console.error(`Error ${response.status}: Sleep entry not deleted`);
    }
  }
  
  const onEdit = async (sleep) => {
    setSleep(sleep);
    await history.push(`/sleep/${sleep._id}`);
  }
  
  useEffect(() => {
    loadSleeps();
  }, []);
  
  return (
    <div>
        <h1>
        Sleep Tracker
        </h1> 
        <br>
        </br>
        <br>
        </br>
        <SleepTable sleeps={sleeps} onEdit={onEdit} onDelete={onDelete} />
        <br></br>
        <br></br>
        <Link to="/create-sleep">Add a sleep entry</Link>
        <br></br>
        <br></br>
        <Link to="/">Return to the Home Page</Link>
    </div>
  );
}

export default SleepTrackerPage;