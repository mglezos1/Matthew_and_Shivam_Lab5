import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState("");
  const [saving, setSaving] = useState(false);

  function onChange(ev) {
    const value = ev.target.value;
    setNewTodo(value);
  }

  function addTodo(ev) {
    ev.preventDefault();
    const value = {
      userId: 3,
      id: Math.floor(Math.random() * 10000) + 1,
      title: newTodo,
      completed: false
    };
    setSaving(true);
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify(value)
    })
      .then(res => res.json())
      .then(data => {
        setTodos(todos.concat({ ...data, id: value.id }));
        setSaving(false);
      });
  }

  function removeTodo(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  function updateTodo(id) {
    const newList = todos.map(t => {
      if(t.id === id) {
        const updatedItem = { ...t, completed: !t.completed };
        return updatedItem;
      }
      return t;
    });
    setTodos(newList);
  }

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("https://jsonplaceholder.typicode.com/todos").then(res => res.json());
      setTodos(result.slice(0, 5));
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="header">Todo List</h1>
      {loading ? "Loading..." : (
        <TodoList
          todos={todos}
          removeHandler={removeTodo}
          updateTodo={updateTodo}
        />
      )}

      <div className="add-todo-form">
        {saving ? "Saving..." : (
          <form onSubmit={addTodo}>
            <input type="text" onChange={onChange} />
            <button type="submit">Add New Todo</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
