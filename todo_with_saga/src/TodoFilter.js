import React from "react";
import { connect } from "react-redux";
import { SET_FILTER } from "./reducers";
import "./App.css";

function TodoFilter({ onSetFilter }) {
  return (
    <div className="Marg">
      Show:
      <button className="Marg" onClick={() => onSetFilter("SHOW_ALL")}>
        All
      </button>
      <button className="Marg" onClick={() => onSetFilter("SHOW_COMPLETED")}>
        Completed
      </button>
      <button className="Marg" onClick={() => onSetFilter("SHOW_INCOMPLETE")}>
        Incomplete
      </button>
    </div>
  );
}

const doSetFilter = filterType => {
  return { type: SET_FILTER, payload: { filterType: filterType } };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetFilter: filterType => dispatch(doSetFilter(filterType))
  };
};

export default connect(undefined, mapDispatchToProps)(TodoFilter);
