import { DateTime } from "luxon";
import useBrightHrApi from "hooks/useBrightHrApi";
import "./AbsencesTable.module.scss";

const AbsencesTable = () => {
  const { absences, conflicts } = useBrightHrApi();

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
          </tr>
        </thead>
        <tbody>
          {absences.map((absence, index) => {
            const luxonDateObject = DateTime.fromSeconds(absence.startDate);

            return (
              <tr key={index}>
                <td className="absences-table__td">
                  {absence.employeeFirstName} {absence.employeeLastName}
                </td>
                <td className="absences-table__td">
                  {absence.type.toString()}
                </td>
                <td className="absences-table__td">
                  {absence.approved ? "Approved" : "Pending"}
                </td>
                <td className="absences-table__td">
                  {luxonDateObject.toFormat("dd MMM yyyy")}
                </td>
                <td className="absences-table__td">
                  {luxonDateObject
                    .plus({ days: absence.days })
                    .toFormat("dd MMM yyyy")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AbsencesTable;
