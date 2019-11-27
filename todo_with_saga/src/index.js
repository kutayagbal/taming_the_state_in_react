import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { schema, normalize } from "normalizr";
import { Provider } from "react-redux";
import TodoList from "./TodoList";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const logger = createLogger();

const list = [
  {
    id: 12,
    name: "Redux",
    completed: true,
    assignee: {
      id: 99,
      name: "Dan Abramov"
    }
  },
  {
    id: 34,
    name: "Mobx",
    completed: true,
    assignee: {
      id: 77,
      name: "Michel Weststrate"
    }
  }
];

const assigneeSchema = new schema.Entity("assignee");

const todosSchema = new schema.Entity("todos", { assignee: assigneeSchema });

const normalizedTodos = normalize(list, [todosSchema]);

const initialTodoSate = {
  todos: normalizedTodos.entities.todos,
  todoIds: normalizedTodos.result,
  assignees: normalizedTodos.entities.assignee
};

const initialFilterState = {
  filterType: "SHOW_ALL"
};

const initialState = {
  todoState: initialTodoSate,
  filterState: initialFilterState
};
const saga = createSagaMiddleware();

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(saga, logger)
);

saga.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById("root")
);
