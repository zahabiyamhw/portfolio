import { experience } from '../data/resume';

export default function Experience() {
  return (
    <div>
      <p className="section-label">Experience</p>
      <div className="exp-list">
        {experience.map((job, i) => (
          <div key={job.id} className="exp-item">
            <span className="exp-period">{job.period}</span>
            <div className="exp-body">
              <h3 className="exp-role">
                {job.role}
                {job.link ? (
                  <> at{' '}
                    <a href={job.link} target="_blank" rel="noopener noreferrer"
                      className="exp-company-link">{job.company}</a>
                  </>
                ) : (
                  <> — {job.company}</>
                )}
              </h3>
              <p className="exp-meta-line">{job.location} · {job.type}</p>
              <ul className="exp-bullets">
                {job.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
