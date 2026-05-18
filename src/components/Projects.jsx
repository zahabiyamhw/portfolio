import { projects } from '../data/resume';

export default function Projects() {
  return (
    <div>
      <p className="section-label">Projects</p>
      <div className="projects-grid">
        {projects.map((p) => (
          <div key={p.id} className="project-card">
            <div className="project-header">
              <span className="project-name">{p.name}</span>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Live ↗
                </a>
              )}
            </div>
            <p className="project-period">{p.period}</p>
            <p className="project-desc">{p.description}</p>
            <div className="tag-row">
              {p.tech.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
