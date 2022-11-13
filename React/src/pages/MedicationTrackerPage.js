import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MedicationTable from '../components/MedicationTable.js';

function MedicationTrackerPage({ setMedication }) {
  const [medications, setMedications] = useState([]);
  const history = useHistory();
  
  const loadMedications = async () => {
    const response = await fetch('/medications',{method: 'GET'});
    const data = await response.json();
    setMedications(data);  
  }
  
  const onDelete = async (id) => {
    const response = await fetch(`/medications/${id}`, { method: 'DELETE' });
    
    if ( response.status === 204) {
      setMedications(medications.filter( medication => medication._id !== id ));
    } 
    else {
      console.error(`Error ${response.status}: Medication not deleted`);
    }
  }
  
  const onEdit = async (medication) => {
    setMedication(medication);
    await history.push(`/medications/${medication._id}`);
  }
  
  useEffect(() => {
    loadMedications();
  }, []);
  
  return (
    <div>
        <h1>
        Medications Tracker
        </h1> 
        <br>
        </br>
        <br>
        </br>
        <MedicationTable medications={medications} onEdit={onEdit} onDelete={onDelete} />
        <br></br>
        <br></br>
        <Link to="/create-medication">Add a medication</Link>
        <br></br>
        <br></br>
        <Link to="/">Return to the Home Page</Link>
    </div>
  );
}

export default MedicationTrackerPage;