import { useState } from 'react';

// ToDoItem — renders a single task with toggle, edit, and delete capabilities

function ToDoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing,   setIsEditing]   = useState(false);
  const [editValue,   setEditValue]   = useState(todo.text);

  // ── Handlers ──────────────────────────────────────────
  const handleSave = () => {
    const trimmed = editValue.trim();
    if (!trimmed) return;          // disallow empty saves
    onEdit(todo.id, trimmed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(todo.text);       // reset to original
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter')  handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  // ── Format timestamp ───────────────────────────────────
  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  // ── Render ─────────────────────────────────────────────
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>

      {/* Checkbox — marks task complete / incomplete */}
      <button
        className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      {/* Text body / edit input */}
      <div className="todo-body">
        {isEditing ? (
          <input
            className="todo-edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Edit task"
          />
        ) : (
          <>
            <p className="todo-text">{todo.text}</p>
            <p className="todo-meta">Added {formatDate(todo.createdAt)}</p>
          </>
        )}
      </div>

      {/* Action buttons */}
      <div className="todo-actions">
        {isEditing ? (
          <>
            {/* Save edit */}
            <button
              className="action-btn save"
              onClick={handleSave}
              title="Save (Enter)"
              aria-label="Save edit"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>

            {/* Cancel edit */}
            <button
              className="action-btn cancel"
              onClick={handleCancel}
              title="Cancel (Esc)"
              aria-label="Cancel edit"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </>
        ) : (
          <>
            {/* Edit button */}
            <button
              className="action-btn edit"
              onClick={() => { setEditValue(todo.text); setIsEditing(true); }}
              title="Edit task"
              aria-label="Edit task"
              disabled={todo.completed}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>

            {/* Delete button */}
            <button
              className="action-btn delete"
              onClick={() => onDelete(todo.id)}
              title="Delete task"
              aria-label="Delete task"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
            </button>
          </>
        )}
      </div>

    </div>
  );
}

export default ToDoItem;
