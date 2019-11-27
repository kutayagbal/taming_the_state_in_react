import React from "react";
import { connect } from "react-redux";

function Notifications({ notifications }) {
  return (
    <div>
      {notifications.map(note => (
        <div key={note}>{note}</div>
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    notifications: Object.values(state.notificationState.notifications)
  };
};

export default connect(mapStateToProps)(Notifications);
