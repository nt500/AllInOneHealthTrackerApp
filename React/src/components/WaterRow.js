import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

function WaterRow({water, onEdit, onDelete}) {
  return (
   <tr>
      <td>{water.date}</td>
      <td>{water.time}</td>
      <td>{water.quantity}</td>
      <td>{water.unit}</td>
      <td><Link to="/edit-water"> <MdEdit onClick={() => onEdit(water)} /></Link></td>
      <td><MdDeleteForever onClick={() => onDelete(water._id)} /></td>
    </tr>
  );
}

export default WaterRow;