import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

function EditMealPage({ meal }) {
  const [date, setDate] = useState(meal.date);
  const [foodType, setFoodType] = useState(meal.foodType);
  const [carbohydrate, setCarbohydrate] = useState(meal.carbohydrate);
  const [fat, setFat] = useState(meal.fat);
  const [protein, setProtein] = useState(meal.protein);
  const [totalCalories, setTotalCalories] = useState(meal.totalCalories);
  
  const [id] = useState(meal._id);
  
  const history = useHistory(); 
  
  const updateMeal = async () => {
    const updatedMeal = {date, foodType, carbohydrate, fat, protein, totalCalories};

    const response = await fetch(`/nutrition/${meal._id}`, { 
      method: 'PUT',
      body: JSON.stringify(updatedMeal),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.status === 200) {
      alert(`Meal ${foodType} has been updated`);
      history.push('/nutrition-tracker');
    } 
    else {
      alert(`Error ${response.status}: Meal not updated`);
    }
    history.push('/nutrition-tracker');
  }
  
  return (
    <div>
        <h2>Edit Meal</h2>
        <form onSubmit={updateMeal}>
            <div>
                <label>Date*</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
            </div>

            <div>
                <label>Food Type*</label>
                <input type="text" value={foodType} onChange={e => setFoodType(e.target.value)}/>
            </div>

            <div>
                <label>Carbohydrate (g)</label>
                <input type="number" value={carbohydrate} onChange={e => setCarbohydrate(e.target.value)}/>
            </div>
            
            <div>
                <label>Fat (g)</label>
                <input type="number" value={fat} onChange={e => setFat(e.target.value)}/>
            </div>

            <div>
                <label>Protein</label>
                <input type="number" value={protein} onChange={e => setProtein(e.target.value)}/>
            </div>
            
            <div>
                <label>Total Calories*</label>
                <input type="number" value={totalCalories} onChange={e => setTotalCalories(e.target.value)}/>
            </div>
            <br>
            </br>
            <p>
            * = Required Field  
            </p>

            <Link className="App-link" to="/nutrition-tracker"><button onClick={updateMeal}>Save</button></Link>
        </form>
    </div>
  );
}

export default EditMealPage;