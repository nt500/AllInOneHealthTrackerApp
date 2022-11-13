import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export const CreateMealPage = () => {
  const [date, setDate] = useState();
  const [foodType, setFoodType] = useState('');
  const [carbohydrate, setCarobhydrate] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');
  const [totalCalories, setTotalCalories] = useState('');
  
  const history = useHistory();
  
  const createMeal = async () => {
    
    const createdMeal = { date, foodType, carbohydrate, fat, protein, totalCalories };
    
    const response = await fetch('/nutrition', {
      method: 'POST',
      body: JSON.stringify(createdMeal),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.status === 201) {
      alert(`Meal ${foodType} has been created`);
    } 
    else {
      alert(`Error ${response.status}: Meal not created.`);
    }
    history.push('/nutrition-tracker');
  }
  
  return (
    <>
        <h2>Create Meal</h2>
        <form onSubmit={createMeal}>
            <div>
                <label>Date*</label>
                <input required type="date" value={date} onChange={e => setDate(e.target.value)}/>
            </div> 
            
            <div>
                <label>Food Type*</label>
                <input required type="text" value={foodType} onChange={e => setFoodType(e.target.value)}/>
            </div>
            
            <div>
                <label>Carbohydrate (g)</label>
                <input required type="number" value={carbohydrate} onChange={e => setCarobhydrate(e.target.value)}/>
            </div>

            <div>
                <label>Fat (g)</label>
                <input required type="number" value={fat} onChange={e => setFat(e.target.value)}/>
            </div>

            <div>
                <label>Protein (g)</label>
                <input required type="number" value={protein} onChange={e => setProtein(e.target.value)}/>
            </div>

            <div>
                <label>Total Calories*</label>
                <input required type="number" value={totalCalories} onChange={e => setTotalCalories(e.target.value)}/>
            </div>
            <br>
            </br>
            <p>
            * = Required Field  
            </p>
                       
            <Link className="App-link" to="/nutrition-tracker"><button onClick={createMeal}>Save</button></Link>
        </form>

    </>
  );
}

export default CreateMealPage;