import React, { useState, useEffect } from "react";
import "./DependencyMap.css";

export default function DependencyMap({ onFormChange }) {
  const [selection, setSelection] = useState("");
  const [form, setForm] = useState({
    projectName: "",
    projectPath: "",
    outputPath: ""
  });

  const predefined = {
    EmployeeApp: {
      projectName: "EmployeeApp",
      projectPath: "D:\\Work\\EmployeeApp",
      outputPath: "D:\\Work\\DependencyMap",
    },
    DepartmentApp: {
      projectName: "DepartmentApp",
      projectPath: "D:\\Work\\DepartmentApp",
      outputPath: "D:\\Work\\DependencyMap",
    },
  };

  const handleSelection = (value) => {
    setSelection(value);
    const updated = predefined[value] || {
      projectName: "",
      projectPath: "",
      outputPath: ""
    };
    setForm(updated);

    // Pass updated form to parent (Dashboard.jsx)
    if (onFormChange) onFormChange(updated);
  };

  // When form changes manually (future editable), notify parent
  useEffect(() => {
    if (onFormChange) onFormChange(form);
  }, [form]);

  return (
    <div className="dep-container">
      <h2 className="dep-title">Dependency Map Configuration</h2>

      <div className="dep-card">
        <label>Select Application</label>
        <select
          className="dep-input"
          value={selection}
          onChange={(e) => handleSelection(e.target.value)}
        >
          <option value="">Select</option>
          <option value="EmployeeApp">EmployeeApp</option>
          <option value="DepartmentApp">DepartmentApp</option>
        </select>

        <label>Project Name</label>
        <input className="dep-input" value={form.projectName} readOnly />

        <label>Project Path</label>
        <input className="dep-input" value={form.projectPath} readOnly />

        <label>Output Path</label>
        <input className="dep-input" value={form.outputPath} readOnly />
      </div>
    </div>
  );
}
