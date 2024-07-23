import { DateTime } from "luxon";
import { IAbsence, IAbsenceAPIData, IConflictAPIData } from "types";
import { tryAndCatch, onError } from "utils";
import { BRIGHT_HR_API_BASE, API_QUERIES } from "utils/constants";

export const queryBrightHrApi = async (query: string): Promise<any> => {
  return tryAndCatch(async () => {
    const response = await fetch(`${BRIGHT_HR_API_BASE}${query}`);
    if (response.status !== 200) {
      return onError("queryBrightHrApi - incorrect response code");
    }
    const data = await response.json();
    return data;
  }, `Error - queryBrightHrApi - ${query}`);
};

export const getAbsences = async (): Promise<IAbsence[]> => {
  const absencesData: IAbsenceAPIData[] = await queryBrightHrApi(
    API_QUERIES.ABSENCES
  );
  const absences: IAbsence[] = [];

  for (let i = 0; i < absencesData.length; i++) {
    const absence = absencesData[i];

    // Do we have all required absence data for a valid absence?
    if (
      absence?.id !== undefined &&
      absence?.absenceType !== undefined &&
      absence?.approved !== undefined &&
      absence?.days !== undefined &&
      absence?.startDate !== undefined &&
      absence?.employee?.firstName !== undefined &&
      absence?.employee?.lastName !== undefined &&
      absence?.employee?.id !== undefined
    ) {
      absences.push({
        id: absence.id,
        type: absence.absenceType,
        approved: absence.approved,
        days: absence.days,
        startDate: DateTime.fromISO(absence.startDate).toSeconds(),
        employeeFirstName: absence.employee.firstName,
        employeeLastName: absence.employee.lastName,
        employeeId: absence.employee.id,
      });
    }
  }

  return absences;
};

export const getConflict = async (
  absencesId: number
): Promise<boolean | undefined> => {
  const conflictData: IConflictAPIData = await queryBrightHrApi(
    `${API_QUERIES.CONFLICT}/${absencesId}`
  );

  if (conflictData?.conflicts !== undefined) {
    return conflictData.conflicts ? true : false;
  }
  return undefined;
};
