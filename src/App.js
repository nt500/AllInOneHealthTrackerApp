import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExerciseTrackerPage from './pages/ExerciseTrackerPage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import NutritionTrackerPage from './pages/NutritionTrackerPage';
import CreateMealPage from './pages/CreateMealPage';
import EditMealPage from './pages/EditMealPage';
import WeightTrackerPage from './pages/WeightTrackerPage';
import CreateWeightPage from './pages/CreateWeightPage';
import EditWeightPage from './pages/EditWeightPage';
import SleepTrackerPage from './pages/SleepTrackerPage';
import CreateSleepPage from './pages/CreateSleepPage';
import EditSleepPage from './pages/EditSleepPage';
import WaterTrackerPage from './pages/WaterTrackerPage';
import CreateWaterPage from './pages/CreateWaterPage';
import EditWaterPage from './pages/EditWaterPage';
import MedicationTrackerPage from './pages/MedicationTrackerPage';
import CreateMedicationPage from './pages/CreateMedicationPage';
import EditMedicationPage from './pages/EditMedicationPage';
import { useState } from 'react';

function App() {
  const [exercise, setExercise] = useState([]);
  const [meal, setMeal] = useState([]);
  const [weight, setWeight] = useState([]);
  const [sleep, setSleep] = useState([]);
  const [water, setWater] = useState([]);
  const [medication, setMedication] = useState([]);
  return (
    <div className="App">   
      <Router>
        <header>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/exercise-tracker">
            <ExerciseTrackerPage setExercise={setExercise} />
          </Route>
          <Route path="/create-exercise">
            <CreateExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exercise={exercise} />
          </Route>
          <Route path="/nutrition-tracker">
            <NutritionTrackerPage setMeal={setMeal} />
          </Route>
          <Route path="/create-meal">
            <CreateMealPage />
          </Route>
          <Route path="/edit-meal">
            <EditMealPage meal={meal} />
          </Route>
          <Route path="/weight-tracker">
            <WeightTrackerPage setWeight={setWeight} />
          </Route>
          <Route path="/create-weight">
            <CreateWeightPage />
          </Route>
          <Route path="/edit-weight">
            <EditWeightPage weight={weight} />
          </Route>
          <Route path="/sleep-tracker">
            <SleepTrackerPage setSleep={setSleep} />
          </Route>
          <Route path="/create-sleep">
            <CreateSleepPage />
          </Route>
          <Route path="/edit-sleep">
            <EditSleepPage sleep={sleep} />
          </Route>
          <Route path="/water-tracker">
            <WaterTrackerPage setWater={setWater} />
          </Route>
          <Route path="/create-water">
            <CreateWaterPage />
          </Route>
          <Route path="/edit-water">
            <EditWaterPage water={water} />
          </Route>
          <Route path="/medications-tracker">
            <MedicationTrackerPage setMedication={setMedication} />
          </Route>
          <Route path="/create-medication">
            <CreateMedicationPage />
          </Route>
          <Route path="/edit-medication">
            <EditMedicationPage medication={medication} />
          </Route>
        </header>
      </Router>
    </div>
  );
}

export default App;