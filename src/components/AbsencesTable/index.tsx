import AbsencesTableRow from "./AbsencesTableRow";
import { IAbsence, IConflict } from "types";

import "./AbsencesTable.scss";

interface IAbsencesTable {
  absences: IAbsence[];
  conflicts?: IConflict[];
  enabledEmployeeSelection?: boolean;
}

const AbsencesTable = ({
  absences,
  conflicts,
  enabledEmployeeSelection = false,
}: IAbsencesTable) => {
  return (
    <>
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
            {absences.map((absence, index) => (
              <AbsencesTableRow
                key={index}
                absence={absence}
                conflicts={conflicts}
                enabledEmployeeSelection={enabledEmployeeSelection}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AbsencesTable;
