import { useMemo } from "react";
import { create } from "zustand";
import useBrightHrApi from "hooks/useBrightHrApi";
import { IUseEmployeeSelection } from "types";

const useEmployeeSelectionStore = create<IUseEmployeeSelection>((set) => ({
  selectedEmployeeId: undefined,
  setSelectedEmployeeId: (selectedEmployeeId) => set({ selectedEmployeeId }),
}));

const useEmployeeSelection = () => {
  const { absences } = useBrightHrApi();
  const selectedEmployeeId = useEmployeeSelectionStore(
    (state) => state.selectedEmployeeId
  );
  const setSelectedEmployeeId = useEmployeeSelectionStore(
    (state) => state.setSelectedEmployeeId
  );

  const selectedEmployeeAbsences = useMemo(() => {
    if (!selectedEmployeeId) return [];
    return absences.filter(
      (absence) => absence.employeeId === selectedEmployeeId
    );
  }, [selectedEmployeeId, absences]);
  return {
    selectedEmployeeId,
    selectedEmployeeAbsences,
    setSelectedEmployeeId,
  };
};

export default useEmployeeSelection;
