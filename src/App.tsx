import useBrightHrApi from "hooks/useBrightHrApi";
import useSort from "hooks/useSort";
import AbsencesTable from "components/AbsencesTable";
import AbsencesSort from "components/AbsencesSort";
import IndavidualAbsencesModal from "components/Modal/IndavidualAbsencesModal";

function App() {
  const { absences, conflicts } = useBrightHrApi();
  const { sortedAbsences } = useSort();
  const loading = absences.length === 0 && !conflicts;

  return (
    <div className="App">
      {loading ? (
        "loading..."
      ) : (
        <>
          <AbsencesSort />
          <AbsencesTable
            absences={sortedAbsences}
            conflicts={conflicts}
            enabledEmployeeSelection
          />
          <IndavidualAbsencesModal />
        </>
      )}
    </div>
  );
}

export default App;
