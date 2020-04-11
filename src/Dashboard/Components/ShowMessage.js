import React from "react";

export default function ShowMessage({ message, user }) {
  return (
    <div
      className={message.sender === user ? "MessageSender" : "MessageReceiver"}
    >
      {message.content}
    </div>
  );
}
