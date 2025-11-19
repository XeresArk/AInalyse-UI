import React, { useState, useEffect } from "react";
import "./AppSelection.css";

export default function AppSelection({ onChange }) {
  const apps = ["EmployeeApp", "DepartmentApp"];
  const dependencyOptions = ["EmployeeApp", "DepartmentApp"];

  const [selectedApp, setSelectedApp] = useState("");
  const [selectedDependencies, setSelectedDependencies] = useState([]);

  // Update parent Dashboard whenever values change
  useEffect(() => {
    onChange({
      serviceName: selectedApp,
      dependencyMaps: selectedDependencies
    });
  }, [selectedApp, selectedDependencies]);

  const handleDependencyChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    setSelectedDependencies(selected);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>App Selection</h2>

      <div className="form-group">
        <label>Select App</label>
        <select
          className="form-control"
          value={selectedApp}
          onChange={(e) => setSelectedApp(e.target.value)}
        >
          <option value="">-- Select --</option>
          {apps.map(app => (
            <option key={app} value={app}>{app}</option>
          ))}
        </select>
      </div>

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
