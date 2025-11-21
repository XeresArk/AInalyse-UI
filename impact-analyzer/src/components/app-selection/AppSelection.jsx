import React, { useState, useEffect } from "react";
import "./AppSelection.css";

export default function AppSelection({ onChange }) {

  const [apps, setApps] = useState([]);
  const [dependencyOptions, setDependencyOptions] = useState([]);

  const [selectedApp, setSelectedApp] = useState("");
  const [selectedDependencies, setSelectedDependencies] = useState([]);

  // Fetch apps and dependencies from API
  useEffect(() => {
    fetch("http://localhost:8080/api/dependency-map/getServiceNames")
      .then(res => res.json())
      .then(data => setApps(data))
      .catch(err => console.error("Failed to load apps:", err));

    fetch("http://localhost:8080/api/dependency-map/getDependencyMapNames")
      .then(res => res.json())
      .then(data => setDependencyOptions(data))
      .catch(err => console.error("Failed to load dependencies:", err));
  }, []);

  // Notify parent on change
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
