import useBrightHrApi from "hooks/useBrightHrApi";
import "./App.scss";

function App() {
  const { absences, conflicts } = useBrightHrApi();

  return <div className="App">meow</div>;
}

export default App;
