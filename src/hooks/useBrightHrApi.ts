import { useEffect, useCallback } from "react";
import { create } from "zustand";
import { getAbsences, getConflict } from "api/brightHr";
import { API_QUERIES } from "utils/constants";
import { setItemInLocalStorage, getItemFromLocalStorage } from "utils";
import { IUseBrightHrApiStore } from "types";

const useBrightHrApiStore = create<IUseBrightHrApiStore>((set) => ({
  absences: [],
  conflicts: undefined,
  setAbsences: (absences) => set({ absences }),
  setConflicts: (conflicts) => set({ conflicts }),
}));

const useBrightHrApi = () => {
  const absences = useBrightHrApiStore((state) => state.absences);
  const conflicts = useBrightHrApiStore((state) => state.conflicts);
  const setAbsences = useBrightHrApiStore((state) => state.setAbsences);
  const setConflicts = useBrightHrApiStore((state) => state.setConflicts);

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

  useEffect(() => {
    if (absences.length === 0) {
      handleGetAbsences();
    }
    if (absences.length !== 0 && !conflicts) {
      handleGetConflicts();
    }
  }, [absences, conflicts, handleGetAbsences, handleGetConflicts]);

  return {
    absences,
    conflicts,
  };
};

export default useBrightHrApi;
