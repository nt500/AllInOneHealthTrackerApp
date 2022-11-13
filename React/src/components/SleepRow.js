import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

function SleepRow({sleep, onEdit, onDelete}) {
  return (
   <tr>
      <td>{sleep.date}</td>
      <td>{sleep.hours}</td>
      <td>{sleep.minutes}</td>
      <td><Link to="/edit-sleep"> <MdEdit onClick={() => onEdit(sleep)} /></Link></td>
      <td><MdDeleteForever onClick={() => onDelete(sleep._id)} /></td>
    </tr>
  );
}

export default SleepRow;