import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

function EditExercisePage({ exercise }) {
  const [date, setDate] = useState(exercise.date);
  const [type, setType] = useState(exercise.type);
  const [calories, setCalories] = useState(exercise.calories);
  const [minutes, setMinutes] = useState(exercise.minutes);
  const [weight, setWeight] = useState(exercise.weight);
  const [reps, setReps] = useState(exercise.reps);
  
  const [id] = useState(exercise._id);
  
  const history = useHistory(); 
  
  const updateExercise = async () => {
    const updatedExercise = {date, type, calories, minutes, weight, reps};

    const response = await fetch(`/exercises/${exercise._id}`, { 
      method: 'PUT',
      body: JSON.stringify(updatedExercise),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.status === 200) {
      alert(`Exercise ${type} has been updated`);
      history.push('/exercise-tracker');
    } 
    else {
      alert(`Error ${response.status}: Exercise not updated`);
    }
    history.push('/exercise-tracker');
  }
  
  return (
    <div>
        <h2>Edit Exercise</h2>
        <form onSubmit={updateExercise}>
            <div>
                <label>Date*</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
            </div>

            <div>
                <label>Type*</label>
                <input type="text" value={type} onChange={e => setType(e.target.value)}/>
            </div>

            <div>
                <label>Calories Burned</label>
                <input type="number" value={calories} onChange={e => setCalories(e.target.value)}/>
            </div>
            
            <div>
                <label>Minutes*</label>
                <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)}/>
            </div>

            <div>
                <label>Weight</label>
                <input type="number" value={weight} onChange={e => setWeight(e.target.value)}/>
            </div>
            
            <div>
                <label>Reps*</label>
                <input type="number" value={reps} onChange={e => setReps(e.target.value)}/>
            </div>
            <br>
            </br>
            <p>
            * = Required Field  
            </p>

            <Link className="App-link" to="/"><button onClick={updateExercise}>Save</button></Link>
        </form>
    </div>
  );
}

export default EditExercisePage;