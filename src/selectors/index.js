import { createSelector } from "reselect";

const getTodos = (state) => state.todos;

const getTodoSelector = createSelector(getTodos, (todos) => todos);

export default getTodoSelector;
