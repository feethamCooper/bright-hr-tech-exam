import { FC } from "react";
import useSort from "hooks/useSort";
import { SORT_BY } from "utils/constants";

const AbsencesSort: FC = () => {
  const { sortBy, setSortBy } = useSort();
  const sortByKeys = Object.keys(SORT_BY) as unknown as [keyof typeof SORT_BY];

  return (
    <>
      <label htmlFor="sort">Sort:</label>
      <select
        name="sort"
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        {sortByKeys.map((value) => {
          const { key, label } = SORT_BY[value];
          return (
            <option key={key} value={key}>
              {label}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default AbsencesSort;
