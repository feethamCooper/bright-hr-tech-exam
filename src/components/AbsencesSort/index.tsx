import useSort from "hooks/useSort";
import { SORT_BY } from "utils/constants";

const AbsencesSort = () => {
  const { sortBy, setSortBy } = useSort();

  return (
    <>
      <label htmlFor="sort">Sort:</label>
      <select
        name="sort"
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        {Object.keys(SORT_BY).map((value, index) => (
          <option key={index} value={value.toLocaleLowerCase()}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};

export default AbsencesSort;
