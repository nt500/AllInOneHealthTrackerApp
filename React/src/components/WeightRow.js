import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

function WeightRow({weight, onEdit, onDelete}) {
  return (
   <tr>
      <td>{weight.date}</td>
      <td>{weight.weightLbs}</td>
      <td>{weight.weightChange}</td>
      <td><Link to="/edit-weight"> <MdEdit onClick={() => onEdit(weight)} /></Link></td>
      <td><MdDeleteForever onClick={() => onDelete(weight._id)} /></td>
    </tr>
  );
}

export default WeightRow;