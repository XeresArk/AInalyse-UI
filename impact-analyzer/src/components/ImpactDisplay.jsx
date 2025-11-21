import "./ImpactDisplay.css";

export default function ImpactDisplay({ data }) {
  if (!data) return null;

  const safeArray = (arr) => Array.isArray(arr) && arr.length > 0;

  return (
    <div className="impact-container">
      
      {/* Impact Title */}
      <h2 className="impact-title">AInalyse Result</h2>

      {/* Impact Score */}
      {data.impactScore !== null &&
        data.impactScore !== undefined &&
        data.impactScore !== "" && (
          <div className="impact-score-box">
            <div className="impact-score">{data.impactScore}</div>
            <div className="impact-score-label">Impact Score</div>
          </div>
      )}

      {/* Changed Elements */}
      {safeArray(data.changedElements) && (
        <div className="impact-section">
          <h3>Changed Elements</h3>
          <ul>
            {data.changedElements.map((item, i) => (
              <li key={i} className="impact-item">
                {item.type && <span className="impact-tag">{item.type}</span>}
                {item.impactType && (
                  <span className="impact-yellow">{item.impactType}</span>
                )}
                {item.name && ` ${item.name}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Direct Impacts */}
      {safeArray(data.directImpacts) && (
        <div className="impact-section">
          <h3>Direct Impacts</h3>
          <ul>
            {data.directImpacts.map((item, i) => (
              <li key={i} className="impact-item">
                {item.type && <span className="impact-tag direct">{item.type}</span>}
                {item.name && ` ${item.name}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Indirect Impacts */}
      {safeArray(data.indirectImpacts) && (
        <div className="impact-section">
          <h3>Indirect Impacts</h3>
          <ul>
            {data.indirectImpacts.map((item, i) => (
              <li key={i} className="impact-item">
                {item.type && <span className="impact-tag indirect">{item.type}</span>}
                {item.name && ` ${item.name}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modules Impacted */}
      {safeArray(data.modulesImpacted) && (
        <div className="impact-section">
          <h3>Modules Impacted</h3>
          <div className="impact-modules">
            {data.modulesImpacted.map((m, i) =>
              m ? (
                <span key={i} className="impact-module">
                  {m}
                </span>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Repository URL */}
      {data.repoUrl && data.repoUrl.trim() !== "" && (
        <div className="impact-section">
          <h3>Repository</h3>
          <a
            href={data.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="impact-link"
          >
            {data.repoUrl}
          </a>
        </div>
      )}

      {/* Reasoning */}
      {data.reasoning && data.reasoning.trim() !== "" && (
        <div className="impact-section">
          <h3>Reasoning</h3>
          <p className="impact-reasoning">{data.reasoning}</p>
        </div>
      )}
    </div>
  );
}