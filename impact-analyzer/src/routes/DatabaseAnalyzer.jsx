import React, { useState, useEffect } from "react";


// Sample metadata — in real app this would come from API
const metadata = {
HR: {
employees: ["id", "name", "role", "salary", "managerId"],
attendance: ["id", "empId", "date", "status"]
},
Finance: {
invoices: ["id", "amount", "status", "dueDate"],
payments: ["id", "invoiceId", "paidAt", "method"]
}
};


export default function DatabaseAnalyzer({ onChange }) {
const [schema, setSchema] = useState("");
const [table, setTable] = useState("");
const [columns, setColumns] = useState([]);
const [availableTables, setAvailableTables] = useState([]);
const [availableColumns, setAvailableColumns] = useState([]);


useEffect(() => {
if (schema) {
const tables = Object.keys(metadata[schema] || {});
setAvailableTables(tables);
setTable("");
setColumns([]);
}
}, [schema]);


useEffect(() => {
if (schema && table) {
const cols = metadata[schema][table] || [];
setAvailableColumns(cols);
setColumns([]);
}
}, [table, schema]);


useEffect(() => {
onChange({ inputType: "database", schema, table, columns });
}, [schema, table, columns]);


const toggleColumn = (col) => {
setColumns((prev) => (prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]));
};


return (
<div>
<label className="label">Select Schema / Module</label>
<select className="select" value={schema} onChange={(e) => setSchema(e.target.value)}>
<option value="">-- Select Schema --</option>
{Object.keys(metadata).map((m) => (
<option key={m} value={m}>{m}</option>
))}
</select>


<label className="label">Select Table</label>
<select className="select" value={table} onChange={(e) => setTable(e.target.value)}>
<option value="">-- Select Table --</option>
{availableTables.map((t) => (
<option key={t} value={t}>{t}</option>
))}
</select>


<label className="label">Select Columns</label>
<div className="cols-grid">
{availableColumns.map((c) => (
<label key={c} className="col-item">
<input
type="checkbox"
checked={columns.includes(c)}
onChange={() => toggleColumn(c)}
/>
<span>{c}</span>
</label>
))}
</div>
</div>
);
}