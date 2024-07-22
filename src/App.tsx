import useBrightHrApi from "hooks/useBrightHrApi";
import AbsencesTable from "components/AbsencesTable";
import AbsencesSort from "components/AbsencesSort";
import "./App.scss";
import useSort from "hooks/useSort";

function App() {
  const { absences, conflicts } = useBrightHrApi();
  const { sortedAbsences } = useSort();
  const loading = absences.length === 0 && !conflicts;

  return (
    <div className="App">
      {loading ? (
        "loadding"
      ) : (
        <>
          <AbsencesSort />
          <AbsencesTable absences={sortedAbsences} conflicts={conflicts} />
        </>
      )}
    </div>
  );
}

export default App;
