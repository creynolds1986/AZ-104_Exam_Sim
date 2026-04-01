import React, { useState } from 'react';
import { Section } from '../types';

interface Props {
  sections: Section[];
  onStart: (sectionIds: string[], questionCount: number, timerEnabled: boolean, timerMinutes: number) => void;
}

export default function ExamSetup({ sections, onStart }: Props) {
  const [selectedSections, setSelectedSections] = useState<Set<string>>(
    new Set(sections.map(s => s.id))
  );
  const [questionCount, setQuestionCount] = useState(50);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [timerMinutes, setTimerMinutes] = useState(150);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    const next = new Set(selectedSections);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedSections(next);
  };

  const toggleExpand = (id: string) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpanded(next);
  };

  const selectAll = () => setSelectedSections(new Set(sections.map(s => s.id)));
  const selectNone = () => setSelectedSections(new Set());

  return (
    <div className="setup-container">
      <div className="setup-card">
        <h2>AZ-104: Microsoft Azure Administrator</h2>
        <p className="subtitle">
          Configure your practice exam. Select sections to test and choose the number of questions.
        </p>

        <div className="section-picker">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3>Exam Sections</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={selectAll} style={{ fontSize: 13, color: '#0078d4', background: 'none', textDecoration: 'underline' }}>
                Select All
              </button>
              <button onClick={selectNone} style={{ fontSize: 13, color: '#0078d4', background: 'none', textDecoration: 'underline' }}>
                Clear All
              </button>
            </div>
          </div>

          {sections.map(section => (
            <div key={section.id} className="section-item">
              <div className="section-header" onClick={() => toggleExpand(section.id)}>
                <input
                  type="checkbox"
                  checked={selectedSections.has(section.id)}
                  onChange={(e) => { e.stopPropagation(); toggleSection(section.id); }}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="section-title">{section.title}</span>
                <span className="section-weight">{section.weight}</span>
                <span style={{ fontSize: 12, color: '#a19f9d', transition: 'transform 0.2s', transform: expanded.has(section.id) ? 'rotate(180deg)' : 'rotate(0)' }}>
                  ▼
                </span>
              </div>
              {expanded.has(section.id) && (
                <ul className="section-subsections">
                  {section.subsections.map(sub => (
                    <React.Fragment key={sub.id}>
                      <li style={{ fontWeight: 600, color: '#323130', listStyle: 'none', marginTop: 8 }}>{sub.title}</li>
                      {sub.bulletPoints.map((bp, i) => (
                        <li key={i}>{bp}</li>
                      ))}
                    </React.Fragment>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="exam-options">
          <div className="option-group">
            <label>Number of Questions</label>
            <select value={questionCount} onChange={e => setQuestionCount(Number(e.target.value))}>
              <option value={10}>10 (Quick Practice)</option>
              <option value={25}>25 (Short Exam)</option>
              <option value={40}>40 (Standard Exam)</option>
              <option value={50}>50 (Full Exam)</option>
              <option value={75}>75 (Extended)</option>
              <option value={100}>100 (Marathon)</option>
            </select>
          </div>
          <div className="option-group">
            <label>Timer</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={timerEnabled}
                onChange={e => setTimerEnabled(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: '#0078d4' }}
              />
              <select
                value={timerMinutes}
                onChange={e => setTimerMinutes(Number(e.target.value))}
                disabled={!timerEnabled}
                style={{ flex: 1 }}
              >
                <option value={30}>30 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
                <option value={120}>120 minutes</option>
                <option value={150}>150 minutes (Standard)</option>
                <option value={180}>180 minutes</option>
              </select>
            </div>
          </div>
        </div>

        <button
          className="start-btn"
          disabled={selectedSections.size === 0}
          onClick={() => onStart([...selectedSections], questionCount, timerEnabled, timerMinutes)}
        >
          {selectedSections.size === 0
            ? 'Select at least one section'
            : `Start Exam (${questionCount} questions)`
          }
        </button>
      </div>
    </div>
  );
}
