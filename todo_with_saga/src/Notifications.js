import React from "react";
import { connect } from "react-redux";

function Notifications({ notifications }) {
  return (
    <div>
      {notifications.map((texts, nIndex) => (
        <div key={nIndex}>
          <div>
            {texts.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          <hr />
        </div>
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
