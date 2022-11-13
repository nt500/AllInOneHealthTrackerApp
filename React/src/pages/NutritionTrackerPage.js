import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NutritionTable from '../components/NutritionTable.js';

function NutritionTrackerPage({ setMeal }) {
  const [meals, setMeals] = useState([]);
  const history = useHistory();
  
  const loadMeals = async () => {
    const response = await fetch('/nutrition',{method: 'GET'});
    const data = await response.json();
    setMeals(data);  
  }
  
  const onDelete = async (id) => {
    const response = await fetch(`/nutrition/${id}`, { method: 'DELETE' });
    
    if ( response.status === 204) {
      setMeals(meals.filter( meal => meal._id !== id ));
    } 
    else {
      console.error(`Error ${response.status}: Meal not deleted`);
    }
  }
  
  const onEdit = async (meal) => {
    setMeal(meal);
    await history.push(`/nutrition/${meal._id}`);
  }
  
  useEffect(() => {
    loadMeals();
  }, []);
  
  return (
    <div>
        <h1>
        Nutrition Tracker
        </h1> 
        <br>
        </br>
        <br>
        </br>
        <NutritionTable meals={meals} onEdit={onEdit} onDelete={onDelete} />
        <br></br>
        <br></br>
        <Link to="/create-meal">Add a meal</Link>
        <br></br>
        <br></br>
        <Link to="/">Return to the Home Page</Link>
    </div>
  );
}

export default NutritionTrackerPage;