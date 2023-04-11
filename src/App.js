import React, { useState } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import "./app.css"

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [showDeletedNotification, setShowDeletedNotification] = useState(false);
  const [showCompletedNotification, setShowCompletedNotification] = useState(false);
    const [showReaddedNotification, setShowReaddedNotification] = useState(false);



    function toggleTodoCompletion(index) {
        setCompletedTodos((prevCompletedTodos) => ({
            ...prevCompletedTodos,
            [index]: !prevCompletedTodos[index],
        }));

        if (completedTodos[index]) {
            setShowReaddedNotification(true);
            setTimeout(() => {
                setShowReaddedNotification(false); // 2 saniye sonra bildirimi gizle
            }, 1200);
        } else {
            setShowCompletedNotification(true);
            setTimeout(() => {
                setShowCompletedNotification(false); // 2 saniye sonra bildirimi gizle
            }, 1200);
        }
    }
    function addTodo(text) {
        setTodos((prevTodos) => [...prevTodos, text]);

        setShowNotification(true); // Bildirimi göster
        setTimeout(() => {
            setShowNotification(false); // 2 saniye sonra bildirimi gizle
        }, 1200);
    }

  const deleteTodo = (index) => {
      setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));

      setCompletedTodos((prevCompletedTodos) => {
          const newCompletedTodos = { ...prevCompletedTodos };
          delete newCompletedTodos[index];
          return newCompletedTodos;
      });

      setShowDeletedNotification(true);
      setTimeout(() => {
          setShowDeletedNotification(false); // 2 saniye sonra bildirimi gizle
      }, 1200);

  };

  return (
      <div className="todo-app-container">
          <div className="todo-app">
        <h1>Todo List</h1>
        <TodoInput onAddTodo={addTodo} />
        <ul>
          {todos.map((todo, index) => (
              <TodoItem key={index} todo={todo}
                        isCompleted={completedTodos[index]}
                        onToggleCompletion={() => toggleTodoCompletion(index)}
                        onDelete={() => deleteTodo(index)} />
          ))}
        </ul>
              {showNotification && (
                  <div className="notification">
                      {"Todo başarıyla eklendi!"}
                  </div>
              )}

              {showDeletedNotification && (
                  <div className="notification deleted">
                      {"Todo başarıyla silindi!"}
                  </div>
              )}

              {showCompletedNotification && (
                  <div className="notification completed">
                      {"Todo tamamlandı!"}
                  </div>
              )}

              {showReaddedNotification && (
                  <div className="notification readded">
                      {"Yapılan todo geri eklendi!"}
                  </div>
              )}
          </div>
      </div>
  );
}

export default App;

