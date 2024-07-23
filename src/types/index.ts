import { ABSENCE_TYPES } from "utils/constants";

export interface IUseBrightHrApiStore {
  absences: IAbsence[];
  conflicts: IConflict[] | undefined;
  setAbsences: (absences: IAbsence[]) => void;
  setConflicts: (conflicts: IConflict[]) => void;
}

export interface IUseSortStore {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

export interface IUseEmployeeSelection {
  selectedEmployeeId?: string;
  setSelectedEmployeeId: (selectedEmployeeId?: string) => void;
}

export type TAbsenceType = keyof typeof ABSENCE_TYPES;

export interface IAbsenceAPIData {
  id?: number;
  absenceType?: TAbsenceType;
  approved?: boolean;
  startDate?: string;
  days?: number;
  employee?: {
    firstName?: string;
    lastName?: string;
    id?: string;
  };
}

export interface IConflictAPIData {
  conflicts: boolean;
}

export interface IAbsence {
  id: number;
  type: TAbsenceType;
  approved: boolean;
  days: number;
  employeeFirstName: string;
  employeeLastName: string;
  employeeId: string;
  startDate: number;
}

export interface IConflict {
  absencesId: number;
  conflicts: boolean;
}
