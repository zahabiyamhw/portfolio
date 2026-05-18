import { useState, useEffect, useRef } from 'react';
import { personal, skills, experience } from '../data/resume';

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "A SQL query walks into a bar and asks two tables... 'Can I join you?'",
  "Why did the developer go broke? They used up all their cache.",
  "There are 10 kinds of people: those who understand binary, and those who don't.",
  "I told my boss three companies were after me. He asked which ones. I said: AWS, Google, and the debt collector.",
];

function runCommand(cmd) {
  switch (cmd) {
    case 'help':
      return `available commands:
  whoami         who is this person
  ls             list sections
  ls skills/     list all skills
  cat summary    read the summary
  experience     list work history
  joke           a developer joke
  clear          clear the terminal
  exit           close the terminal`;

    case 'whoami':
      return `${personal.name}
${personal.title} · ${personal.location}
${personal.email}`;

    case 'ls':
      return `about/
experience/
projects/
skills/
education/`;

    case 'ls skills/':
      return Object.entries(skills)
        .map(([cat, items]) => `${cat}\n  ${items.join('  ')}`)
        .join('\n\n');

    case 'cat summary':
      return personal.summary;

    case 'experience':
      return experience
        .map((e) => `${e.period.padEnd(22)} ${e.company} — ${e.role}`)
        .join('\n');

    case 'joke':
      return JOKES[Math.floor(Math.random() * JOKES.length)];

    default:
      return null;
  }
}

export default function Terminal({ onClose }) {
  const [history, setHistory] = useState([
    { kind: 'system', text: `zahabiya@portfolio ~ — type "help" to get started` },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const submit = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'exit') {
      onClose();
      return;
    }
    if (cmd === 'clear') {
      setHistory([{ kind: 'system', text: `zahabiya@portfolio ~ — type "help" to get started` }]);
      setInput('');
      return;
    }

    const output = runCommand(cmd);
    setHistory((prev) => [
      ...prev,
      { kind: 'input', text: `❯ ${raw}` },
      output
        ? { kind: 'output', text: output }
        : { kind: 'error', text: `command not found: ${cmd}` },
    ]);
    setInput('');
  };

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-titlebar">
          <span>zahabiya@portfolio ~</span>
          <button className="terminal-close-btn" onClick={onClose} aria-label="Close terminal">
            ✕
          </button>
        </div>

        <div className="terminal-body">
          {history.map((entry, i) => (
            <div key={i} className={`terminal-line t-${entry.kind}`}>
              <pre>{entry.text}</pre>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="terminal-input-row">
          <span className="terminal-prompt">❯</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit(input);
              if (e.key === 'Escape') onClose();
            }}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            placeholder="type a command..."
          />
        </div>
      </div>
    </div>
  );
}
