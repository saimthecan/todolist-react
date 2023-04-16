import React, { useState , useEffect, useMemo} from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import "./app.css"


function FilterInput({ onFilterChange }) {
    const handleChange = (event) => {
      onFilterChange(event.target.value);
    };
  
    return (
      <div className="filter-input">
        <input
          type="text"
          placeholder="Filter todos..."
          onChange={handleChange}
        />
      </div>
    );
  }


function App() {

    const [filterText, setFilterText] = useState('');

    const handleFilterChange = (value) => {
        setFilterText(value);
      };
    
    

    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const filteredTodos = useMemo(() => {
        return todos.filter((todo) =>
          todo.toLowerCase().includes(filterText.toLowerCase())
        );
      }, [todos, filterText]);


  const [completedTodos, setCompletedTodos] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [showDeletedNotification, setShowDeletedNotification] = useState(false);
  const [showCompletedNotification, setShowCompletedNotification] = useState(false);
  const [showReaddedNotification, setShowReaddedNotification] = useState(false);
  const [showDuplicateNotification, setShowDuplicateNotification] = useState(false);

    function toggleTodoCompletion(index) {
        const currentTodo = todos[index];
        setCompletedTodos((prevCompletedTodos) => ({
            ...prevCompletedTodos,
            [index]: !prevCompletedTodos[index],
        }));

        if (completedTodos[index]) {
            setShowReaddedNotification(true);
            setTimeout(() => {
                setShowReaddedNotification(false); // 2 saniye sonra bildirimi gizle
            }, 2000);
        } else {
            setShowCompletedNotification(true);
            setTimeout(() => {
                setShowCompletedNotification(false); // 2 saniye sonra bildirimi gizle
            }, 1200);
        }
        setReaddedTodoName(currentTodo);
    }

    const [readdedTodoName, setReaddedTodoName] = useState('');

    function addTodo(text) {
        if (todos.some(todo => todo === text)) {
            setShowDuplicateNotification(true);
            setTimeout(() => {
                setShowDuplicateNotification(false);
            }, 2000)
        } else {
            setTodos((prevTodos) => [...prevTodos, text]);
            setShowNotification(true); // Bildirimi göster
            setTimeout(() => {
                setShowNotification(false); // 2 saniye sonra bildirimi gizle
            }, 1200);
        }

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

        <h2>Todo List</h2>
        <TodoInput onAddTodo={addTodo} />
        <FilterInput onFilterChange={handleFilterChange} />
           <ul>
          {filteredTodos.map((todo, index) => {
            const originalIndex = todos.indexOf(todo);
            return (
              <TodoItem
                key={originalIndex}
                todo={todo}
                isCompleted={completedTodos[originalIndex]}
                onToggleCompletion={() => toggleTodoCompletion(originalIndex)}
                onDelete={() => deleteTodo(originalIndex)}
              />
            );
          })}
        </ul>
              {showNotification && (
                  <div className="notification">
                      {"Todo added successfully!"}
                  </div>
              )}

              {showDeletedNotification && (
                  <div className="notification deleted">
                      {"Todo deleted successfully!"}
                  </div>
              )}

              {showCompletedNotification && (
                  <div className="notification completed">
                      {"Todo completed successfully!"}
                  </div>
              )}

            {showReaddedNotification && (
            <div className="notification readded">
                {`You have to do '${readdedTodoName}' again`}
            </div>
        )}

              {showDuplicateNotification && (
                  <div className="notification duplicated">
                      {"This has already been added!"}
                  </div>
              )}
          </div>
      </div>
  );
}

export default App;

