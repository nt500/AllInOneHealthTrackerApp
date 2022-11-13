import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

function MedicationRow({medication, onEdit, onDelete}) {
  return (
   <tr>
      <td>{medication.drugName}</td>
      <td>{medication.dose}</td>
      <td>{medication.timesPerDay}</td>
      <td>{medication.lastFilled}</td>
      <td>{medication.refillDue}</td>
      <td><Link to="/edit-medication"> <MdEdit onClick={() => onEdit(medication)} /></Link></td>
      <td><MdDeleteForever onClick={() => onDelete(medication._id)} /></td>
    </tr>
  );
}

export default MedicationRow;