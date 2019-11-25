import React, { Component } from "react";
import { CHANGE_ASSIGNED, TOGGLE_COMPLETED } from "./reducers";
import { connect } from "react-redux";
import "./App.css";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = { assignee: "" };
  }

  render() {
    const {
      todo,
      assignedTo,
      onChangeAssigenedTo,
      onToggleCompleted
    } = this.props;
    const { assignee } = this.state;

    return (
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={e => onToggleCompleted(todo.id, !e.target.checked)}
        />
        <span className="App">Todo Name: {todo.name}</span>
        <span className="App">Assigned To: {assignedTo.name}</span>
        <button
          className="App"
          onClick={() => {
            onChangeAssigenedTo(todo.id, assignee);
            this.setState({ assignee: "" });
          }}
        >
          Change Assigned To:
        </button>
        <input
          type="text"
          onChange={this.changeAssignee}
          value={assignee.trim()}
        />
      </div>
    );
  }

  changeAssignee = e => {
    this.setState({ assignee: e.target.value.trim() });
  };
}

const doChangeAssignedTo = (id, name) => {
  return {
    type: CHANGE_ASSIGNED,
    payload: { todoId: id, name: name }
  };
};

const doToggleCompleted = (id, checked) => {
  return {
    type: TOGGLE_COMPLETED,
    payload: { todoId: id, completed: !checked }
  };
};

const getTodoAsEntity = (state, id) => {
  return state.todos[id];
};

const getAssignedToAsEntity = (state, todoId) => {
  return state.assignees[state.todos[todoId].assignedTo];
};

const mapStateToProps = (state, props) => {
  return {
    todo: getTodoAsEntity(state, props.todoId),
    assignedTo: getAssignedToAsEntity(state, props.todoId)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeAssigenedTo: (id, name) => dispatch(doChangeAssignedTo(id, name)),
    onToggleCompleted: (id, e) => dispatch(doToggleCompleted(id, e))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
