import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";

const TODO_ADD = "TODO_ADD";
const TODO_TOGGLE = "TODO_TOGGLE";
const FILTER_SET = "FILTER_SET";

const list = [
  { id: 10, name: "TEST TEST", completed: false },
  { id: 20, name: "INITIAL LIST ELEMENT", completed: false }
];

let counter = 0;
const initialState = { todoState: list };

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

const mapStateToProps = state => {
  return { todos: state.todoState };
};

const mapDispatchToPropsToggle = dispatch => {
  return {
    onToggleTodo: id => dispatch(doToggleTodo(id))
  };
};

const mapDispatchToPropsAdd = dispatch => {
  return {
    onAddTodo: () => dispatch(doAddTodo())
  };
};

const TodoListComp = ({ todos, onAddTodo }) => {
  return (
    <div>
      {todos.map(todo => (
        <ConnectedTodoItemComp key={todo.id} todo={todo} />
      ))}
      <button type="button" onClick={onAddTodo}>
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
        {completed ? "Incomplete" : "Complete"}
      </button>
    </div>
  );
};

const ConnectedTodoListComp = connect(
  mapStateToProps,
  mapDispatchToPropsAdd
)(TodoListComp);

const ConnectedTodoItemComp = connect(
  null,
  mapDispatchToPropsToggle
)(TodoItemComp);

const TodoAppComp = () => {
  return <ConnectedTodoListComp />;
};

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <TodoAppComp />
    </Provider>,
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

render();
