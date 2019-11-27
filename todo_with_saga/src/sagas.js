import { put, takeEvery, delay } from "redux-saga/effects";
import uuid from "uuid";
import { ADD_TODO, HIDE_NOTIFICATION } from "./reducers";

export const ADD_TODO_WITH_NOTIFICATION = "ADD_TODO_WITH_NOTIFICATION";

export default function* watchAddTodoWithNotification() {
  yield takeEvery(ADD_TODO_WITH_NOTIFICATION, handleAddTodoWithNotification);
}

function* handleAddTodoWithNotification(action) {
  const todoId = uuid();
  const { todoName, assigneeName } = action.payload;
  yield put(doAddTodo(todoId, todoName, assigneeName));
  yield delay(5000);
  yield put(doHideNotification(todoId));
}

const doAddTodo = (todoId, todoName, assigneeName) => {
  return {
    type: ADD_TODO,
    payload: { todoId: todoId, todoName: todoName, assigneeName: assigneeName }
  };
};

const doHideNotification = todoId => {
  return {
    type: HIDE_NOTIFICATION,
    payload: { id: todoId }
  };
};
