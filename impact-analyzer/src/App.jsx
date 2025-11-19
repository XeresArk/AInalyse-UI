import { Routes, Route } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Analysis from "./routes/Analysis";
import Navbar from "./components/Navbar";
import DependencyMap from "./components/dependency-map/DependencyMap";
import AppSelection from "./components/app-selection/AppSelection";
import DiffInput from "./components/diff-input/DiffInput";


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dependency-map" element={<DependencyMap />} />
        <Route path="/app-selection" element={<AppSelection />} />
          <Route path="/diff-input" element={<DiffInput />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </>
  );
}
