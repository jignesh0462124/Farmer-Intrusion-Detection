import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Landing from "./Pages/Landing/Landing";
import Signup from "./Pages/Auth/Signup";
import Home from "./Pages/Farmer/Home";
import CameraPage from "./Pages/Farmer/CameraPage";
import Report from "./Pages/Farmer/Report";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={<Home />} />
        <Route path="camera" element={<CameraPage />} />
        <Route path="report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;
