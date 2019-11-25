import React from "react";
import { connect } from "react-redux";
import ConnectedTodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

function TodoList({ todoIds }) {
  return (
    <div>
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
  return state.todoIds;
};

const mapStateToProps = state => {
  return { todoIds: getTodosAsIds(state) };
};

export default connect(mapStateToProps)(TodoList);
