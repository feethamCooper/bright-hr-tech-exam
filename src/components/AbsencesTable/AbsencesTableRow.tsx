import { DateTime } from "luxon";
import { IAbsence, IConflict } from "types";

interface IAbsencesTableRow {
  absence: IAbsence;
  conflicts?: IConflict[];
}

const AbsencesTableRow = ({ absence, conflicts }: IAbsencesTableRow) => {
  const luxonDateObject = DateTime.fromSeconds(absence.startDate);
  const conflicting = conflicts?.find(
    (conflict) => conflict.absencesId === absence.id
  );
  return (
    <tr
      className={`absences-table__tr ${
        conflicting?.conflicts ? "absences-table__tr--conflict" : ""
      }`}
    >
      <td className="absences-table__td">
        {absence.employeeFirstName} {absence.employeeLastName}
      </td>
      <td className="absences-table__td">{absence.type.toString()}</td>
      <td className="absences-table__td">
        {absence.approved ? "Approved" : "Pending"}
      </td>
      <td className="absences-table__td">
        {luxonDateObject.toFormat("dd MMM yyyy")}
      </td>
      <td className="absences-table__td">
        {luxonDateObject.plus({ days: absence.days }).toFormat("dd MMM yyyy")}
      </td>
      <td>{conflicting?.conflicts ? "Conflict" : "OK"}</td>
    </tr>
  );
};

export default AbsencesTableRow;
