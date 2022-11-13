import ExerciseRow from './ExerciseRow.js';

function ExerciseTable( { exercises, onEdit, onDelete } ) {
  return (
    <table class = "center">
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Calories Burned</th>
          <th>Minutes</th>
          <th>Weight</th>
          <th>Reps</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {exercises.map((exercise, i) => <ExerciseRow key = {i} exercise={exercise} onDelete={onDelete} onEdit={onEdit}/>)}
      </tbody>
    </table>
  );
}

export default ExerciseTable;