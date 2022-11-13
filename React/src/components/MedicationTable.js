import MedicationRow from './MedicationRow.js';

function MedicationTable( { medications, onEdit, onDelete } ) {
  return (
    <table class = "center">
      <thead>
        <tr>
          <th>Drug Name</th>
          <th>Dose</th>
          <th>Times/Day</th>
          <th>Last Filled</th>
          <th>Refill Due</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {medications.map((medication, i) => <MedicationRow key = {i} medication={medication} onDelete={onDelete} onEdit={onEdit}/>)}
      </tbody>
    </table>
  );
}

export default MedicationTable;