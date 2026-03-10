# TaskFlow — React To-Do List App

A feature-complete To-Do List application built with **React 18 + Vite** as part of React Assignment-1.

---

## ✨ Features

| Feature | Status |
|---|---|
| Add new tasks (Enter key or button) | ✅ |
| Mark tasks as complete / incomplete | ✅ |
| Delete tasks | ✅ |
| Edit existing tasks (inline, save with Enter / Esc to cancel) | ✅ |
| Filter tasks — All / Active / Completed | ✅ |
| Live stats in header (Total / Done / Remaining) | ✅ |
| Clear all completed tasks | ✅ |
| Animated task list | ✅ |
| Responsive design | ✅ |

---

## 🧩 Component Structure

```
src/
├── App.jsx              ← Root component; owns all state
├── App.css              ← Global styles
├── main.jsx             ← Entry point
└── components/
    ├── Header.jsx       ← Branding + live stats (total, done, remaining)
    ├── ToDoList.jsx     ← Renders filtered list with Array.map() + unique keys
    └── ToDoItem.jsx     ← Single task: toggle, edit (inline), delete
```

### State & Props flow
- **`App`** holds the `todos` array in `useState`, and passes handlers (`onToggle`, `onDelete`, `onEdit`) and data down as **props**.
- **`Header`** receives `total` and `completed` counts as props.
- **`ToDoList`** receives `todos`, `filter`, and all three handlers as props; renders each `ToDoItem` with a unique `key={todo.id}`.
- **`ToDoItem`** manages its own local `isEditing` state; calls parent handlers via props.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18 — [nodejs.org](https://nodejs.org)
- **npm** (bundled with Node)

### Run locally

```bash
# 1. Clone the repository
git clone https://github.com/woonnajeevan7-coder/todo-app.git
cd todo-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for production

```bash
npm run build     # outputs to /dist
npm run preview   # preview the production build
```

---

## 📋 Assignment Checklist

- [x] Created with **Vite** (`npm create vite@latest`)
- [x] Runs without errors
- [x] `App` component with state management
- [x] `Header` component
- [x] `ToDoList` component using `Array.map()`
- [x] `ToDoItem` component with unique `key` props
- [x] State in `App`, passed via props to children
- [x] Add task event handler
- [x] Toggle complete event handler
- [x] Delete task event handler
- [x] Edit task event handler
- [x] Styled with custom CSS (design tokens, animations)
- [x] `node_modules` excluded via `.gitignore`
- [x] README with setup instructions

---

> Replace `<YOUR_REPO_LINK_HERE>` with your GitHub repository URL.
