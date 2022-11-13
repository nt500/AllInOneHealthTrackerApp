import WeightRow from './WeightRow.js';

function WeightTable( { weights, onEdit, onDelete } ) {
  return (
    <table class = "center">
      <thead>
        <tr>
          <th>Date</th>
          <th>Weight (lbs)</th>
          <th>Weight Change (lbs)</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {weights.map((weight, i) => <WeightRow key = {i} weight={weight} onDelete={onDelete} onEdit={onEdit}/>)}
      </tbody>
    </table>
  );
}

export default WeightTable;