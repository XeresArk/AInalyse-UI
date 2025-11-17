import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Analysis from "./routes/Analysis";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </>
  );
}
