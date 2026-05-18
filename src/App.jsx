import { useState, useEffect } from 'react';
import LeftPanel from './components/LeftPanel';
import MobileHeader from './components/MobileHeader';
import MobileNav from './components/MobileNav';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Terminal from './components/Terminal';
import './App.css';

const SECTIONS = ['about', 'experience', 'projects', 'skills', 'education'];

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const observers = SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-35% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '`' && document.activeElement.tagName !== 'INPUT') {
        setTerminalOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className="layout">
        <aside className="left-panel">
          <LeftPanel activeSection={activeSection} />
        </aside>
        <main className="right-panel">
          <MobileHeader />
          <section id="about"><About /></section>
          <section id="experience"><Experience /></section>
          <section id="projects"><Projects /></section>
          <section id="skills"><Skills /></section>
          <section id="education"><Education /></section>
        </main>
      </div>

      <MobileNav
        sections={SECTIONS}
        activeSection={activeSection}
      />

      {terminalOpen && (
        <Terminal onClose={() => setTerminalOpen(false)} />
      )}
    </>
  );
}
