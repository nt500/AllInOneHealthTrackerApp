import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable.js';

function ExerciseTrackerPage({ setExercise }) {
  const [exercises, setExercises] = useState([]);
  const history = useHistory();
  
  const loadExercises = async () => {
    const response = await fetch('/exercises',{method: 'GET'});
    const data = await response.json();
    setExercises(data);  
  }
  
  const onDelete = async (id) => {
    const response = await fetch(`/exercises/${id}`, { method: 'DELETE' });
    
    if ( response.status === 204) {
      setExercises(exercises.filter( exercise => exercise._id !== id ));
    } 
    else {
      console.error(`Error ${response.status}: Exercise not deleted`);
    }
  }
  
  const onEdit = async (exercise) => {
    setExercise(exercise);
    await history.push(`/exercises/${exercise._id}`);
  }
  
  useEffect(() => {
    loadExercises();
  }, []);
  
  return (
    <div>
        <h1>
        Exercise Tracker
        </h1> 
        <br>
        </br>
        <br>
        </br>
        <ExerciseTable exercises={exercises} onEdit={onEdit} onDelete={onDelete} />
        <br></br>
        <br></br>
        <Link to="/create-exercise">Add an exercise</Link>
        <br></br>
        <br></br>
        <Link to="/">Return to the Home Page</Link>
    </div>
  );
}

export default ExerciseTrackerPage;