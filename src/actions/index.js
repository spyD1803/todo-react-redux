import { BASE_URL } from "../config";
import axios from "axios";

export const actionTypes = {
  UPDATING: "upating",
  //   FETCH_TODOS: "fetchTodos",
  ADD_TODOS: "addTodos",
  ADD_NEW_TODO: "addTodo",
  UPDATE_TODO: "updateTodo",
  DELETE_TODO: "deleteTodo",
  ERROR: "error",
};

export const fetchTodos = () => (dispatch) => {
  dispatch({ type: actionTypes.UPDATING });
  axios
    .get(BASE_URL + "fetchTodos")
    .then((response) => {
      dispatch({
        type: actionTypes.ADD_TODOS,
        payload: {
          todos: response.data,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.ERROR,
        payload: { error: JSON.stringify(error) },
      });
    });
};
export const addTodo = (title) => (dispatch) => {
  dispatch({ type: actionTypes.UPDATING });
  axios
    .post(BASE_URL + "addTodo", { title })
    .then((response) => {
      dispatch({
        type: actionTypes.ADD_NEW_TODO,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.ERROR,
        payload: { error: JSON.stringify(error) },
      });
    });
};

export const updateTodo = (id, body) => (dispatch) => {
  dispatch({ type: actionTypes.UPDATING });
  axios
    .patch(BASE_URL + "updateTodo/" + id, body)
    .then((response) => {
      console.log(response);
      dispatch({
        type: actionTypes.UPDATE_TODO,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.ERROR,
        payload: { error: JSON.stringify(error) },
      });
    });
};

export const deleteTodo = (id) => (dispatch) => {
  dispatch({ type: actionTypes.UPDATING });
  axios
    .delete(BASE_URL + "deleteTodo/" + id)
    .then((response) => {
      console.log(response);
      dispatch({
        type: actionTypes.DELETE_TODO,
        payload: response.data._id,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.ERROR,
        payload: { error: JSON.stringify(error) },
      });
    });
};

export const clearTodos = () => (dispatch) => {
  dispatch({ type: actionTypes.UPDATING });
  axios
    .post(BASE_URL + "addTodo", {})
    .then((response) => {
      dispatch({
        type: actionTypes.ADD_NEW_TODO,
        payload: {
          todos: response.data,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.ERROR,
        payload: { error: JSON.stringify(error) },
      });
    });
};
