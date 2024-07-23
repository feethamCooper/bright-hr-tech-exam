import { useCallback, useRef } from "react";
import { create } from "zustand";
import { getAbsences, getConflict } from "api/brightHr";
import { setItemInLocalStorage, getItemFromLocalStorage } from "utils";
import { API_QUERIES } from "utils/constants";
import { IConflict, IUseBrightHrApiStore } from "types";

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
  const endpointsCalled = useRef<string[]>([]);

  const addToEndpointsCalled = useCallback((endpoint: string) => {
    endpointsCalled.current = [...endpointsCalled.current, endpoint];
  }, []);

  const hasEndpointBeenCalled = (endpoint: string) =>
    endpointsCalled.current.includes(endpoint);

  const handleGetAbsences = useCallback(async () => {
    const dataReady = absences.length !== 0;
    if (dataReady) return;

    const cachedData = getItemFromLocalStorage(API_QUERIES.ABSENCES);

    if (cachedData !== null) {
      setAbsences(JSON.parse(cachedData));
      return;
    }

    if (hasEndpointBeenCalled(API_QUERIES.ABSENCES)) return;

    addToEndpointsCalled(API_QUERIES.ABSENCES);

    const absencesData = await getAbsences();

    if (absencesData.length !== 0) {
      setAbsences(absencesData);
      setItemInLocalStorage(API_QUERIES.ABSENCES, JSON.stringify(absencesData));
    }
  }, [absences.length, addToEndpointsCalled, setAbsences]);

  const handleGetConflicts = useCallback(async () => {
    const cachedData = getItemFromLocalStorage(API_QUERIES.CONFLICT);

    if (cachedData !== null) {
      setConflicts(JSON.parse(cachedData));
      return;
    }

    for (let i = 0; i < absences.length; i++) {
      const absence = absences[i];
      if (!hasEndpointBeenCalled(`${API_QUERIES.CONFLICT}/${absence.id}`)) {
        addToEndpointsCalled(`${API_QUERIES.CONFLICT}/${absence.id}`);

        const conflicting = await getConflict(absence.id);

        if (
          conflicting &&
          !conflicts?.find((conflict) => conflict.absencesId === absence.id)
        ) {
          let conflictUpdate: IConflict[] = conflicts ? conflicts : [];

          conflictUpdate = [
            ...conflictUpdate,
            {
              absencesId: absence.id,
              conflicts: conflicting || false,
            },
          ];

          setConflicts(conflictUpdate);
          setItemInLocalStorage(
            API_QUERIES.CONFLICT,
            JSON.stringify(conflictUpdate)
          );
        }
      }
    }
  }, [absences, addToEndpointsCalled, conflicts, setConflicts]);

  const handleGetApiData = () => {
    if (absences.length === 0 && !hasEndpointBeenCalled(API_QUERIES.ABSENCES)) {
      handleGetAbsences();
    }
    if (absences.length !== 0 && !conflicts) handleGetConflicts();
  };

  return {
    absences,
    conflicts,
    handleGetApiData,
  };
};

export default useBrightHrApi;
