import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Corrected import
import LandingPage from "./components/LandingPage";
import MainGame from "./components/MainGame/MainGame";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mainGame/:team1Name/:team2Name" element={<MainGame />} />
      </Routes>
    </Router>
  );
}