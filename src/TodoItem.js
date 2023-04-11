// TodoItem.js
import React from 'react';
import "./app.css"
import "./todoitem.css"

// TodoItem.js
function TodoItem({ todo, isCompleted, onToggleCompletion, onDelete }) {
    return (
        <li className="todo-item">

            <input
                type="checkbox"
                checked={isCompleted}
                onChange={onToggleCompletion}
                className="todo-checkbox"
            />
            <div className="todo-content">
            <span style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
        {todo}
      </span>
            </div>
            <button className="delete-button" onClick={onDelete}>
                Sil
            </button>
        </li>
    );
}

export default TodoItem;
