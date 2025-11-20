import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Tabs from "../components/Tabs";
import Card from "../components/Card";

import DiffInput from "../components/diff-input/DiffInput";
import DatabaseAnalyzer from "../components/database/DatabaseAnalyzer";
import DependencyMap from "../components/dependency-map/DependencyMap";
import AppSelection from "../components/app-selection/AppSelection";

// TAB KEYS
const TAB_DEP = "dependencyMap";
const TAB_APP = "appSelection";
const TAB_DIFF = "diffInput";
const TAB_DB = "database";

export default function Dashboard({ openTab }) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryTab = openTab || new URLSearchParams(location.search).get("tab");

  const [activeTab, setActiveTab] = useState(queryTab || TAB_DEP);
  const [analyzerPayload, setAnalyzerPayload] = useState({});

  useEffect(() => {
    if (queryTab) setActiveTab(queryTab);
  }, [queryTab]);

  const onAnalyze = () => {
    if (activeTab === TAB_APP) {
      const { serviceName, dependencyMaps } = analyzerPayload;
      if (!serviceName) return alert("Select a service name");
      if (!dependencyMaps || dependencyMaps.length === 0)
        return alert("Select dependency maps");
      setAnalyzerPayload({serviceName, dependencyMaps});
    }

    if (activeTab === TAB_DIFF) {
      const { diff, dependencyMaps } = analyzerPayload;
      if (!diff || dependencyMaps.length === 0) return alert("Enter Diff/CURL input");
      setAnalyzerPayload({ diff, dependencyMaps });
    }

    if (activeTab === TAB_DB) {
      const { schema, table, column } = analyzerPayload;
      if (!schema || !table || !column?.length)
        return alert("Complete DB selections first.");
      setAnalyzerPayload({ schema, table, column });
    }

    if (activeTab === TAB_DEP) {
      const { projectName, projectPath, outputPath } = analyzerPayload;
      if (!projectName || !projectPath || !outputPath)
        return alert("Dependency Map config missing.");
      setAnalyzerPayload({ projectName, projectPath, outputPath });
      dependencyMapAPI();
      return;
    }

    navigate("/analysis", {
      state: { analyzerPayload, mode: activeTab },
    });
  };

  const dependencyMapAPI = async () => {
    const response = await fetch(
      "http://localhost:8080/api/dependency-map/generateJson",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...analyzerPayload}),
      }
    );

    const data = await response.ok;
    if(data) {
      alert("Dependency Map Generated Successfully!");
    }
  };

  return (
    <div className="page">
      <Card>
        <Tabs
          tabs={[
            { key: TAB_DEP, label: "Dependency Map" },
            { key: TAB_APP, label: "Commit Impact" },
            { key: TAB_DIFF, label: "Diff Impact" },
            { key: TAB_DB, label: "Database Impact" },
          ]}
          active={activeTab}
          onChange={(k) => setActiveTab(k)}
        />

        <div className="tab-content">
          {activeTab === TAB_DEP ? (
            <DependencyMap
              onFormChange={(data) =>
                setAnalyzerPayload({ ...data })
              }
            />
          ) : activeTab === TAB_APP ? (
            <AppSelection onChange={setAnalyzerPayload} />
          ) : activeTab === TAB_DIFF ? (
            <DiffInput onChange={setAnalyzerPayload} />
          ) : (
            <DatabaseAnalyzer onChange={setAnalyzerPayload} />
          )}

          <div style={{ marginTop: 18 }}>
            <button className="btn-primary" onClick={onAnalyze}>
              {activeTab === TAB_DEP
                ? "Generate Dependency Map"
                : "Analyze Impact"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
