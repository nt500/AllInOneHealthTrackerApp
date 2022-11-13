import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export const CreateExercisePage = () => {
  const [date, setDate] = useState();
  const [type, setType] = useState('');
  const [calories, setCalories] = useState('');
  const [minutes, setMinutes] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  
  const history = useHistory();
  
  const createExercise = async () => {
    
    const createdExercise = { date, type, calories, minutes, weight, reps };
    
    const response = await fetch('/exercises', {
      method: 'POST',
      body: JSON.stringify(createdExercise),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.status === 201) {
      alert(`Exercise ${type} has been created`);
    } 
    else {
      alert(`Error ${response.status}: Exercise not created.`);
    }
    history.push('/exercise-tracker');
  }
  
  return (
    <>
        <h2>Create Exercise</h2>
        <form onSubmit={createExercise}>
            <div>
                <label>Date*</label>
                <input required type="date" value={date} onChange={e => setDate(e.target.value)}/>
            </div> 
            
            <div>
                <label>Type*</label>
                <input required type="text" value={type} onChange={e => setType(e.target.value)}/>
            </div>
            
            <div>
                <label>Calories Burned</label>
                <input required type="number" value={calories} onChange={e => setCalories(e.target.value)}/>
            </div>

            <div>
                <label>Minutes*</label>
                <input required type="number" value={minutes} onChange={e => setMinutes(e.target.value)}/>
            </div>

            <div>
                <label>Weight</label>
                <input required type="number" value={weight} onChange={e => setWeight(e.target.value)}/>
            </div>

            <div>
                <label>Reps*</label>
                <input required type="number" value={reps} onChange={e => setReps(e.target.value)}/>
            </div>
            <br>
            </br>
            <p>
            * = Required Field  
            </p>
                       
            <Link className="App-link" to="/"><button onClick={createExercise}>Save</button></Link>
        </form>

    </>
  );
}

export default CreateExercisePage;
