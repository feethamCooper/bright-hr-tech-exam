import useBrightHrApi from "hooks/useBrightHrApi";
import AbsencesTable from "components/AbsencesTable";
import "./App.scss";

function App() {
  const { absences, conflicts } = useBrightHrApi();
  const loading = absences.length === 0 && !conflicts;

  return <div className="App">{loading ? "loadding" : <AbsencesTable />}</div>;
}

export default App;
