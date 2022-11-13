import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

function ExerciseRow({exercise, onEdit, onDelete}) {
  return (
   <tr>
      <td>{exercise.date}</td>
      <td>{exercise.type}</td>
      <td>{exercise.calories}</td>
      <td>{exercise.minutes}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.reps}</td>
      <td><Link to="/edit-exercise"> <MdEdit onClick={() => onEdit(exercise)} /></Link></td>
      <td><MdDeleteForever onClick={() => onDelete(exercise._id)} /></td>
    </tr>
  );
}

export default ExerciseRow;
