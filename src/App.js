import "./App.css";
import Buttons from "./Components/Buttons";
import Time from "./Components/Time";
import LapTime from "./Components/LapTime";
import Table from "./Components/Table";

function App() {
  return (
    <div className="App">
      <Time />
      <LapTime />
      <Table />
      <Buttons />
    </div>
  );
}

export default App;
