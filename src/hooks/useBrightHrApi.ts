import { useEffect, useCallback, useMemo } from "react";
import { create } from "zustand";
import { getAbsences, getConflict } from "api/brightHr";
import { API_QUERIES, SORT_BY } from "utils/constants";
import { setItemInLocalStorage, getItemFromLocalStorage } from "utils";
import { IUseBrightHrApiStore } from "types";

const useBrightHrApiStore = create<IUseBrightHrApiStore>((set) => ({
  absences: [],
  conflicts: undefined,
  sortBy: SORT_BY.NAME,
  setAbsences: (absences) => set({ absences }),
  setConflicts: (conflicts) => set({ conflicts }),
  setSortBy: (sortBy) => set({ sortBy }),
}));

const useBrightHrApi = () => {
  const absences = useBrightHrApiStore((state) => state.absences);
  const conflicts = useBrightHrApiStore((state) => state.conflicts);
  const sortBy = useBrightHrApiStore((state) => state.sortBy);
  const setAbsences = useBrightHrApiStore((state) => state.setAbsences);
  const setConflicts = useBrightHrApiStore((state) => state.setConflicts);
  const setSortBy = useBrightHrApiStore((state) => state.setSortBy);

  const handleGetAbsences = useCallback(async () => {
    const dataReady = absences.length !== 0;
    if (dataReady) return;

    const cachedData = getItemFromLocalStorage(API_QUERIES.ABSENCES);
    if (cachedData !== null) {
      setAbsences(JSON.parse(cachedData));
      return;
    }

    const absencesData = await getAbsences();

    if (absencesData.length !== 0) {
      setAbsences(absencesData);
      setItemInLocalStorage(API_QUERIES.ABSENCES, JSON.stringify(absencesData));
    }
  }, [absences.length, setAbsences]);

  const handleGetConflicts = useCallback(async () => {
    const dataReady = conflicts !== undefined;
    if (dataReady) return;

    const cachedData = getItemFromLocalStorage(API_QUERIES.CONFLICT);
    if (cachedData !== null) {
      setConflicts(JSON.parse(cachedData));
      return;
    }

    const conflictUpdate = [];

    for (let i = 0; i < absences.length; i++) {
      const absence = absences[i];
      const conflicting = await getConflict(absence.id);

      conflictUpdate.push({
        absencesId: absence.id,
        conflicts: conflicting || false,
      });
    }

    setConflicts(conflictUpdate);
    setItemInLocalStorage(API_QUERIES.CONFLICT, JSON.stringify(conflictUpdate));
  }, [absences, conflicts, setConflicts]);

  const sortedAbsences = useMemo(() => {
    if (sortBy === SORT_BY.NAME) {
      return absences.sort((a, b) =>
        a.employeeFirstName.localeCompare(b.employeeFirstName)
      );
    }

    if (sortBy === SORT_BY.ABSENCE_TYPE) {
      return absences.sort((a, b) =>
        a.type.toString().localeCompare(b.type.toString())
      );
    }

    if (sortBy === SORT_BY.DATE.toString()) {
      return absences.sort((a, b) => a.startDate - b.startDate);
    }

    return absences;
  }, [absences, sortBy]);

  useEffect(() => {
    if (absences.length === 0) handleGetAbsences();
    if (absences.length !== 0 && !conflicts) handleGetConflicts();
  }, [absences, conflicts, handleGetAbsences, handleGetConflicts]);
  return {
    absences,
    sortedAbsences,
    conflicts,
    setSortBy,
    sortBy,
  };
};

export default useBrightHrApi;
