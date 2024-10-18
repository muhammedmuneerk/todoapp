import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
// import { FaPlus, FaTimes } from 'react-icons/fa';  // If using React Icons
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          status: 'active',
          createdAt: new Date().toISOString(),
        },
      ]);
      setInputValue('');
    }
  };

  const updateTodoStatus = (id, newStatus) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    return todo.status === filter;
  });

  return (
    <div className="app">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mainHeading"
      >
        <h1>Todo List</h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="subHeading"
      >
        <h2>{format(new Date(), "EEEE, MMMM do yyyy")}</h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="input"
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          type="text"
          placeholder="🖊️ Add a new task..."
        />
        <motion.i
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={addTodo}
          className="fas fa-plus"
        ></motion.i>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="filters"
      >
        {['all', 'active', 'completed', 'archived', 'canceled'].map((f) => (
          <motion.button
            key={f}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(f)}
            className={filter === f ? 'active' : ''}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </motion.button>
        ))}
      </motion.div>
      <div className="app-content">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="todos"
        >
          <AnimatePresence>
            {filteredTodos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`todo ${todo.status}`}
              >
                <div className="left">
                  <select
                    value={todo.status}
                    onChange={(e) => updateTodoStatus(todo.id, e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                    <option value="canceled">Canceled</option>
                  </select>
                  <p>{todo.text}</p>
                </div>
                <div className="right">
                  <small>{format(new Date(todo.createdAt), 'MMM d, HH:mm')}</small>
                  <motion.i
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteTodo(todo.id)}
                    className="fas fa-times"
                  ></motion.i>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default App



//   ---- ADD THESE ------//
// TIME AND DATE OF THE ADDED TASK , // WHEN ITS ADDED //
// ACTIVE TASKS
// ARCHAVED TASKS
// FINISHED TASKS
//CANCELED TASKS
//DONE THEN REMOVED TASKS


// CREATE A SINGLE PAGE TODOS APP ADDING THESE FONCTIONALITYS ABOVE //
