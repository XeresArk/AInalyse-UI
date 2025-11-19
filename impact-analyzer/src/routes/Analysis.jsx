import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImpactDisplay from "../components/ImpactDisplay";

export default function Analysis() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [result, setResult] = useState();

  useEffect(() => {
    const fetchAnalysis = async () => {
        console.log(state)
      const { analyzerPayload, mode} = state;

      if (mode === 'appSelection') {
        try {
          const response = await fetch(
            "http://localhost:8080/api/gemini/latestCommitAnalyse",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(analyzerPayload),
            }
          );

          if (!response.ok) {
            throw new Error("API request failed");
          }

          const data = await response.json();
          setResult(data);
        } catch (error) {
          console.error("Error:", error);
          return {
            error: true,
            message: error.message || "Unknown error occurred",
          };
        }
      }
      if (mode === 'diffInput') {
        try {
          const response = await fetch(
            "http://localhost:8080/api/gemini/codeDiffAnalyse",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(analyzerPayload),
            }
          );

          if (!response.ok) {
            throw new Error("API request failed");
          }

          const data = await response.json();
          setResult(data);
        } catch (error) {
          console.error("Error:", error);
          return {
            error: true,
            message: error.message || "Unknown error occurred",
          };
        }
      }
      if (mode === 'database'){
        try {
          const response = await fetch(
            `http://localhost:8080/api/databaseURL`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("API request failed");
          }

          const data = await response.json();
          setResult(data);
        } catch (error) {
          console.error("Error:", error);
          return {
            error: true,
            message: error.message || "Unknown error occurred",
          };
        }
      }
    };
    fetchAnalysis();
  }, []);

  if (!result) return <h2>Analyzing...</h2>;

  return (
    <div className="container">

      <ImpactDisplay data={result} />

        <button
        onClick={() => navigate(-1)}
        className="btn-link">
        ⮜ Back
      </button>
    </div>
  );
}
