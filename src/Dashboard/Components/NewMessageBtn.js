import React from "react";

export default function NewMessageBtn({ HandleNewMessageBtnClick }) {
  return (
    <div>
      <button onClick={HandleNewMessageBtnClick} className="NewMessageBtn">
        <h2>New Message</h2>
      </button>
    </div>
  );
}
