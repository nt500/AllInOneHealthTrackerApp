import NutritionRow from './NutritionRow.js';

function NutritionTable( { meals, onEdit, onDelete } ) {
  return (
    <table class = "center">
      <thead>
        <tr>
          <th>Date</th>
          <th>Food Type</th>
          <th>Carbohydrate (g)</th>
          <th>Fat (g)</th>
          <th>Protein (g)</th>
          <th>Total Calories</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {meals.map((meal, i) => <NutritionRow key = {i} meal={meal} onDelete={onDelete} onEdit={onEdit}/>)}
      </tbody>
    </table>
  );
}

export default NutritionTable;