import { useState, useEffect } from "react";
import "./DiffInput.css";

export default function DiffInput({ onChange }) {
  const [diff, setDiff] = useState("");
  const dependencyOptions = ["EmployeeApp", "DepartmentApp"];
  const [selectedDependencies, setSelectedDependencies] = useState([]);

  useEffect(() => {
    onChange({ diff, dependencyMaps : selectedDependencies });
  }, [diff, selectedDependencies]);

  const handleDependencyChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    setSelectedDependencies(selected);
  };

  return (
    <div className="diff-box">
      <h2>Diff Input</h2>

      <textarea
        className="form-control"
        rows={6}
        placeholder="Enter diff here..."
        value={diff}
        onChange={(e) => setDiff(e.target.value)}
      />

      <div className="form-group" style={{ marginTop: 15 }}>
        <label>Select Dependency Maps (Multiple)</label>
        <select
          className="form-control"
          multiple
          value={selectedDependencies}
          onChange={handleDependencyChange}
          style={{ height: 120 }}
        >
          {dependencyOptions.map(dep => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
