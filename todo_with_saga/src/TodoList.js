import React from "react";
import "./App.css";
import { connect } from "react-redux";
import TodoFilter from "./TodoFilter";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import Notifications from "./Notifications";

const TODO_FILTERS = {
  SHOW_COMPLETED: item => item.completed,
  SHOW_INCOMPLETE: item => !item.completed,
  SHOW_ALL: item => true
};

function TodoList({ todoIds }) {
  return (
    <div>
      <TodoFilter />
      <hr />
      <ul>
        {todoIds.map(todoId => (
          <TodoItem key={todoId} todoId={todoId} />
        ))}
      </ul>
      <hr />
      <AddTodo />
      <hr />
      <Notifications />
    </div>
  );
}

const getTodosAsIds = state => {
  return state.todoState.todoIds
    .map(todoId => state.todoState.todos[todoId])
    .filter(TODO_FILTERS[state.filterState.filterType])
    .map(todo => todo.id);
};

const mapStateToProps = state => {
  return { todoIds: getTodosAsIds(state) };
};

export default connect(mapStateToProps)(TodoList);
