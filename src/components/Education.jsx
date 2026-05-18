import { education, certifications } from '../data/resume';

export default function Education() {
  return (
    <div>
      <p className="section-label">Education</p>
      <ul className="edu-list">
        {education.map((e) => (
          <li key={e.degree} className="edu-item">
            <p className="edu-degree">{e.degree}</p>
            <p className="edu-institution">{e.institution}</p>
            <p className="edu-meta">{e.location} · {e.year}</p>
          </li>
        ))}
      </ul>

      <div className="cert-list">
        <p className="cert-label">Certifications</p>
        {certifications.map((c) => (
          <p key={c.name} className="cert-item">
            {c.name} — {c.issuer}, {c.year}
            <span className="cert-note">({c.note})</span>
          </p>
        ))}
      </div>
    </div>
  );
}
