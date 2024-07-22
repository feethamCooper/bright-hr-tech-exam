import { useMemo } from "react";
import { create } from "zustand";
import useBrightHrApi from "hooks/useBrightHrApi";
import { SORT_BY } from "utils/constants";
import { IUseSortStore } from "types";

const useSortStore = create<IUseSortStore>((set) => ({
  sortBy: SORT_BY.NAME,
  setSortBy: (sortBy) => set({ sortBy }),
}));

const useSort = () => {
  const { absences } = useBrightHrApi();
  const sortBy = useSortStore((state) => state.sortBy);
  const setSortBy = useSortStore((state) => state.setSortBy);

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

  return {
    sortedAbsences,
    setSortBy,
    sortBy,
  };
};

export default useSort;
