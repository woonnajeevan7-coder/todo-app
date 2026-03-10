import ToDoItem from './ToDoItem';

// ToDoList — renders the filtered list of tasks using Array.map()
// Each item has a unique key prop (todo.id)

function ToDoList({ todos, onToggle, onDelete, onEdit, filter }) {

  // Filter logic based on active filter tab
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active')    return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // Empty state messages per filter
  const emptyMessages = {
    all:       { icon: '📋', text: 'No tasks yet', sub: 'Add your first task above!' },
    active:    { icon: '🎉', text: 'All caught up!', sub: 'No pending tasks remaining.' },
    completed: { icon: '⏳', text: 'Nothing done yet', sub: 'Complete a task to see it here.' },
  };

  if (visibleTodos.length === 0) {
    const msg = emptyMessages[filter];
    return (
      <div className="todo-empty">
        <span className="todo-empty-icon">{msg.icon}</span>
        <p className="todo-empty-text">{msg.text}</p>
        <p className="todo-empty-sub">{msg.sub}</p>
      </div>
    );
  }

  return (
    <div className="todo-list-wrap">
      {visibleTodos.map((todo) => (
        // Each item uses todo.id as unique key
        <ToDoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default ToDoList;
