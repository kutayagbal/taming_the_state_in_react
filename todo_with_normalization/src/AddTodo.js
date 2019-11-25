import React, { Component } from "react";
import { ADD_TODO } from "./reducers";
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
      <div className="App">
        Name:
        <input
          className="App"
          type="text"
          name="todoName"
          value={todoName}
          onChange={this.onChange}
        />
        Assigned To:
        <input
          className="App"
          type="text"
          name="assigneeName"
          value={assigneeName}
          onChange={this.onChange}
        />
        <button
          className="App"
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

const doAddTodo = (todoName, assigneeName) => {
  return {
    type: ADD_TODO,
    payload: { todoName: todoName, assigneeName: assigneeName }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddTodo: (todoName, assigneeName) =>
      dispatch(doAddTodo(todoName, assigneeName))
  };
};

export default connect(undefined, mapDispatchToProps)(AddTodo);
