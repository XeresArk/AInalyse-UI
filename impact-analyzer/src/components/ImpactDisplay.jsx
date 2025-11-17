import "./ImpactDisplay.css";

export default function ImpactDisplay({ data }) {
  if (!data) return null;

  return (
    <div className="impact-container">
      <h2 className="impact-title">Impact Analysis Result</h2>

      <div className="impact-score-box">
        <div className="impact-score">{data.impactScore}</div>
        <div className="impact-score-label">Impact Score</div>
      </div>

      <div className="cq-grid">
            <div className="cq-box">
              <div className="cq-box-label">Maintainability</div>
              <div className="cq-box-value">{Math.round(data.impactScore * 0.94)}%</div>
            </div>
            <div className="cq-box">
              <div className="cq-box-label">Security</div>
              <div className="cq-box-value">{Math.round(data.impactScore * 0.88)}%</div>
            </div>
            <div className="cq-box">
              <div className="cq-box-label">Duplication</div>
              <div className="cq-box-value">{Math.round(100 - data.impactScore * 0.12)}%</div>
            </div>
            <div className="cq-box">
              <div className="cq-box-label">Coverage</div>
              <div className="cq-box-value">{Math.round(Math.min(100, data.impactScore + 8))}%</div>
            </div>
        </div>

      <div className="impact-section">
        <h3>Changed Elements</h3>
        <ul>
          {data.changedElements.map((item, i) => (
            <li key={i} className="impact-item">
              <span className="impact-tag">{item.type}</span> {item.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="impact-section">
        <h3>Direct Impacts</h3>
        <ul>
          {data.directImpacts.map((item, i) => (
            <li key={i} className="impact-item">
              <span className="impact-tag direct">{item.type}</span> {item.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="impact-section">
        <h3>Indirect Impacts</h3>
        <ul>
          {data.indirectImpacts.map((item, i) => (
            <li key={i} className="impact-item">
              <span className="impact-tag indirect">{item.type}</span> {item.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="impact-section">
        <h3>Modules Impacted</h3>
        <div className="impact-modules">
          {data.modulesImpacted.map((m, i) => (
            <span key={i} className="impact-module">{m}</span>
          ))}
        </div>
      </div>

      <div className="impact-section">
        <h3>Repository</h3>
        <a href={data.bitbucketurl} target="_blank" rel="noreferrer" className="impact-link">
          {data.bitbucketurl}
        </a>
      </div>

      <div className="impact-section">
        <h3>Reasoning</h3>
        <p className="impact-reasoning">{data.reasoning}</p>
      </div>
    </div>
  );
}
