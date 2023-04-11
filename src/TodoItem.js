// TodoItem.js
import React from 'react';
import "./app.css"
import "./todoitem.css"

// TodoItem.js
function TodoItem({ todo, isCompleted, onToggleCompletion, onDelete }) {
    return (
        <li className="todo-item">
            <div className="todo-content">
            <input
                type="checkbox"
                checked={isCompleted}
                onChange={onToggleCompletion}
            />
            <span style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
        {todo}
      </span>
            </div>
            <button onClick={onDelete}>Sil</button>
        </li>
    );
}

export default TodoItem;
