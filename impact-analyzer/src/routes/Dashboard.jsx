import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";


export default function Dashboard() {
const navigate = useNavigate();
const [diff, setDiff] = useState("");
const [app, setApp] = useState("");


const onAnalyze = () => {
if (!diff && !app) {
alert("Please enter diff or select an application.");
return;
}
navigate("/analysis", { state: { diff, app } });
};


return (
<div className="page">
<Card title="Analyze Application Impact">
<label>Paste Diff / CURL</label>
<textarea
className="textarea"
placeholder="Enter diff or CURL..."
value={diff}
onChange={(e) => setDiff(e.target.value)}/>


<label>Select Application</label>
<select className="select" value={app} onChange={(e) => {setApp(e.target.value); setDiff("");}}>
<option value="">-- Select Application --</option>
<option value="EmployeeApp">Employee App</option>
<option value="DepartmentApp">Department App</option>
</select>


<button className="btn-primary" onClick={onAnalyze}>Analyze Impact</button>
</Card>
</div>
);
}