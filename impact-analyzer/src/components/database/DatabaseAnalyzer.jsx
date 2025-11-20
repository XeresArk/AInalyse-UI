import { useState, useEffect } from "react";

export default function DatabaseAnalyzer({ onChange }) {
  const [schema, setSchema] = useState("");
  const [table, setTable] = useState("");
  const [column, setColumn] = useState("");

  const [tablesMap, setTablesMap] = useState(null); 
  const [availableTables, setAvailableTables] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([]);

  // -----------------------------------------
  // 🔥 Load metadata from API
  // -----------------------------------------
  const loadDatabaseDetails = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/database/getTableDetails");
      const data = await res.json();
    
      // SET DATA IN CORRECT ORDER
      setSchema(data.schemaName);     
      setTablesMap(data.tables);      

    } catch (error) {
      console.error("Error fetching DB metadata", error);
    }
  };

  useEffect(() => {
    loadDatabaseDetails();
  }, []);

  // After tablesMap loads → update 2nd dropdown
  useEffect(() => {
    if (tablesMap) {
      setAvailableTables(Object.keys(tablesMap));
    }
  }, [tablesMap]);

  // When table changes → update columns
  useEffect(() => {
    if (table && tablesMap) {
      setAvailableColumns(tablesMap[table] || []);
      setColumn("");
    }
  }, [table, tablesMap]);

  // Send selected values to parent
  useEffect(() => {
    onChange({
      schema,
      table,
      column
    });
  }, [schema, table, column]);


  return (
    <div>

 
      <label className="label">Select Schema</label>

      <select
        className="select"
        value={schema}
        disabled={!schema}        
        style={{ background: schema ? "#eee" : "#fff" }}
      >
        <option value="">{schema ? schema : "Loading..."}</option>
      </select>


      <label className="label">Select Table</label>

      <select
        className="select"
        value={table}
        onChange={(e) => setTable(e.target.value)}
        disabled={!tablesMap}
      >
        <option value="">-- Select Table --</option>

        {availableTables.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <label className="label">Select Column</label>

      <select
        className="select"
        value={column}
        onChange={(e) => setColumn(e.target.value)}
        disabled={!table}
      >
        <option value="">-- Select Column --</option>

        {availableColumns.map((col) => (
          <option key={col} value={col}>{col}</option>
        ))}
      </select>

    </div>
  );
}