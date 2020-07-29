import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTodos, updateTodo, deleteTodo } from "./actions";
import getTodoSelector from "./selectors";

const TodoItem = ({ todo, deleteTodo, updateTodo, onTodoUpdate }) => {
  const titleStyle = todo.isCompleted
    ? { textDecoration: "line-through", opacity: "50%" }
    : {};
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          flex: 1,
          textAlign: "left",
          ...titleStyle,
        }}
      >
        {todo.title}
      </h2>
      <i
        className="fa fa-check-circle-o done doneStyle"
        onClick={() => {
          updateTodo(todo._id, { isCompleted: !todo.isCompleted });
        }}
      ></i>
      <i
        className="fa fa-edit edit updateStyle"
        onClick={() => {
          onTodoUpdate(todo);
        }}
      ></i>
      <i
        className="fa fa-times-circle-o delete deleteStyle"
        onClick={() => {
          deleteTodo(todo._id);
        }}
      ></i>
    </li>
  );
};

const TodoList = ({
  todos,
  updating,
  fetchTodos,
  deleteTodo,
  updateTodo,
  onTodoUpdate,
}) => {
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      {updating ? <div class="loader"></div> : null}
      <ul id="listContainer" style={{ padding: 0 }}>
        {todos.map((todo, index) => (
          <TodoItem
            todo={todo}
            key={index}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
            onTodoUpdate={onTodoUpdate}
          />
        ))}
      </ul>
    </div>
  );
};

TodoList.defaultProps = {
  todos: [],
};

const mapStateToProps = (state) => ({
  updating: state.updating,
  todos: getTodoSelector(state),
});

export default connect(mapStateToProps, { fetchTodos, deleteTodo, updateTodo })(
  TodoList
);
