import { put, takeEvery, delay, fork } from "redux-saga/effects";
import uuid from "uuid";
import { ADD_TODO, CHANGE_ASSIGNEE, HIDE_NOTIFICATION } from "./reducers";

export const ADD_TODO_WITH_NOTIFICATION = "ADD_TODO_WITH_NOTIFICATION";
export const CHANGE_ASSIGNEE_WITH_NOTIFICATION =
  "CHANGE_ASSIGNEE_WITH_NOTIFICATION";

const doAddTodo = (todo, assignee, isNewAssignee, notification) => {
  return {
    type: ADD_TODO,
    payload: {
      todo: todo,
      assignee: assignee,
      isNewAssignee: isNewAssignee,
      notification: notification
    }
  };
};

const doHideNotification = todoId => {
  return {
    type: HIDE_NOTIFICATION,
    payload: { id: todoId }
  };
};

const doChangeAssignee = (todoId, assignee, isNewAssignee, notification) => {
  return {
    type: CHANGE_ASSIGNEE,
    payload: {
      todoId: todoId,
      assignee: assignee,
      isNewAssignee: isNewAssignee,
      notification: notification
    }
  };
};

function* handleAddTodoWithNotification(action) {
  const { todo, assignee, isNewAssignee } = action.payload;
  const texts = [];
  if (isNewAssignee) {
    texts.push("Assignee Created: " + assignee.name);
  }

  texts.push("Todo Created: " + todo.name);
  texts.push("Todo Assigned To: " + assignee.name);

  const notification = {
    id: uuid(),
    texts: texts
  };

  yield put(doAddTodo(todo, assignee, isNewAssignee, notification));
  yield delay(5000);
  yield put(doHideNotification(notification.id));
}

function* watchAddTodoWithNotification() {
  yield takeEvery(ADD_TODO_WITH_NOTIFICATION, handleAddTodoWithNotification);
}

function* handleChangeAssigneeWithNotification(action) {
  const { todoId, assignee, isNewAssignee } = action.payload;
  const texts = [];
  let notification = undefined;
  if (isNewAssignee) {
    texts.push("Assignee Created: " + assignee.name);
    notification = { id: uuid(), texts: texts };
  }

  yield put(doChangeAssignee(todoId, assignee, isNewAssignee, notification));
  if (isNewAssignee) {
    yield delay(5000);
    yield put(doHideNotification(notification.id));
  }
}

function* watchChangeAssigneeWithNotification() {
  yield takeEvery(
    CHANGE_ASSIGNEE_WITH_NOTIFICATION,
    handleChangeAssigneeWithNotification
  );
}

export default function* rootSaga() {
  yield fork(watchAddTodoWithNotification);
  yield fork(watchChangeAssigneeWithNotification);
}
