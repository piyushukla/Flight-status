import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import FlightDetails from "./components/FlightDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/details/:id" element={<FlightDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
