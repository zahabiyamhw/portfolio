import { skills } from '../data/resume';

export default function Skills() {
  return (
    <div>
      <p className="section-label">Skills</p>
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="skills-group">
          <p className="skills-category">{category}</p>
          <div className="tag-row">
            {items.map((item) => (
              <span key={item} className="tag">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
