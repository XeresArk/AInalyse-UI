import { useState } from "react";


export default function DiffAnalyzer({ value, onChange }) {
const [diff, setDiff] = useState(value || "");
const [app, setApp] = useState("");


const handleChange = (v) => {
setDiff(v);
onChange({ inputType: "diff", diff: v, app });
};


return (
<div>
<label className="label">Paste Diff / CURL</label>
<textarea
className="textarea"
placeholder='e.g. {"diff":"removed method ..."} or curl'
value={diff}
onChange={(e) => handleChange(e.target.value)}
/>


<label className="label">Select Application</label>
<select
className="select"
value={app}
onChange={(e) => {
setApp(e.target.value);
onChange({ inputType: "diff", diff, app: e.target.value });
}}
>
<option value="">-- Select Application --</option>
<option value="employeeapp">Employee App</option>
<option value="departmentapp">Department App</option>
</select>
</div>
);
}