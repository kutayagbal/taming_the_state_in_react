import React, { Component } from "react";
import { connect } from "react-redux";
import { CHANGE_ASSIGNEE, TOGGLE_COMPLETED } from "./reducers";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = { newAssignee: "" };
  }

  render() {
    const { todo, assignee, onChangeAssignee, onToggleCompleted } = this.props;
    const { newAssignee } = this.state;

    return (
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={e => onToggleCompleted(todo.id, e.target.checked)}
        />
        <span className="Marg">Todo Name: {todo.name}</span>
        <span className="Marg">Assigned To: {assignee.name}</span>
        <button
          className="Marg"
          onClick={() => {
            onChangeAssignee(todo.id, newAssignee);
            this.setState({ newAssignee: "" });
          }}
        >
          Change Assigned To:
        </button>
        <input
          type="text"
          onChange={this.changeAssignee}
          value={newAssignee.trim()}
        />
      </div>
    );
  }

  changeAssignee = e => {
    this.setState({ newAssignee: e.target.value.trim() });
  };
}

const doChangeAssignee = (todoId, newAssigneeName) => {
  return {
    type: CHANGE_ASSIGNEE,
    payload: { todoId: todoId, newAssigneeName: newAssigneeName }
  };
};

const doToggleCompleted = (todoId, isCompleted) => {
  return {
    type: TOGGLE_COMPLETED,
    payload: { todoId: todoId, isCompleted: isCompleted }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeAssignee: (todoId, newAssigneeName) =>
      dispatch(doChangeAssignee(todoId, newAssigneeName)),
    onToggleCompleted: (todoId, isCompleted) =>
      dispatch(doToggleCompleted(todoId, isCompleted))
  };
};

const getTodo = (state, todoId) => {
  return state.todoState.todos[todoId];
};

const getAssignee = (state, todoId) => {
  return state.todoState.assignees[state.todoState.todos[todoId].assignee];
};

const mapStateToProps = (state, props) => {
  return {
    todo: getTodo(state, props.todoId),
    assignee: getAssignee(state, props.todoId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
