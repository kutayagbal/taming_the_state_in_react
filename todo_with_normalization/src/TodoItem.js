import React, { Component } from "react";
import { ASSIGNED_TO_CHANGE } from "./reducers";
import { connect } from "react-redux";
import "./App.css";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = { assignee: "" };
  }

  render() {
    const { todo, assignedTo, onChangeAssigenedTo } = this.props;
    const { assignee } = this.state;

    return (
      <div>
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
        <input type="text" onChange={this.nameChange} value={assignee.trim()} />
      </div>
    );
  }

  nameChange = e => {
    this.setState({ assignee: e.target.value.trim() });
  };
}

const doChangeAssignedTo = (id, name) => {
  return {
    type: ASSIGNED_TO_CHANGE,
    payload: { todoId: id, name: name }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeAssigenedTo: (id, name) => dispatch(doChangeAssignedTo(id, name))
  };
};

export default connect(null, mapDispatchToProps)(TodoItem);
