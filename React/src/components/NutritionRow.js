import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

function NutritionRow({meal, onEdit, onDelete}) {
  return (
   <tr>
      <td>{meal.date}</td>
      <td>{meal.foodType}</td>
      <td>{meal.carbohydrate}</td>
      <td>{meal.fat}</td>
      <td>{meal.protein}</td>
      <td>{meal.totalCalories}</td>
      <td><Link to="/edit-meal"> <MdEdit onClick={() => onEdit(meal)} /></Link></td>
      <td><MdDeleteForever onClick={() => onDelete(meal._id)} /></td>
    </tr>
  );
}

export default NutritionRow;