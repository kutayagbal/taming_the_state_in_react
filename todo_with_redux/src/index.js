import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";

const TODO_ADD = "TODO_ADD";
const TODO_TOGGLE = "TODO_TOGGLE";
const FILTER_SET = "FILTER_SET";

// const list = [
//   { id: 1, name: "AAAAAAAAAAAAA", completed: false },
//   { id: 2, name: "BBBBBBBBBBBBBBB", completed: false },
//   { id: 3, name: "CCCCCCCCC", completed: false },
//   { id: 4, name: "DDDDDDDD", completed: false }
// ];

let counter = 0;
const initialState = { todoState: [] };

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

const store = createStore(rootReducer, initialState);

const margin = { margin: "10px" };

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
    payload: { todo: { id: (counter = counter + 1), name: "LEARN REDUX" } }
  };
};

const TodoAppComp = ({ todos, onToggleTodo }) => {
  return <TodoListComp todos={todos} onToggleTodo={onToggleTodo} />;
};

const TodoListComp = ({ todos, onToggleTodo }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoItemComp key={todo.id} todo={todo} onToggleTodo={onToggleTodo} />
      ))}
      <button type="button" onClick={() => store.dispatch(doAddTodo())}>
        Add
      </button>
    </div>
  );
};

const TodoItemComp = ({ todo, onToggleTodo }) => {
  const { name, id, completed } = todo;
  return (
    <div style={margin}>
      {name}
      <button type="button" onClick={() => onToggleTodo(id)} style={margin}>
        {completed ? "Inomplete" : "Complete"}
      </button>
    </div>
  );
};

const render = () => {
  ReactDOM.render(
    <TodoAppComp
      todos={store.getState().todoState}
      onToggleTodo={id => store.dispatch(doToggleTodo(id))}
    />,
    document.getElementById("root")
  );
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

const applyAddTodo = (state, action) => {
  return Object.assign({}, action.payload.todo, { completed: false });
};

const applyToggleTodo = (todo, action) => {
  return todo.id === action.payload.todo.id
    ? Object.assign({}, todo, { completed: !todo.completed })
    : todo;
};

const applySetFilter = (state, action) => {
  return action.filter;
};

store.subscribe(render);
render();
