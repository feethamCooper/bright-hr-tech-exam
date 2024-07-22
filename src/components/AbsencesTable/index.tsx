import useBrightHrApi from "hooks/useBrightHrApi";
import AbsencesTableRow from "./AbsencesTableRow";

import "./AbsencesTable.scss";

const AbsencesTable = () => {
  const { sortedAbsences, conflicts } = useBrightHrApi();
  return (
    <div className="absences-table">
      <table className="absences-table__table">
        <thead>
          <tr>
            <th className="absences-table__th">Employee Name</th>
            <th className="absences-table__th">Absence Type</th>
            <th className="absences-table__th">Approved/Pending Approval</th>
            <th className="absences-table__th">Start Date</th>
            <th className="absences-table__th">End Date</th>
            <th className="absences-table__th">Conflict</th>
          </tr>
        </thead>
        <tbody>
          {sortedAbsences.map((absence, index) => (
            <AbsencesTableRow
              key={index}
              absence={absence}
              conflicts={conflicts}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AbsencesTable;
