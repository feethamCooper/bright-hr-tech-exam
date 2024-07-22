import useEmployeeSelection from "hooks/useEmployeeSelection";
import { DateTime } from "luxon";
import { ABSENCE_TYPES } from "utils/constants";
import { IAbsence, IConflict } from "types";

interface IAbsencesTableRow {
  absence: IAbsence;
  conflicts?: IConflict[];
  enabledEmployeeSelection: boolean;
}

const AbsencesTableRow = ({
  absence,
  conflicts,
  enabledEmployeeSelection,
}: IAbsencesTableRow) => {
  const { setSelectedEmployeeId } = useEmployeeSelection();
  const luxonDateObject = DateTime.fromSeconds(absence.startDate);
  const conflicting = conflicts?.find(
    (conflict) => conflict.absencesId === absence.id
  );

  const renderEmployeeName = () => {
    if (enabledEmployeeSelection)
      return (
        <button onClick={() => setSelectedEmployeeId(absence.employeeId)}>
          {absence.employeeFirstName} {absence.employeeLastName}
        </button>
      );

    return `${absence.employeeFirstName} ${absence.employeeLastName}`;
  };

  return (
    <tr
      className={`absences-table__tr ${
        conflicting?.conflicts ? "absences-table__tr--conflict" : ""
      }`}
    >
      <td className="absences-table__td">{renderEmployeeName()}</td>
      <td className="absences-table__td">{ABSENCE_TYPES[absence.type]}</td>
      <td className="absences-table__td">
        {absence.approved ? "Approved" : "Pending"}
      </td>
      <td className="absences-table__td">
        {luxonDateObject.toFormat("dd MMM yyyy")}
      </td>
      <td className="absences-table__td">
        {luxonDateObject.plus({ days: absence.days }).toFormat("dd MMM yyyy")}
      </td>
      <td>{conflicting?.conflicts ? "Yes" : "No"}</td>
    </tr>
  );
};

export default AbsencesTableRow;
