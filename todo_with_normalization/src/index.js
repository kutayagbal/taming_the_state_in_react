import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ConnectedTodoApp from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import reducer from "./reducers";
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

const store = createStore(
  reducer,
  { todos: normalizedData },
  applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedTodoApp />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
