import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Corrected import
import LandingPage from "./components/LandingPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}