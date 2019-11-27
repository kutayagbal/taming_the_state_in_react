import React, { Component } from "react";
import { connect } from "react-redux";
import { TOGGLE_COMPLETED } from "./reducers";
import { CHANGE_ASSIGNEE_WITH_NOTIFICATION } from "./sagas";
import uuid from "uuid";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = { assigneeName: "" };
  }

  render() {
    const { todo, assignee, onToggleCompleted } = this.props;
    const { assigneeName } = this.state;

    return (
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={e => onToggleCompleted(todo.id, e.target.checked)}
        />
        <span className="Marg">Todo Name: {todo.name}</span>
        <span className="Marg">Assigned To: {assignee.name}</span>
        <button className="Marg" onClick={() => this.changeAssignee()}>
          Change Assigned To:
        </button>
        <input
          type="text"
          onChange={this.onChangeAssigneeName}
          value={assigneeName.trim()}
        />
      </div>
    );
  }

  changeAssignee = () => {
    const { onChangeAssignee, todo } = this.props;
    const { assigneeName } = this.state;

    let assignee = this.findAssignee(assigneeName);
    let isNewAssignee = false;

    if (assignee === undefined) {
      //new assignee
      isNewAssignee = true;
      assignee = { id: uuid(), name: assigneeName };
    }

    onChangeAssignee(todo.id, assignee, isNewAssignee);

    this.setState({ assigneeName: "" });
  };

  onChangeAssigneeName = e => {
    this.setState({ assigneeName: e.target.value.trim() });
  };

  findAssignee = assigneeName => {
    const { assignees } = this.props;
    return Object.values(assignees).find(
      assignee => assignee.name === assigneeName
    );
  };
}

const doChangeAssigneeWithNotification = (todoId, assignee, isNewAssignee) => {
  return {
    type: CHANGE_ASSIGNEE_WITH_NOTIFICATION,
    payload: {
      todoId: todoId,
      assignee: assignee,
      isNewAssignee: isNewAssignee
    }
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
    onChangeAssignee: (todoId, assignee, isNewAssignee) =>
      dispatch(
        doChangeAssigneeWithNotification(todoId, assignee, isNewAssignee)
      ),
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

const getAssignees = state => {
  return state.todoState.assignees;
};

const mapStateToProps = (state, props) => {
  return {
    todo: getTodo(state, props.todoId),
    assignee: getAssignee(state, props.todoId),
    assignees: getAssignees(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
