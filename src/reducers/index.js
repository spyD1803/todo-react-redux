import { actionTypes } from "../actions";
const INITIAL_STATE = {
  updating: false,
  todos: [],
};

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.UPDATING: {
      return { ...state, updating: true, error: "" };
    }

    case actionTypes.ERROR: {
      return { ...state, updating: false, error: action.payload };
    }

    case actionTypes.ADD_TODOS: {
      return { ...state, todos: action.payload.todos, updating: false };
    }

    case actionTypes.ADD_NEW_TODO: {
      const addedToTodoList = {
        ...state,
        todos: [...state.todos, action.payload],
        updating: false,
      };
      return addedToTodoList;
    }

    case actionTypes.DELETE_TODO: {
      const afterRemovalTodoList = state.todos.filter(
        (todo) => todo._id != action.payload
      );
      return { ...state, todos: afterRemovalTodoList, updating: false };
    }

    case actionTypes.UPDATE_TODO: {
      console.log(action);
      const updatedTodoList = state.todos.map((todo) => {
        if (todo._id == action.payload._id) {
          return { ...todo, ...action.payload };
        }
        return todo;
      });
      console.log(updatedTodoList);
      return { ...state, todos: updatedTodoList, updating: false };
    }

    default: {
      return state;
    }
  }
};

export default todoReducer;
