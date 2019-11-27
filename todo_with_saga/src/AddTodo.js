import React, { Component } from "react";
import { ADD_TODO_WITH_NOTIFICATION } from "./sagas";
import { connect } from "react-redux";
import "./App.css";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { todoName: "", assigneeName: "" };
  }

  render() {
    const { onAddTodo } = this.props;
    const { todoName, assigneeName } = this.state;

    return (
      <div className="Marg">
        Name:
        <input
          className="Marg"
          type="text"
          name="todoName"
          value={todoName}
          onChange={this.onChange}
        />
        Assigned To:
        <input
          className="Marg"
          type="text"
          name="assigneeName"
          value={assigneeName}
          onChange={this.onChange}
        />
        <button
          className="Marg"
          onClick={() => {
            onAddTodo(todoName, assigneeName);
            this.setState({ todoName: "", assigneeName: "" });
          }}
        >
          Add Todo
        </button>
      </div>
    );
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
}

// const doAddTodo = (todoName, assigneeName) => {
//   return {
//     type: ADD_TODO,
//     payload: { todoId: uuid(), todoName: todoName, assigneeName: assigneeName }
//   };
// };

function doAddTodoWithNotification(todoName, assigneeName) {
  return {
    type: ADD_TODO_WITH_NOTIFICATION,
    payload: { todoName: todoName, assigneeName: assigneeName }
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAddTodo: (todoName, assigneeName) =>
      dispatch(doAddTodoWithNotification(todoName, assigneeName))
  };
};

export default connect(undefined, mapDispatchToProps)(AddTodo);
