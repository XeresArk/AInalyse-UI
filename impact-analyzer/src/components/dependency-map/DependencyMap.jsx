import React, { useState, useEffect } from "react";
import "./DependencyMap.css";

export default function DependencyMap({ onFormChange }) {
  const [selection, setSelection] = useState("");

  const [form, setForm] = useState({
    projectName: "",
    projectPath: ""
  });

  const predefined = {
    EmployeeApp: {
      projectName: "EmployeeApp",
      projectPath: "D:\\Work\\EmployeeApp"
    },
    DepartmentApp: {
      projectName: "DepartmentApp",
      projectPath: "D:\\Work\\DepartmentApp"
    }
  };

  const isCustom = selection === "Custom";

  const handleSelection = (value) => {
    setSelection(value);

    if (predefined[value]) {
      setForm(predefined[value]);
    } else {
      setForm({
        projectName: "",
        projectPath: ""
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Only allow changes when Custom is selected
    if (!isCustom) return;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

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
          <option value="Custom">Custom</option>
        </select>

        <label>Project Name</label>
        <input
          className="dep-input"
          name="projectName"
          value={form.projectName}
          onChange={handleInputChange}
          disabled={!isCustom}
        />

        <label>Project Path</label>
        <input
          className="dep-input"
          name="projectPath"
          value={form.projectPath}
          onChange={handleInputChange}
          disabled={!isCustom}
        />
      </div>
    </div>
  );
}
