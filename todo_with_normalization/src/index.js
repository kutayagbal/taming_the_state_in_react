import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TodoList from "./TodoList";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import todoReducer from "./reducers";
import { schema, normalize } from "normalizr";

const logger = createLogger();

const list = [
  {
    id: 12,
    name: "Redux",
    completed: true,
    assignedTo: {
      id: 99,
      name: "Dan Abramov"
    }
  },
  {
    id: 34,
    name: "Mobx",
    completed: true,
    assignedTo: {
      id: 77,
      name: "Michel Weststrate"
    }
  }
];

const assignedToSchema = new schema.Entity("assignedTo");

const toDoSchema = new schema.Entity("todos", { assignedTo: assignedToSchema });

const normalizedData = normalize(list, [toDoSchema]);

const initialTodoState = {
  todos: normalizedData.entities.todos,
  todoIds: normalizedData.result,
  assignees: normalizedData.entities.assignedTo,
  filterType: "SHOW_ALL"
};

const store = createStore(
  todoReducer,
  initialTodoState,
  applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
