import SleepRow from './SleepRow.js';

function SleepTable( { sleeps, onEdit, onDelete } ) {
  return (
    <table class = "center">
      <thead>
        <tr>
          <th>Date</th>
          <th>Hours of Sleep</th>
          <th>Additional Minutes of Sleep</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {sleeps.map((sleep, i) => <SleepRow key = {i} sleep={sleep} onDelete={onDelete} onEdit={onEdit}/>)}
      </tbody>
    </table>
  );
}

export default SleepTable;