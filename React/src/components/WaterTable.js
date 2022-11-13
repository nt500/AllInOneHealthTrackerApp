import WaterRow from './WaterRow.js';

function WaterTable( { waters, onEdit, onDelete } ) {
  return (
    <table class = "center">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {waters.map((water, i) => <WaterRow key = {i} water={water} onDelete={onDelete} onEdit={onEdit}/>)}
      </tbody>
    </table>
  );
}

export default WaterTable;