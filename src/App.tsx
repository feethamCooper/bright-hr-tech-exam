import { useEffect } from "react";
import useBrightHrApi from "hooks/useBrightHrApi";
import useSort from "hooks/useSort";
import AbsencesTable from "components/AbsencesTable";
import AbsencesSort from "components/AbsencesSort";
import IndavidualAbsencesModal from "components/Modal/IndavidualAbsencesModal";
import "./App.scss";

function App() {
  const { absences, conflicts, handleGetApiData } = useBrightHrApi();
  const { sortedAbsences } = useSort();
  const loading = absences.length === 0 || !conflicts;

  useEffect(() => {
    handleGetApiData();
  }, [handleGetApiData]);

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
