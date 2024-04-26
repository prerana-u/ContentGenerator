import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./Components/MainPage";
import GeneratorPage from "./Components/GeneratorPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/generate" element={<GeneratorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
