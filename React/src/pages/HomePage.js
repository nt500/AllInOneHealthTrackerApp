import React from 'react';
import { Link } from 'react-router-dom';
import { MdFastfood, MdLocalHotel, MdLocalPharmacy, MdLocalDrink } from 'react-icons/md';
import { IoMdBody, IoIosFitness } from "react-icons/io";

function HomePage() {
  return (
    <div>
        <h1>
        Welcome to the All-In-One Health Application!
        </h1> 
        <br></br>
        <br></br>
        <h3><IoIosFitness />  <Link to="/exercise-tracker">Exercise Tracker</Link></h3>
        <h3><MdFastfood />  <Link to="/nutrition-tracker">Nutrition Tracker</Link></h3>
        <h3><IoMdBody />  <Link to="/weight-tracker">Weight Tracker</Link></h3>
        <h3><MdLocalHotel />  <Link to="/sleep-tracker">Sleep Tracker</Link></h3>
        <h3><MdLocalDrink />  <Link to="/water-tracker">Water Intake Tracker</Link></h3>
        <h3><MdLocalPharmacy />  <Link to="/medications-tracker">Medications Tracker</Link></h3>
    </div>
  );
}

export default HomePage;