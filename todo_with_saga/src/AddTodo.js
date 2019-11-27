import React, { Component } from "react";
import { ADD_TODO_WITH_NOTIFICATION } from "./sagas";
import { connect } from "react-redux";
import "./App.css";
import uuid from "uuid";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { todoName: "", assigneeName: "" };
  }

  render() {
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
          onClick={() => this.createTodo(todoName, assigneeName)}
        >
          Add Todo
        </button>
      </div>
    );
  }

  createTodo = (todoName, assigneeName) => {
    const { onAddTodo } = this.props;
    let assignee = this.findAssignee(assigneeName);
    let isNewAssignee = false;

    if (assignee === undefined) {
      //new assignee
      isNewAssignee = true;
      assignee = { id: uuid(), name: assigneeName };
    }

    const todo = { id: uuid(), name: todoName, assignee: assignee.id };
    onAddTodo(todo, assignee, isNewAssignee);

    this.setState({ todoName: "", assigneeName: "" });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  findAssignee = assigneeName => {
    const { assignees } = this.props;
    return Object.values(assignees).find(
      assignee => assignee.name === assigneeName
    );
  };
}

const doAddTodoWithNotification = (todo, assignee, isNewAssignee) => {
  return {
    type: ADD_TODO_WITH_NOTIFICATION,
    payload: { todo: todo, assignee: assignee, isNewAssignee: isNewAssignee }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddTodo: (todo, assignee, isNewAssignee) =>
      dispatch(doAddTodoWithNotification(todo, assignee, isNewAssignee))
  };
};

const getAssignees = state => {
  return {
    assignees: state.todoState.assignees
  };
};

const mapStateToProps = state => {
  return getAssignees(state);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
