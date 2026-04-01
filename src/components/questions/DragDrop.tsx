import React, { useState } from 'react';
import { DragDropQuestion } from '../../types';

interface Props {
  question: DragDropQuestion;
  answer: Record<string, string> | null;
  onAnswer: (answer: Record<string, string>) => void;
  reviewMode: boolean;
}

export default function DragDrop({ question, answer, onAnswer, reviewMode }: Props) {
  const placements = answer || {};
  const [dragItem, setDragItem] = useState<string | null>(null);
  const [dragOverTarget, setDragOverTarget] = useState<string | null>(null);

  const placedItemIds = new Set(Object.values(placements));

  const handleDragStart = (itemId: string) => {
    if (reviewMode) return;
    setDragItem(itemId);
  };

  const handleDrop = (targetId: string) => {
    if (reviewMode || !dragItem) return;
    const next = { ...placements, [targetId]: dragItem };
    onAnswer(next);
    setDragItem(null);
    setDragOverTarget(null);
  };

  const removeFromTarget = (targetId: string) => {
    if (reviewMode) return;
    const next = { ...placements };
    delete next[targetId];
    onAnswer(next);
  };

  return (
    <div>
      <div className="question-stem">{question.stem}</div>
      <div className="drag-drop-container">
        <div className="drag-items">
          <h4>Items</h4>
          {question.items.map(item => {
            const isPlaced = placedItemIds.has(item.id);
            return (
              <div
                key={item.id}
                className={`drag-item ${dragItem === item.id ? 'dragging' : ''} ${isPlaced ? 'placed' : ''}`}
                draggable={!reviewMode && !isPlaced}
                onDragStart={() => handleDragStart(item.id)}
                onDragEnd={() => { setDragItem(null); setDragOverTarget(null); }}
              >
                {item.text}
              </div>
            );
          })}
        </div>

        <div className="drag-targets">
          <h4>Drop Targets</h4>
          {question.targets.map(target => {
            const placedItemId = placements[target.id];
            const placedItem = question.items.find(i => i.id === placedItemId);
            const isOver = dragOverTarget === target.id;

            let targetClass = 'drop-target';
            if (isOver) targetClass += ' drag-over';
            if (reviewMode && placedItemId) {
              targetClass += placedItemId === target.correctItemId ? ' correct' : ' incorrect';
            }

            const correctItem = reviewMode ? question.items.find(i => i.id === target.correctItemId) : null;

            return (
              <div
                key={target.id}
                className={targetClass}
                onDragOver={e => { e.preventDefault(); setDragOverTarget(target.id); }}
                onDragLeave={() => setDragOverTarget(null)}
                onDrop={() => handleDrop(target.id)}
                style={reviewMode ? {
                  borderStyle: 'solid',
                  borderColor: placedItemId === target.correctItemId ? 'var(--ms-green)' : 'var(--ms-red)',
                  background: placedItemId === target.correctItemId ? '#dff6dd' : '#fde7e9',
                } : undefined}
              >
                <div className="drop-target-label">{target.label}</div>
                {placedItem ? (
                  <div className="drop-target-content">
                    <span className="drop-target-item">{placedItem.text}</span>
                    {!reviewMode && (
                      <button className="drop-target-remove" onClick={() => removeFromTarget(target.id)}>×</button>
                    )}
                  </div>
                ) : (
                  <span className="drop-target-placeholder">
                    {reviewMode ? `Correct: ${correctItem?.text}` : 'Drag an item here'}
                  </span>
                )}
                {reviewMode && placedItemId && placedItemId !== target.correctItemId && (
                  <div style={{ fontSize: 12, color: 'var(--ms-green)', marginTop: 4 }}>
                    Correct: {correctItem?.text}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
