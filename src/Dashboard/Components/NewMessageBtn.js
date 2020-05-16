import React from "react";

export default function NewMessageBtn({ history }) {
  return (
    <div>
      <button onClick={() => history.push("/new_message")} className="NewMessageBtn">
        <h2>New Chat</h2>
      </button>
    </div>
  );
}
