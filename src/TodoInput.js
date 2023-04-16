// TodoInput.js
import React, { useState } from 'react';
import "./todoinput.css"

function TodoInput({ onAddTodo }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue) return;
        onAddTodo(inputValue);
        setInputValue('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="todo-input-form">
                <input className="input"
                placeholder='Add Todo'
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
        </div>

    );
}

export default TodoInput;
