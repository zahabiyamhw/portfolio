export default function MobileNav({ sections, activeSection }) {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav className="mobile-nav" aria-label="Section navigation">
      {sections.map((id) => (
        <button
          key={id}
          className={`line-btn${activeSection === id ? ' active' : ''}`}
          onClick={() => scrollTo(id)}
          aria-label={id}
        >
          <span className="line" />
        </button>
      ))}
    </nav>
  );
}
