import React from "react";
import { connect } from "react-redux";
import ConnectedTodoItem from "./TodoItem";

function TodoApp({ todos }) {
  return (
    <div>
      <ul>
        {Object.values(todos.entities.todos).map(todo => (
          <ConnectedTodoItem
            key={todo.id}
            todo={todo}
            assignedTo={todos.entities.assignedTo[todo.assignedTo]}
          />
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = state => {
  return { todos: state.todos };
};

const ConnectedTodoApp = connect(mapStateToProps, undefined)(TodoApp);

export default ConnectedTodoApp;
