import "./styles.css";
import React from "react";

export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "do stuff", done: false },
    { id: 2, text: "eat something", done: false },
    { id: 3, text: "go shopping", done: false },
  ]);
  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <AddTodo setTodos={setTodos} />
    </div>
  );
}

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done,
          }
        : t
    );
     setTodos(updatedTodos);
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? "line-through" : "",
          }}
          key={todo.id}
        >
          {todo.text}
          <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}

function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {
        setTodos((prevTodos) => {
          return prevTodos.filter((t) => t.id !== todo.id)
        });
    }
  }
  return (
  <span onClick={handleDeleteTodo}
    role="button" 
    style= {{ 
      color: 'red',
      frontWeight: 'bold',
      marginLeft: 10,
  }}>x</span>
  )
}

function AddTodo({ setTodos }) {
  const inputRef = React.useRef();

function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    const todo = {
      id: Math.random(),
      text,
      done: false,
    };

    setTodos((prevTodos) => {
      return prevTodos.concat(todo);
    });
    inputRef.current.value = "";
}
  return (
    <form onSubmit={handleAddTodo}>
      <input name="addTodo" placeholder="Add Todo" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}

