import React, { useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import TodoList from "./TodoList";
import { addTodo, updateTodo } from "./actions";

function App(props) {
  const [todo, setTodo] = useState("");
  const [updateId, setUpdateId] = useState(null);

  const onAddItemPress = () => {
    if (todo) {
      if (updateId) {
        props.updateTodo(updateId, { title: todo });
      } else {
        props.addTodo(todo);
      }
    }
    setUpdateId(null);
    setTodo("");
  };

  const onValueChange = (e) => {
    setTodo(e.target.value);
  };

  const onTodoUpdate = (todo) => {
    setTodo(todo.title);
    setUpdateId(todo._id);
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <div className="input-container">
        <input
          id="todoInput"
          className="input"
          placeholder="Todo..."
          value={todo}
          onChange={onValueChange}
        />
        <button className="button-style" onClick={onAddItemPress}>
          Add Item
        </button>
      </div>
      {props.error ? (
        <p style={{ color: "red", fontSize: 12 }}>
          Something went wrong. Please try again
        </p>
      ) : null}
      <TodoList onTodoUpdate={onTodoUpdate} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  todos: state,
  error: state.error,
});

export default connect(mapStateToProps, { addTodo, updateTodo })(App);
