import React from "react";
import { createStore, combineReducers } from "redux";

const list = [
  { id: 1, name: "AAAAAAAAAAAAA", completed: false },
  { id: 2, name: "BBBBBBBBBBBBBBB", completed: false },
  { id: 3, name: "CCCCCCCCC", completed: false },
  { id: 4, name: "DDDDDDDD", completed: false }
];

const TODO_ADD = "TODO_ADD";
const TODO_TOGGLE = "TODO_TOGGLE";
const FILTER_SET = "FILTER_SET";

const initialState = { todos: [] };

const margin = { marginLeft: "10px" };

const TodoAppComp = () => {
  return (
    <div>
      <ul>
        {list.map(item => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>
              <button
                style={margin}
                type="button"
                onClick={() => store.dispatch(doToggleTodo(item.id))}
              >
                Toggle
              </button>
            </span>
            <span style={margin}>{item.completed ? "OK" : "NOK"}</span>
          </li>
        ))}
      </ul>

      <span>
        <button
          type="button"
          onClick={() => store.dispatch(doAddTodo())}
          style={margin}
        >
          Add
        </button>
      </span>
    </div>
  );
};

const TodoListComp = ({ todos, onToggleTodo }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoItemComp key={todo.id} todo={todo} onToggleTodo={onToggleTodo} />
      ))}
    </div>
  );
};

const TodoItemComp = ({ todo, onToggleTodo }) => {
  const { name, id, completed } = todo;
  return (
    <div>
      {name}
      <button type="button" onClick={() => onToggleTodo(id)}>
        {completed ? "Inomplete" : "Complete"}
      </button>
    </div>
  );
};

const doSetFilter = filter => {
  return { type: FILTER_SET, payload: filter };
};

const doToggleTodo = id => {
  return {
    type: TODO_TOGGLE,
    payload: { todo: { id: id } }
  };
};

const doAddTodo = () => {
  return {
    type: TODO_ADD,
    payload: { todo: { id: 5, name: "LEARN REDUX" } }
  };
};

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case TODO_ADD: {
      return [...state, todoEntityReducer(undefined, action)];
    }
    case TODO_TOGGLE: {
      return state.map(todo => todoEntityReducer(todo, action));
    }
    default:
      return state;
  }
};

const todoEntityReducer = (state, action) => {
  switch (action.type) {
    case TODO_ADD: {
      return applyAddTodo(state, action);
    }
    case TODO_TOGGLE: {
      return applyToggleTodo(state, action);
    }
    default:
      return state;
  }
};

const filterReducer = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case FILTER_SET: {
      return applySetFilter(state, action);
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer
});

const applyAddTodo = (state, action) => {
  return Object.assign({}, action.todo, { completed: false });
};

const applyToggleTodo = (todo, action) => {
  return todo.id === action.todo.id
    ? Object.assign({}, todo, { completed: !todo.completed })
    : todo;
};

const applySetFilter = (state, action) => {
  return action.filter;
};

const store = createStore(rootReducer, initialState);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState);
});

export default TodoAppComp;
