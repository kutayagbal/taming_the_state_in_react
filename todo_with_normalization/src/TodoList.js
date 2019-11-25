import React from "react";
import { connect } from "react-redux";
import ConnectedTodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import "./App.css";
import { SET_FILTER } from "./reducers";

const VISIBILITY_FILTERS = {
  SHOW_COMPLETED: item => item.completed,
  SHOW_INCOMPLETE: item => !item.completed,
  SHOW_ALL: item => true
};

const doSetFilter = filterType => {
  return {
    type: SET_FILTER,
    payload: { filterType: filterType }
  };
};

const mapDispatchToProps = dispatch => {
  return { onSetFilter: filterType => dispatch(doSetFilter(filterType)) };
};

function TodoFilter({ onSetFilter }) {
  return (
    <div className="App">
      Show:
      <button className="App" onClick={() => onSetFilter("SHOW_ALL")}>
        All
      </button>
      <button className="App" onClick={() => onSetFilter("SHOW_COMPLETED")}>
        Completed
      </button>
      <button className="App" onClick={() => onSetFilter("SHOW_INCOMPLETE")}>
        Incomplete
      </button>
    </div>
  );
}

const ConnectedTodoFilter = connect(undefined, mapDispatchToProps)(TodoFilter);

function TodoList({ todoIds }) {
  return (
    <div>
      <ConnectedTodoFilter />
      <hr />
      <ul>
        {todoIds.map(todoId => (
          <ConnectedTodoItem key={todoId} todoId={todoId} />
        ))}
      </ul>
      <hr />
      <AddTodo />
    </div>
  );
}

const getTodosAsIds = state => {
  return state.todoIds
    .map(id => state.todos[id])
    .filter(VISIBILITY_FILTERS[state.filterType])
    .map(todo => todo.id);
};

const mapStateToProps = state => {
  return { todoIds: getTodosAsIds(state) };
};

export default connect(mapStateToProps)(TodoList);
