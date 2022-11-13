import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import WeightTable from '../components/WeightTable.js';

function WeightTrackerPage({ setWeight }) {
  const [weights, setWeights] = useState([]);
  const history = useHistory();
  
  const loadWeights = async () => {
    const response = await fetch('/weight',{method: 'GET'});
    const data = await response.json();
    setWeights(data);  
  }
  
  const onDelete = async (id) => {
    const response = await fetch(`/weight/${id}`, { method: 'DELETE' });
    
    if ( response.status === 204) {
      setWeights(weights.filter( weight => weight._id !== id ));
    } 
    else {
      console.error(`Error ${response.status}: Weight not deleted`);
    }
  }
  
  const onEdit = async (weight) => {
    setWeight(weight);
    await history.push(`/weight/${weight._id}`);
  }
  
  useEffect(() => {
    loadWeights();
  }, []);
  
  return (
    <div>
        <h1>
        Weight Tracker
        </h1> 
        <br>
        </br>
        <br>
        </br>
        <WeightTable weights={weights} onEdit={onEdit} onDelete={onDelete} />
        <br></br>
        <br></br>
        <Link to="/create-weight">Add a weight entry</Link>
        <br></br>
        <br></br>
        <Link to="/">Return to the Home Page</Link>
    </div>
  );
}

export default WeightTrackerPage;