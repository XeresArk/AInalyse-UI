import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Tabs from "../components/Tabs";
import Card from "../components/Card";
import DiffAnalyzer from "./DiffAnayzer";
import DatabaseAnalyzer from "./DatabaseAnalyzer";


const TAB_DIFF = "diff";
const TAB_DB = "database";


export default function Dashboard({ openTab }) {
const navigate = useNavigate();
const location = useLocation();
const queryTab = openTab || new URLSearchParams(location.search).get("tab");


const [activeTab, setActiveTab] = useState(queryTab || TAB_DIFF);
const [analyzerPayload, setAnalyzerPayload] = useState({});


useEffect(() => {
if (queryTab) setActiveTab(queryTab);
}, [queryTab]);


const onAnalyze = () => {
// validation: either diff input (non-empty) OR application selected OR for DB ensure schema/table/columns
if (activeTab === TAB_DIFF) {
const { diff, app } = analyzerPayload;
if (!diff && !app) {
alert("Please enter diff or select an application.");
return;
}
} else {
const { schema, table, columns } = analyzerPayload;
if (!schema || !table || !columns || columns.length === 0) {
alert("Please select schema, table and at least one column.");
return;
}
}


navigate("/analysis", { state: { ...analyzerPayload } });
};


return (
<div className="page">
<Card>
<Tabs
tabs={[{ key: TAB_DIFF, label: "Diff / CURL" }, { key: TAB_DB, label: "Database Schema" }]}
active={activeTab}
onChange={(k) => setActiveTab(k)}
/>


<div className="tab-content">
{activeTab === TAB_DIFF ? (
<DiffAnalyzer onChange={(p) => setAnalyzerPayload(p)} />
) : (
<DatabaseAnalyzer onChange={(p) => setAnalyzerPayload(p)} />
)}


<div style={{ marginTop: 18 }}>
<button className="btn-primary" onClick={onAnalyze}>Analyze Impact</button>
</div>
</div>
</Card>
</div>
);
}