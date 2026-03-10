import { useState } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import './App.css';

// ── Seed data ─────────────────────────────────────────
const INITIAL_TODOS = [
  { id: 1,  text: 'Set up the React project with Vite', completed: true,  createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 2,  text: 'Build Header, ToDoList and ToDoItem components', completed: true,  createdAt: new Date(Date.now() - 72000000).toISOString() },
  { id: 3,  text: 'Implement add, delete, and complete features', completed: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 4,  text: 'Add edit functionality for existing tasks', completed: false, createdAt: new Date().toISOString() },
];

// ── App component — owns all to-do state ──────────────
function App() {
  // ── State ───────────────────────────────────────────
  const [todos,    setTodos]    = useState(INITIAL_TODOS);
  const [input,    setInput]    = useState('');
  const [filter,   setFilter]   = useState('all');   // 'all' | 'active' | 'completed'
  const [nextId,   setNextId]   = useState(INITIAL_TODOS.length + 1);

  // ── Event Handlers ──────────────────────────────────

  // ADD — create new todo and append to list
  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newTodo = {
      id:          nextId,
      text:        trimmed,
      completed:   false,
      createdAt:   new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
    setNextId((n) => n + 1);
    setInput('');
  };

  // Allow pressing Enter to add a task
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  // TOGGLE — mark task complete / incomplete
  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // DELETE — remove a task permanently
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // EDIT — update text of an existing task
  const handleEdit = (id, newText) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // CLEAR — remove all completed tasks
  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // ── Derived values ──────────────────────────────────
  const completedCount = todos.filter((t) => t.completed).length;

  // ── Render ──────────────────────────────────────────
  return (
    <div className="app-wrapper">

      {/* Header receives stats as props */}
      <Header total={todos.length} completed={completedCount} />

      <main className="main-content">

        {/* ── Add task section ── */}
        <section className="add-task-section">
          <div className="add-form">
            <input
              className="add-input"
              type="text"
              placeholder="What needs to be done?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="New task input"
            />
            <button className="add-btn" onClick={handleAdd} aria-label="Add task">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>Add Task</span>
            </button>
          </div>
        </section>

        {/* ── Filter chips ── */}
        <div className="filter-bar" role="tablist" aria-label="Filter tasks">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
              role="tab"
              aria-selected={filter === f}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'all'       && ` (${todos.length})`}
              {f === 'active'    && ` (${todos.length - completedCount})`}
              {f === 'completed' && ` (${completedCount})`}
            </button>
          ))}
        </div>

        {/* ── ToDoList receives todos and handlers as props ── */}
        <ToDoList
          todos={todos}
          filter={filter}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        {/* ── Footer: clear completed ── */}
        {completedCount > 0 && (
          <div className="list-footer">
            <span>{completedCount} task{completedCount !== 1 ? 's' : ''} completed</span>
            <button className="clear-btn" onClick={handleClearCompleted}>
              Clear completed
            </button>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
